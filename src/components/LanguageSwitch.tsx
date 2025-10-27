import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from '@/lib/icons';
import { languages } from '@/lib/language-routes';

export const LanguageSwitch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract current language from path
  const currentLangCode = location.pathname.match(/^\/(pl|uk|ru|en)/)?.[1] || 'pl';
  const currentLanguage = languages[currentLangCode];

  const changeLanguage = (langCode: string) => {
    // Map of article slugs by language code
    const slugsByLang = {
      'czy-przekluwanie-uszu-boli': {
        pl: 'czy-przekluwanie-uszu-boli',
        en: 'does-ear-piercing-hurt',
        uk: 'chy-bolyt-prokol-vukh',
        ru: 'bolit-li-prokalyvanie-ushey'
      },
      'does-ear-piercing-hurt': {
        pl: 'czy-przekluwanie-uszu-boli',
        en: 'does-ear-piercing-hurt',
        uk: 'chy-bolyt-prokol-vukh',
        ru: 'bolit-li-prokalyvanie-ushey'
      },
      'chy-bolyt-prokol-vukh': {
        pl: 'czy-przekluwanie-uszu-boli',
        en: 'does-ear-piercing-hurt',
        uk: 'chy-bolyt-prokol-vukh',
        ru: 'bolit-li-prokalyvanie-ushey'
      },
      'bolit-li-prokalyvanie-ushey': {
        pl: 'czy-przekluwanie-uszu-boli',
        en: 'does-ear-piercing-hurt',
        uk: 'chy-bolyt-prokol-vukh',
        ru: 'bolit-li-prokalyvanie-ushey'
      }
    };

    // Extract the path after the language code
    const pathWithoutLang = location.pathname.replace(/^\/(pl|uk|ru|en)/, '') || '/';
    
    // Check if this is a blog article page
    if (pathWithoutLang.startsWith('/blog/')) {
      const currentSlug = pathWithoutLang.replace('/blog/', '');
      
      // Find the slug mapping for the current slug
      const slugMap = slugsByLang[currentSlug as keyof typeof slugsByLang];
      
      if (slugMap && slugMap[langCode as keyof typeof slugMap]) {
        const newSlug = slugMap[langCode as keyof typeof slugMap];
        // Navigate to new language with corresponding slug
        navigate(`/${langCode}/blog/${newSlug}`, { replace: true });
        return;
      }
    }
    
    // For other pages, just change the language in the URL
    navigate(`/${langCode}${pathWithoutLang}`, { replace: true });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <span className="text-lg">{currentLanguage.flag}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.values(languages).map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className="cursor-pointer"
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
