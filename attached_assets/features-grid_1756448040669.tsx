import { Brain, Zap, Gauge, Shield, Download, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced deep learning models trained on extensive medical datasets for accurate anomaly detection.",
    color: "primary"
  },
  {
    icon: Zap,
    title: "Heatmap Visualization",
    description: "Interpretable visual overlays highlighting areas of concern for enhanced clinical decision-making.",
    color: "accent"
  },
  {
    icon: Gauge,
    title: "Real-time Processing",
    description: "Fast inference times enable immediate results without disrupting clinical workflows.",
    color: "primary"
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Secure data handling and processing ensure patient privacy and regulatory compliance.",
    color: "accent"
  },
  {
    icon: Download,
    title: "Detailed Reports",
    description: "Comprehensive JSON reports with confidence scores and clinical recommendations.",
    color: "primary"
  },
  {
    icon: Smartphone,
    title: "Cross-Platform",
    description: "Responsive design works seamlessly on desktop, tablet, and mobile devices.",
    color: "accent"
  }
];

export default function FeaturesGrid() {
  return (
    <section className="bg-card rounded-2xl shadow-lg border border-border p-8 mb-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-foreground mb-4">Key Features</h3>
        <p className="text-lg text-muted-foreground">
          Comprehensive tools designed for modern healthcare professionals
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <Card key={index} className="bg-muted/30 card-hover" data-testid={`feature-${index}`}>
              <CardContent className="p-6">
                <div className={`w-12 h-12 ${feature.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'} rounded-lg flex items-center justify-center mb-4`}>
                  <IconComponent className={`${feature.color === 'primary' ? 'text-primary' : 'text-accent'} w-6 h-6`} />
                </div>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
