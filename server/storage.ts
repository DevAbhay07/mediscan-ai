import { type MedicalScan, type InsertMedicalScan, type Prediction, type InsertPrediction } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Medical Scans
  createMedicalScan(scan: InsertMedicalScan): Promise<MedicalScan>;
  getMedicalScan(id: string): Promise<MedicalScan | undefined>;
  
  // Predictions
  createPrediction(prediction: InsertPrediction): Promise<Prediction>;
  getPredictionByScanId(scanId: string): Promise<Prediction | undefined>;
}

export class MemStorage implements IStorage {
  private medicalScans: Map<string, MedicalScan>;
  private predictions: Map<string, Prediction>;

  constructor() {
    this.medicalScans = new Map();
    this.predictions = new Map();
  }

  async createMedicalScan(insertScan: InsertMedicalScan): Promise<MedicalScan> {
    const id = randomUUID();
    const scan: MedicalScan = { 
      ...insertScan, 
      id,
      uploadedAt: new Date()
    };
    this.medicalScans.set(id, scan);
    return scan;
  }

  async getMedicalScan(id: string): Promise<MedicalScan | undefined> {
    return this.medicalScans.get(id);
  }

  async createPrediction(insertPrediction: InsertPrediction): Promise<Prediction> {
    const id = randomUUID();
    const prediction: Prediction = { 
      ...insertPrediction, 
      id,
      createdAt: new Date()
    };
    this.predictions.set(id, prediction);
    return prediction;
  }

  async getPredictionByScanId(scanId: string): Promise<Prediction | undefined> {
    return Array.from(this.predictions.values()).find(
      (prediction) => prediction.scanId === scanId
    );
  }
}

export const storage = new MemStorage();
