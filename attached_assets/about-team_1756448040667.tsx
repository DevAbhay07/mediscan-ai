import { Info, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutTeam() {
  return (
    <section id="about" className="mb-8">
      {/* About Project */}
      <Card className="shadow-lg border border-border card-hover">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Info className="text-accent w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">About the Project</h3>
          </div>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            MediScan AI leverages state-of-the-art Convolutional Neural Network (CNN) architectures to analyze medical imaging data. Our system provides interpretable heatmaps and probability scores to assist radiologists in making faster, more accurate diagnoses.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3" data-testid="feature-advanced-ai">
              <CheckCircle className="text-green-500 w-5 h-5 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">Advanced AI Models</h4>
                <p className="text-sm text-muted-foreground">CNN-based architectures trained on diverse medical datasets</p>
              </div>
            </div>
            <div className="flex items-start gap-3" data-testid="feature-interpretable">
              <CheckCircle className="text-green-500 w-5 h-5 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">Interpretable Results</h4>
                <p className="text-sm text-muted-foreground">Visual heatmaps highlight areas of concern for clinical review</p>
              </div>
            </div>
            <div className="flex items-start gap-3" data-testid="feature-fast-processing">
              <CheckCircle className="text-green-500 w-5 h-5 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">Fast Processing</h4>
                <p className="text-sm text-muted-foreground">Real-time analysis to accelerate clinical workflows</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
