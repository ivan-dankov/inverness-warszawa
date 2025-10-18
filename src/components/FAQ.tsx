import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

export const FAQ = () => {
  const faqs = [
    {
      question: "Czy przekłuwanie uszu boli?",
      answer: "System Inverness MED jest wyjątkowo delikatny i znacznie mniej bolesny niż tradycyjny pistolet. Kolczyk delikatnie rozsuwa tkankę zamiast ją przebijać, co sprawia, że dyskomfort jest minimalny. Większość naszych klientów zgadza się, że procedura jest praktycznie bezbolesna."
    },
    {
      question: "Od jakiego wieku można przekłuwać uszy dzieciom?",
      answer: "System Inverness MED jest zatwierdzony przez lekarzy do przekłuwania uszu u dzieci od 0+. Jest to jedyny system w Europie z taką certyfikacją. Cichy, precyzyjny mechanizm nie przestrasza najmłodszych, a 100% sterylność gwarantuje bezpieczeństwo."
    },
    {
      question: "Jak długo trwa gojenie po przekłuciu?",
      answer: "W przypadku płatka ucha gojenie trwa około 6-8 tygodni. Dla przekłucia chrząstki (helix, tragus, conch) proces gojenia może potrwać 3-6 miesięcy. System Inverness MED przyspiesza gojenie dzięki precyzyjnemu, atraumatycznemu przekłuciu."
    },
    {
      question: "Czy system Inverness MED jest bezpieczny?",
      answer: "Tak! System Inverness MED posiada międzynarodowe certyfikaty FDA oraz ISO, potwierdzające najwyższe standardy jakości i bezpieczeństwa. Używamy jednorazowych, zamkniętych kaset sterylnych, co gwarantuje 100% sterylność."
    },
    {
      question: "Jakie kolczyki są dostępne?",
      answer: "W naszej ofercie znajduje się ponad 30 modeli kolczyków wykonanych z tytanu, niobu lub stali medycznej. Wszystkie są hipoalergiczne i posiadają certyfikat REACH. Mamy kolczyki zarówno dla dzieci, jak i dorosłych w różnych stylach i kolorach."
    },
    {
      question: "Jak przygotować się do wizyty?",
      answer: "Nie wymaga się specjalnego przygotowania. Zalecamy przyjście z czystymi uszami i włosami związanymi lub z możliwością ich związania. Dla dzieci warto wyjaśnić wcześniej, jak będzie wyglądać procedura, aby czuły się spokojnie."
    },
    {
      question: "Ile kosztuje przekłuwanie uszu?",
      answer: "Cena zabiegu zaczyna się od 130 zł za przekłucie dwóch płatków uszu. Do ceny należy doliczyć koszt kolczyków — od 90 do 150 zł za parę. Oferujemy również usługę mobilną z dojazdem do domu (+50 zł). Aktualny cennik znajdziesz w sekcji 'Nasze usługi'."
    },
    {
      question: "Czy mogę przekłuć chrząstkę (helix, tragus)?",
      answer: "Tak! Specjalizujemy się w przekłuwaniu chrząstki ucha, w tym helix, tragus i conch. System Inverness MED jest szczególnie odpowiedni do tego typu przekłuć, ponieważ jest precyzyjny i nie rozrywa tkanek jak typowy pistolet."
    },
    {
      question: "Jak dbać o przekłute uszy?",
      answer: "Po przekłuciu otrzymasz szczegółowe instrukcje pielęgnacji. Podstawowe zasady to: mycie rąk przed dotknięciem kolczyków, delikatne oczyszczanie 2 razy dziennie specjalnym płynem, unikanie basenów i zbiorników wodnych przez pierwsze 2 tygodnie, oraz regularne obracanie kolczykiem.",
      link: true
    }
  ];

  return (
    <section id="faq" className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Najczęściej Zadawane Pytania
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Znajdź odpowiedzi na pytania dotyczące przekłuwania uszu systemem Inverness MED
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base sm:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                  {faq.answer}
                  {faq.link && (
                    <>
                      {" "}
                      <Link to="/aftercare" className="text-primary hover:underline font-medium">
                        Zobacz pełne zalecenia pielęgnacyjne →
                      </Link>
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
