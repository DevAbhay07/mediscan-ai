import { Upload, Settings, TrendingUp, FileText, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "1. Upload Scan",
      description: "Upload your medical scan in PNG/JPG format for instant processing.",
      color: "primary"
    },
    {
      icon: Settings,
      title: "2. AI Processing",
      description: "Advanced CNN models analyze the image for anomalies and patterns.",
      color: "accent"
    },
    {
      icon: TrendingUp,
      title: "3. Generate Insights",
      description: "Create interpretable heatmaps and confidence scores for diagnosis.",
      color: "primary"
    },
    {
      icon: FileText,
      title: "4. Deliver Results",
      description: "Receive detailed reports with actionable medical insights.",
      color: "accent"
    }
  ];

  return (
    <section className="bg-card rounded-2xl shadow-lg border border-border p-8 mb-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-foreground mb-4">How MediScan AI Works</h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our advanced AI pipeline processes medical images through multiple stages to deliver accurate, interpretable results.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div key={index} className="text-center" data-testid={`step-${index + 1}`}>
              <div className={`w-16 h-16 ${step.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <IconComponent className={`text-2xl ${step.color === 'primary' ? 'text-primary' : 'text-accent'} w-8 h-8`} />
              </div>
              <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          );
        })}
      </div>

      {/* API Contract Example */}
      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Code className="text-primary w-5 h-5" />
            API Response Format
          </h4>
          <pre className="text-sm text-muted-foreground bg-card rounded p-4 overflow-x-auto border border-border">
            <code data-testid="api-response-example">
{`{
  "prediction": "Pneumonia",
  "confidence": 0.873,
  "severity": "high",
  "heatmap_base64": "data:image/png;base64,...",
  "recommendations": [
    "Immediate medical attention required",
    "Consider antibiotic treatment"
  ]
}`}
            </code>
          </pre>
        </CardContent>
      </Card>
    </section>
  );
}
