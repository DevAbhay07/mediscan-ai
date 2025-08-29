import { Button } from "@/components/ui/button";
import { Upload, Play, Sparkles } from "lucide-react";

export default function HeroSection() {
  const scrollToUpload = () => {
    const element = document.getElementById('upload');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8 card-hover">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered Analysis
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            AI-powered medical imaging assistant
          </h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Upload medical scans (X-ray, CT, MRI) and get instant anomaly predictions with interpretable heatmaps and confidence scores to accelerate clinical triage and diagnosis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={scrollToUpload} 
              className="btn-primary inline-flex items-center gap-2"
              data-testid="start-analysis-button"
            >
              <Upload className="w-4 h-4" />
              Start Analysis
            </Button>
            <Button 
              variant="secondary" 
              className="btn-secondary inline-flex items-center gap-2"
              data-testid="watch-demo-button"
            >
              <Play className="w-4 h-4" />
              Watch Demo
            </Button>
          </div>
        </div>
        <div className="order-first lg:order-last">
          <div className="relative">
            <img 
              src="https://www.bgosoftware.com/blog/wp-content/uploads/2024/02/bgo-software-blog-post-size-Role-of-AI-no-title-720x476.png" 
              alt="AI brain processing medical data" 
              className="w-full h-80 object-cover rounded-2xl shadow-xl" 
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-card/90 backdrop-blur rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">AI Analysis Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
