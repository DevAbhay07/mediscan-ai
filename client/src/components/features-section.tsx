import { Brain, Thermometer, Gauge, Shield, Download, Smartphone } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced deep learning models trained on extensive medical datasets for accurate anomaly detection.",
      bgColor: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      icon: Thermometer,
      title: "Heatmap Visualization",
      description: "Interpretable visual overlays highlighting areas of concern for enhanced clinical decision-making.",
      bgColor: "bg-accent/10",
      iconColor: "text-accent"
    },
    {
      icon: Gauge,
      title: "Real-time Processing",
      description: "Fast inference times enable immediate results without disrupting clinical workflows.",
      bgColor: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Secure data handling and processing ensure patient privacy and regulatory compliance.",
      bgColor: "bg-accent/10",
      iconColor: "text-accent"
    },
    {
      icon: Download,
      title: "Detailed Reports",
      description: "Comprehensive JSON reports with confidence scores and clinical recommendations.",
      bgColor: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      icon: Smartphone,
      title: "Cross-Platform",
      description: "Responsive design works seamlessly on desktop, tablet, and mobile devices.",
      bgColor: "bg-accent/10",
      iconColor: "text-accent"
    }
  ];

  return (
    <section id="features" className="bg-card rounded-2xl shadow-lg border border-border p-8 mb-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-foreground mb-4">Key Features</h3>
        <p className="text-lg text-muted-foreground">
          Comprehensive tools designed for modern healthcare professionals
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-muted/30 rounded-lg p-6 card-hover" data-testid={`feature-${index}`}>
            <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
              <feature.icon className={`${feature.iconColor} text-xl`} />
            </div>
            <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
