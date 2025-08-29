import { Microscope, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center text-primary-foreground font-bold">
                <Microscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">MediScan AI</h3>
                <p className="text-sm text-muted-foreground">AI-assisted medical diagnosis</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Advancing healthcare through artificial intelligence and machine learning to assist medical professionals in faster, more accurate diagnoses.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="github-link">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="linkedin-link">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="twitter-link">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="features-link">Features</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="documentation-link">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="api-reference-link">API Reference</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="pricing-link">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="help-center-link">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="contact-link">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="privacy-link">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="terms-link">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2024 MediScan AI. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">Developed by Team iNFRA</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
