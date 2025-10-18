import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyBookingCTA } from "@/components/StickyBookingCTA";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect } from "react";

export default function Aftercare() {
  useEffect(() => {
    document.title = "Pielęgnacja po przekłuciu uszu - Inverness MED Warszawa";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              💎 Pielęgnacja po przekłuciu uszu
            </h1>
            <p className="text-lg text-muted-foreground">
              Kompletne instrukcje pielęgnacji po zabiegu systemem Inverness MED
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  🧼 Higiena i czystość
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li>Zawsze utrzymuj miejsce przekłucia czyste, suche i z dostępem powietrza.</li>
                  <li>Nie dotykaj uszu brudnymi rękami. Przed każdorazowym dotknięciem ucha lub kolczyków dokładnie umyj ręce.</li>
                  <li>Nie obracaj ani nie poruszaj kolczykami bez potrzeby.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  🌙 Sen i codzienna pielęgnacja
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li>Zmień pościel lub przynajmniej poszewkę poduszki na czystą.</li>
                  <li>Śpij na wznak, aby uniknąć ucisku.</li>
                  <li>Tkliwość lub lekki obrzęk to normalny objaw gojenia.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  💧 Dezynfekcja
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li><strong>3× dziennie</strong> oczyść miejsce przekłucia z przodu i z tyłu za pomocą <strong>EAR CARE SOLUTION</strong> lub innego środka odkażającego.</li>
                  <li>Używaj czystych rąk i nowego wacika dla każdego ucha.</li>
                  <li>Po przemyciu delikatnie obróć kolczyk w lewo i w prawo o 180°.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  💄 Kosmetyki i stylizacja
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li>W okresie gojenia unikaj: lakieru do włosów, perfum, farb, podkładów, pudrów i innych kosmetyków w okolicy przekłucia.</li>
                  <li>Po umyciu włosów dokładnie osusz ucho jednorazową chusteczką i zdezynfekuj miejsce przekłucia.</li>
                  <li>Zachowaj ostrożność przy czesaniu włosów, zakładaniu czapki i szalika.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  🚫 Czego unikać
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li>Unikaj basenu, sauny i solarium.</li>
                  <li>Dzieci powinny unikać piaskownicy i sal zabaw.</li>
                  <li>Korzystaj z prysznica zamiast wanny.</li>
                  <li>Ogranicz spożycie alkoholu, kawy, czarnej herbaty i coli, ponieważ mogą zwiększać obrzęk.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  💎 Zmiana kolczyków
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Nie wyjmuj kolczyków przed upływem:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>6 tygodni</strong> – przy przekłuciu płatka ucha,</li>
                    <li><strong>12 tygodni</strong> – przy przekłuciu chrząstki lub nosa.</li>
                  </ul>
                  <p className="mt-4">Po tym czasie możesz je bezpiecznie wymienić.</p>
                  <p>Aby zdjąć kolczyki Inverness, mocno przytrzymaj końcówkę Safety Back, a drugą ręką przekręć i pociągnij przód kolczyka.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  💖 Dalsza pielęgnacja po zagojeniu
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li>Pełne gojenie trwa ok. roku.</li>
                  <li>Po zdjęciu kolczyków Inverness wybieraj lekkie, hipoalergiczne kolczyki, np. z linii BIOJOUX (bez niklu), aby uniknąć alergii.</li>
                </ul>
              </CardContent>
            </Card>

            <Alert className="border-destructive/50 text-destructive">
              <AlertDescription>
                <h2 className="text-xl font-semibold mb-2">⚕️ W razie problemów</h2>
                <p>Jeśli pojawi się infekcja lub silny stan zapalny, <strong>nie wyjmuj kolczyków</strong> — skontaktuj się z lekarzem.</p>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </main>
      <Footer />
      <StickyBookingCTA />
    </>
  );
}
