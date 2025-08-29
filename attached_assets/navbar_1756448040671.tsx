import { Link } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import logoImage from "@assets/image_1756445001581.png";

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
      const sections = ['upload', 'about', 'faq'];
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
    handleScroll(); // Check initial position
    
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
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity" data-testid="logo-link">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg bg-white/10">
            <img src={logoImage} alt="MediScan AI Logo" className="w-8 h-8 object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">MediScan AI</h1>
            <p className="text-sm text-muted-foreground">AI-assisted medical image diagnosis</p>
          </div>
        </Link>
        
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
