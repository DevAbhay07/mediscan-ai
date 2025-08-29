import { Upload, Cog, TrendingUp, FileText, Code } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="bg-card rounded-2xl shadow-lg border border-border p-8 mb-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-foreground mb-4">How MediScan AI Works</h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our advanced AI pipeline processes medical images through multiple stages to deliver accurate, interpretable results.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="text-center" data-testid="step-upload">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Upload className="text-primary text-2xl" />
          </div>
          <h4 className="text-lg font-semibold mb-2">1. Upload Scan</h4>
          <p className="text-sm text-muted-foreground">Upload your medical scan in PNG/JPG format for instant processing.</p>
        </div>
        <div className="text-center" data-testid="step-processing">
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Cog className="text-accent text-2xl" />
          </div>
          <h4 className="text-lg font-semibold mb-2">2. AI Processing</h4>
          <p className="text-sm text-muted-foreground">Advanced CNN models analyze the image for anomalies and patterns.</p>
        </div>
        <div className="text-center" data-testid="step-insights">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="text-primary text-2xl" />
          </div>
          <h4 className="text-lg font-semibold mb-2">3. Generate Insights</h4>
          <p className="text-sm text-muted-foreground">Create interpretable heatmaps and confidence scores for diagnosis.</p>
        </div>
        <div className="text-center" data-testid="step-results">
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="text-accent text-2xl" />
          </div>
          <h4 className="text-lg font-semibold mb-2">4. Deliver Results</h4>
          <p className="text-sm text-muted-foreground">Receive detailed reports with actionable medical insights.</p>
        </div>
      </div>

      {/* API Contract Example */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Code className="text-primary" />
          API Response Format
        </h4>
        <pre className="text-sm text-muted-foreground bg-card rounded p-4 overflow-x-auto border border-border" data-testid="api-example">
          <code>{`{
  "prediction": "Pneumonia",
  "confidence": 0.873,
  "severity": "high",
  "heatmap_base64": "data:image/png;base64,...",
  "recommendations": [
    "Immediate medical attention required",
    "Consider antibiotic treatment"
  ]
}`}</code>
        </pre>
      </div>
    </section>
  );
}
