import { HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
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
    question: "Can MediScan AI detect all medical conditions visible on a scan?",
    answer: "MediScan AI is trained to detect specific conditions and abnormalities, but it cannot detect every possible medical condition. The system is most effective for common pathologies it has been trained on. Always consult with a qualified medical professional for comprehensive diagnosis."
  },
  {
    question: "How long does it take to get results from MediScan AI?",
    answer: "MediScan AI typically processes medical scans within 2-5 seconds, providing rapid preliminary analysis. The exact time may vary depending on image size and complexity, but results are generally available almost instantly after upload."
  },
  {
    question: "Can I use MediScan AI for veterinary medical scans?",
    answer: "Currently, MediScan AI is specifically trained and optimized for human medical imaging. While the underlying technology might work with veterinary scans, we cannot guarantee accuracy for animal imaging and recommend using specialized veterinary diagnostic tools."
  }
];

export default function FAQSection() {
  return (
    <section id="faq" className="mb-8">
      <Card className="shadow-lg border border-border">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <HelpCircle className="text-primary w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h3>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-item-${index}`}>
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-medium text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
}
