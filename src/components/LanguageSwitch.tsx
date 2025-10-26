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
    // Map of article slugs for different languages
    const languageSlugs = {
      'does-ear-piercing-hurt': {
        pl: 'przekluwanie-uszu-czy-boli',
        uk: 'прокол-вух-це-боляче',
        ru: 'прокол-ушей-больно-ли',
        en: 'does-ear-piercing-hurt'
      }
    };

    // Map slugs to article IDs
    const articleSlugs = {
      'przekluwanie-uszu-czy-boli': 'does-ear-piercing-hurt',
      'прокол-вух-це-боляче': 'does-ear-piercing-hurt',
      'прокол-ушей-больно-ли': 'does-ear-piercing-hurt',
      'does-ear-piercing-hurt': 'does-ear-piercing-hurt'
    };

    // Extract the path after the current language code
    const pathWithoutLang = location.pathname.replace(/^\/(pl|uk|ru|en|:lang)/, '');
    
    // Check if this is a blog article page
    if (pathWithoutLang.startsWith('/blog/')) {
      const currentSlug = pathWithoutLang.replace('/blog/', '');
      const articleId = articleSlugs[currentSlug as keyof typeof articleSlugs];
      
      // If this is a known article, update the slug to match the new language
      if (articleId && languageSlugs[articleId as keyof typeof languageSlugs]) {
        const newSlug = languageSlugs[articleId as keyof typeof languageSlugs][langCode as keyof typeof languageSlugs[keyof typeof languageSlugs]];
        // Use navigate with replace to avoid history issues
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
