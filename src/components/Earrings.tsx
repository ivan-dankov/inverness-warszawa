import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllEarrings, type Earring } from "@/lib/earrings";
import { useTranslation } from "react-i18next";
import { getLanguageFromPath } from "@/lib/language-routes";

export const Earrings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentLang = getLanguageFromPath(location.pathname);
  const [earrings, setEarrings] = useState<Earring[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllEarrings().then(data => {
      setEarrings(data);
      setLoading(false);
    });
  }, []);
  const displayedEarrings = earrings.slice(0, 7);
  if (loading) {
    return <section id="earrings" className="py-12 sm:py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              {t('earrings.title')} <span className="text-primary">{t('earrings.inverness')}</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('earrings.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {Array.from({
            length: 8
          }).map((_, i) => <div key={i} className="aspect-square rounded-lg bg-muted animate-pulse" />)}
          </div>
        </div>
      </section>;
  }
  return <section id="earrings" className="py-12 sm:py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            {t('earrings.title')} <span className="text-primary">{t('earrings.inverness')}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('earrings.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {displayedEarrings.map((earring, index) => <div key={index} onClick={() => navigate(`/${currentLang}/earrings/${index}`)} className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group">
              <img src={earring.images[0]} alt={earring.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" decoding="async" width="400" height="400" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">{earring.name}</p>
              </div>
            </div>)}

          {/* See All Tile */}
          <div onClick={() => navigate(`/${currentLang}/earrings`)} className="relative aspect-square overflow-hidden rounded-lg shadow-soft hover:shadow-card transition-all duration-300 group cursor-pointer bg-muted/50 flex items-center justify-center hover:bg-primary/10">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground group-hover:scale-105 transition-transform duration-300">
                {t('earrings.seeAll')}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('earrings.productCount', {
                count: earrings.length
              })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};