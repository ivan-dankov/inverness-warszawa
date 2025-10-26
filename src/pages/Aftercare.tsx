import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { MultilingualSEO } from "@/components/MultilingualSEO";
import { getPageSEO, isSupportedLanguage } from "@/lib/language-routes";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

export default function Aftercare() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  
  // Validate language parameter
  if (!isSupportedLanguage(lang)) {
    return <Navigate to="/pl/aftercare" replace />;
  }
  
  const currentLang = lang || 'pl';
  const pageSEO = getPageSEO(currentLang);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [i18n.language]);

  return (
    <>
      <MultilingualSEO 
        currentLang={currentLang}
        pagePath="/aftercare"
        customTitle={pageSEO.aftercare.title}
        customDescription={pageSEO.aftercare.description}
      />
      
      <BreadcrumbSchema items={[
        { name: t('aftercare.backButton'), url: `https://gentlepiercing.pl/${currentLang}` },
        { name: t('aftercare.title'), url: `https://gentlepiercing.pl/${currentLang}/aftercare` }
      ]} />
      
      <Header currentLang={currentLang} />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
          <nav className="mb-8">
            <Link 
              to={`/${currentLang}`}
              className="inline-flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('aftercare.backButton')}
            </Link>
          </nav>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t('aftercare.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('aftercare.subtitle')}
            </p>
          </div>

          <div className="space-y-6">
            {(t('aftercare.sections', { returnObjects: true }) as Array<{
              title: string;
              text?: string;
              points?: string[];
              afterText?: string;
              removal?: string;
            }> || []).map((section, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {section.title}
                  </h2>
                  {section.text && (
                    <p className="text-foreground mb-3">{section.text}</p>
                  )}
                  {section.points && section.points.length > 0 && (
                    <ul className="list-disc list-inside space-y-3 text-foreground ml-2">
                      {section.points.map((point, idx) => (
                        <li key={idx} dangerouslySetInnerHTML={{ __html: point }} />
                      ))}
                    </ul>
                  )}
                  {section.afterText && (
                    <p className="text-foreground mt-4">{section.afterText}</p>
                  )}
                  {section.removal && (
                    <p className="text-foreground mt-4">{section.removal}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
