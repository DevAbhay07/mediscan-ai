import { Info, CheckCircle } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      title: "Advanced AI Models",
      description: "CNN-based architectures trained on diverse medical datasets"
    },
    {
      title: "Interpretable Results",
      description: "Visual heatmaps highlight areas of concern for clinical review"
    },
    {
      title: "Fast Processing",
      description: "Real-time analysis to accelerate clinical workflows"
    }
  ];

  return (
    <section id="about" className="mb-8">
      <div className="bg-card shadow-lg border border-border rounded-lg p-8 card-hover">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Info className="text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">About the Project</h3>
        </div>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          MediScan AI leverages state-of-the-art Convolutional Neural Network (CNN) architectures to analyze medical imaging data. Our system provides interpretable heatmaps and probability scores to assist radiologists in making faster, more accurate diagnoses.
        </p>
        
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3" data-testid={`about-feature-${index}`}>
              <CheckCircle className="text-green-500 mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
