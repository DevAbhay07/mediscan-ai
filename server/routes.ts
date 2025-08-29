import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { insertMedicalScanSchema, insertPredictionSchema } from "@shared/schema";
import { randomUUID } from "crypto";

// Configure multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { 
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Mock AI analysis function
function simulateAIAnalysis(filename: string) {
  // Simulate different conditions based on filename
  const conditions = [
    {
      prediction: "Pneumonia",
      confidence: 0.873,
      severity: "high" as const,
      recommendations: [
        "Immediate medical attention required",
        "Consider antibiotic treatment",
        "Follow up chest X-ray in 7-10 days"
      ]
    },
    {
      prediction: "Normal",
      confidence: 0.952,
      severity: "low" as const,
      recommendations: [
        "No abnormalities detected",
        "Continue routine monitoring",
        "Maintain healthy lifestyle"
      ]
    },
    {
      prediction: "Possible Nodule",
      confidence: 0.634,
      severity: "medium" as const,
      recommendations: [
        "Schedule follow-up CT scan",
        "Consult pulmonologist",
        "Monitor for changes"
      ]
    }
  ];

  // Simple logic to simulate different results
  const hash = filename.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return conditions[Math.abs(hash) % conditions.length];
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Upload medical scan
  app.post('/api/scans/upload', upload.single('scan'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const scanData = {
        filename: `${randomUUID()}-${req.file.originalname}`,
        originalName: req.file.originalname,
        fileSize: req.file.size.toString(),
        mimeType: req.file.mimetype,
        scanType: 'xray' // Default to xray, could be determined from metadata
      };

      const validatedData = insertMedicalScanSchema.parse(scanData);
      const scan = await storage.createMedicalScan(validatedData);

      res.json(scan);
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ message: 'Upload failed' });
    }
  });

  // Get medical scan by ID
  app.get('/api/scans/:id', async (req, res) => {
    try {
      const scan = await storage.getMedicalScan(req.params.id);
      if (!scan) {
        return res.status(404).json({ message: 'Scan not found' });
      }
      res.json(scan);
    } catch (error) {
      console.error('Get scan error:', error);
      res.status(500).json({ message: 'Failed to retrieve scan' });
    }
  });

  // Analyze medical scan
  app.post('/api/scans/:id/analyze', async (req, res) => {
    try {
      const scan = await storage.getMedicalScan(req.params.id);
      if (!scan) {
        return res.status(404).json({ message: 'Scan not found' });
      }

      // Simulate AI analysis with delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const analysisResult = simulateAIAnalysis(scan.originalName);
      
      const predictionData = {
        scanId: scan.id,
        prediction: analysisResult.prediction,
        confidence: analysisResult.confidence,
        severity: analysisResult.severity,
        heatmapBase64: null, // Would contain actual heatmap data in real implementation
        recommendations: analysisResult.recommendations
      };

      const validatedData = insertPredictionSchema.parse(predictionData);
      const prediction = await storage.createPrediction(validatedData);

      res.json(prediction);
    } catch (error) {
      console.error('Analysis error:', error);
      res.status(500).json({ message: 'Analysis failed' });
    }
  });

  // Get prediction for scan
  app.get('/api/scans/:id/prediction', async (req, res) => {
    try {
      const prediction = await storage.getPredictionByScanId(req.params.id);
      if (!prediction) {
        return res.status(404).json({ message: 'Prediction not found' });
      }
      res.json(prediction);
    } catch (error) {
      console.error('Get prediction error:', error);
      res.status(500).json({ message: 'Failed to retrieve prediction' });
    }
  });

  // Download report
  app.get('/api/scans/:id/report', async (req, res) => {
    try {
      const scan = await storage.getMedicalScan(req.params.id);
      const prediction = await storage.getPredictionByScanId(req.params.id);
      
      if (!scan || !prediction) {
        return res.status(404).json({ message: 'Scan or prediction not found' });
      }

      const report = {
        scan: {
          id: scan.id,
          originalName: scan.originalName,
          uploadedAt: scan.uploadedAt,
          scanType: scan.scanType
        },
        analysis: {
          prediction: prediction.prediction,
          confidence: prediction.confidence,
          severity: prediction.severity,
          recommendations: prediction.recommendations,
          analyzedAt: prediction.createdAt
        },
        metadata: {
          version: "1.0",
          model: "MediScan AI v2.1",
          generated: new Date().toISOString()
        }
      };

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="mediscan-report-${scan.id}.json"`);
      res.json(report);
    } catch (error) {
      console.error('Download report error:', error);
      res.status(500).json({ message: 'Failed to generate report' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
