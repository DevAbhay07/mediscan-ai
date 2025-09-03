import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Play, Sparkles } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8 card-hover">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <Badge variant="secondary" className="inline-flex items-center gap-2 bg-accent/10 text-accent mb-4" data-testid="ai-badge">
            <Sparkles className="w-4 h-4" />
            AI-Powered Analysis
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            AI-powered medical imaging assistant
          </h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Upload medical scans (X-ray, CT, MRI) and get instant anomaly predictions with interpretable heatmaps and confidence scores to accelerate clinical triage and diagnosis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => scrollToSection('upload')} 
              className="btn-primary px-6 py-3 font-medium inline-flex items-center gap-2"
              data-testid="start-analysis-button"
            >
              <Upload className="w-4 h-4" />
              Start Analysis
            </Button>
            <Button 
              variant="secondary"
              className="px-6 py-3 font-medium inline-flex items-center gap-2"
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
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Medical AI brain processing data visualization" 
              className="w-full h-80 object-cover rounded-2xl shadow-xl" 
              data-testid="hero-image"
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
