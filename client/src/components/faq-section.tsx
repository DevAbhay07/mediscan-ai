import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What types of medical scans can MediScan AI analyze?",
      answer: "MediScan AI can analyze various types of medical scans, including chest X-rays, CT scans, and MRI images. It's designed to handle most common medical imaging types used in clinical practice, with specialized models trained for different anatomical regions and imaging modalities."
    },
    {
      question: "How accurate is MediScan AI compared to a radiologist's interpretation?",
      answer: "MediScan AI is designed to assist radiologists, not replace them. Our system achieves high accuracy rates comparable to expert radiologists for specific conditions, but it's intended as a diagnostic aid to help speed up analysis and highlight areas of concern for professional review."
    },
    {
      question: "Is my medical scan data kept confidential?",
      answer: "Yes, we take data privacy very seriously. All medical scans are processed securely and are not stored permanently on our servers. We comply with HIPAA regulations and use industry-standard encryption to protect your sensitive medical information."
    },
    {
      question: "How long does it take to get results from MediScan AI?",
      answer: "MediScan AI typically processes medical scans within 2-5 seconds, providing rapid preliminary analysis. The exact time may vary depending on image size and complexity, but results are generally available almost instantly after upload."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="faq" className="mb-8">
      <div className="bg-card shadow-lg border border-border rounded-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <HelpCircle className="text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h3>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg" data-testid={`faq-${index}`}>
              <Button
                variant="ghost"
                className="w-full text-left p-4 font-medium text-foreground hover:bg-muted/50 justify-between h-auto"
                onClick={() => toggleFaq(index)}
                data-testid={`faq-question-${index}`}
              >
                <span>{faq.question}</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                />
              </Button>
              {openFaq === index && (
                <div className="p-4 pt-0 text-muted-foreground leading-relaxed" data-testid={`faq-answer-${index}`}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
