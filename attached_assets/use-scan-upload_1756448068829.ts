import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import type { MedicalScan, Prediction } from '@shared/schema';
import type { UploadProgress } from '@/types';

export function useScanUpload() {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [currentScanId, setCurrentScanId] = useState<string | null>(null);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('scan', file);

      setUploadProgress({ progress: 0, status: 'uploading', message: 'Uploading scan...' });

      const response = await apiRequest('POST', '/api/scans/upload', formData);
      return response.json() as Promise<MedicalScan>;
    },
    onSuccess: async (scan) => {
      setCurrentScanId(scan.id);
      setUploadProgress({ progress: 50, status: 'analyzing', message: 'Analyzing scan...' });
      
      // Start analysis
      try {
        const analysisResponse = await apiRequest('POST', `/api/scans/${scan.id}/analyze`);
        const prediction = await analysisResponse.json() as Prediction;
        
        setUploadProgress({ progress: 100, status: 'completed', message: 'Analysis complete!' });
        
        // Invalidate queries to refresh data
        queryClient.invalidateQueries({ queryKey: ['/api/scans', scan.id] });
        queryClient.invalidateQueries({ queryKey: ['/api/scans', scan.id, 'prediction'] });
      } catch (error) {
        setUploadProgress({ progress: 0, status: 'error', message: 'Analysis failed' });
      }
    },
    onError: () => {
      setUploadProgress({ progress: 0, status: 'error', message: 'Upload failed' });
    },
  });

  const scanQuery = useQuery<MedicalScan>({
    queryKey: ['/api/scans', currentScanId],
    enabled: !!currentScanId,
  });

  const predictionQuery = useQuery<Prediction>({
    queryKey: ['/api/scans', currentScanId, 'prediction'],
    enabled: !!currentScanId,
  });

  const downloadReport = async () => {
    if (!currentScanId) return;
    
    try {
      const response = await apiRequest('GET', `/api/scans/${currentScanId}/report`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mediscan-report-${currentScanId}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to download report:', error);
    }
  };

  const reset = () => {
    setUploadProgress(null);
    setCurrentScanId(null);
  };

  return {
    uploadScan: uploadMutation.mutate,
    uploadProgress,
    scan: scanQuery.data,
    prediction: predictionQuery.data,
    isUploading: uploadMutation.isPending,
    downloadReport,
    reset,
  };
}
