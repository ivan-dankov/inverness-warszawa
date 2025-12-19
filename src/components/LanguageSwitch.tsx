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
      },
      'inverness-vs-pistolet': {
        pl: 'inverness-vs-pistolet',
        en: 'inverness-vs-gun',
        uk: 'inverness-vs-pistolet',
        ru: 'inverness-vs-pistolet'
      },
      'inverness-vs-gun': {
        pl: 'inverness-vs-pistolet',
        en: 'inverness-vs-gun',
        uk: 'inverness-vs-pistolet',
        ru: 'inverness-vs-pistolet'
      },
      'od-jakiego-wieku-przekluwac-uszy-dziecku': {
        pl: 'od-jakiego-wieku-przekluwac-uszy-dziecku',
        en: 'at-what-age-to-pierce-child-ears',
        uk: 'z-yakoho-viku-prokoluvaty-vukha-dytyni',
        ru: 's-kakogo-vozrasta-prokalyvat-ushi-rebenku'
      },
      'at-what-age-to-pierce-child-ears': {
        pl: 'od-jakiego-wieku-przekluwac-uszy-dziecku',
        en: 'at-what-age-to-pierce-child-ears',
        uk: 'z-yakoho-viku-prokoluvaty-vukha-dytyni',
        ru: 's-kakogo-vozrasta-prokalyvat-ushi-rebenku'
      },
      'z-yakoho-viku-prokoluvaty-vukha-dytyni': {
        pl: 'od-jakiego-wieku-przekluwac-uszy-dziecku',
        en: 'at-what-age-to-pierce-child-ears',
        uk: 'z-yakoho-viku-prokoluvaty-vukha-dytyni',
        ru: 's-kakogo-vozrasta-prokalyvat-ushi-rebenku'
      },
      's-kakogo-vozrasta-prokalyvat-ushi-rebenku': {
        pl: 'od-jakiego-wieku-przekluwac-uszy-dziecku',
        en: 'at-what-age-to-pierce-child-ears',
        uk: 'z-yakoho-viku-prokoluvaty-vukha-dytyni',
        ru: 's-kakogo-vozrasta-prokalyvat-ushi-rebenku'
      },
      'jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa': {
        pl: 'jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa',
        en: 'how-to-prepare-a-child-for-ear-piercing-warsaw',
        uk: 'yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava',
        ru: 'kak-podgotovit-rebenka-k-prokolu-ushey-varshava'
      },
      'how-to-prepare-a-child-for-ear-piercing-warsaw': {
        pl: 'jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa',
        en: 'how-to-prepare-a-child-for-ear-piercing-warsaw',
        uk: 'yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava',
        ru: 'kak-podgotovit-rebenka-k-prokolu-ushey-varshava'
      },
      'yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava': {
        pl: 'jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa',
        en: 'how-to-prepare-a-child-for-ear-piercing-warsaw',
        uk: 'yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava',
        ru: 'kak-podgotovit-rebenka-k-prokolu-ushey-varshava'
      },
      'kak-podgotovit-rebenka-k-prokolu-ushey-varshava': {
        pl: 'jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa',
        en: 'how-to-prepare-a-child-for-ear-piercing-warsaw',
        uk: 'yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava',
        ru: 'kak-podgotovit-rebenka-k-prokolu-ushey-varshava'
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
