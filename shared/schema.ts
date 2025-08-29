import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const medicalScans = pgTable("medical_scans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  fileSize: text("file_size").notNull(),
  mimeType: text("mime_type").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
  scanType: text("scan_type"), // 'xray', 'ct', 'mri', 'ultrasound'
});

export const predictions = pgTable("predictions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  scanId: varchar("scan_id").references(() => medicalScans.id).notNull(),
  prediction: text("prediction").notNull(),
  confidence: real("confidence").notNull(),
  severity: text("severity").notNull(), // 'low', 'medium', 'high'
  heatmapBase64: text("heatmap_base64"),
  recommendations: jsonb("recommendations").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMedicalScanSchema = createInsertSchema(medicalScans).omit({
  id: true,
  uploadedAt: true,
});

export const insertPredictionSchema = createInsertSchema(predictions).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type MedicalScan = typeof medicalScans.$inferSelect;
export type InsertMedicalScan = z.infer<typeof insertMedicalScanSchema>;

export type Prediction = typeof predictions.$inferSelect;
export type InsertPrediction = z.infer<typeof insertPredictionSchema>;
