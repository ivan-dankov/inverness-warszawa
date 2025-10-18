import { Instagram, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">IM</span>
              </div>
              <div>
                <div className="font-bold text-foreground">Inverness MED</div>
                <div className="text-xs text-muted-foreground">Warszawa</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Medyczne przekłuwanie uszu z wykorzystaniem certyfikowanego systemu Inverness MED.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Kontakt</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Gizów 6/208, 01-249 Warszawa</p>
              <p>
                <a href="tel:+48573818260" className="hover:text-primary transition-colors">
                  +48 573 818 260
                </a>
              </p>
              <div className="flex gap-4 mt-4">
                <a 
                  href="tel:+48573818260" 
                  className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  aria-label="Telefon"
                >
                  <Phone className="h-5 w-5 text-primary" />
                </a>
                <a 
                  href="https://instagram.com/prokol_ushej_warszawa" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-primary" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Przydatne linki</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/aftercare" className="hover:text-primary transition-colors">
                  Pielęgnacja po zabiegu
                </Link>
              </li>
              <li>
                <Link to="/earrings" className="hover:text-primary transition-colors">
                  Kolczyki
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Certyfikaty</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>FDA Approved</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>ISO Certified</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Medical Grade Equipment</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Inverness MED. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
};
