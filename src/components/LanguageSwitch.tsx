import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { languages } from '@/lib/language-routes';

export const LanguageSwitch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract current language from path
  const currentLangCode = location.pathname.match(/^\/(pl|uk|ru|en)/)?.[1] || 'pl';
  const currentLanguage = languages[currentLangCode];

  const changeLanguage = (langCode: string) => {
    // Extract the path after the current language code
    // e.g., "/pl/earrings/5" -> "/earrings/5"
    // Handle both actual language codes and :lang placeholder
    const pathWithoutLang = location.pathname.replace(/^\/(pl|uk|ru|en|:lang)/, '');
    
    // Navigate to the same path with new language
    navigate(`/${langCode}${pathWithoutLang}`);
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
