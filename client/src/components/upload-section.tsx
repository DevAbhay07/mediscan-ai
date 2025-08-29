import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CloudUpload, FileImage, X, Settings, Eye, Download, UserRound, AlertTriangle, CheckCircle } from "lucide-react";
import { useScanUpload } from "@/hooks/use-scan-upload";
import { useToast } from "@/hooks/use-toast";

export default function UploadSection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadScan, uploadProgress, prediction, downloadReport, reset } = useScanUpload();
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    if (file.size > 50 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 50MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadScan(selectedFile);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRequestReview = () => {
    toast({
      title: "Review Requested",
      description: "A medical professional will review this scan within 24 hours.",
    });
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getSeverityIcon = (severity?: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getSeverityText = (severity?: string) => {
    switch (severity) {
      case 'high': return 'High Priority - Requires immediate attention';
      case 'medium': return 'Medium Priority - Schedule follow-up';
      case 'low': return 'Low Priority - Routine monitoring';
      default: return '';
    }
  };

  return (
    <section id="upload" className="bg-card rounded-2xl shadow-lg border border-border p-8 mb-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <CloudUpload className="text-primary w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Upload Medical Scan</h3>
          </div>
          <p className="text-muted-foreground mb-6">
            Supported formats: PNG, JPG, JPEG. DICOM files will be converted automatically on the server.
          </p>

          {/* File Upload Area */}
          <div 
            className="upload-zone rounded-xl p-8 text-center mb-6"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            data-testid="upload-zone"
          >
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileInputChange}
              data-testid="file-input"
            />
            <div className="mb-4">
              <FileImage className="w-16 h-16 text-muted-foreground mb-4 mx-auto" />
              <p className="text-lg font-medium text-foreground mb-2">Drop your scan here or click to browse</p>
              <p className="text-sm text-muted-foreground">Maximum file size: 50MB</p>
            </div>
            <Button 
              onClick={() => fileInputRef.current?.click()} 
              className="btn-primary"
              data-testid="choose-file-button"
            >
              <CloudUpload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </div>

          {/* Selected File Info */}
          {selectedFile && (
            <Card className="mb-6" data-testid="selected-file-info">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <FileImage className="text-primary w-5 h-5" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground" data-testid="file-name">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground" data-testid="file-size">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleReset} data-testid="remove-file-button">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                {!uploadProgress && (
                  <Button 
                    onClick={handleUpload} 
                    className="w-full mt-4"
                    data-testid="upload-button"
                  >
                    Start Analysis
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Analysis Progress */}
          {uploadProgress && (
            <Card className="border-primary/20 mb-6" data-testid="analysis-progress">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Settings className="w-5 h-5 text-primary animate-spin" />
                  <span className="font-medium text-foreground">{uploadProgress.message}</span>
                </div>
                <Progress value={uploadProgress.progress} className="mb-2" data-testid="progress-bar" />
                <p className="text-sm text-muted-foreground">Processing medical image data</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          {/* Image Preview and Results */}
          <div className="bg-muted/30 rounded-xl p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Eye className="text-primary w-5 h-5" />
              Scan Preview & Analysis
            </h4>
            
            {/* Preview Area */}
            <div className="relative mb-6">
              {previewUrl ? (
                <div className="image-container w-full">
                  <img 
                    src={previewUrl} 
                    alt="Medical scan preview" 
                    className="scan-preview w-full rounded-lg border-2 border-border shadow-md" 
                    data-testid="scan-preview"
                  />
                  {prediction?.heatmapBase64 && (
                    <div 
                      className="heatmap rounded-lg opacity-60"
                      style={{
                        background: 'radial-gradient(circle at 65% 45%, rgba(255,0,0,0.6) 0%, rgba(255,100,0,0.4) 30%, transparent 60%)'
                      }}
                      data-testid="heatmap-overlay"
                    />
                  )}
                </div>
              ) : (
                <div className="w-full h-64 bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center" data-testid="no-preview">
                  <p className="text-muted-foreground">No scan selected</p>
                </div>
              )}
            </div>

            {/* Analysis Results */}
            {prediction && (
              <Card className="shadow-sm" data-testid="analysis-results">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Diagnosis</p>
                      <p className="text-xl font-bold text-foreground" data-testid="prediction-result">
                        {prediction.prediction}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Confidence</p>
                      <p className="text-xl font-bold text-primary" data-testid="confidence-score">
                        {(prediction.confidence * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Confidence Level</span>
                      <span data-testid="confidence-percentage">{(prediction.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={prediction.confidence * 100} className="h-2" data-testid="confidence-bar" />
                  </div>

                  {/* Risk Assessment */}
                  {prediction.severity && (
                    <div className="mb-4">
                      <Badge 
                        variant={getSeverityColor(prediction.severity)} 
                        className="flex items-center gap-2 w-fit"
                        data-testid="severity-badge"
                      >
                        {getSeverityIcon(prediction.severity)}
                        {getSeverityText(prediction.severity)}
                      </Badge>
                    </div>
                  )}

                  {/* Recommendations */}
                  {prediction.recommendations && Array.isArray(prediction.recommendations) && prediction.recommendations.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-semibold mb-2">Recommendations</h5>
                      <ul className="space-y-1" data-testid="recommendations-list">
                        {prediction.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={downloadReport} 
                      className="flex-1 inline-flex items-center justify-center gap-2"
                      data-testid="download-report-button"
                    >
                      <Download className="w-4 h-4" />
                      Download Report
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={handleRequestReview}
                      className="flex-1 inline-flex items-center justify-center gap-2"
                      data-testid="request-review-button"
                    >
                      <UserRound className="w-4 h-4" />
                      Request Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
