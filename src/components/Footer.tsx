import { Instagram, Phone } from "@/lib/icons";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { getLanguageFromPath } from "@/lib/language-routes";
import logoWide from "@/assets/logo-wide.svg";

export const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentLang = getLanguageFromPath(location.pathname);
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <img src={logoWide} alt="Inverness MED" className="h-8 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground">
              {t('footer.company.description')}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">{t('footer.contact.title')}</h3>
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
            <h3 className="font-semibold text-foreground mb-4">{t('footer.links.title')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to={`/${currentLang}/aftercare`} className="hover:text-primary transition-colors">
                  {t('footer.links.aftercare')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/earrings`} className="hover:text-primary transition-colors">
                  {t('footer.links.earrings')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/blog`} className="hover:text-primary transition-colors">
                  {t('footer.links.blog')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">{t('footer.certificates.title')}</h3>
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
          <div className="flex justify-center mb-4">
            <LanguageSwitch />
          </div>
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
};
