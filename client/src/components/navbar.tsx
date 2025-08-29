import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Microscope } from "lucide-react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['upload', 'about', 'features', 'faq'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavClass = (section: string) => {
    const baseClass = "px-4 py-2 rounded-full transition-all duration-200 font-medium";
    return activeSection === section 
      ? `${baseClass} bg-primary text-primary-foreground shadow-sm` 
      : `${baseClass} text-muted-foreground hover:text-primary hover:bg-primary/10`;
  };

  return (
    <header className="bg-card shadow-sm sticky top-0 z-50 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3" data-testid="logo">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg">
            <Microscope className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">MediScan AI</h1>
            <p className="text-sm text-muted-foreground">AI-assisted medical image diagnosis</p>
          </div>
        </div>
        
        <nav className="hidden md:flex gap-2 text-sm">
          <button 
            onClick={() => scrollToSection('upload')} 
            className={getNavClass('upload')}
            data-testid="nav-diagnose"
          >
            Diagnose
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className={getNavClass('about')}
            data-testid="nav-about"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('features')} 
            className={getNavClass('features')}
            data-testid="nav-features"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('faq')} 
            className={getNavClass('faq')}
            data-testid="nav-faq"
          >
            FAQ
          </button>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" data-testid="mobile-menu-trigger">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-3 mt-8">
              <button 
                onClick={() => scrollToSection('upload')} 
                className={getNavClass('upload')}
                data-testid="mobile-nav-diagnose"
              >
                Diagnose
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className={getNavClass('about')}
                data-testid="mobile-nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('features')} 
                className={getNavClass('features')}
                data-testid="mobile-nav-features"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className={getNavClass('faq')}
                data-testid="mobile-nav-faq"
              >
                FAQ
              </button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
