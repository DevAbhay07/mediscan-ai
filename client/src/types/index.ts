export interface UploadProgress {
  progress: number;
  status: 'uploading' | 'analyzing' | 'completed' | 'error';
  message: string;
}

export interface AnalysisResult {
  prediction: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  heatmapBase64?: string;
  recommendations?: string[];
}
