import type { VercelRequest, VercelResponse } from '@vercel/node';
import multer from 'multer';
import { storage } from '../server/storage';
import { insertMedicalScanSchema, insertPredictionSchema } from '../shared/schema';

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
        "Recommend CT scan for further evaluation",
        "Schedule follow-up in 3 months",
        "Monitor for symptom changes"
      ]
    }
  ];

  // Randomly select a condition for demo purposes
  const selectedCondition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return {
    ...selectedCondition,
    heatmapBase64: generateMockHeatmap()
  };
}

function generateMockHeatmap(): string {
  // Generate a simple base64 encoded heatmap placeholder
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
}

// Helper to run middleware
function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { url } = req;
    
    if (url === '/api/health') {
      return res.status(200).json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      });
    }

    if (url === '/api/scans' && req.method === 'POST') {
      try {
        // Run multer middleware
        await runMiddleware(req, res, upload.single('file'));

        const file = (req as any).file;
        if (!file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }

        // Validate scan data
        const scanData = {
          filename: `scan_${Date.now()}_${file.originalname}`,
          originalName: file.originalname,
          fileSize: file.size.toString(),
          mimeType: file.mimetype,
          scanType: (req as any).body.scanType || 'unknown'
        };

        const validatedScan = insertMedicalScanSchema.parse(scanData);

        // Store scan in database
        const scan = await storage.createMedicalScan(validatedScan);

        // Generate AI prediction
        const analysis = simulateAIAnalysis(scan.filename);

        // Store prediction
        const predictionData = {
          scanId: scan.id,
          prediction: analysis.prediction,
          confidence: analysis.confidence,
          severity: analysis.severity,
          heatmapBase64: analysis.heatmapBase64,
          recommendations: analysis.recommendations
        };

        const validatedPrediction = insertPredictionSchema.parse(predictionData);
        const prediction = await storage.createPrediction(validatedPrediction);

        return res.status(200).json({
          success: true,
          scan,
          prediction: {
            ...prediction,
            recommendations: analysis.recommendations
          }
        });

      } catch (error: any) {
        console.error('Upload error:', error);
        return res.status(400).json({ 
          error: error.message || 'Failed to process upload' 
        });
      }
    }

    if (url === '/api/scans' && req.method === 'GET') {
      try {
        // For now, return empty array as the current storage doesn't have a list method
        // You can extend the storage interface if needed
        return res.status(200).json({ scans: [] });
      } catch (error) {
        console.error('Fetch scans error:', error);
        return res.status(500).json({ error: 'Failed to fetch scans' });
      }
    }

    // Route not found
    return res.status(404).json({ error: 'Route not found' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}
