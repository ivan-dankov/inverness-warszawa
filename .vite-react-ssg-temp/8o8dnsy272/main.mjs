import { ViteReactSSG } from "vite-react-ssg";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate, useLocation, Link, useParams, Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import * as React from "react";
import { lazy, Suspense, useEffect } from "react";
import { useTranslation, initReactI18next } from "react-i18next";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Calendar, MapPin, ChevronRight, Check, Circle, ChevronDown, X, Phone, Instagram, Menu, Sparkles, Baby, Mail, ArrowRight, User, Clock } from "lucide-react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
const languages = {
  pl: {
    code: "pl",
    name: "Polski",
    flag: "🇵🇱",
    title: "Gentle Piercing Warszawa | Bezpieczne przekłuwanie uszu",
    description: "Medyczne przekłuwanie uszu w Warszawie systemem Inverness MED. Sterylne kolczyki tytan/niob. Dla dzieci 0+ i dorosłych, spokojny, bezbolesny zabieg.",
    path: "/pl"
  },
  uk: {
    code: "uk",
    name: "Українська",
    flag: "🇺🇦",
    title: "Gentle Piercing Варшава | Безпечний медичний прокол вух",
    description: "Медичний прокол вух у Варшаві системою Inverness MED. Стерильні титанові/ніобієві сережки. Для дітей 0+ та дорослих, спокійна безболісна процедура.",
    path: "/uk"
  },
  ru: {
    code: "ru",
    name: "Русский",
    flag: "⚪",
    title: "Gentle Piercing Варшава | Безопасный медпрокол ушей",
    description: "Медицинский прокол ушей в Варшаве системой Inverness MED. Стерильные титановые/ниобиевые серьги. Для детей 0+ и взрослых, спокойная безболезненная процедура.",
    path: "/ru"
  },
  en: {
    code: "en",
    name: "English",
    flag: "🇬🇧",
    title: "Gentle Piercing Warsaw | Safe medical ear piercing",
    description: "Medical ear piercing in Warsaw with the Inverness MED system. Sterile titanium/niobium earrings for children 0+ and adults. Gentle, low-pain service.",
    path: "/en"
  }
};
const isSupportedLanguage = (lang) => {
  return lang !== void 0 && (lang === "pl" || lang === "uk" || lang === "ru" || lang === "en");
};
const getLanguageConfig = (code) => {
  return languages[code] || languages.pl;
};
const getBooksyUrl = (lang, campaign = "main") => {
  return `https://booksy.com/pl-pl/dl/show-business/319418?utm_source=homepage&utm_medium=cta&utm_campaign=${lang}_${campaign}`;
};
const getLanguageFromPath = (pathname) => {
  const match = pathname.match(/^\/(pl|uk|ru|en)/);
  return match ? match[1] : "pl";
};
const getCanonicalUrl = (lang, path = "") => {
  return `https://gentlepiercing.pl/${lang}${path}`;
};
const getHrefLangUrls = (path = "") => {
  return {
    pl: `https://gentlepiercing.pl/pl${path}`,
    uk: `https://gentlepiercing.pl/uk${path}`,
    ru: `https://gentlepiercing.pl/ru${path}`,
    en: `https://gentlepiercing.pl/en${path}`,
    "x-default": `https://gentlepiercing.pl/pl${path}`
  };
};
const getPageSEO = (lang) => {
  const configs = {
    pl: {
      home: {
        title: "Gentle Piercing Warszawa | Bezpieczne przekłuwanie uszu",
        description: "Medyczne przekłuwanie uszu w Warszawie systemem Inverness MED. Sterylne kolczyki tytan/niob. Dla dzieci 0+ i dorosłych, spokojny, bezbolesny zabieg."
      },
      aftercare: {
        title: "Pielęgnacja po przekłuciu uszu | Inverness MED Warszawa",
        description: "Instrukcja pielęgnacji po przekłuciu uszu systemem Inverness MED: higiena, czyszczenie, czego unikać i kiedy bezpiecznie wymienić kolczyki."
      },
      blog: {
        title: "Blog Gentle Piercing | Poradniki przekłuwania uszu",
        description: "Artykuły o bezpiecznym przekłuwaniu uszu systemem Inverness MED, pielęgnacji po zabiegu i wyborze kolczyków w Warszawie."
      }
    },
    uk: {
      home: {
        title: "Gentle Piercing Варшава | Безпечний медичний прокол вух",
        description: "Медичний прокол вух у Варшаві системою Inverness MED. Стерильні титанові/ніобієві сережки. Для дітей 0+ та дорослих, спокійна безболісна процедура."
      },
      aftercare: {
        title: "Догляд після проколу вух | Inverness MED Варшава",
        description: "Покроковий догляд після проколу вух системою Inverness MED: гігієна, очищення, чого уникати і коли безпечно змінювати сережки."
      },
      blog: {
        title: "Блог Gentle Piercing | Поради проколу вух",
        description: "Статті про безпечний прокол вух системою Inverness MED, догляд після процедури та вибір гіпоалергенних сережок у Варшаві."
      }
    },
    ru: {
      home: {
        title: "Gentle Piercing Варшава | Безопасный медпрокол ушей",
        description: "Медицинский прокол ушей в Варшаве системой Inverness MED. Стерильные титановые/ниобиевые серьги. Для детей 0+ и взрослых, спокойная безболезненная процедура."
      },
      aftercare: {
        title: "Уход после прокола ушей | Inverness MED Варшава",
        description: "Руководство по уходу после прокола ушей системой Inverness MED: гигиена, очищение, что избегать и когда безопасно менять серьги."
      },
      blog: {
        title: "Блог Gentle Piercing | Советы по проколу ушей",
        description: "Статьи о безопасном проколе ушей системой Inverness MED, уходе после процедуры и выборе гипоаллергенных серег в Варшаве."
      }
    },
    en: {
      home: {
        title: "Gentle Piercing Warsaw | Safe medical ear piercing",
        description: "Medical ear piercing in Warsaw with the Inverness MED system. Sterile titanium/niobium earrings for children 0+ and adults. Gentle, low-pain service."
      },
      aftercare: {
        title: "Ear piercing aftercare | Inverness MED Warsaw",
        description: "Step-by-step aftercare for Inverness MED ear piercing: hygiene, cleaning, what to avoid, and when it is safe to change earrings."
      },
      blog: {
        title: "Gentle Piercing blog | Ear piercing guides Warsaw",
        description: "Tips on safe ear piercing with the Inverness MED system, aftercare best practices, and choosing hypoallergenic earrings in Warsaw."
      }
    }
  };
  return configs[lang] || configs.pl;
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-card",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:shadow-card font-semibold transition-shadow duration-300",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-soft hover:shadow-card"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const logoWide = "/assets/images/logo-wide-C14_jFdw.svg";
function initGoogleAnalytics() {
  if (typeof window !== "undefined" && window.gtag && window.dataLayer) {
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname.includes("localhost");
    const config = {
      // Restore GA4 defaults for full advertising capabilities
      allow_google_signals: true,
      // Enable cross-device tracking
      allow_ad_personalization_signals: true,
      // Enable remarketing & optimization
      anonymize_ip: false,
      // Full IP address
      cookie_flags: "SameSite=Lax;Secure",
      // Keep security
      cookie_domain: window.location.hostname,
      send_page_view: false
      // Disable auto page view - we track manually
    };
    if (isLocalhost) {
      config.debug_mode = true;
    }
    window.gtag("config", "G-5XNL50H7LN", config);
  }
}
function trackPageView(path) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: document.title
    });
  }
}
function trackBookingClick(location, language) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "booking_click", {
      button_location: location,
      booking_platform: "booksy",
      event_category: "conversion",
      event_label: `Booking from ${location}`,
      language: language || "unknown"
    });
  }
}
const hero1_400 = "/assets/images/hero-studio-CgkmceCn.webp";
const hero1_800 = "/assets/images/hero-studio-Dci1FPMy.webp";
const hero1_1200 = "/assets/images/hero-studio-Dci1FPMy.webp";
const hero2_400 = "/assets/images/hero-client-Bj2pPcUP.webp";
const hero2_800 = "/assets/images/hero-client-DBytHnOF.webp";
const hero2_1200 = "/assets/images/hero-client-DBytHnOF.webp";
const hero3_400 = "/assets/images/hero-3-D0HZVF1_.webp";
const hero3_800 = "/assets/images/hero-3-DzwU2dgO.webp";
const hero3_1200 = "/assets/images/hero-3-4cA6E7YW.webp";
const hero4_400 = "/assets/images/hero-4-CqDKtb0m.webp";
const hero4_800 = "/assets/images/hero-4-DijbMV2D.webp";
const hero4_1200 = "/assets/images/hero-4-DD9HdloZ.webp";
function Hero({ currentLang }) {
  const { t } = useTranslation();
  const booksyUrl = getBooksyUrl(currentLang, "main");
  const galleryImages = [{
    srcset: `${hero1_400} 400w, ${hero1_800} 800w, ${hero1_1200} 1200w`,
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
    src: hero1_800
  }, {
    srcset: `${hero2_400} 400w, ${hero2_800} 800w, ${hero2_1200} 1200w`,
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
    src: hero2_800
  }, {
    srcset: `${hero3_400} 400w, ${hero3_800} 800w, ${hero3_1200} 1200w`,
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
    src: hero3_800
  }, {
    srcset: `${hero4_400} 400w, ${hero4_800} 800w, ${hero4_1200} 1200w`,
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
    src: hero4_800
  }];
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-[80vh] sm:min-h-[90vh] flex items-center bg-gradient-to-br from-rose-50 via-rose-100 to-pink-50 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background-alt/95 to-background-alt/70 z-0" }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 sm:py-0", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8 lg:gap-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsx("img", { src: logoWide, alt: "Inverness Logo", className: "h-6 sm:h-8 lg:h-10 w-auto mb-6 sm:mb-8", width: "320", height: "64", loading: "eager", fetchPriority: "high" }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight", children: t("hero.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed", children: t("hero.subtitle") }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8", children: [
          /* @__PURE__ */ jsx(Button, { size: "lg", variant: "hero", asChild: true, className: "w-full sm:w-auto", onClick: () => trackBookingClick("hero", currentLang), children: /* @__PURE__ */ jsxs("a", { href: booksyUrl, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5" }),
            t("hero.buttons.book")
          ] }) }),
          /* @__PURE__ */ jsx(Button, { size: "lg", variant: "accent", asChild: true, className: "w-full sm:w-auto", children: /* @__PURE__ */ jsxs("a", { href: "#contact", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5" }),
            t("hero.buttons.contact")
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm sm:text-base text-muted-foreground space-y-1", children: [
          /* @__PURE__ */ jsx("p", { children: t("hero.locationNotice.studio") }),
          /* @__PURE__ */ jsx("p", { children: t("hero.locationNotice.mobile") })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden lg:grid grid-cols-2 gap-4 relative", children: galleryImages.map((image, index) => {
        const altTexts = ["Studio Inverness MED z profesjonalnym sprzętem do przekłuwania uszu", "Zadowolone dziecko z dyplomem Inverness MED po przekłuciu uszu", "Kolekcja medycznych kolczyków Inverness", "Eleganckie kolczyki medyczne po przekłuciu"];
        return /* @__PURE__ */ jsxs("div", { className: "relative aspect-square overflow-hidden rounded-lg shadow-card hover:shadow-elegant transition-all duration-300 group hover-scale", style: {
          animationDelay: `${index * 0.1}s`
        }, children: [
          /* @__PURE__ */ jsx("img", { srcSet: image.srcset, sizes: image.sizes, src: image.src, alt: altTexts[index], className: "w-full h-full object-cover", loading: index < 2 ? "eager" : "lazy", fetchPriority: index === 0 ? "high" : "auto", decoding: "async", width: "400", height: "400" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" })
        ] }, index);
      }) })
    ] }) })
  ] });
}
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props }));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const LanguageSwitch = () => {
  var _a;
  const navigate = useNavigate();
  const location = useLocation();
  const currentLangCode = ((_a = location.pathname.match(/^\/(pl|uk|ru|en)/)) == null ? void 0 : _a[1]) || "pl";
  const currentLanguage = languages[currentLangCode];
  const changeLanguage = (langCode) => {
    const slugsByLang = {
      "czy-przekluwanie-uszu-boli": {
        pl: "czy-przekluwanie-uszu-boli",
        en: "does-ear-piercing-hurt",
        uk: "chy-bolyt-prokol-vukh",
        ru: "bolit-li-prokalyvanie-ushey"
      },
      "does-ear-piercing-hurt": {
        pl: "czy-przekluwanie-uszu-boli",
        en: "does-ear-piercing-hurt",
        uk: "chy-bolyt-prokol-vukh",
        ru: "bolit-li-prokalyvanie-ushey"
      },
      "chy-bolyt-prokol-vukh": {
        pl: "czy-przekluwanie-uszu-boli",
        en: "does-ear-piercing-hurt",
        uk: "chy-bolyt-prokol-vukh",
        ru: "bolit-li-prokalyvanie-ushey"
      },
      "bolit-li-prokalyvanie-ushey": {
        pl: "czy-przekluwanie-uszu-boli",
        en: "does-ear-piercing-hurt",
        uk: "chy-bolyt-prokol-vukh",
        ru: "bolit-li-prokalyvanie-ushey"
      },
      "inverness-vs-pistolet": {
        pl: "inverness-vs-pistolet",
        en: "inverness-vs-gun",
        uk: "inverness-vs-pistolet",
        ru: "inverness-vs-pistolet"
      },
      "inverness-vs-gun": {
        pl: "inverness-vs-pistolet",
        en: "inverness-vs-gun",
        uk: "inverness-vs-pistolet",
        ru: "inverness-vs-pistolet"
      },
      "od-jakiego-wieku-przekluwac-uszy-dziecku": {
        pl: "od-jakiego-wieku-przekluwac-uszy-dziecku",
        en: "at-what-age-to-pierce-child-ears",
        uk: "z-yakoho-viku-prokoluvaty-vukha-dytyni",
        ru: "s-kakogo-vozrasta-prokalyvat-ushi-rebenku"
      },
      "at-what-age-to-pierce-child-ears": {
        pl: "od-jakiego-wieku-przekluwac-uszy-dziecku",
        en: "at-what-age-to-pierce-child-ears",
        uk: "z-yakoho-viku-prokoluvaty-vukha-dytyni",
        ru: "s-kakogo-vozrasta-prokalyvat-ushi-rebenku"
      },
      "z-yakoho-viku-prokoluvaty-vukha-dytyni": {
        pl: "od-jakiego-wieku-przekluwac-uszy-dziecku",
        en: "at-what-age-to-pierce-child-ears",
        uk: "z-yakoho-viku-prokoluvaty-vukha-dytyni",
        ru: "s-kakogo-vozrasta-prokalyvat-ushi-rebenku"
      },
      "s-kakogo-vozrasta-prokalyvat-ushi-rebenku": {
        pl: "od-jakiego-wieku-przekluwac-uszy-dziecku",
        en: "at-what-age-to-pierce-child-ears",
        uk: "z-yakoho-viku-prokoluvaty-vukha-dytyni",
        ru: "s-kakogo-vozrasta-prokalyvat-ushi-rebenku"
      }
    };
    const pathWithoutLang = location.pathname.replace(/^\/(pl|uk|ru|en)/, "") || "/";
    if (pathWithoutLang.startsWith("/blog/")) {
      const currentSlug = pathWithoutLang.replace("/blog/", "");
      const slugMap = slugsByLang[currentSlug];
      if (slugMap && slugMap[langCode]) {
        const newSlug = slugMap[langCode];
        navigate(`/${langCode}/blog/${newSlug}`, { replace: true });
        return;
      }
    }
    navigate(`/${langCode}${pathWithoutLang}`, { replace: true });
  };
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", className: "gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-lg", children: currentLanguage.flag }),
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
    ] }) }),
    /* @__PURE__ */ jsx(DropdownMenuContent, { align: "end", children: Object.values(languages).map((language) => /* @__PURE__ */ jsxs(
      DropdownMenuItem,
      {
        onClick: () => changeLanguage(language.code),
        className: "cursor-pointer",
        children: [
          /* @__PURE__ */ jsx("span", { className: "mr-2", children: language.flag }),
          language.name
        ]
      },
      language.code
    )) })
  ] });
};
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(
  ({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(SheetPrimitive.Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
      children,
      /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-secondary hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none", children: [
        /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
      ] })
    ] })
  ] })
);
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Title, { ref, className: cn("text-lg font-semibold text-foreground", className), ...props }));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Description, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
const logo = "/assets/images/logomark-7tY8S7_N.svg";
function Header({ currentLang }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const booksyUrl = getBooksyUrl(currentLang, "header");
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  const handleNavClick = (sectionId) => {
    const basePath = `/${currentLang}`;
    if (location.pathname === basePath) {
      scrollToSection(sectionId);
    } else {
      navigate(basePath);
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  };
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex h-16 items-center justify-between", children: [
    /* @__PURE__ */ jsx(Link, { to: `/${currentLang}`, className: "cursor-pointer", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: logo,
        alt: "Inverness MED",
        className: "h-12 w-auto",
        loading: "eager",
        fetchPriority: "high"
      }
    ) }),
    /* @__PURE__ */ jsxs("nav", { className: "hidden lg:flex items-center gap-8", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => handleNavClick("services"), className: `text-sm font-medium transition-colors ${location.pathname === "/" && location.hash === "#services" ? "text-primary" : "text-muted-foreground hover:text-primary"}`, children: t("header.nav.services") }),
      /* @__PURE__ */ jsx("button", { onClick: () => handleNavClick("gallery"), className: `text-sm font-medium transition-colors ${location.pathname === "/" && location.hash === "#gallery" ? "text-primary" : "text-muted-foreground hover:text-primary"}`, children: t("header.nav.gallery") }),
      /* @__PURE__ */ jsx("button", { onClick: () => handleNavClick("testimonials"), className: `text-sm font-medium transition-colors ${location.pathname === "/" && location.hash === "#testimonials" ? "text-primary" : "text-muted-foreground hover:text-primary"}`, children: t("header.nav.testimonials") }),
      /* @__PURE__ */ jsx("button", { onClick: () => handleNavClick("comparison"), className: `text-sm font-medium transition-colors ${location.pathname === `/${currentLang}` && location.hash === "#comparison" ? "text-primary" : "text-muted-foreground hover:text-primary"}`, children: t("header.nav.comparison") }),
      /* @__PURE__ */ jsx("button", { onClick: () => navigate(`/${currentLang}/aftercare`), className: `text-sm font-medium transition-colors ${location.pathname.includes("/aftercare") ? "text-primary" : "text-muted-foreground hover:text-primary"}`, children: t("header.nav.aftercare") }),
      /* @__PURE__ */ jsx("button", { onClick: () => navigate(`/${currentLang}/blog`), className: `text-sm font-medium transition-colors ${location.pathname.includes("/blog") ? "text-primary" : "text-muted-foreground hover:text-primary"}`, children: t("header.nav.blog") }),
      /* @__PURE__ */ jsx("button", { onClick: () => handleNavClick("contact"), className: `text-sm font-medium transition-colors ${location.pathname === "/" && location.hash === "#contact" ? "text-primary" : "text-muted-foreground hover:text-primary"}`, children: t("header.nav.contact") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(LanguageSwitch, {}),
        /* @__PURE__ */ jsx("a", { href: "tel:+48573818260", className: "text-muted-foreground hover:text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center", children: /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("a", { href: "https://instagram.com/prokol_ushej_warszawa", target: "_blank", rel: "noopener noreferrer", className: "text-muted-foreground hover:text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center", children: /* @__PURE__ */ jsx(Instagram, { className: "h-5 w-5" }) })
      ] }),
      /* @__PURE__ */ jsx(Button, { variant: "hero", asChild: true, className: "min-h-[44px]", onClick: () => trackBookingClick("header", currentLang), children: /* @__PURE__ */ jsxs("a", { href: booksyUrl, target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "ml-2", children: t("header.buttons.book") })
      ] }) }),
      /* @__PURE__ */ jsxs(Sheet, { children: [
        /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", className: "lg:hidden min-w-[44px] min-h-[44px]", children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" }) }) }),
        /* @__PURE__ */ jsxs(SheetContent, { side: "right", className: "w-[280px]", children: [
          /* @__PURE__ */ jsx(SheetHeader, { children: /* @__PURE__ */ jsx(SheetTitle, { children: /* @__PURE__ */ jsx(
            "img",
            {
              src: logo,
              alt: "Inverness MED",
              className: "h-12 w-auto",
              loading: "lazy"
            }
          ) }) }),
          /* @__PURE__ */ jsxs("nav", { className: "flex flex-col gap-4 mt-8", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => handleNavClick("services"), className: `text-left text-base font-medium transition-colors ${location.pathname === "/" && location.hash === "#services" ? "text-primary" : "text-muted-foreground hover:text-primary"}`, children: t("header.nav.services") }),
            /* @__PURE__ */ jsx("button", { onClick: () => handleNavClick("gallery"), className: `text-left text-base font-medium transition-colors ${location.pathname === "/" && location.hash === "#gallery" ? "text-primary" : "text-muted-foreground hover:text-primary"}`, children: t("header.nav.gallery") }),
            /* @__PURE__ */ jsx("button", { onClick: () => handleNavClick("testimonials"), className: `text-left text-base font-medium transition-colors ${location.pathname === "/" && location.hash === "#testimonials" ? "text-primary" : "text-muted-foreground hover:text-primary"}`, children: t("header.nav.testimonials") }),
            /* @__PURE__ */ jsx("button", { onClick: () => handleNavClick("comparison"), className: `text-left text-base font-medium transition-colors ${location.pathname === `/${currentLang}` && location.hash === "#comparison" ? "text-primary" : "text-muted-foreground hover:text-primary"}`, children: t("header.nav.comparison") }),
            /* @__PURE__ */ jsx("button", { onClick: () => navigate(`/${currentLang}/aftercare`), className: `text-left text-base font-medium transition-colors ${location.pathname.includes("/aftercare") ? "text-primary" : "text-muted-foreground hover:text-primary"}`, children: t("header.nav.aftercare") }),
            /* @__PURE__ */ jsx("button", { onClick: () => navigate(`/${currentLang}/blog`), className: `text-left text-base font-medium transition-colors ${location.pathname.includes("/blog") ? "text-primary" : "text-muted-foreground hover:text-primary"}`, children: t("header.nav.blog") }),
            /* @__PURE__ */ jsx("button", { onClick: () => handleNavClick("contact"), className: `text-left text-base font-medium transition-colors ${location.pathname === "/" && location.hash === "#contact" ? "text-primary" : "text-muted-foreground hover:text-primary"}`, children: t("header.nav.contact") }),
            /* @__PURE__ */ jsxs("div", { className: "border-t pt-4 mt-4 flex flex-col gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(LanguageSwitch, {}) }),
              /* @__PURE__ */ jsxs("a", { href: "tel:+48573818260", className: "flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors", children: [
                /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
                /* @__PURE__ */ jsx("span", { children: "+48 573 818 260" })
              ] }),
              /* @__PURE__ */ jsxs("a", { href: "https://instagram.com/prokol_ushej_warszawa", target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors", children: [
                /* @__PURE__ */ jsx(Instagram, { className: "h-5 w-5" }),
                /* @__PURE__ */ jsx("span", { children: "Instagram" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) }) });
}
const About = () => {
  const { t } = useTranslation();
  const benefits = t("about.benefits", { returnObjects: true });
  return /* @__PURE__ */ jsxs("section", { id: "about", className: "py-16 sm:py-20 lg:py-24 bg-background-alt relative overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 opacity-5", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-1/4 right-10 w-64 h-64 bg-primary rounded-full blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 sm:mb-16 animate-fade-in", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4", children: t("about.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl text-primary font-medium", children: t("about.subtitle") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto", children: benefits.map((benefit, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "group relative p-6 sm:p-8 bg-background rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 animate-fade-in",
          style: { animationDelay: `${index * 0.1}s` },
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-start gap-2", children: /* @__PURE__ */ jsx("span", { children: benefit.title }) }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed text-base sm:text-lg", children: benefit.description })
            ] })
          ]
        },
        index
      )) })
    ] })
  ] });
};
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("rounded-lg border bg-card text-card-foreground shadow-sm", className), ...props }));
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("h3", { ref, className: cn("text-2xl font-semibold leading-none tracking-tight", className), ...props })
);
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("p", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
function Services({ currentLang }) {
  const { t } = useTranslation();
  const booksyUrl = getBooksyUrl(currentLang, "services");
  const icons = [Sparkles, Baby, Calendar];
  const servicesData = t("services.cards", { returnObjects: true });
  return /* @__PURE__ */ jsx("section", { id: "services", className: "py-20 bg-background border-t border-border", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4", children: t("services.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: t("services.subtitle") })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12", children: servicesData.map((service, index) => {
      const Icon = icons[index];
      return /* @__PURE__ */ jsxs(Card, { className: "p-6 sm:p-8 hover:shadow-card transition-shadow duration-300 flex flex-col", children: [
        /* @__PURE__ */ jsx(Icon, { className: "h-12 w-12 text-primary mb-4" }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-foreground mb-2", children: service.title }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4 text-sm", children: service.description }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1 mb-4", children: /* @__PURE__ */ jsx("div", { className: "flex items-baseline gap-2", children: /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-primary", children: service.price }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground mb-6", children: [
          t("services.durationLabel"),
          " ",
          service.duration
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2 mb-6 flex-grow", children: service.features.map((feature, idx) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("span", { className: "text-primary mt-0.5", children: "✓" }),
          /* @__PURE__ */ jsx("span", { children: feature })
        ] }, idx)) }),
        /* @__PURE__ */ jsx(Button, { size: "lg", variant: "hero", className: "w-full mt-auto min-h-[48px]", asChild: true, onClick: () => trackBookingClick(`services_card_${index}`, currentLang), children: /* @__PURE__ */ jsxs("a", { href: booksyUrl, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5" }),
          t("services.bookButton")
        ] }) })
      ] }, index);
    }) }),
    /* @__PURE__ */ jsxs(Card, { className: "p-4 bg-muted/50 border-border/50", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-foreground mb-4 text-center", children: t("services.pricing.title") }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "ℹ" }),
          /* @__PURE__ */ jsx("span", { children: t("services.pricing.earringsInfo") })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "💎" }),
          /* @__PURE__ */ jsx("span", { children: t("services.pricing.earringsPrice") })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "🚗" }),
          /* @__PURE__ */ jsx("span", { children: t("services.pricing.mobileVisit") })
        ] })
      ] })
    ] })
  ] }) });
}
const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
  SeparatorPrimitive.Root,
  {
    ref,
    decorative,
    orientation,
    className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
    ...props
  }
));
Separator.displayName = SeparatorPrimitive.Root.displayName;
const FAQSchema = () => {
  const { t } = useTranslation();
  const faqs = t("faq.items", { returnObjects: true });
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
  return /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }) });
};
const shouldNoIndex = () => {
  if (typeof window === "undefined") return false;
  const hostname = window.location.hostname;
  return hostname.startsWith("www.");
};
const MultilingualSEO = ({
  currentLang,
  pagePath = "",
  customTitle,
  customDescription,
  ogImage,
  ogType
}) => {
  const langConfig = getLanguageConfig(currentLang);
  const canonicalUrl = getCanonicalUrl(currentLang, pagePath);
  const hrefLangUrls = getHrefLangUrls(pagePath);
  const title = customTitle || langConfig.title;
  const description = customDescription || langConfig.description;
  const noIndex = shouldNoIndex();
  const keywords = {
    pl: "przekłuwanie uszu, piercing, Warszawa, Gentle Piercing, medyczne przekłuwanie, dzieci, bezpieczne, sterylne, helix, tragus, conch, płatek ucha",
    uk: "прокол вух, пірсинг, Варшава, Gentle Piercing, медичний прокол, діти, безпечне, стерильне, helix, tragus, conch, мочка вуха",
    ru: "прокол ушей, пирсинг, Варшава, Gentle Piercing, медицинский прокол, дети, безопасное, стерильное, helix, tragus, conch, мочка уха",
    en: "ear piercing, piercing, Warsaw, Gentle Piercing, medical piercing, children, safe, sterile, helix, tragus, conch, earlobe"
  };
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("html", { lang: currentLang }),
    /* @__PURE__ */ jsx("title", { children: title }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywords[currentLang] || keywords.pl }),
    /* @__PURE__ */ jsx("meta", { name: "author", content: "Gentle Piercing" }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonicalUrl }),
    /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "pl", href: hrefLangUrls.pl }),
    /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "uk", href: hrefLangUrls.uk }),
    /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "ru", href: hrefLangUrls.ru }),
    /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "en", href: hrefLangUrls.en }),
    /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "x-default", href: hrefLangUrls["x-default"] }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: ogType || "website" }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "Gentle Piercing" }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonicalUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: currentLang === "pl" ? "pl_PL" : currentLang === "en" ? "en_US" : currentLang === "uk" ? "uk_UA" : "ru_RU" }),
    ogImage && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: ogImage }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:secure_url", content: ogImage }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "1200" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:alt", content: title })
    ] }),
    Object.entries(hrefLangUrls).map(([lang, url]) => {
      if (lang === currentLang || lang === "x-default") return null;
      const locale = lang === "pl" ? "pl_PL" : lang === "en" ? "en_US" : lang === "uk" ? "uk_UA" : "ru_RU";
      return /* @__PURE__ */ jsx("meta", { property: "og:locale:alternate", content: locale }, lang);
    }),
    ogImage && /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    ogImage && /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: ogImage }),
    noIndex && /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, nofollow" })
  ] });
};
const LocalBusinessSchema = ({ currentLang }) => {
  useTranslation();
  const contactInfo = {
    name: "Inverness MED - Medyczne Przekłuwanie Uszu",
    url: "https://gentlepiercing.pl",
    telephone: "+48573818260",
    email: "piercinggentle@gmail.com",
    address: {
      streetAddress: "Gizów 6",
      addressLocality: "Warszawa",
      addressRegion: "Wola",
      postalCode: "01-249",
      addressCountry: "PL"
    },
    geo: {
      latitude: 52.22594129500684,
      longitude: 20.945046328079172
    }
  };
  const getLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": contactInfo.name,
    "image": "https://d375139ucebi94.cloudfront.net/region2/pl/319418/biz_photo/fe2fefa17af54b6c919f56d37e7e97-inverness-med-medyczne-przeklu-biz-photo-895cc6a308e44d68bbb7a349741529-booksy.jpeg",
    "@id": contactInfo.url,
    "url": contactInfo.url,
    "telephone": contactInfo.telephone,
    "email": contactInfo.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": contactInfo.address.streetAddress,
      "addressLocality": contactInfo.address.addressLocality,
      "addressRegion": contactInfo.address.addressRegion,
      "postalCode": contactInfo.address.postalCode,
      "addressCountry": contactInfo.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": contactInfo.geo.latitude,
      "longitude": contactInfo.geo.longitude
    },
    "hasMap": "https://maps.app.goo.gl/X5kTSdfj1hgBb2Eg8",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "20:00"
    },
    "priceRange": "150-250 zł"
  });
  const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Inverness MED",
    "url": contactInfo.url,
    "logo": "https://storage.googleapis.com/gpt-engineer-file-uploads/GB4s5JEzk4Um0prNkFcFiNvoBTE2/uploads/1760622427421-233270ba-12aa-4f67-bf1c-81bc617a0ff7.jpeg",
    "description": currentLang === "pl" ? "Medyczne przekłuwanie uszu Inverness MED w Warszawie. Jedyny system w Europie zatwierdzony przez lekarzy. Bezpieczne, sterylne i bezbolesne dla dzieci 0+ i dorosłych." : currentLang === "uk" ? "Медичний прокол вух Inverness MED у Варшаві. Єдина система в Європі, схвалена лікарями. Безпечне, стерильне і безболісне для дітей 0+ та дорослих." : currentLang === "ru" ? "Медицинский прокол ушей Inverness MED в Варшаве. Единственная система в Европе, одобренная врачами. Безопасное, стерильное и безболезненное для детей 0+ и взрослых." : "Medical ear piercing Inverness MED in Warsaw. The only system in Europe approved by doctors. Safe, sterile and painless for children 0+ and adults.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": contactInfo.telephone,
      "contactType": "customer service",
      "areaServed": "PL",
      "availableLanguage": ["Polish", "English", "Russian", "Ukrainian"],
      "email": contactInfo.email
    },
    "sameAs": ["https://instagram.com/prokol_ushej_warszawa"]
  });
  return /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify([getLocalBusinessSchema(), getOrganizationSchema()]) }) });
};
const Gallery = lazy(() => import("./assets/js/Gallery-Nbnj_Ln7.js").then((m) => ({ default: m.Gallery })));
const Testimonials = lazy(() => import("./assets/js/Testimonials-BYh3A0qH.js").then((m) => ({ default: m.Testimonials })));
const Comparison = lazy(() => import("./assets/js/Comparison-BujoSyLP.js").then((m) => ({ default: m.Comparison })));
const FAQ = lazy(() => import("./assets/js/FAQ-HEi4QfEy.js").then((m) => ({ default: m.FAQ })));
const RecentArticles = lazy(() => import("./assets/js/RecentArticles-DJaVFLue.js").then((m) => ({ default: m.RecentArticles })));
const Contact = lazy(() => import("./assets/js/Contact-DTrFtWNf.js").then((m) => ({ default: m.Contact })));
const Footer$2 = lazy(() => Promise.resolve().then(() => Footer$1).then((m) => ({ default: m.Footer })));
function Index({ currentLang }) {
  useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(MultilingualSEO, { currentLang }),
    /* @__PURE__ */ jsx(FAQSchema, {}),
    /* @__PURE__ */ jsx(LocalBusinessSchema, { currentLang }),
    /* @__PURE__ */ jsx(Header, { currentLang }),
    /* @__PURE__ */ jsxs("main", { className: "flex-grow", children: [
      /* @__PURE__ */ jsx(Hero, { currentLang }),
      /* @__PURE__ */ jsx(Separator, {}),
      /* @__PURE__ */ jsx(About, {}),
      /* @__PURE__ */ jsx(Services, { currentLang }),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "h-96" }), children: /* @__PURE__ */ jsx(Gallery, {}) }),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "h-96" }), children: /* @__PURE__ */ jsx(Testimonials, {}) }),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "h-96" }), children: /* @__PURE__ */ jsx(Comparison, {}) }),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "h-96" }), children: /* @__PURE__ */ jsx(FAQ, {}) }),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "h-96" }), children: /* @__PURE__ */ jsx(RecentArticles, {}) }),
      /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "h-96" }), children: /* @__PURE__ */ jsx(Contact, {}) })
    ] }),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "h-20" }), children: /* @__PURE__ */ jsx(Footer$2, {}) })
  ] });
}
const LanguageHome = () => {
  const { lang } = useParams();
  const { i18n: i18n2 } = useTranslation();
  useEffect(() => {
    if (lang && i18n2.language !== lang) {
      i18n2.changeLanguage(lang);
    }
  }, [lang, i18n2]);
  if (!isSupportedLanguage(lang)) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/pl", replace: true });
  }
  return /* @__PURE__ */ jsx(Index, { currentLang: lang });
};
const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentLang = getLanguageFromPath(location.pathname);
  return /* @__PURE__ */ jsx("footer", { className: "bg-muted/50 border-t border-border", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("img", { src: logoWide, alt: "Gentle Piercing", className: "h-8 w-auto" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: t("footer.company.description") })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-foreground mb-4", children: t("footer.contact.title") }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("p", { children: "Gizów 6/208, 01-249 Warszawa" }),
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { href: "tel:+48573818260", className: "hover:text-primary transition-colors", children: "+48 573 818 260" }) }),
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { href: "mailto:piercinggentle@gmail.com", className: "hover:text-primary transition-colors", children: "piercinggentle@gmail.com" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-4", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "tel:+48573818260",
                className: "h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors",
                "aria-label": "Telefon",
                children: /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5 text-primary" })
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://instagram.com/prokol_ushej_warszawa",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors",
                "aria-label": "Instagram",
                children: /* @__PURE__ */ jsx(Instagram, { className: "h-5 w-5 text-primary" })
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "mailto:piercinggentle@gmail.com",
                className: "h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors",
                "aria-label": t("contact.email"),
                children: /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5 text-primary" })
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-foreground mb-4", children: t("footer.links.title") }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: `/${currentLang}/aftercare`, className: "hover:text-primary transition-colors", children: t("footer.links.aftercare") }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: `/${currentLang}/blog`, className: "hover:text-primary transition-colors", children: t("footer.links.blog") }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsx(LanguageSwitch, {}) }),
      /* @__PURE__ */ jsx("p", { children: t("footer.copyright", { year: (/* @__PURE__ */ new Date()).getFullYear() }) })
    ] })
  ] }) });
};
const Footer$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Footer
}, Symbol.toStringTag, { value: "Module" }));
const BreadcrumbSchema = ({ items }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "breadcrumb-schema";
    script.text = JSON.stringify(schema);
    const existing = document.getElementById("breadcrumb-schema");
    if (existing) existing.remove();
    document.head.appendChild(script);
    return () => {
      const schemaElement = document.getElementById("breadcrumb-schema");
      if (schemaElement) schemaElement.remove();
    };
  }, [schema]);
  return null;
};
function Aftercare() {
  const { t, i18n: i18n2 } = useTranslation();
  const { lang } = useParams();
  if (!isSupportedLanguage(lang)) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/pl/aftercare", replace: true });
  }
  const currentLang = lang || "pl";
  const pageSEO = getPageSEO(currentLang);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [i18n2.language]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      MultilingualSEO,
      {
        currentLang,
        pagePath: "/aftercare",
        customTitle: pageSEO.aftercare.title,
        customDescription: pageSEO.aftercare.description
      }
    ),
    /* @__PURE__ */ jsx(BreadcrumbSchema, { items: [
      { name: t("breadcrumb.home"), url: `https://gentlepiercing.pl/${currentLang}` },
      { name: t("header.nav.aftercare"), url: `https://gentlepiercing.pl/${currentLang}/aftercare` }
    ] }),
    /* @__PURE__ */ jsx(Header, { currentLang }),
    /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl", children: [
      /* @__PURE__ */ jsx("nav", { className: "mb-8", "aria-label": "Breadcrumb", children: /* @__PURE__ */ jsxs("ol", { className: "flex items-center space-x-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          Link,
          {
            to: `/${currentLang}`,
            className: "hover:text-primary transition-colors",
            children: t("breadcrumb.home")
          }
        ) }),
        /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "mx-2", children: "/" }),
          /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: t("header.nav.aftercare") })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl font-bold text-foreground mb-4", children: t("aftercare.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground", children: t("aftercare.subtitle") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: (t("aftercare.sections", { returnObjects: true }) || []).map((section, index) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-foreground mb-4", children: section.title }),
        section.text && /* @__PURE__ */ jsx("p", { className: "text-foreground mb-3", children: section.text }),
        section.points && section.points.length > 0 && /* @__PURE__ */ jsx("ul", { className: "list-disc list-inside space-y-3 text-foreground ml-2", children: section.points.map((point, idx) => /* @__PURE__ */ jsx("li", { dangerouslySetInnerHTML: { __html: point } }, idx)) }),
        section.afterText && /* @__PURE__ */ jsx("p", { className: "text-foreground mt-4", children: section.afterText }),
        section.removal && /* @__PURE__ */ jsx("p", { className: "text-foreground mt-4", children: section.removal })
      ] }) }, index)) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const blogThumbnail_400 = "/assets/images/art001-B8Eefhu0.webp";
const blogThumbnail_600 = "/assets/images/art001-0Amd_QMe.webp";
const blogThumbnail2_400 = "/assets/images/art002-DWxamWVL.webp";
const blogThumbnail2_600 = "/assets/images/art002-CvRvmv5v.webp";
const blogThumbnail3_400 = "/assets/images/art003-DZ8P-pbv.webp";
const blogThumbnail3_600 = "/assets/images/art003-DCCUMLJ0.webp";
function Blog() {
  const { t, i18n: i18n2 } = useTranslation();
  const { lang } = useParams();
  if (!isSupportedLanguage(lang)) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/pl/blog", replace: true });
  }
  const currentLang = lang || "pl";
  const pageSEO = getPageSEO(currentLang);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [i18n2.language]);
  const articles = [
    {
      id: "children-age",
      slug: currentLang === "pl" ? "od-jakiego-wieku-przekluwac-uszy-dziecku" : currentLang === "en" ? "at-what-age-to-pierce-child-ears" : currentLang === "uk" ? "z-yakoho-viku-prokoluvaty-vukha-dytyni" : "s-kakogo-vozrasta-prokalyvat-ushi-rebenku",
      title: currentLang === "pl" ? "Od jakiego wieku można przekłuwać uszy dziecku? Inverness Med dla dzieci 0+" : currentLang === "uk" ? "З якого віку можна проколювати вуха дитині? Inverness Med для дітей 0+" : currentLang === "ru" ? "С какого возраста можно прокалывать уши ребенку? Inverness Med для детей 0+" : "At What Age Can You Pierce a Child's Ears? Inverness Med for Children 0+",
      excerpt: currentLang === "pl" ? "Odpowiedź na pytanie: od jakiego wieku można przekłuwać uszy dziecku? System Inverness Med jest certyfikowany dla dzieci od 0+. Poradnik dla rodziców w Warszawie z porównaniem różnych grup wiekowych." : currentLang === "uk" ? "Відповідь на питання: з якого віку можна проколювати вуха дитині? Система Inverness Med сертифікована для дітей від 0+. Посібник для батьків у Варшаві з порівнянням різних вікових груп." : currentLang === "ru" ? "Ответ на вопрос: с какого возраста можно прокалывать уши ребенку? Система Inverness Med сертифицирована для детей от 0+. Руководство для родителей в Варшаве с сравнением разных возрастных групп." : "Answer to the question: at what age can you pierce a child's ears? The Inverness Med system is certified for children from 0+. Guide for parents in Warsaw with comparison of different age groups.",
      date: "2025-12-02",
      image: "art003"
    },
    {
      id: "inverness-vs-gun",
      slug: currentLang === "pl" ? "inverness-vs-pistolet" : currentLang === "en" ? "inverness-vs-gun" : currentLang === "uk" ? "inverness-vs-pistolet" : "inverness-vs-pistolet",
      title: currentLang === "pl" ? "Inverness Med vs pistolet – co jest bezpieczniejsze?" : currentLang === "uk" ? "Inverness Med vs пістолет — який метод проколу вух безпечніший?" : currentLang === "ru" ? "Inverness Med или пистолет — что безопаснее?" : "Inverness vs Piercing Gun — Which Method Is Safer?",
      excerpt: currentLang === "pl" ? "Porównanie Inverness Med i pistoletu. Sterylność, hipoalergiczne materiały, bezpieczeństwo dla dzieci 0+. Najlepszy sposób przekłuwania uszu w Warszawie." : currentLang === "uk" ? "Порівняння методів проколу вух: медичний Inverness Med та пістолет. Безпечний стерильний прокол у Варшаві. Підходить для дітей 0+ і дорослих." : currentLang === "ru" ? "Сравнение Inverness Med и пистолета: стерильность, безопасность, материалы. Лучший способ прокола ушей в Варшаве для детей и взрослых." : "A detailed comparison of the Inverness Med system and piercing gun. Sterile ear piercing for babies and adults in Warsaw. Hypoallergenic earrings and fast healing.",
      date: "2025-11-13",
      image: "art002"
    },
    {
      id: "does-ear-piercing-hurt",
      slug: currentLang === "pl" ? "czy-przekluwanie-uszu-boli" : currentLang === "en" ? "does-ear-piercing-hurt" : currentLang === "uk" ? "chy-bolyt-prokol-vukh" : "bolit-li-prokalyvanie-ushey",
      title: currentLang === "pl" ? "Czy przekłuwanie uszu boli?" : currentLang === "uk" ? "Чи болить прокол вух?" : currentLang === "ru" ? "Больно ли прокалывать уши?" : "Does ear piercing hurt?",
      excerpt: currentLang === "pl" ? "Delikatny, szybki i bezpieczny zabieg z systemem Inverness Med. Dowiedz się, jak wygląda proces, jak dbać o ucho i jak przygotować dziecko na pierwszy kolczyk." : currentLang === "uk" ? "Делікатна, швидка та безпечна процедура з системою Inverness Med. Дізнайтеся, як виглядає процес, як доглядати за вухом і як підготувати дитину до першої сережки." : currentLang === "ru" ? "Деликатная, быстрая и безопасная процедура с системой Inverness Med. Узнайте, как выглядит процесс, как ухаживать за ухом и как подготовить ребенка к первой серьге." : "Gentle, quick and safe procedure with the Inverness Med system. Find out how the process works, how to care for the ear and how to prepare your child for their first earring.",
      date: "2025-10-27",
      image: "art001"
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      MultilingualSEO,
      {
        currentLang,
        pagePath: "/blog",
        customTitle: pageSEO.blog.title,
        customDescription: pageSEO.blog.description
      }
    ),
    /* @__PURE__ */ jsx(BreadcrumbSchema, { items: [
      { name: t("breadcrumb.home"), url: `https://gentlepiercing.pl/${currentLang}` },
      { name: t("breadcrumb.blog"), url: `https://gentlepiercing.pl/${currentLang}/blog` }
    ] }),
    /* @__PURE__ */ jsx(Header, { currentLang }),
    /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl", children: [
      /* @__PURE__ */ jsx("nav", { className: "mb-8", "aria-label": "Breadcrumb", children: /* @__PURE__ */ jsxs("ol", { className: "flex items-center space-x-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          Link,
          {
            to: `/${currentLang}`,
            className: "hover:text-primary transition-colors",
            children: t("breadcrumb.home")
          }
        ) }),
        /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "mx-2", children: "/" }),
          /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: t("breadcrumb.blog") })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl font-bold text-foreground mb-4", children: t("header.nav.blog") }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground", children: currentLang === "pl" ? "Poradniki i wskazówki dotyczące przekłuwania uszu" : currentLang === "uk" ? "Поради та поради щодо проколу вух" : currentLang === "ru" ? "Руководства и советы по прокалыванию ушей" : "Guides and tips on ear piercing" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: articles.map((article) => /* @__PURE__ */ jsx(Card, { className: "overflow-hidden hover:shadow-lg transition-shadow", children: /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/${currentLang}/blog/${article.slug}`,
          className: "block group",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-full h-64 overflow-hidden", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: article.image === "art002" ? blogThumbnail2_600 : article.image === "art003" ? blogThumbnail3_600 : blogThumbnail_600,
                srcSet: article.image === "art002" ? `
                          ${blogThumbnail2_400} 400w,
                          ${blogThumbnail2_600} 600w
                        ` : article.image === "art003" ? `
                          ${blogThumbnail3_400} 400w,
                          ${blogThumbnail3_600} 600w
                        ` : `
                          ${blogThumbnail_400} 400w,
                          ${blogThumbnail_600} 600w
                        `,
                sizes: "(max-width: 768px) 100vw, 600px",
                alt: article.id === "inverness-vs-gun" ? currentLang === "pl" ? "Inverness Med vs pistolet - bezpieczne przekłuwanie uszu w Warszawie" : currentLang === "uk" ? "Inverness Med vs пістолет - безпечне проколювання вух у Варшаві" : currentLang === "ru" ? "Inverness Med vs пистолет - безопасное прокалывание ушей в Варшаве" : "Inverness Med vs piercing gun - safe ear piercing in Warsaw" : article.id === "children-age" ? currentLang === "pl" ? "Od jakiego wieku można przekłuwać uszy dziecku? Inverness Med dla dzieci 0+" : currentLang === "uk" ? "З якого віку можна проколювати вуха дитині? Inverness Med для дітей 0+" : currentLang === "ru" ? "С какого возраста можно прокалывать уши ребенку? Inverness Med для детей 0+" : "At What Age Can You Pierce a Child's Ears? Inverness Med for Children 0+" : article.title,
                title: article.title,
                width: "600",
                height: "350",
                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
                loading: "lazy",
                decoding: "async"
              }
            ) }),
            /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors", children: article.title }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4 line-clamp-2", children: article.excerpt }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
                  currentLang === "pl" ? "Opublikowano" : currentLang === "uk" ? "Опубліковано" : currentLang === "ru" ? "Опубликовано" : "Published",
                  " ",
                  article.date
                ] }),
                /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" })
              ] })
            ] })
          ]
        }
      ) }, article.id)) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function ComparisonTable({ methods, criteria, headers }) {
  if (criteria && criteria.length > 0) {
    const col1Header = (headers == null ? void 0 : headers.col1) || "Kryterium";
    const col2Header = (headers == null ? void 0 : headers.col2) || "Inverness Med";
    const col3Header = (headers == null ? void 0 : headers.col3) || "Pistolet";
    return /* @__PURE__ */ jsx("div", { className: "overflow-x-auto my-6", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse border border-border rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-muted/50", children: [
        /* @__PURE__ */ jsx("th", { className: "border border-border px-4 py-3 text-left font-semibold text-foreground", children: col1Header }),
        /* @__PURE__ */ jsx("th", { className: "border border-border px-4 py-3 text-left font-semibold text-foreground", children: col2Header }),
        /* @__PURE__ */ jsx("th", { className: "border border-border px-4 py-3 text-left font-semibold text-foreground", children: col3Header })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: criteria.map((item, index) => /* @__PURE__ */ jsxs(
        "tr",
        {
          className: index % 2 === 0 ? "bg-background" : "bg-muted/20",
          children: [
            /* @__PURE__ */ jsx("td", { className: "border border-border px-4 py-3 font-medium text-foreground", children: item.criterion }),
            /* @__PURE__ */ jsx("td", { className: "border border-border px-4 py-3 text-muted-foreground", children: item.inverness }),
            /* @__PURE__ */ jsx("td", { className: "border border-border px-4 py-3 text-muted-foreground", children: item.gun })
          ]
        },
        index
      )) })
    ] }) });
  }
  if (methods && methods.length > 0) {
    const col1Header = (headers == null ? void 0 : headers.col1) || "Metoda";
    const col2Header = (headers == null ? void 0 : headers.col2) || "Charakterystyka";
    return /* @__PURE__ */ jsx("div", { className: "overflow-x-auto my-6", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse border border-border rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-muted/50", children: [
        /* @__PURE__ */ jsx("th", { className: "border border-border px-4 py-3 text-left font-semibold text-foreground", children: col1Header }),
        /* @__PURE__ */ jsx("th", { className: "border border-border px-4 py-3 text-left font-semibold text-foreground", children: col2Header })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: methods.map((item, index) => /* @__PURE__ */ jsxs(
        "tr",
        {
          className: index % 2 === 0 ? "bg-background" : "bg-muted/20",
          children: [
            /* @__PURE__ */ jsx("td", { className: "border border-border px-4 py-3 font-medium text-foreground", children: item.method }),
            /* @__PURE__ */ jsx("td", { className: "border border-border px-4 py-3 text-muted-foreground", children: item.characteristic })
          ]
        },
        index
      )) })
    ] }) });
  }
  return null;
}
const BlogArticleCTA = ({
  currentLang,
  articleId,
  getBooksyUrl: getBooksyUrl2
}) => {
  const booksyUrl = getBooksyUrl2();
  const getHeading = () => {
    if (currentLang === "uk") return "Резервація";
    if (currentLang === "ru") return "Резервация";
    if (currentLang === "en") return "Booking";
    return "Rezerwacja";
  };
  const getBookNowText = () => {
    if (currentLang === "uk") return "Запишіться на візит вже сьогодні:";
    if (currentLang === "ru") return "Запишитесь на визит уже сегодня:";
    if (currentLang === "en") return "Book an appointment today:";
    return "Umów wizytę już dziś:";
  };
  const getPhoneLabel = () => {
    if (currentLang === "uk") return "Телефон";
    if (currentLang === "ru") return "Телефон";
    if (currentLang === "en") return "Phone";
    return "Telefon";
  };
  const getRelatedHeading = () => {
    if (currentLang === "uk") return "Пов'язані статті:";
    if (currentLang === "ru") return "Связанные статьи:";
    if (currentLang === "en") return "Related articles:";
    return "Powiązane artykuły:";
  };
  const getArticleMeta = (id, lang) => {
    if (id === "inverness-vs-gun") {
      return {
        slug: lang === "pl" ? "inverness-vs-pistolet" : lang === "en" ? "inverness-vs-gun" : "inverness-vs-pistolet",
        title: lang === "pl" ? "Inverness Med vs pistolet – co jest bezpieczniejsze?" : lang === "uk" ? "Inverness Med vs пістолет — який метод проколу вух безпечніший?" : lang === "ru" ? "Inverness Med или пистолет — что безопаснее?" : "Inverness vs Piercing Gun — Which Method Is Safer?"
      };
    }
    if (id === "does-ear-piercing-hurt") {
      return {
        slug: lang === "pl" ? "czy-przekluwanie-uszu-boli" : lang === "en" ? "does-ear-piercing-hurt" : lang === "uk" ? "chy-bolyt-prokol-vukh" : "bolit-li-prokalyvanie-ushey",
        title: lang === "pl" ? "Czy przekłuwanie uszu boli?" : lang === "uk" ? "Чи болить прокол вух?" : lang === "ru" ? "Больно ли прокалывать уши?" : "Does ear piercing hurt?"
      };
    }
    return {
      slug: lang === "pl" ? "od-jakiego-wieku-przekluwac-uszy-dziecku" : lang === "en" ? "at-what-age-to-pierce-child-ears" : lang === "uk" ? "z-yakoho-viku-prokoluvaty-vukha-dytyni" : "s-kakogo-vozrasta-prokalyvat-ushi-rebenku",
      title: lang === "pl" ? "Od jakiego wieku można przekłuwać uszy dziecku? Inverness Med dla dzieci 0+" : lang === "uk" ? "З якого віку можна проколювати вуха дитині? Inverness Med для дітей 0+" : lang === "ru" ? "С какого возраста можно прокалывать уши ребенку? Inverness Med для детей 0+" : "At What Age Can You Pierce a Child's Ears? Inverness Med for Children 0+"
    };
  };
  const relatedIds = articleId === "children-age" ? ["inverness-vs-gun", "does-ear-piercing-hurt"] : articleId === "inverness-vs-gun" ? ["children-age", "does-ear-piercing-hurt"] : ["children-age", "inverness-vs-gun"];
  const relatedArticles = relatedIds.map((id) => ({
    id,
    ...getArticleMeta(id, currentLang)
  }));
  return /* @__PURE__ */ jsxs("section", { className: "mt-16", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4", children: getHeading() }),
    /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: getBookNowText() }),
    /* @__PURE__ */ jsxs("p", { className: "text-foreground mb-4", children: [
      /* @__PURE__ */ jsx("strong", { children: "Booksy" }),
      " →",
      " ",
      /* @__PURE__ */ jsx(
        "a",
        {
          href: booksyUrl,
          target: "_blank",
          rel: "noopener",
          className: "text-primary hover:underline",
          children: "Rezerwuj Online"
        }
      ),
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("strong", { children: getPhoneLabel() }),
      " →",
      " ",
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "tel:+48573818260",
          className: "text-primary hover:underline",
          children: "+48 573 818 260"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 pt-6 border-t border-border", children: [
      /* @__PURE__ */ jsx("p", { className: "text-foreground font-semibold mb-2", children: getRelatedHeading() }),
      /* @__PURE__ */ jsx("ul", { className: "list-disc ml-6 space-y-1 text-foreground", children: relatedArticles.map((article) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        Link,
        {
          to: `/${currentLang}/blog/${article.slug}`,
          className: "text-primary hover:underline",
          children: article.title
        }
      ) }, article.id)) })
    ] })
  ] });
};
const ArticleDoesItHurt = ({ currentLang }) => {
  const content = {
    pl: {
      h1: "Czy przekłuwanie uszu boli?",
      intro: 'Wiele osób, które decydują się na przekłuwanie uszu po raz pierwszy, zastanawia się nie tylko nad tym, czy zabieg boli, ale też <strong>jaką metodę przekłuwania wybrać</strong>. Na rynku dostępnych jest kilka sposobów – od tradycyjnych pistoletów po nowoczesne, medyczne systemy takie jak <a href="https://www.invernesscorp.com/" target="_blank" rel="noopener">Inverness Med</a>. Każda z metod różni się precyzją, poziomem higieny i komfortem, dlatego warto poznać ich zalety i wady, zanim podejmiesz decyzję.',
      h2_1: "",
      p1_1: "",
      inverness_link: "Inverness Med",
      p1_2: "",
      p1_3: "",
      h2_2: "Różne metody przekłuwania – którą wybrać?",
      table_method: "Metoda",
      table_char: "Charakterystyka",
      table_needle: "Igła",
      table_needle_desc: "Stosowana w studiach piercingu. Zapewnia dużą precyzję, wymaga doświadczenia specjalisty.",
      table_gun: "Pistolet",
      table_gun_desc: "Popularny w salonach kosmetycznych, ale trudny do sterylizacji – może powodować większy ból i mikrourazy.",
      table_inverness: "Inverness Med",
      table_inverness_desc: "Medyczny system z jednorazową, zamkniętą kasetą. Gwarantuje sterylność i minimalny dyskomfort.",
      p2_1: "Jeśli zależy Ci na delikatnym, bezpiecznym i bezbolesnym przekłuciu – wybierz ",
      p2_inverness: "Inverness Med",
      p2_2: ".",
      h2_3: "Higiena i bezpieczeństwo to podstawa",
      p3_1: "W systemie Inverness Med każdy element jest sterylny i jednorazowy, co praktycznie eliminuje ryzyko zakażenia. Po zabiegu należy:",
      list_1: "myć ręce przed dotykaniem ucha,",
      list_2: "przemywać miejsce przekłucia 2–3 razy dziennie specjalnym płynem (",
      aftercare_link: "pielęgnacja po przekłuciu",
      list_2b: "),",
      list_3: "unikać alkoholu i kosmetyków drażniących,",
      list_4: "nie wyjmować kolczyków przed wygojeniem.",
      h2_4: "Czy przekłuwanie uszu naprawdę boli?",
      p4: "Większość osób porównuje to do lekkiego ukłucia komara. System Inverness Med działa cicho i delikatnie – bez strzału, jak w pistoletach. Dyskomfort jest minimalny i trwa zaledwie kilka sekund.",
      h2_5: "Jak długo goją się uszy po przekłuciu?",
      healing_1: "Płatek ucha – 6–8 tygodni,",
      healing_2: "Chrząstka – 3–6 miesięcy.",
      p5_1: "W tym czasie należy unikać spania na przekłutym uchu i regularnie przemywać miejsce zabiegu. Kolczyki Inverness wykonane są z hipoalergicznych materiałów – stali chirurgicznej, tytanu i niobu (zobacz ",
      earrings_link: "kolczyki",
      p5_2: ").",
      h2_6: "Najczęstsze problemy po przekłuciu",
      p6_1: "Lekkie zaczerwienienie lub opuchlizna są naturalne. Jeśli pojawia się silny ból lub wydzielina, należy skontaktować się z profesjonalnym salonem lub lekarzem. Właściwa higiena i pielęgnacja pozwolą tego uniknąć (więcej w ",
      p6_aftercare: "poradniku",
      p6_2: ").",
      h2_7: "Przekłuwanie uszu u dzieci",
      p7_1: "Nie ma jednego idealnego wieku. Część rodziców wybiera przekłucie u niemowląt, inni czekają, aż dziecko samo tego zechce. System Inverness Med jest cichy, delikatny i w pełni bezpieczny – idealny nawet dla najmłodszych.",
      p7_2: "Ważne, by dziecko było spokojne, najedzone i wiedziało, że zabieg trwa tylko chwilę.",
      h2_8: "Czym jest Inverness Med?",
      p8_1: "Inverness Med to certyfikowany system medyczny przeznaczony do delikatnego i sterylnego przekłuwania uszu, odpowiedni nawet dla dzieci od 0+.",
      p8_2: "Działa na zasadzie ręcznego, kontrolowanego nacisku – bez sprężyny, hałasu i bólu. Ultracienka igła (0,73 mm) gwarantuje minimalne odczucie i szybkie gojenie.",
      p8_3: "Każdy kolczyk znajduje się w zamkniętym, sterylnym kartridżu, który otwiera się dopiero w chwili przekłucia, co zapewnia pełną higienę i bezpieczeństwo. System posiada certyfikaty FDA i ISO, a kolczyki są wolne od niklu, kadmu i ołowiu. Posiadają także certyfikat REACH, potwierdzający wysoką jakość i zgodność z normami Unii Europejskiej.",
      p8_4: "Więcej informacji o systemie znajdziesz na oficjalnej stronie ",
      p8_link: "Inverness Med",
      p8_5: ".",
      h2_8c: "Dlaczego warto wybrać Inverness Med?",
      list_8c_1: "ponad 50 lat doświadczenia,",
      list_8c_2: "stosowany w 70 krajach na świecie,",
      list_8c_3: "ponad 200 milionów zadowolonych klientów,",
      list_8c_4: "hipoalergiczne kolczyki najwyższej jakości – w naszej ofercie dostępne są kolczyki z chirurgicznej stali, tytanu i niobu, odpowiednie nawet dla osób z silnymi alergiami,",
      list_8c_5: "pełna sterylność i bezpieczeństwo każdego zabiegu.",
      h2_9: "Podsumowanie",
      p9_1: "Przekłuwanie uszu to szybki i bezpieczny zabieg, jeśli wybierzesz odpowiednią metodę i profesjonalny salon. W Gentle Piercing korzystamy wyłącznie z systemu Inverness Med – bez bólu, stresu i ryzyka infekcji.",
      p9_2: "",
      p9_aftercare: "",
      p9_3: "",
      p9_earrings: "",
      p9_4: "",
      p9_5: "",
      p9_6: "",
      cta: "Zarezerwuj wizytę online"
    },
    uk: {
      h1: "Чи болить прокол вух?",
      intro: 'Багато людей, які вирішують проколоти вуха вперше, замислюються не тільки над тим, чи боляче ця процедура, але й <strong>яку методику проколювання вибрати</strong>. На ринку доступно кілька способів – від традиційних пістолетів до сучасних медичних систем, таких як <a href="https://www.invernesscorp.com/" target="_blank" rel="noopener">Inverness Med</a>. Кожен із методів відрізняється точністю, рівнем гігієни та комфортом, тому перед прийняттям рішення варто ознайомитися з їхніми перевагами та недоліками.',
      h2_1: "",
      p1_1: "",
      inverness_link: "Inverness Med",
      p1_2: "",
      p1_3: "",
      h2_2: "Різні методи проколу — який вибрати?",
      table_method: "Метод",
      table_char: "Характеристика",
      table_needle: "Голка",
      table_needle_desc: "Використовується в студіях пірсингу. Забезпечує високу точність, потребує досвіду спеціаліста.",
      table_gun: "Пістолет",
      table_gun_desc: "Популярний у косметичних салонах, але важкий для стерилізації — може спричиняти більший біль і мікротравми.",
      table_inverness: "Inverness Med",
      table_inverness_desc: "Медична система з одноразовою закритою касетою. Гарантує стерильність та мінімальний дискомфорт.",
      p2_1: "Якщо для вас важливий делікатний, безпечний та безболісний прокол — оберіть ",
      p2_inverness: "Inverness Med",
      p2_2: ".",
      h2_3: "Гігієна та безпека — це основа",
      p3_1: "У системі Inverness Med кожен елемент стерильний та одноразовий, що практично усуває ризик зараження. Після процедури потрібно:",
      list_1: "мити руки перед дотиком до вуха,",
      list_2: "обмивати місце проколу 2–3 рази на день спеціальним розчином (",
      aftercare_link: "догляд після проколу",
      list_2b: "),",
      list_3: "уникати спирту та дратівливих косметичних засобів,",
      list_4: "не виймати сережки до загоєння.",
      h2_4: "Чи дійсно болить прокол вух?",
      p4: "Більшість людей порівнюють це з легким уколом комара. Система Inverness Med працює тихо та делікатно — без «пострілу», як у пістолетах. Дискомфорт мінімальний і триває лише кілька секунд.",
      h2_5: "Як довго загоюються вуха після проколу?",
      healing_1: "Мочка вуха — 6–8 тижнів,",
      healing_2: "Хрящ — 3–6 місяців.",
      p5_1: "У цей час слід уникати сну на проколотому вусі і регулярно обмивати місце процедури. Сережки Inverness виготовлені з гіпоалергенних матеріалів — хірургічної сталі, титану та ніобію (подивіться ",
      earrings_link: "сережки",
      p5_2: ").",
      h2_6: "Найчастіші проблеми після проколу",
      p6_1: "Легке почервоніння або набряк є природним. Якщо з'являється сильний біль або виділення, слід звернутися до професійного салону або лікаря. Належна гігієна та догляд допоможуть цього уникнути (більше в ",
      p6_aftercare: "пораднику",
      p6_2: ").",
      h2_7: "Прокол вух у дітей",
      p7_1: "Немає одного ідеального віку. Частина батьків обирає прокол у немовлят, інші чекають, поки дитина сама цього захоче. Система Inverness Med тиха, делікатна та повністю безпечна — ідеальна навіть для найменших.",
      p7_2: "Важливо, щоб дитина була спокійною, насиченою та знала, що процедура триває лише хвилину.",
      h2_8: "Що таке Inverness Med?",
      p8_1: "Inverness Med - це сертифікована медична система, призначена для делікатного та стерильного проколу вух, підходить навіть для дітей від 0+.",
      p8_2: "Працює за принципом ручного, контрольованого тиску - без пружини, шуму та болю. Ультратонка голка (0,73 мм) забезпечує мінімальне відчуття та швидке загоєння.",
      p8_3: "Кожна сережка знаходиться в закритому, стерильному картриджі, який відкривається лише в момент проколу, що забезпечує повну гігієну та безпеку. Система має сертифікати FDA та ISO, а сережки не містять нікелю, кадмію та свинцю. Також мають сертифікат REACH, що підтверджує високу якість та відповідність нормам Європейського Союзу.",
      p8_4: "Більше інформації про систему на офіційному сайті ",
      p8_link: "Inverness Med",
      p8_5: ".",
      h2_8c: "Чому варто вибрати Inverness Med?",
      list_8c_1: "понад 50 років досвіду,",
      list_8c_2: "використовується в 70 країнах світу,",
      list_8c_3: "понад 200 мільйонів задоволених клієнтів,",
      list_8c_4: "гіпоалергенні сережки найвищої якості - у нашому асортименті доступні сережки з хірургічної сталі, титану та ніобію, підходять навіть для людей з сильними алергіями,",
      list_8c_5: "повна стерильність та безпека кожної процедури.",
      h2_9: "Підсумок",
      p9_1: "Прокол вух — це швидка та безпечна процедура, якщо ви виберете відповідний метод та професійний салон. В Gentle Piercing ми використовуємо виключно систему Inverness Med — без болю, стресу та ризику інфекції.",
      p9_2: "Дізнайтеся більше про ",
      p9_aftercare: "догляд",
      p9_3: ", подивіться ",
      p9_earrings: "сережки",
      p9_4: " або ",
      p9_5: "зарезервуйте візит онлайн",
      p9_6: ".",
      cta: "Зарезервуйте візит онлайн"
    },
    ru: {
      h1: "Больно ли прокалывать уши?",
      intro: 'Многие люди, которые впервые решаются на прокалывание ушей, задаются вопросом не только о том, больно ли это, но и <strong>какой метод прокалывания выбрать</strong>. На рынке доступно несколько способов – от традиционных пистолетов до современных медицинских систем, таких как <a href="https://www.invernesscorp.com/" target="_blank" rel="noopener">Inverness Med</a>. Каждый из методов отличается точностью, уровнем гигиены и комфортом, поэтому перед принятием решения стоит ознакомиться с их преимуществами и недостатками.',
      h2_1: "",
      p1_1: "",
      inverness_link: "Inverness Med",
      p1_2: "",
      p1_3: "",
      h2_2: "Различные методы прокалывания — какой выбрать?",
      table_method: "Метод",
      table_char: "Характеристика",
      table_needle: "Игла",
      table_needle_desc: "Используется в студиях пирсинга. Обеспечивает высокую точность, требует опыта специалиста.",
      table_gun: "Пистолет",
      table_gun_desc: "Популярен в косметических салонах, но труден для стерилизации — может вызывать большую боль и микротравмы.",
      table_inverness: "Inverness Med",
      table_inverness_desc: "Медицинская система с одноразовой закрытой кассетой. Гарантирует стерильность и минимальный дискомфорт.",
      p2_1: "Если для вас важен деликатный, безопасный и безболезненный прокол — выберите ",
      p2_inverness: "Inverness Med",
      p2_2: ".",
      h2_3: "Гигиена и безопасность — это основа",
      p3_1: "В системе Inverness Med каждый элемент стерилен и одноразовый, что практически исключает риск заражения. После процедуры нужно:",
      list_1: "мыть руки перед прикосновением к уху,",
      list_2: "промывать место прокола 2–3 раза в день специальным раствором (",
      aftercare_link: "уход после прокола",
      list_2b: "),",
      list_3: "избегать спирта и раздражающих косметических средств,",
      list_4: "не вынимать серьги до заживления.",
      h2_4: "Действительно ли больно прокалывать уши?",
      p4: "Большинство людей сравнивают это с легким уколом комара. Система Inverness Med работает тихо и деликатно — без «выстрела», как в пистолетах. Дискомфорт минимален и длится всего несколько секунд.",
      h2_5: "Как долго заживают уши после прокола?",
      healing_1: "Мочка уха — 6–8 недель,",
      healing_2: "Хрящ — 3–6 месяцев.",
      p5_1: "В это время следует избегать сна на проколотом ухе и регулярно промывать место процедуры. Серьги Inverness изготовлены из гипоаллергенных материалов — хирургической стали, титана и ниобия (посмотрите ",
      earrings_link: "серьги",
      p5_2: ").",
      h2_6: "Наиболее частые проблемы после прокола",
      p6_1: "Легкое покраснение или отек естественны. Если появляется сильная боль или выделения, следует обратиться к профессиональному салону или врачу. Надлежащая гигиена и уход помогут этого избежать (больше в ",
      p6_aftercare: "руководстве",
      p6_2: ").",
      h2_7: "Прокалывание ушей у детей",
      p7_1: "Нет одного идеального возраста. Часть родителей выбирает прокол у младенцев, другие ждут, пока ребенок сам этого захочет. Система Inverness Med тихая, деликатная и полностью безопасная — идеальна даже для самых маленьких.",
      p7_2: "Важно, чтобы ребенок был спокоен, сыт и знал, что процедура длится только минуту.",
      h2_8: "Что такое Inverness Med?",
      p8_1: "Inverness Med - это сертифицированная медицинская система, предназначенная для деликатного и стерильного прокалывания ушей, подходит даже для детей от 0+.",
      p8_2: "Работает по принципу ручного, контролируемого давления - без пружины, шума и боли. Ультратонкая игла (0,73 мм) обеспечивает минимальное ощущение и быстрое заживление.",
      p8_3: "Каждая серьга находится в закрытом, стерильном картридже, который открывается только в момент прокола, что обеспечивает полную гигиену и безопасность. Система имеет сертификаты FDA и ISO, а серьги не содержат никеля, кадмия и свинца. Также имеют сертификат REACH, подтверждающий высокое качество и соответствие нормам Европейского Союза.",
      p8_4: "Больше информации о системе на официальном сайте ",
      p8_link: "Inverness Med",
      p8_5: ".",
      h2_8c: "Почему стоит выбрать Inverness Med?",
      list_8c_1: "более 50 лет опыта,",
      list_8c_2: "используется в 70 странах мира,",
      list_8c_3: "более 200 миллионов довольных клиентов,",
      list_8c_4: "гипоаллергенные серьги высшего качества - в нашем ассортименте доступны серьги из хирургической стали, титана и ниобия, подходят даже для людей с сильными аллергиями,",
      list_8c_5: "полная стерильность и безопасность каждой процедуры.",
      h2_9: "Резюме",
      p9_1: "Прокол ушей — это быстрая и безопасная процедура, если вы выберете соответствующий метод и профессиональный салон. В Gentle Piercing мы используем исключительно систему Inverness Med — без боли, стресса и риска инфекции.",
      p9_2: "Узнайте больше об ",
      p9_aftercare: "уходе",
      p9_3: ", посмотрите ",
      p9_earrings: "серьги",
      p9_4: " или ",
      p9_5: "забронируйте визит онлайн",
      p9_6: ".",
      cta: "Забронируйте визит онлайн"
    },
    en: {
      h1: "Does ear piercing hurt?",
      intro: 'Many people who decide to have their ears pierced for the first time wonder not only whether the procedure hurts, but also <strong>which piercing method to choose</strong>. There are several methods available on the market – from traditional guns to modern medical systems such as <a href="https://www.invernesscorp.com/" target="_blank" rel="noopener">Inverness Med</a>. Each method differs in terms of precision, hygiene, and comfort, so it is worth learning about their advantages and disadvantages before making a decision.',
      h2_1: "",
      p1_1: "",
      inverness_link: "Inverness Med",
      p1_2: "",
      p1_3: "",
      h2_2: "Different piercing methods — which to choose?",
      table_method: "Method",
      table_char: "Characteristic",
      table_needle: "Needle",
      table_needle_desc: "Used in piercing studios. Provides high precision, requires specialist experience.",
      table_gun: "Gun",
      table_gun_desc: "Popular in beauty salons, but difficult to sterilize — can cause more pain and micro-injuries.",
      table_inverness: "Inverness Med",
      table_inverness_desc: "Medical system with a single-use closed cartridge. Guarantees sterility and minimal discomfort.",
      p2_1: "If you want a gentle, safe and painless piercing — choose ",
      p2_inverness: "Inverness Med",
      p2_2: ".",
      h2_3: "Hygiene and safety is the foundation",
      p3_1: "In the Inverness Med system, every element is sterile and disposable, which virtually eliminates the risk of infection. After the procedure you should:",
      list_1: "wash your hands before touching your ear,",
      list_2: "clean the piercing site 2–3 times a day with a special solution (",
      aftercare_link: "aftercare",
      list_2b: "),",
      list_3: "avoid alcohol and irritating cosmetics,",
      list_4: "do not remove earrings before healing.",
      h2_4: "Does ear piercing really hurt?",
      p4: "Most people compare it to a light mosquito bite. The Inverness Med system works quietly and gently — without a 'shot' like in guns. The discomfort is minimal and lasts only a few seconds.",
      h2_5: "How long do ears take to heal after piercing?",
      healing_1: "Earlobe — 6–8 weeks,",
      healing_2: "Cartilage — 3–6 months.",
      p5_1: "During this time, you should avoid sleeping on the pierced ear and regularly clean the procedure site. Inverness earrings are made from hypoallergenic materials — surgical steel, titanium and niobium (see ",
      earrings_link: "earrings",
      p5_2: ").",
      h2_6: "Most common problems after piercing",
      p6_1: "Mild redness or swelling is natural. If severe pain or discharge occurs, you should contact a professional salon or doctor. Proper hygiene and care will help avoid this (more in the ",
      p6_aftercare: "guide",
      p6_2: ").",
      h2_7: "Ear piercing in children",
      p7_1: "There is no single ideal age. Some parents choose to pierce babies, others wait until the child wants it themselves. The Inverness Med system is quiet, gentle and completely safe — ideal even for the youngest.",
      p7_2: "It's important that the child is calm, fed and knows that the procedure only takes a moment.",
      h2_8: "What is Inverness Med?",
      p8_1: "Inverness Med is a certified medical system designed for gentle and sterile ear piercing, suitable even for children from 0+.",
      p8_2: "It works on the principle of manual, controlled pressure - without a spring, noise and pain. The ultra-thin needle (0.73 mm) guarantees minimal sensation and fast healing.",
      p8_3: "Each earring is in a closed, sterile cartridge that only opens at the moment of piercing, which ensures full hygiene and safety. The system has FDA and ISO certificates, and earrings are free from nickel, cadmium and lead. They also have a REACH certificate, confirming high quality and compliance with European Union standards.",
      p8_4: "More information about the system can be found on the official ",
      p8_link: "Inverness Med",
      p8_5: " website.",
      h2_8c: "Why choose Inverness Med?",
      list_8c_1: "over 50 years of experience,",
      list_8c_2: "used in 70 countries worldwide,",
      list_8c_3: "over 200 million satisfied customers,",
      list_8c_4: "hypoallergenic earrings of the highest quality - our range includes earrings made of surgical steel, titanium and niobium, suitable even for people with strong allergies,",
      list_8c_5: "full sterility and safety of each procedure.",
      h2_9: "Summary",
      p9_1: "Ear piercing is a quick and safe procedure if you choose the right method and a professional salon. At Gentle Piercing we use exclusively the Inverness Med system — no pain, no stress, no infection risk.",
      p9_2: "Learn more about ",
      p9_aftercare: "aftercare",
      p9_3: ", see ",
      p9_earrings: "earrings",
      p9_4: " or ",
      p9_5: "book a visit online",
      p9_6: ".",
      cta: "Book a visit online"
    }
  };
  const t = content[currentLang] || content.en;
  const getBooksyUrl2 = () => {
    return `https://booksy.com/pl-pl/dl/show-business/319418?utm_source=blog&utm_medium=cta&utm_campaign=ear_piercing_${currentLang}`;
  };
  const methods = [
    { method: t.table_needle, characteristic: t.table_needle_desc },
    { method: t.table_gun, characteristic: t.table_gun_desc },
    { method: t.table_inverness, characteristic: t.table_inverness_desc }
  ];
  return /* @__PURE__ */ jsxs("article", { className: "max-w-none", children: [
    /* @__PURE__ */ jsx("div", { className: "text-lg text-foreground mb-12 leading-relaxed", dangerouslySetInnerHTML: { __html: t.intro } }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_2 }),
      /* @__PURE__ */ jsx(ComparisonTable, { methods }),
      /* @__PURE__ */ jsxs("p", { className: "text-foreground mb-4", children: [
        t.p2_1,
        /* @__PURE__ */ jsx("strong", { children: t.p2_inverness }),
        t.p2_2
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-muted/30 border-l-4 border-primary p-4 rounded-r-lg my-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-foreground mb-3", children: t.h2_8 }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-3 text-sm", children: /* @__PURE__ */ jsx("strong", { children: t.p8_1 }) }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-3 text-sm", children: t.p8_2 }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-3 text-sm", children: t.p8_3 }),
      /* @__PURE__ */ jsxs("p", { className: "text-foreground mb-0 text-sm", children: [
        t.p8_4,
        /* @__PURE__ */ jsx("a", { href: "https://www.invernesscorp.com/", target: "_blank", rel: "nofollow noopener", className: "text-primary hover:underline", children: t.p8_link }),
        t.p8_5
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-muted/30 border-l-4 border-primary p-4 rounded-r-lg my-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-foreground mb-3", children: t.h2_8c }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-6 space-y-1 text-foreground text-sm", children: [
        /* @__PURE__ */ jsx("li", { children: t.list_8c_1 }),
        /* @__PURE__ */ jsx("li", { children: t.list_8c_2 }),
        /* @__PURE__ */ jsx("li", { children: t.list_8c_3 }),
        /* @__PURE__ */ jsx("li", { children: t.list_8c_4 }),
        /* @__PURE__ */ jsx("li", { children: t.list_8c_5 })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_3 }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p3_1 }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-6 space-y-2 text-foreground", children: [
        /* @__PURE__ */ jsx("li", { children: t.list_1 }),
        /* @__PURE__ */ jsxs("li", { children: [
          t.list_2,
          /* @__PURE__ */ jsx(Link, { to: `/${currentLang}/aftercare`, className: "text-primary hover:underline", children: t.aftercare_link }),
          t.list_2b
        ] }),
        /* @__PURE__ */ jsx("li", { children: t.list_3 }),
        /* @__PURE__ */ jsx("li", { children: t.list_4 })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_4 }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p4 })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_5 }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-6 space-y-2 text-foreground mb-4", children: [
        /* @__PURE__ */ jsx("li", { children: t.healing_1 }),
        /* @__PURE__ */ jsx("li", { children: t.healing_2 })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-foreground mb-4", children: [
        t.p5_1,
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: t.earrings_link }),
        t.p5_2
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_6 }),
      /* @__PURE__ */ jsxs("p", { className: "text-foreground mb-4", children: [
        t.p6_1,
        /* @__PURE__ */ jsx(Link, { to: `/${currentLang}/aftercare`, className: "text-primary hover:underline", children: t.p6_aftercare }),
        t.p6_2
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_7 }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p7_1 }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p7_2 })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_9 }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p9_1 }),
      /* @__PURE__ */ jsxs("p", { className: "text-foreground mb-8", children: [
        t.p9_2,
        /* @__PURE__ */ jsx(Link, { to: `/${currentLang}/aftercare`, className: "text-primary hover:underline", children: t.p9_aftercare }),
        t.p9_3,
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: t.p9_earrings }),
        t.p9_4,
        /* @__PURE__ */ jsx("a", { href: getBooksyUrl2(), target: "_blank", rel: "noopener", className: "text-primary hover:underline", children: t.p9_5 }),
        t.p9_6
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      BlogArticleCTA,
      {
        currentLang,
        articleId: "does-ear-piercing-hurt",
        getBooksyUrl: getBooksyUrl2
      }
    )
  ] });
};
const comparisonImage = "/assets/images/art002-comparison-BQ5D4iYH.webp";
const ArticleInvernessVsGun = ({ currentLang }) => {
  const content = {
    uk: {
      h1: "Inverness Med vs пістолет — який метод проколу вух безпечніший?",
      intro: "У Варшаві найчастіше використовують два способи проколювання вух: <strong>традиційний пістолет</strong> та <strong>медичну систему Inverness Med (США)</strong>. Різниця між ними визначає рівень безпеки, стерильності, точності та швидкість загоєння. Багато батьків та дорослих запитують: який метод проколу вух безпечніший? Чи варто обирати Inverness Med чи пістолет для проколу вух у Варшаві? У цій статті ми детально порівняємо обидва методи, щоб допомогти вам зробити інформований вибір для безпечного проколювання вух.",
      h2_1: "Що таке медична система Inverness Med",
      p1_1: "<strong>Inverness Med</strong> — це сучасна система для стерильного проколу вух. Вона працює на основі <strong>плавного ручного тиску</strong>, а не ударного механізму, що робить прокол максимально акуратним. Ця медична система для проколу вух була розроблена в США спеціально для забезпечення максимальної безпеки та стерильності під час процедури.",
      p1_1b: "На відміну від звичайного пістолета для проколу вух, система Inverness Med використовує одноразові стерильні картриджі, які містять як голку, так і сережку. Це означає, що кожен елемент, який контактує зі шкірою, є повністю стерильним та використовується лише один раз. Такий підхід до безпечного проколювання вух у Варшаві забезпечує нульовий ризик перехресного зараження.",
      p1_2: "Офіційний сайт виробника: ",
      inverness_link: "https://invernesscorp.com/",
      p1_3: "",
      h2_1b: "Основні переваги Inverness Med:",
      list_1_1: "безшумний прокол",
      list_1_2: "делікатний рух без розриву тканин",
      list_1_3: "стерильні одноразові картриджі",
      list_1_4: "лазерна заточка голки",
      list_1_5: "гіпоалергенні матеріали",
      list_1_6: "медичні сертифікати FDA та REACH",
      list_1_7: "замок Safety Back, який не притискає сережку до шкіри",
      p1_4: "Система Inverness Med використовується в понад 70 країнах світу та має понад 50 років досвіду. Вона є єдиною медичною системою для проколу вух, яка офіційно схвалена для дітей від 0+ та дорослих. У Варшаві саме цей метод вважається найбезпечнішим способом проколювання вух завдяки повній стерильності та мінімальній травматизації тканин.",
      h2_2: "Як працює звичайний пістолет",
      p2_1: 'Пістолет робить прокол за рахунок <strong>сильного удару</strong>, який "вистрілює" сережку у тканину. Цей механізм використовує пружину, що створює різкий поштовх. На відміну від Inverness Med, пістолет не може бути повністю стерилізований між процедурами, оскільки внутрішні механізми важко очистити. Це створює ризик перехресного зараження між клієнтами.',
      p2_2: "Багато салонів у Варшаві досі використовують пістолети через їхню низьку вартість та простоту використання. Однак для безпечного проколу вух, особливо для дітей, цей метод не є оптимальним вибором.",
      h2_2b: "Недоліки пістолета:",
      list_2_1: "більша травматизація",
      list_2_2: "гучний звук → стрес для дітей",
      list_2_3: "внутрішні елементи не стерилізуються",
      list_2_4: "ризик перехресного зараження",
      list_2_5: "менша точність",
      list_2_6: "повільніше загоєння",
      h2_3: "Порівняння Inverness Med та пістолета",
      p3_intro: "Детальне порівняння методів проколу вух допоможе зробити правильний вибір. Нижче наведено основні відмінності між медичною системою Inverness Med та традиційним пістолетом для проколу вух у Варшаві.",
      table_criterion: "Критерій",
      table_inverness: "Inverness Med",
      table_gun: "Пістолет",
      p3_after: "Як видно з таблиці, Inverness Med переважає за всіма ключовими параметрами безпеки та комфорту. Це робить його оптимальним вибором для безпечного проколу вух у Варшаві, особливо для дітей та людей з чутливою шкірою.",
      criterion_1: "Метод",
      inverness_1: "Плавний тиск",
      gun_1: "Сильний удар",
      criterion_2: "Стерильність",
      inverness_2: "100% картридж",
      gun_2: "Часткова",
      criterion_3: "Біль",
      inverness_3: "Мінімальний",
      gun_3: "Вище",
      criterion_4: "Для дітей 0+",
      inverness_4: "✔",
      gun_4: "✖",
      criterion_5: "Гіпоалергенність",
      inverness_5: "✔",
      gun_5: "Ні",
      criterion_6: "Загоєння",
      inverness_6: "Швидке",
      gun_6: "Довше",
      h2_4: "Чому Inverness найкращий для дітей 0+",
      p4_1: "Прокол вух дітям потребує особливої уваги до безпеки та комфорту. Inverness Med є ідеальним рішенням для дітей від народження, оскільки система була спеціально розроблена з урахуванням потреб найменших пацієнтів.",
      list_4_1: "немає гучного звуку — дитина не лякається",
      list_4_2: "немає різкого удару — мінімальний стрес",
      list_4_3: "сережки гіпоалергенні — безпечні для чутливої шкіри",
      list_4_4: "стерильність на 100% — нульовий ризик інфекції",
      list_4_5: "точний і акуратний прокол — швидке загоєння",
      p4_2: "У Варшаві багато батьків обирають Inverness Med для проколу вух своїм дітям саме через ці переваги. Процедура триває лише кілька секунд, а дискомфорт мінімальний. Докладніше про процедуру проколу вух у Варшаві можна дізнатися на нашому сайті.",
      h2_5: "Догляд після проколу",
      p5_1: "Правильний догляд після проколу вух — це ключ до швидкого загоєння без ускладнень. Незалежно від того, який метод ви обрали, дотримання рекомендацій допоможе уникнути інфекцій та забезпечить оптимальне загоєння.",
      p5_2: "Повна інструкція з догляду після проколу вух доступна на нашому сайті: ",
      aftercare_link: "https://gentlepiercing.pl/aftercare",
      p5_3: "Основні правила догляду після проколу вух:",
      list_5_1: "не чіпати вушка руками — завжди мити руки перед доторканням",
      list_5_2: "обробляти спреєм двічі на день — вранці та ввечері",
      list_5_3: "не крутити сережки — це може пошкодити тканину, що загоюється",
      list_5_4: "не мочити голову перші 3 дні — захист від бактерій у воді",
      p5_4: "Загоєння після проколу вух системою Inverness Med зазвичай відбувається швидше, ніж після використання пістолета, оскільки тканина менше травмована. Мочка вуха зазвичай загоюється за 6-8 тижнів, але це може варіюватися залежно від індивідуальних особливостей.",
      h2_6: "Висновок",
      p6_1: "Порівняння Inverness Med та пістолета для проколу вух чітко показує переваги медичної системи. Якщо важлива безпека, стерильність та мінімальний дискомфорт — <strong>Inverness Med є найбезпечнішим методом проколювання вух у Варшаві.</strong>",
      p6_2: "У салоні Gentle Piercing у Варшаві ми використовуємо виключно систему Inverness Med для всіх наших клієнтів — від дітей 0+ до дорослих. Це гарантує найвищий рівень безпеки, стерильності та комфорту під час процедури проколу вух. Наші спеціалісти мають багаторічний досвід роботи з цією системою та завжди готові відповісти на всі ваші питання щодо безпечного проколу вух у Варшаві.",
      h2_7: "Записатися на прокол",
      p7_1: "Booksy → ",
      booksy_link: "https://booksy.com/pl-pl/dl/show-business/319418?utm_source=blog&utm_medium=cta&utm_campaign=invernessvsgun",
      p7_2: "Контакт → ",
      contact_link: "tel:+48573818260",
      contact_text: "+48 573 818 260",
      cta: "Записатися на прокол",
      comparison_image_alt: "Порівняння безпеки системи Inverness Med та звичайного пістолета для проколу вух у Варшаві: стерильність, гіпоалергенність, безпека для дітей"
    },
    pl: {
      h1: "Inverness Med vs pistolet – co jest bezpieczniejsze?",
      intro: "W Warszawie najczęściej stosuje się dwa sposoby przekłuwania uszu: <strong>tradycyjny pistolet</strong> oraz <strong>medyczny system Inverness Med</strong>. Różnią się one poziomem bezpieczeństwa, precyzją i higieną. Wielu rodziców i dorosłych pyta: który sposób przekłuwania uszu jest bezpieczniejszy? Czy warto wybrać Inverness Med czy pistolet do przekłuwania uszu w Warszawie? W tym artykule szczegółowo porównamy obie metody, aby pomóc Ci w podjęciu świadomej decyzji dotyczącej bezpiecznego przekłuwania uszu.",
      h2_1: "Czym jest system Inverness Med?",
      p1_1: "<strong>Inverness Med</strong> to medyczny system przekłuwania uszu z USA, oparty na cichym, delikatnym nacisku ręcznym. Ten medyczny system przekłuwania uszu został opracowany w USA specjalnie w celu zapewnienia maksymalnego bezpieczeństwa i sterylności podczas zabiegu.",
      p1_1b: "W przeciwieństwie do zwykłego pistoletu do przekłuwania uszu, system Inverness Med wykorzystuje jednorazowe sterylne kartridże, które zawierają zarówno igłę, jak i kolczyk. Oznacza to, że każdy element stykający się ze skórą jest w pełni sterylny i używany tylko raz. Takie podejście do bezpiecznego przekłuwania uszu w Warszawie zapewnia zerowe ryzyko krzyżowego zakażenia.",
      p1_2: "Oficjalna strona producenta: ",
      inverness_link: "https://invernesscorp.com/",
      p1_3: "",
      h2_1b: "Zalety:",
      list_1_1: 'brak głośnego "strzału"',
      list_1_2: "jednorazowe, w pełni sterylne kartridże",
      list_1_3: "precyzyjna, laserowa igła",
      list_1_4: "materiały hipoalergiczne",
      list_1_5: "certyfikaty FDA i REACH",
      list_1_6: "zatyczka Safety Back",
      p1_4: "System Inverness Med jest używany w ponad 70 krajach na świecie i ma ponad 50 lat doświadczenia. To jedyny medyczny system przekłuwania uszu oficjalnie zatwierdzony dla dzieci od 0+ oraz dorosłych. W Warszawie właśnie ta metoda uznawana jest za najbezpieczniejszy sposób przekłuwania uszu dzięki pełnej sterylności i minimalnej traumatyzacji tkanek.",
      h2_2: "Jak działa pistolet?",
      p2_1: "Pistolet wprowadza kolczyk w ucho za pomocą silnego mechanizmu sprężynowego. Ten mechanizm wykorzystuje sprężynę, która tworzy gwałtowny impuls. W przeciwieństwie do Inverness Med, pistolet nie może być w pełni wysterylizowany między zabiegami, ponieważ wewnętrzne mechanizmy są trudne do oczyszczenia. To stwarza ryzyko krzyżowego zakażenia między klientami.",
      p2_2: "Wiele salonów w Warszawie nadal używa pistoletów ze względu na ich niski koszt i prostotę użycia. Jednak dla bezpiecznego przekłuwania uszu, zwłaszcza dla dzieci, ta metoda nie jest optymalnym wyborem.",
      h2_2b: "Wady:",
      list_2_1: "większa trauma tkanek",
      list_2_2: "hałas i stres",
      list_2_3: "brak możliwości pełnej sterylizacji",
      list_2_4: "większe ryzyko infekcji",
      list_2_5: "niższa precyzja",
      h2_3: "Porównanie",
      p3_intro: "Szczegółowe porównanie metod przekłuwania uszu pomoże w podjęciu właściwej decyzji. Poniżej przedstawiono główne różnice między systemem medycznym Inverness Med a tradycyjnym pistoletem do przekłuwania uszu w Warszawie.",
      table_criterion: "Kryterium",
      table_inverness: "Inverness Med",
      table_gun: "Pistolet",
      p3_after: "Jak widać z tabeli, Inverness Med przewyższa wszystkie kluczowe parametry bezpieczeństwa i komfortu. To czyni go optymalnym wyborem dla bezpiecznego przekłuwania uszu w Warszawie, zwłaszcza dla dzieci i osób z wrażliwą skórą.",
      criterion_1: "Metoda",
      inverness_1: "Delikatny nacisk",
      gun_1: "Uderzenie",
      criterion_2: "Sterylność",
      inverness_2: "Pełna",
      gun_2: "Ograniczona",
      criterion_3: "Ból",
      inverness_3: "Niewielki",
      gun_3: "Większy",
      criterion_4: "Dzieci 0+",
      inverness_4: "✔",
      gun_4: "✖",
      criterion_5: "Gojenie",
      inverness_5: "Szybsze",
      gun_5: "Wolniejsze",
      h2_4: "Dlaczego Inverness jest najlepszy dla dzieci?",
      p4_1: "Przekłuwanie uszu dzieciom wymaga szczególnej uwagi do bezpieczeństwa i komfortu. Inverness Med jest idealnym rozwiązaniem dla dzieci od urodzenia, ponieważ system został specjalnie zaprojektowany z myślą o potrzebach najmniejszych pacjentów.",
      list_4_1: "cisza — dziecko się nie boi",
      list_4_2: "minimalny dyskomfort — mniejszy stres",
      list_4_3: "hipoalergiczne materiały — bezpieczne dla wrażliwej skóry",
      list_4_4: "precyzyjna technika — szybkie gojenie",
      list_4_5: "pełna sterylność — zero ryzyka infekcji",
      p4_2: "W Warszawie wielu rodziców wybiera Inverness Med do przekłuwania uszu swoim dzieciom właśnie ze względu na te zalety. Zabieg trwa zaledwie kilka sekund, a dyskomfort jest minimalny. Więcej informacji o procedurze przekłuwania uszu w Warszawie można znaleźć na naszej stronie.",
      h2_5: "Pielęgnacja po zabiegu",
      p5_1: "Właściwa pielęgnacja po przekłuciu uszu to klucz do szybkiego gojenia bez powikłań. Niezależnie od wybranej metody, przestrzeganie zaleceń pomoże uniknąć infekcji i zapewni optymalne gojenie.",
      p5_2: "Pełna instrukcja pielęgnacji po przekłuciu uszu dostępna jest na naszej stronie: ",
      aftercare_link: "https://gentlepiercing.pl/aftercare",
      p5_3: "Podstawowe zasady pielęgnacji po przekłuciu uszu:",
      list_5_1: "nie dotykać ucha rękami — zawsze myć ręce przed dotknięciem",
      list_5_2: "przemywać sprayem dwa razy dziennie — rano i wieczorem",
      list_5_3: "nie obracać kolczyków — może to uszkodzić gojącą się tkankę",
      list_5_4: "nie moczyć głowy przez pierwsze 3 dni — ochrona przed bakteriami w wodzie",
      p5_4: "Gojenie po przekłuciu uszu systemem Inverness Med zwykle następuje szybciej niż po użyciu pistoletu, ponieważ tkanka jest mniej uszkodzona. Płatek ucha zwykle goi się w ciągu 6-8 tygodni, ale może to się różnić w zależności od indywidualnych cech.",
      h2_6: "Podsumowanie",
      p6_1: "Porównanie Inverness Med i pistoletu do przekłuwania uszu wyraźnie pokazuje zalety systemu medycznego. Jeśli zależy Ci na sterylności, bezpieczeństwie i szybkim gojeniu — <strong>Inverness Med to najlepsza metoda przekłuwania uszu w Warszawie.</strong>",
      p6_2: "W salonie Gentle Piercing w Warszawie używamy wyłącznie systemu Inverness Med dla wszystkich naszych klientów — od dzieci 0+ po dorosłych. To gwarantuje najwyższy poziom bezpieczeństwa, sterylności i komfortu podczas zabiegu przekłuwania uszu. Nasi specjaliści mają wieloletnie doświadczenie w pracy z tym systemem i zawsze są gotowi odpowiedzieć na wszystkie pytania dotyczące bezpiecznego przekłuwania uszu w Warszawie.",
      h2_7: "Rezerwacja",
      p7_1: "Booksy → ",
      booksy_link: "https://booksy.com/pl-pl/dl/show-business/319418?utm_source=blog&utm_medium=cta&utm_campaign=invernessvsgun",
      p7_2: "Kontakt → ",
      contact_link: "tel:+48573818260",
      contact_text: "+48 573 818 260",
      cta: "Zarezerwuj wizytę",
      comparison_image_alt: "Porównanie bezpieczeństwa systemu Inverness Med i zwykłego pistoletu do przekłuwania uszu w Warszawie: sterylność, hipoalergiczność, bezpieczeństwo dla dzieci"
    },
    en: {
      h1: "Inverness vs Piercing Gun — Which Method Is Safer?",
      intro: "In Warsaw, ear piercing is commonly performed using either a <strong>piercing gun</strong> or the <strong>Inverness Med medical system</strong>. These two methods differ significantly in safety, sterility, precision and healing. Many parents and adults ask: which ear piercing method is safer? Should you choose Inverness Med or a piercing gun for ear piercing in Warsaw? In this article, we will compare both methods in detail to help you make an informed choice for safe ear piercing.",
      h2_1: "What Is the Inverness Med System?",
      p1_1: "<strong>Inverness Med</strong> is a medically approved ear piercing system from the USA that uses gentle, silent hand pressure instead of forceful impact. This medical ear piercing system was developed in the USA specifically to ensure maximum safety and sterility during the procedure.",
      p1_1b: "Unlike a regular piercing gun, the Inverness Med system uses disposable sterile cartridges that contain both the needle and the earring. This means that every element that comes into contact with the skin is fully sterile and used only once. This approach to safe ear piercing in Warsaw ensures zero risk of cross-contamination.",
      p1_2: "Official manufacturer website: ",
      inverness_link: "https://invernesscorp.com/",
      p1_3: "",
      h2_1b: "Key advantages",
      list_1_1: "silent piercing",
      list_1_2: "sterile, single-use cartridge",
      list_1_3: "laser-cut piercing tip",
      list_1_4: "hypoallergenic materials",
      list_1_5: "FDA & REACH certified",
      list_1_6: "Safety Back clasp",
      p1_4: "The Inverness Med system is used in over 70 countries worldwide and has over 50 years of experience. It is the only medical ear piercing system officially approved for children from 0+ and adults. In Warsaw, this method is considered the safest way to pierce ears thanks to full sterility and minimal tissue trauma.",
      h2_2: "How a Piercing Gun Works",
      p2_1: 'A piercing gun "shoots" the earring into the ear using a spring-loaded mechanism. This mechanism uses a spring that creates a sudden impulse. Unlike Inverness Med, a piercing gun cannot be fully sterilized between procedures, as the internal mechanisms are difficult to clean. This creates a risk of cross-contamination between clients.',
      p2_2: "Many salons in Warsaw still use piercing guns due to their low cost and ease of use. However, for safe ear piercing, especially for children, this method is not the optimal choice.",
      h2_2b: "Disadvantages:",
      list_2_1: "tissue trauma",
      list_2_2: "loud noise",
      list_2_3: "non-sterile internal parts",
      list_2_4: "higher infection risk",
      list_2_5: "less accuracy",
      h2_3: "Comparison",
      p3_intro: "A detailed comparison of ear piercing methods will help you make the right choice. Below are the main differences between the Inverness Med medical system and the traditional piercing gun for ear piercing in Warsaw.",
      table_criterion: "Feature",
      table_inverness: "Inverness Med",
      table_gun: "Piercing Gun",
      p3_after: "As can be seen from the table, Inverness Med excels in all key safety and comfort parameters. This makes it the optimal choice for safe ear piercing in Warsaw, especially for children and people with sensitive skin.",
      criterion_1: "Mechanism",
      inverness_1: "Gentle pressure",
      gun_1: "Spring impact",
      criterion_2: "Sterility",
      inverness_2: "Full",
      gun_2: "Partial",
      criterion_3: "Pain",
      inverness_3: "Low",
      gun_3: "Higher",
      criterion_4: "Safe for babies",
      inverness_4: "✔",
      gun_4: "✖",
      criterion_5: "Healing",
      inverness_5: "Faster",
      gun_5: "Slower",
      h2_4: "Why Inverness Is Best for Children",
      p4_1: "Ear piercing for children requires special attention to safety and comfort. Inverness Med is the ideal solution for children from birth, as the system was specifically designed with the needs of the youngest patients in mind.",
      list_4_1: "quiet — child doesn't get scared",
      list_4_2: "minimal trauma — less stress",
      list_4_3: "hypoallergenic earrings — safe for sensitive skin",
      list_4_4: "accurate technique — fast healing",
      list_4_5: "full sterility — zero infection risk",
      p4_2: "In Warsaw, many parents choose Inverness Med for their children's ear piercing precisely because of these advantages. The procedure takes only a few seconds, and discomfort is minimal. More information about the ear piercing procedure in Warsaw can be found on our website.",
      h2_5: "Aftercare",
      p5_1: "Proper aftercare after ear piercing is the key to fast healing without complications. Regardless of the method chosen, following recommendations will help avoid infections and ensure optimal healing.",
      p5_2: "Full aftercare instructions for ear piercing are available on our website: ",
      aftercare_link: "https://gentlepiercing.pl/aftercare",
      p5_3: "Basic aftercare rules for ear piercing:",
      list_5_1: "don't touch ears with hands — always wash hands before touching",
      list_5_2: "clean with spray twice a day — morning and evening",
      list_5_3: "don't rotate earrings — this can damage healing tissue",
      list_5_4: "don't wet head for first 3 days — protection from bacteria in water",
      p5_4: "Healing after ear piercing with the Inverness Med system usually occurs faster than after using a gun, as the tissue is less damaged. The earlobe usually heals within 6-8 weeks, but this may vary depending on individual characteristics.",
      h2_6: "Conclusion",
      p6_1: "The comparison of Inverness Med and piercing gun for ear piercing clearly shows the advantages of the medical system. For anyone who values sterility, safety and comfort — <strong>Inverness Med is the safest ear piercing method in Warsaw.</strong>",
      p6_2: "At Gentle Piercing salon in Warsaw, we use exclusively the Inverness Med system for all our clients — from children 0+ to adults. This guarantees the highest level of safety, sterility and comfort during the ear piercing procedure. Our specialists have years of experience working with this system and are always ready to answer all your questions about safe ear piercing in Warsaw.",
      h2_7: "Book an appointment",
      p7_1: "Booksy → ",
      booksy_link: "https://booksy.com/pl-pl/dl/show-business/319418?utm_source=blog&utm_medium=cta&utm_campaign=invernessvsgun",
      p7_2: "Contact → ",
      contact_link: "tel:+48573818260",
      contact_text: "+48 573 818 260",
      cta: "Book a visit online",
      comparison_image_alt: "Safety comparison of Inverness Med system and regular piercing gun for ear piercing in Warsaw: sterility, hypoallergenic materials, safety for children"
    },
    ru: {
      h1: "Inverness Med или пистолет — что безопаснее?",
      intro: "В Варшаве прокол ушей обычно выполняется двумя методами: <strong>пистолетом</strong> или <strong>медицинской системой Inverness Med</strong>. Они существенно различаются уровнем безопасности и стерильности. Многие родители и взрослые спрашивают: какой способ прокалывания ушей безопаснее? Стоит ли выбирать Inverness Med или пистолет для прокалывания ушей в Варшаве? В этой статье мы подробно сравним оба метода, чтобы помочь вам сделать осознанный выбор для безопасного прокалывания ушей.",
      h2_1: "Что такое система Inverness Med?",
      p1_1: "<strong>Inverness Med</strong> — медицинская система из США, использующая мягкое ручное давление вместо ударного механизма. Эта медицинская система прокалывания ушей была разработана в США специально для обеспечения максимальной безопасности и стерильности во время процедуры.",
      p1_1b: "В отличие от обычного пистолета для прокалывания ушей, система Inverness Med использует одноразовые стерильные картриджи, которые содержат как иглу, так и серьгу. Это означает, что каждый элемент, контактирующий с кожей, полностью стерилен и используется только один раз. Такой подход к безопасному прокалыванию ушей в Варшаве обеспечивает нулевой риск перекрёстного заражения.",
      p1_2: "Официальный сайт производителя: ",
      inverness_link: "https://invernesscorp.com/",
      p1_3: "",
      h2_1b: "Преимущества:",
      list_1_1: "тихий прокол",
      list_1_2: "одноразовый стерильный картридж",
      list_1_3: "лазерная игла",
      list_1_4: "гипоаллергенные материалы",
      list_1_5: "FDA и REACH",
      list_1_6: "застёжка Safety Back",
      p1_4: "Система Inverness Med используется в более чем 70 странах мира и имеет более 50 лет опыта. Это единственная медицинская система прокалывания ушей, официально одобренная для детей от 0+ и взрослых. В Варшаве именно этот метод считается самым безопасным способом прокалывания ушей благодаря полной стерильности и минимальной травматизации тканей.",
      h2_2: "Как работает пистолет",
      p2_1: "Пистолет вводит серёжку в ухо резким ударом. Этот механизм использует пружину, которая создаёт резкий импульс. В отличие от Inverness Med, пистолет не может быть полностью стерилизован между процедурами, так как внутренние механизмы трудно очистить. Это создаёт риск перекрёстного заражения между клиентами.",
      p2_2: "Многие салоны в Варшаве всё ещё используют пистолеты из-за их низкой стоимости и простоты использования. Однако для безопасного прокалывания ушей, особенно для детей, этот метод не является оптимальным выбором.",
      h2_2b: "Недостатки:",
      list_2_1: "разрыв тканей",
      list_2_2: "громкий звук",
      list_2_3: "недостаточная стерильность",
      list_2_4: "риск инфекции",
      list_2_5: "низкая точность",
      h2_3: "Сравнение",
      p3_intro: "Детальное сравнение методов прокалывания ушей поможет сделать правильный выбор. Ниже приведены основные различия между медицинской системой Inverness Med и традиционным пистолетом для прокалывания ушей в Варшаве.",
      table_criterion: "Параметр",
      table_inverness: "Inverness Med",
      table_gun: "Пистолет",
      p3_after: "Как видно из таблицы, Inverness Med превосходит все ключевые параметры безопасности и комфорта. Это делает его оптимальным выбором для безопасного прокалывания ушей в Варшаве, особенно для детей и людей с чувствительной кожей.",
      criterion_1: "Механизм",
      inverness_1: "Мягкое давление",
      gun_1: "Удар",
      criterion_2: "Стерильность",
      inverness_2: "Полная",
      gun_2: "Частичная",
      criterion_3: "Боль",
      inverness_3: "Минимальная",
      gun_3: "Выше",
      criterion_4: "Детям 0+",
      inverness_4: "✔",
      gun_4: "✖",
      criterion_5: "Гоение",
      inverness_5: "Быстрее",
      gun_5: "Медленнее",
      h2_4: "Почему Inverness лучше для детей",
      p4_1: "Прокалывание ушей детям требует особого внимания к безопасности и комфорту. Inverness Med является идеальным решением для детей с рождения, так как система была специально разработана с учётом потребностей самых маленьких пациентов.",
      list_4_1: "тишина — ребёнок не пугается",
      list_4_2: "минимальная боль — меньше стресса",
      list_4_3: "точность — быстрое заживление",
      list_4_4: "безопасные материалы — подходят для чувствительной кожи",
      list_4_5: "полная стерильность — нулевой риск инфекции",
      p4_2: "В Варшаве многие родители выбирают Inverness Med для прокалывания ушей своим детям именно из-за этих преимуществ. Процедура длится всего несколько секунд, а дискомфорт минимален. Подробнее о процедуре прокалывания ушей в Варшаве можно узнать на нашем сайте.",
      h2_5: "Уход после прокола",
      p5_1: "Правильный уход после прокалывания ушей — это ключ к быстрому заживлению без осложнений. Независимо от выбранного метода, соблюдение рекомендаций поможет избежать инфекций и обеспечит оптимальное заживление.",
      p5_2: "Полная инструкция по уходу после прокалывания ушей доступна на нашем сайте: ",
      aftercare_link: "https://gentlepiercing.pl/aftercare",
      p5_3: "Основные правила ухода после прокалывания ушей:",
      list_5_1: "не трогать уши руками — всегда мыть руки перед прикосновением",
      list_5_2: "промывать спреем два раза в день — утром и вечером",
      list_5_3: "не крутить серьги — это может повредить заживающую ткань",
      list_5_4: "не мочить голову первые 3 дня — защита от бактерий в воде",
      p5_4: "Заживление после прокалывания ушей системой Inverness Med обычно происходит быстрее, чем после использования пистолета, так как ткань меньше повреждена. Мочка уха обычно заживает в течение 6-8 недель, но это может варьироваться в зависимости от индивидуальных особенностей.",
      h2_6: "Итог",
      p6_1: "Сравнение Inverness Med и пистолета для прокалывания ушей чётко показывает преимущества медицинской системы. Если важны безопасность и стерильность — <strong>Inverness Med — лучший способ прокола ушей в Варшаве.</strong>",
      p6_2: "В салоне Gentle Piercing в Варшаве мы используем исключительно систему Inverness Med для всех наших клиентов — от детей 0+ до взрослых. Это гарантирует высочайший уровень безопасности, стерильности и комфорта во время процедуры прокалывания ушей. Наши специалисты имеют многолетний опыт работы с этой системой и всегда готовы ответить на все ваши вопросы о безопасном прокалывании ушей в Варшаве.",
      h2_7: "Запись",
      p7_1: "Booksy → ",
      booksy_link: "https://booksy.com/pl-pl/dl/show-business/319418?utm_source=blog&utm_medium=cta&utm_campaign=invernessvsgun",
      p7_2: "Контакт → ",
      contact_link: "tel:+48573818260",
      contact_text: "+48 573 818 260",
      cta: "Забронируйте визит онлайн",
      comparison_image_alt: "Сравнение безопасности системы Inverness Med и обычного пистолета для прокалывания ушей в Варшаве: стерильность, гипоаллергенность, безопасность для детей"
    }
  };
  const t = content[currentLang] || content.en;
  const getBooksyUrl2 = () => {
    return `https://booksy.com/pl-pl/dl/show-business/319418?utm_source=blog&utm_medium=cta&utm_campaign=invernessvsgun`;
  };
  const criteria = [
    { criterion: t.criterion_1, inverness: t.inverness_1, gun: t.gun_1 },
    { criterion: t.criterion_2, inverness: t.inverness_2, gun: t.gun_2 },
    { criterion: t.criterion_3, inverness: t.inverness_3, gun: t.gun_3 },
    { criterion: t.criterion_4, inverness: t.inverness_4, gun: t.gun_4 },
    { criterion: t.criterion_5, inverness: t.inverness_5, gun: t.gun_5 },
    ...t.criterion_6 ? [{ criterion: t.criterion_6, inverness: t.inverness_6, gun: t.gun_6 }] : []
  ];
  return /* @__PURE__ */ jsxs("article", { className: "max-w-none", children: [
    /* @__PURE__ */ jsx("div", { className: "text-lg text-foreground mb-12 leading-relaxed", dangerouslySetInnerHTML: { __html: t.intro } }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_1 }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", dangerouslySetInnerHTML: { __html: t.p1_1 } }),
      t.p1_1b && /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p1_1b }),
      /* @__PURE__ */ jsxs("p", { className: "text-foreground mb-4", children: [
        t.p1_2,
        /* @__PURE__ */ jsx("a", { href: t.inverness_link, target: "_blank", rel: "nofollow noopener", className: "text-primary hover:underline", children: t.inverness_link }),
        t.p1_3
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-foreground mb-3 mt-8", children: t.h2_1b }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-6 space-y-2 text-foreground mb-4", children: [
        /* @__PURE__ */ jsx("li", { children: t.list_1_1 }),
        /* @__PURE__ */ jsx("li", { children: t.list_1_2 }),
        /* @__PURE__ */ jsx("li", { children: t.list_1_3 }),
        /* @__PURE__ */ jsx("li", { children: t.list_1_4 }),
        /* @__PURE__ */ jsx("li", { children: t.list_1_5 }),
        /* @__PURE__ */ jsx("li", { children: t.list_1_6 }),
        t.list_1_7 && /* @__PURE__ */ jsx("li", { children: t.list_1_7 })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p1_4 })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_2 }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", dangerouslySetInnerHTML: { __html: t.p2_1 } }),
      t.p2_2 && /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p2_2 }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-foreground mb-3 mt-6", children: t.h2_2b }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-6 space-y-2 text-foreground mb-4", children: [
        /* @__PURE__ */ jsx("li", { children: t.list_2_1 }),
        /* @__PURE__ */ jsx("li", { children: t.list_2_2 }),
        /* @__PURE__ */ jsx("li", { children: t.list_2_3 }),
        /* @__PURE__ */ jsx("li", { children: t.list_2_4 }),
        /* @__PURE__ */ jsx("li", { children: t.list_2_5 }),
        t.list_2_6 && /* @__PURE__ */ jsx("li", { children: t.list_2_6 })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_3 }),
      t.p3_intro && /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p3_intro }),
      /* @__PURE__ */ jsx("div", { className: "w-full mb-6 rounded-xl overflow-hidden shadow-lg max-w-2xl mx-auto", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: comparisonImage,
          alt: t.comparison_image_alt,
          className: "w-full h-auto object-cover",
          loading: "lazy",
          decoding: "async",
          width: "800",
          height: "800",
          title: t.comparison_image_alt
        }
      ) }),
      /* @__PURE__ */ jsx(
        ComparisonTable,
        {
          criteria,
          headers: {
            col1: t.table_criterion,
            col2: t.table_inverness,
            col3: t.table_gun
          }
        }
      ),
      t.p3_after && /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4 mt-4", children: t.p3_after })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_4 }),
      t.p4_1 && /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p4_1 }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-6 space-y-2 text-foreground mb-4", children: [
        /* @__PURE__ */ jsx("li", { children: t.list_4_1 }),
        /* @__PURE__ */ jsx("li", { children: t.list_4_2 }),
        /* @__PURE__ */ jsx("li", { children: t.list_4_3 }),
        /* @__PURE__ */ jsx("li", { children: t.list_4_4 }),
        t.list_4_5 && /* @__PURE__ */ jsx("li", { children: t.list_4_5 })
      ] }),
      t.p4_2 && /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p4_2 })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_5 }),
      t.p5_1 && /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p5_1 }),
      /* @__PURE__ */ jsxs("p", { className: "text-foreground mb-4", children: [
        t.p5_2,
        /* @__PURE__ */ jsx(Link, { to: `/${currentLang}/aftercare`, className: "text-primary hover:underline", children: currentLang === "pl" ? "instrukcja" : currentLang === "uk" ? "інструкція" : currentLang === "ru" ? "инструкция" : "instructions" })
      ] }),
      t.p5_3 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { className: "text-foreground mb-2 font-semibold", children: t.p5_3 }),
        /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-6 space-y-2 text-foreground mb-4", children: [
          t.list_5_1 && /* @__PURE__ */ jsx("li", { children: t.list_5_1 }),
          t.list_5_2 && /* @__PURE__ */ jsx("li", { children: t.list_5_2 }),
          t.list_5_3 && /* @__PURE__ */ jsx("li", { children: t.list_5_3 }),
          t.list_5_4 && /* @__PURE__ */ jsx("li", { children: t.list_5_4 })
        ] })
      ] }),
      t.p5_4 && /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p5_4 })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_6 }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", dangerouslySetInnerHTML: { __html: t.p6_1 } }),
      t.p6_2 && /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p6_2 })
    ] }),
    /* @__PURE__ */ jsx(
      BlogArticleCTA,
      {
        currentLang,
        articleId: "inverness-vs-gun",
        getBooksyUrl: getBooksyUrl2
      }
    )
  ] });
};
const ArticleChildrenAge = ({ currentLang }) => {
  const content = {
    pl: {
      h1: "Od jakiego wieku można przekłuwać uszy dziecku? Inverness Med dla dzieci 0+",
      intro: 'Pytanie "od jakiego wieku można przekłuwać uszy dziecku?" to jedna z najczęstszych wątpliwości rodziców w Warszawie. Jedni przekłuwają uszy niemowlętom, inni czekają aż dziecko samo podejmie decyzję. Odpowiedź jest prosta: system Inverness Med jest certyfikowany dla dzieci od 0+, co oznacza, że przekłuwanie uszu jest bezpieczne w każdym wieku przy użyciu odpowiedniej metody.',
      h2_1: "Czy można bezpiecznie przekłuwać uszy niemowlętom?",
      p1_1: "Tak, przekłuwanie uszu niemowlętom jest możliwe i bezpieczne. System Inverness Med został zaprojektowany w USA specjalnie z myślą o najmłodszych pacjentach i posiada certyfikat FDA zatwierdzający jego stosowanie u dzieci od pierwszych dni życia.",
      p1_2: "W przeciwieństwie do tradycyjnych pistoletów, Inverness Med zapewnia:",
      list_1_1: 'ciche działanie bez głośnego "strzału" który straszy dzieci',
      list_1_2: "delikatny nacisk ręczny zamiast gwałtownego uderzenia sprężyny",
      list_1_3: "w pełni sterylne jednorazowe kartridże",
      list_1_4: "hipoalergiczne materiały bezpieczne dla wrażliwej skóry niemowląt",
      p1_3: "Według Amerykańskiej Akademii Pediatrii (AAP) nie ma minimalnego wieku do przekłuwania uszu, pod warunkiem stosowania sterylnej, medycznej metody i właściwej pielęgnacji.",
      p1_4: "Więcej o różnicach między metodami: ",
      inverness_link: "Inverness Med vs pistolet – co jest bezpieczniejsze?",
      h2_2: "Wiek a przekłuwanie uszu – co wybrać?",
      p2_1: "Wybór odpowiedniego wieku zależy od indywidualnych preferencji rodziny. Oto szczegółowe zestawienie zalet i wad dla różnych grup wiekowych:",
      h3_1: "Niemowlęta (0-12 miesięcy)",
      table_1_advantages: "Zalety",
      table_1_disadvantages: "Wady",
      table_1_adv_1: "Dziecko nie pamięta dyskomfortu",
      table_1_dis_1: "Wymaga pilnowania podczas gojenia",
      table_1_adv_2: "Rodzice mają pełną kontrolę nad pielęgnacją",
      table_1_dis_2: "Niemowlę nie wyraża własnej zgody",
      table_1_adv_3: "Szybsze gojenie dzięki młodym tkankom",
      table_1_dis_3: "Możliwość alergii (choć rzadka)",
      table_1_adv_4: "Mniejsze ryzyko wyrwania kolczyka",
      table_1_best: "Najlepsze dla: Rodziców, którzy chcą tradycyjnie przekłuć uszy we wczesnym wieku i są gotowi do systematycznej pielęgnacji.",
      h3_2: "Małe dzieci (1-5 lat)",
      table_2_adv_1: "Dzieci mogą wyrazić chęć posiadania kolczyków",
      table_2_dis_1: "Mogą przypadkowo pociągnąć za kolczyk",
      table_2_adv_2: "Wciąż szybkie gojenie",
      table_2_dis_2: "Trudniej wyjaśnić zasady pielęgnacji",
      table_2_adv_3: "Rodzice kontrolują proces pielęgnacji",
      table_2_dis_3: "Strach przed zabiegiem (zależy od dziecka)",
      table_2_best: "Najlepsze dla: Rodziców, którzy chcą poczekać aż dziecko przejawi zainteresowanie, ale wciąż zachować kontrolę nad pielęgnacją.",
      h3_3: "Starsze dzieci (6+ lat)",
      table_3_adv_1: "Świadoma decyzja dziecka",
      table_3_dis_1: "Większa świadomość = czasem większy strach",
      table_3_adv_2: "Może samo dbać o higienę (pod nadzorem)",
      table_3_dis_2: "Może zmienić zdanie po zabiegu",
      table_3_adv_3: "Mniejsze ryzyko utraty kolczyków",
      table_3_adv_4: "Może wybrać preferowany wzór",
      table_3_best: "Najlepsze dla: Rodziców, którzy chcą aby dziecko samo podjęło świadomą decyzję i uczestniczyło w pielęgnacji.",
      h2_3: "Najpopularniejszy wybór rodziców w Warszawie",
      p3_1: "Na podstawie naszego doświadczenia w Gentle Piercing, rodzice najczęściej wybierają:",
      h3_4: "Wczesny wiek (3-6 miesięcy)",
      quote_1: '"Przekłułyśmy córce uszy w 4. miesiącu. Płakała tylko przez chwilę i szybko zapomniała. Teraz ma 3 lata i cieszę się, że nie musiała przechodzić przez to świadomie."',
      h3_5: "Wiek przedszkolny (5-7 lat)",
      quote_2: '"Czekaliśmy aż córka sama poprosi. W wieku 6 lat była dumna ze swoich kolczyków i odpowiedzialnie podchodziła do pielęgnacji."',
      h3_6: "Przed szkołą",
      quote_3: '"Przekłułyśmy tuż przed pierwszą klasą, żeby miała czas na wygojenie podczas wakacji."',
      h2_4: "Kiedy NIE przekłuwać uszu – przeciwskazania",
      p4_1: "Niezależnie od wybranego wieku, istnieją sytuacje, w których należy odłożyć zabieg:",
      list_4_1: "Aktywne infekcje skóry lub egzema w okolicy uszu",
      list_4_2: "Gorączka, przeziębienie lub osłabienie organizmu",
      list_4_3: "Bezpośrednio po szczepieniach (odczekaj 2-3 dni)",
      list_4_4: "Zaburzenia krzepnięcia krwi (konsultacja z lekarzem)",
      list_4_5: "Silna potwierdzona alergia na metale",
      p4_2: "Przed zabiegiem warto skonsultować się z pediatrą, zwłaszcza jeśli dziecko ma problemy zdrowotne lub alergiczne.",
      h2_5: "Dlaczego Inverness Med jest bezpieczny dla każdego wieku?",
      p5_1: "System Inverness Med wyróżnia się cechami szczególnie ważnymi dla bezpieczeństwa dzieci:",
      list_5_1: "Pełna sterylność – kartridż jednorazowego użytku eliminuje ryzyko zakażeń",
      list_5_2: 'Cisza – brak głośnego "strzału" nie straszy najmłodszych',
      list_5_3: "Minimalna trauma – delikatny nacisk zamiast uderzenia = mniejszy ból i szybsze gojenie",
      list_5_4: "Safety Back – specjalna zatyczka zapobiega przypadkowemu ściągnięciu przez dziecko",
      list_5_5: "Certyfikaty FDA i REACH – medyczne materiały hipoalergiczne (tytan, 24k złoto)",
      list_5_6: "Laserowa precyzja – cieńsza igła = szybsza regeneracja tkanek",
      p5_2: "Oficjalna strona producenta: ",
      inverness_website: "https://invernesscorp.com/",
      p5_3: "Szczegółowe porównanie metod: ",
      comparison_link: "Inverness Med vs pistolet – bezpieczne przekłuwanie uszu",
      h2_6: "Jak przygotować dziecko do zabiegu?",
      h3_7: "Dla niemowląt:",
      list_6_1: "Wybierz porę gdy dziecko jest wypoczęte i spokojne",
      list_6_2: "Przygotuj ulubioną zabawkę lub smoczek",
      list_6_3: "Po zabiegu przytul i uspokój dziecko",
      h3_8: "Dla starszych dzieci:",
      list_6_4: "Wyjaśnij że zabieg jest szybki (kilka sekund) i podobny do szczypnięcia",
      list_6_5: "Pozwól wybrać kolczyki z dostępnej oferty medycznej",
      list_6_6: "Pochwal dzielność po zabiegu",
      list_6_7: "Wyjaśnij zasady pielęgnacji w prosty sposób",
      h2_7: "Co po przekłuciu – podstawy pielęgnacji",
      p7_1: "Właściwa pielęgnacja to klucz do szybkiego gojenia bez powikłań:",
      list_7_1: "Przemywaj uszy specjalnym sprayem 2 razy dziennie",
      list_7_2: "Zawsze myj ręce przed dotknięciem uszu",
      list_7_3: "NIE obracaj kolczyków – to przestarzały mit",
      list_7_4: "Przez pierwsze 3 dni unikaj moczenia głowy",
      list_7_5: "Nie zdejmuj kolczyków przez minimum 6-8 tygodni",
      p7_2: "Dla rodziców małych dzieci:",
      list_7_6: "Sprawdzaj zatyczki codziennie – dzieci mogą je nieświadomie poluzować",
      list_7_7: "Uważaj podczas ubierania (bluzki przez głowę)",
      list_7_8: "Obserwuj oznaki infekcji: silny obrzęk, wydzielina, gorączka",
      p7_3: "Szczegółowa instrukcja: ",
      aftercare_link: "Pielęgnacja po przekłuciu uszu – kompletny poradnik",
      h2_8: "Najczęściej zadawane pytania",
      faq_1_q: "Czy przekłuwanie uszu niemowlętom boli?",
      faq_1_a: "Zabieg trwa kilka sekund. Niemowlęta mogą krótko płakać, ale dyskomfort mija bardzo szybko. System Inverness Med jest najbardziej delikatną dostępną metodą.",
      faq_2_q: "Ile kosztuje przekłucie uszu dziecku w Warszawie?",
      faq_2_a: "Ceny zaczynają się od 150 zł i zależą od wybranego rodzaju kolczyków (tytan, złoto, stal chirurgiczna). Koszt obejmuje zabieg, sterylny kartridż i instrukcję pielęgnacji.",
      faq_3_q: "Jak długo goi się ucho u dziecka?",
      faq_3_a: "Płatek ucha zwykle goi się w ciągu 6-8 tygodni. U niemowląt proces może być nieco szybszy dzięki lepszej regeneracji tkanek.",
      faq_4_q: "Co zrobić jeśli dziecko ma alergię na nikiel?",
      faq_4_a: "Wybierz kolczyki z tytanu medycznego lub 24-karatowego złota – są całkowicie wolne od niklu i bezpieczne dla alergików.",
      faq_5_q: "Czy mogę kąpać dziecko po przekłuciu?",
      faq_5_a: "Przez pierwsze 3 dni unikaj moczenia uszu. Następnie możesz normalnie kąpać dziecko, ale po kąpieli osusz uszy i przemyj sterylnym roztworem.",
      faq_6_q: "Czy można przekłuć uszy przed pójściem do przedszkola?",
      faq_6_a: "Nie ma przeciwskazań medycznych. Zalecamy przekłuwanie kilka dni przed powrotem do placówki, aby dziecko miało czas na spokojną adaptację w domu.",
      h2_9: "Podsumowanie – wybierz najlepszy moment dla swojej rodziny",
      p9_1: "Nie ma jednej prawidłowej odpowiedzi na pytanie od jakiego wieku można przekłuwać uszy dziecku. System Inverness Med jest certyfikowany dla dzieci od 0+, więc decyzja należy do rodziców.",
      p9_2: "Kluczowe czynniki przy wyborze:",
      list_9_1: "Stosuj wyłącznie medyczny system (Inverness Med), nigdy zwykły pistolet",
      list_9_2: "Upewnij się że dziecko jest zdrowe i nie ma przeciwskazań",
      list_9_3: "Bądź gotowy na systematyczną pielęgnację przez 6-8 tygodni",
      list_9_4: "Dla starszych dzieci uwzględnij ich własną chęć i gotowość",
      p9_3: "W Gentle Piercing w Warszawie przekłuwamy uszy dzieci każdego wieku z troską o bezpieczeństwo i komfort. Używamy wyłącznie systemu Inverness Med i zapewniamy pełne wsparcie przed i po zabiegu.",
      h2_10: "Rezerwacja",
      p10_1: "Umów wizytę już dziś:",
      booksy_text: "Booksy",
      booksy_link: "https://booksy.com/pl-pl/dl/show-business/319418?utm_source=blog&utm_medium=cta&utm_campaign=children_age",
      phone_text: "Telefon",
      phone_number: "+48 573 818 260",
      phone_link: "tel:+48573818260",
      related_articles: "Powiązane artykuły:",
      related_1: "Inverness Med vs pistolet – co jest bezpieczniejsze?",
      related_2: "Czy przekłuwanie uszu boli?",
      cta: "Zarezerwuj wizytę online"
    },
    uk: {
      h1: "З якого віку можна проколювати вуха дитині? Inverness Med для дітей 0+",
      intro: 'Питання "з якого віку можна проколювати вуха дитині?" — одна з найчастіших сумнівів батьків у Варшаві. Одні проколюють вуха немовлятам, інші чекають, поки дитина сама прийме рішення. Відповідь проста: система Inverness Med сертифікована для дітей від 0+, що означає, що проколювання вух безпечне в будь-якому віці при використанні відповідного методу.',
      h2_1: "Чи можна безпечно проколювати вуха немовлятам?",
      p1_1: "Так, проколювання вух немовлятам можливе та безпечне. Система Inverness Med була розроблена в США спеціально для наймолодших пацієнтів і має сертифікат FDA, що затверджує її використання у дітей від перших днів життя.",
      p1_2: "На відміну від традиційних пістолетів, Inverness Med забезпечує:",
      list_1_1: 'тиху роботу без гучного "пострілу", який лякає дітей',
      list_1_2: "делікатний ручний тиск замість різкого удару пружини",
      list_1_3: "повністю стерильні одноразові картриджі",
      list_1_4: "гіпоалергенні матеріали, безпечні для чутливої шкіри немовлят",
      p1_3: "Згідно з Американською академією педіатрії (AAP), немає мінімального віку для проколу вух за умови використання стерильного медичного методу та належного догляду.",
      p1_4: "Більше про відмінності між методами: ",
      inverness_link: "Inverness Med vs пістолет – що безпечніше?",
      h2_2: "Вік та прокол вух – що обрати?",
      p2_1: "Вибір відповідного віку залежить від індивідуальних уподобань сім'ї. Ось детальне порівняння переваг та недоліків для різних вікових груп:",
      h3_1: "Немовлята (0-12 місяців)",
      table_1_advantages: "Переваги",
      table_1_disadvantages: "Недоліки",
      table_1_adv_1: "Дитина не пам'ятає дискомфорту",
      table_1_dis_1: "Потребує нагляду під час загоєння",
      table_1_adv_2: "Батьки мають повний контроль над доглядом",
      table_1_dis_2: "Немовля не висловлює власної згоди",
      table_1_adv_3: "Швидше загоєння завдяки молодим тканинам",
      table_1_dis_3: "Можливість алергії (хоча рідко)",
      table_1_adv_4: "Менший ризик виривання сережки",
      table_1_best: "Найкраще для: Батьків, які хочуть традиційно проколоти вуха в ранньому віці та готові до систематичного догляду.",
      h3_2: "Маленькі діти (1-5 років)",
      table_2_adv_1: "Діти можуть висловити бажання мати сережки",
      table_2_dis_1: "Можуть випадково потягнути за сережку",
      table_2_adv_2: "Все ще швидке загоєння",
      table_2_dis_2: "Важче пояснити правила догляду",
      table_2_adv_3: "Батьки контролюють процес догляду",
      table_2_dis_3: "Страх перед процедурою (залежить від дитини)",
      table_2_best: "Найкраще для: Батьків, які хочуть почекати, поки дитина проявить інтерес, але все ще зберігати контроль над доглядом.",
      h3_3: "Старші діти (6+ років)",
      table_3_adv_1: "Свідоме рішення дитини",
      table_3_dis_1: "Більша свідомість = іноді більший страх",
      table_3_adv_2: "Може самостійно доглядати за гігієною (під наглядом)",
      table_3_dis_2: "Може змінити думку після процедури",
      table_3_adv_3: "Менший ризик втрати сережок",
      table_3_adv_4: "Може обрати бажаний дизайн",
      table_3_best: "Найкраще для: Батьків, які хочуть, щоб дитина сама прийняла свідоме рішення та брала участь у догляді.",
      h2_3: "Найпопулярніший вибір батьків у Варшаві",
      p3_1: "На основі нашого досвіду в Gentle Piercing, батьки найчастіше обирають:",
      h3_4: "Ранній вік (3-6 місяців)",
      quote_1: '"Прокололи доньці вуха в 4 місяці. Вона плакала лише хвилину і швидко забула. Зараз їй 3 роки, і я рада, що їй не довелося проходити через це свідомо."',
      h3_5: "Дошкільний вік (5-7 років)",
      quote_2: '"Чекали, поки донька сама попросить. У 6 років вона була горда зі своїх сережок і відповідально ставилася до догляду."',
      h3_6: "Перед школою",
      quote_3: '"Прокололи безпосередньо перед першим класом, щоб вона мала час на загоєння під час канікул."',
      h2_4: "Коли НЕ проколювати вуха – протипоказання",
      p4_1: "Незалежно від обраного віку, існують ситуації, коли слід відкласти процедуру:",
      list_4_1: "Активні інфекції шкіри або екзема в області вух",
      list_4_2: "Гарячка, застуда або ослаблення організму",
      list_4_3: "Безпосередньо після щеплень (зачекайте 2-3 дні)",
      list_4_4: "Порушення згортання крові (консультація з лікарем)",
      list_4_5: "Сильна підтверджена алергія на метали",
      p4_2: "Перед процедурою варто проконсультуватися з педіатром, особливо якщо дитина має проблеми зі здоров'ям або алергічні.",
      h2_5: "Чому Inverness Med безпечний для будь-якого віку?",
      p5_1: "Система Inverness Med відрізняється особливостями, важливими для безпеки дітей:",
      list_5_1: "Повна стерильність – картридж одноразового використання усуває ризик інфекцій",
      list_5_2: 'Тиша – відсутність гучного "пострілу" не лякає наймолодших',
      list_5_3: "Мінімальна травма – деликатний тиск замість удару = менший біль і швидше загоєння",
      list_5_4: "Safety Back – спеціальна заглушка запобігає випадковому зняттю дитиною",
      list_5_5: "Сертифікати FDA та REACH – медичні гіпоалергенні матеріали (титан, 24k золото)",
      list_5_6: "Лазерна точність – тонша голка = швидша регенерація тканин",
      p5_2: "Офіційний сайт виробника: ",
      inverness_website: "https://invernesscorp.com/",
      p5_3: "Детальне порівняння методів: ",
      comparison_link: "Inverness Med vs пістолет – безпечне проколювання вух",
      h2_6: "Як підготувати дитину до процедури?",
      h3_7: "Для немовлят:",
      list_6_1: "Оберіть час, коли дитина відпочила та спокійна",
      list_6_2: "Підготуйте улюблену іграшку або соску",
      list_6_3: "Після процедури обійміть та заспокойте дитину",
      h3_8: "Для старших дітей:",
      list_6_4: "Поясніть, що процедура швидка (кілька секунд) і схожа на щипок",
      list_6_5: "Дозвольте обрати сережки з доступної медичної пропозиції",
      list_6_6: "Похваліть хоробрість після процедури",
      list_6_7: "Поясніть правила догляду простою мовою",
      h2_7: "Що після проколу – основи догляду",
      p7_1: "Правильний догляд – це ключ до швидкого загоєння без ускладнень:",
      list_7_1: "Обмивайте вуха спеціальним спреєм 2 рази на день",
      list_7_2: "Завжди мийте руки перед дотиком до вух",
      list_7_3: "НЕ обертайте сережки – це застарілий міф",
      list_7_4: "Перші 3 дні уникайте змочування голови",
      list_7_5: "Не знімайте сережки мінімум 6-8 тижнів",
      p7_2: "Для батьків маленьких дітей:",
      list_7_6: "Перевіряйте заглушки щодня – діти можуть їх несвідомо послабити",
      list_7_7: "Обережно під час одягання (блузки через голову)",
      list_7_8: "Спостерігайте за ознаками інфекції: сильний набряк, виділення, гарячка",
      p7_3: "Детальна інструкція: ",
      aftercare_link: "Догляд після проколу вух – повний посібник",
      h2_8: "Найчастіші питання",
      faq_1_q: "Чи болить прокол вух немовлятам?",
      faq_1_a: "Процедура триває кілька секунд. Немовлята можуть коротко плакати, але дискомфорт швидко минає. Система Inverness Med є найбільш деликатним доступним методом.",
      faq_2_q: "Скільки коштує прокол вух дитині у Варшаві?",
      faq_2_a: "Ціни починаються від 150 злотих і залежать від обраного типу сережок (титан, золото, хірургічна сталь). Вартість включає процедуру, стерильний картридж та інструкцію з догляду.",
      faq_3_q: "Як довго загоюється вухо у дитини?",
      faq_3_a: "Мочка вуха зазвичай загоюється протягом 6-8 тижнів. У немовлят процес може бути трохи швидшим завдяки кращій регенерації тканин.",
      faq_4_q: "Що робити, якщо дитина має алергію на нікель?",
      faq_4_a: "Оберіть сережки з медичного титану або 24-каратного золота – вони повністю вільні від нікелю та безпечні для алергіків.",
      faq_5_q: "Чи можу я купати дитину після проколу?",
      faq_5_a: "Перші 3 дні уникайте змочування вух. Потім ви можете нормально купати дитину, але після купання висушіть вуха та обмийте стерильним розчином.",
      faq_6_q: "Чи можна проколоти вуха перед відвідуванням дитячого садка?",
      faq_6_a: "Немає медичних протипоказань. Рекомендуємо проколювати за кілька днів до повернення до закладу, щоб дитина мала час на спокійну адаптацію вдома.",
      h2_9: "Підсумок – оберіть найкращий момент для вашої сім'ї",
      p9_1: "Немає однієї правильної відповіді на питання, з якого віку можна проколювати вуха дитині. Система Inverness Med сертифікована для дітей від 0+, тому рішення належить батькам.",
      p9_2: "Ключові фактори при виборі:",
      list_9_1: "Використовуйте виключно медичну систему (Inverness Med), ніколи звичайний пістолет",
      list_9_2: "Переконайтеся, що дитина здорова і немає протипоказань",
      list_9_3: "Будьте готові до систематичного догляду протягом 6-8 тижнів",
      list_9_4: "Для старших дітей враховуйте їхню власну бажання та готовність",
      p9_3: "У Gentle Piercing у Варшаві ми проколюємо вуха дітям будь-якого віку з турботою про безпеку та комфорт. Використовуємо виключно систему Inverness Med та забезпечуємо повну підтримку до та після процедури.",
      h2_10: "Резервація",
      p10_1: "Запишіться на візит вже сьогодні:",
      booksy_text: "Booksy",
      booksy_link: "https://booksy.com/pl-pl/dl/show-business/319418?utm_source=blog&utm_medium=cta&utm_campaign=children_age",
      phone_text: "Телефон",
      phone_number: "+48 573 818 260",
      phone_link: "tel:+48573818260",
      related_articles: "Пов'язані статті:",
      related_1: "Inverness Med vs пістолет – що безпечніше?",
      related_2: "Чи болить прокол вух?",
      cta: "Зарезервуйте візит онлайн"
    },
    ru: {
      h1: "С какого возраста можно прокалывать уши ребенку? Inverness Med для детей 0+",
      intro: 'Вопрос "с какого возраста можно прокалывать уши ребенку?" — один из самых частых сомнений родителей в Варшаве. Одни прокалывают уши младенцам, другие ждут, пока ребенок сам примет решение. Ответ прост: система Inverness Med сертифицирована для детей от 0+, что означает, что прокалывание ушей безопасно в любом возрасте при использовании правильного метода.',
      h2_1: "Можно ли безопасно прокалывать уши младенцам?",
      p1_1: "Да, прокалывание ушей младенцам возможно и безопасно. Система Inverness Med была разработана в США специально для самых маленьких пациентов и имеет сертификат FDA, одобряющий её использование у детей с первых дней жизни.",
      p1_2: "В отличие от традиционных пистолетов, Inverness Med обеспечивает:",
      list_1_1: 'тихую работу без громкого "выстрела", который пугает детей',
      list_1_2: "деликатное ручное давление вместо резкого удара пружины",
      list_1_3: "полностью стерильные одноразовые картриджи",
      list_1_4: "гипоаллергенные материалы, безопасные для чувствительной кожи младенцев",
      p1_3: "Согласно Американской академии педиатрии (AAP), нет минимального возраста для прокалывания ушей при условии использования стерильного медицинского метода и надлежащего ухода.",
      p1_4: "Больше о различиях между методами: ",
      inverness_link: "Inverness Med или пистолет – что безопаснее?",
      h2_2: "Возраст и прокалывание ушей – что выбрать?",
      p2_1: "Выбор подходящего возраста зависит от индивидуальных предпочтений семьи. Вот детальное сравнение преимуществ и недостатков для разных возрастных групп:",
      h3_1: "Младенцы (0-12 месяцев)",
      table_1_advantages: "Преимущества",
      table_1_disadvantages: "Недостатки",
      table_1_adv_1: "Ребенок не помнит дискомфорта",
      table_1_dis_1: "Требует присмотра во время заживления",
      table_1_adv_2: "Родители имеют полный контроль над уходом",
      table_1_dis_2: "Младенец не выражает собственного согласия",
      table_1_adv_3: "Быстрее заживление благодаря молодым тканям",
      table_1_dis_3: "Возможность аллергии (хотя редко)",
      table_1_adv_4: "Меньший риск вырывания серьги",
      table_1_best: "Лучше для: Родителей, которые хотят традиционно проколоть уши в раннем возрасте и готовы к систематическому уходу.",
      h3_2: "Маленькие дети (1-5 лет)",
      table_2_adv_1: "Дети могут выразить желание иметь серьги",
      table_2_dis_1: "Могут случайно потянуть за серьгу",
      table_2_adv_2: "Все еще быстрое заживление",
      table_2_dis_2: "Сложнее объяснить правила ухода",
      table_2_adv_3: "Родители контролируют процесс ухода",
      table_2_dis_3: "Страх перед процедурой (зависит от ребенка)",
      table_2_best: "Лучше для: Родителей, которые хотят подождать, пока ребенок проявит интерес, но все еще сохранить контроль над уходом.",
      h3_3: "Старшие дети (6+ лет)",
      table_3_adv_1: "Сознательное решение ребенка",
      table_3_dis_1: "Большая осознанность = иногда больший страх",
      table_3_adv_2: "Может самостоятельно ухаживать за гигиеной (под надзором)",
      table_3_dis_2: "Может передумать после процедуры",
      table_3_adv_3: "Меньший риск потери сережек",
      table_3_adv_4: "Может выбрать предпочитаемый дизайн",
      table_3_best: "Лучше для: Родителей, которые хотят, чтобы ребенок сам принял сознательное решение и участвовал в уходе.",
      h2_3: "Самый популярный выбор родителей в Варшаве",
      p3_1: "На основе нашего опыта в Gentle Piercing, родители чаще всего выбирают:",
      h3_4: "Ранний возраст (3-6 месяцев)",
      quote_1: '"Прокололи дочери уши в 4 месяца. Она плакала только минуту и быстро забыла. Сейчас ей 3 года, и я рада, что ей не пришлось проходить через это сознательно."',
      h3_5: "Дошкольный возраст (5-7 лет)",
      quote_2: '"Ждали, пока дочь сама попросит. В 6 лет она была горда своими серьгами и ответственно относилась к уходу."',
      h3_6: "Перед школой",
      quote_3: '"Прокололи непосредственно перед первым классом, чтобы она имела время на заживление во время каникул."',
      h2_4: "Когда НЕ прокалывать уши – противопоказания",
      p4_1: "Независимо от выбранного возраста, существуют ситуации, когда следует отложить процедуру:",
      list_4_1: "Активные инфекции кожи или экзема в области ушей",
      list_4_2: "Лихорадка, простуда или ослабление организма",
      list_4_3: "Непосредственно после прививок (подождите 2-3 дня)",
      list_4_4: "Нарушения свертывания крови (консультация с врачом)",
      list_4_5: "Сильная подтвержденная аллергия на металлы",
      p4_2: "Перед процедурой стоит проконсультироваться с педиатром, особенно если у ребенка есть проблемы со здоровьем или аллергические.",
      h2_5: "Почему Inverness Med безопасен для любого возраста?",
      p5_1: "Система Inverness Med отличается особенностями, важными для безопасности детей:",
      list_5_1: "Полная стерильность – картридж одноразового использования устраняет риск инфекций",
      list_5_2: 'Тишина – отсутствие громкого "выстрела" не пугает самых маленьких',
      list_5_3: "Минимальная травма – деликатное давление вместо удара = меньше боли и быстрее заживление",
      list_5_4: "Safety Back – специальная заглушка предотвращает случайное снятие ребенком",
      list_5_5: "Сертификаты FDA и REACH – медицинские гипоаллергенные материалы (титан, 24k золото)",
      list_5_6: "Лазерная точность – более тонкая игла = быстрее регенерация тканей",
      p5_2: "Официальный сайт производителя: ",
      inverness_website: "https://invernesscorp.com/",
      p5_3: "Детальное сравнение методов: ",
      comparison_link: "Inverness Med или пистолет – безопасное прокалывание ушей",
      h2_6: "Как подготовить ребенка к процедуре?",
      h3_7: "Для младенцев:",
      list_6_1: "Выберите время, когда ребенок отдохнул и спокоен",
      list_6_2: "Подготовьте любимую игрушку или соску",
      list_6_3: "После процедуры обнимите и успокойте ребенка",
      h3_8: "Для старших детей:",
      list_6_4: "Объясните, что процедура быстрая (несколько секунд) и похожа на щипок",
      list_6_5: "Позвольте выбрать серьги из доступного медицинского ассортимента",
      list_6_6: "Похвалите смелость после процедуры",
      list_6_7: "Объясните правила ухода простым языком",
      h2_7: "Что после прокола – основы ухода",
      p7_1: "Правильный уход – это ключ к быстрому заживлению без осложнений:",
      list_7_1: "Промывайте уши специальным спреем 2 раза в день",
      list_7_2: "Всегда мойте руки перед прикосновением к ушам",
      list_7_3: "НЕ крутите серьги – это устаревший миф",
      list_7_4: "Первые 3 дня избегайте намокания головы",
      list_7_5: "Не снимайте серьги минимум 6-8 недель",
      p7_2: "Для родителей маленьких детей:",
      list_7_6: "Проверяйте заглушки ежедневно – дети могут их неосознанно ослабить",
      list_7_7: "Осторожно при одевании (блузки через голову)",
      list_7_8: "Наблюдайте за признаками инфекции: сильный отек, выделения, лихорадка",
      p7_3: "Детальная инструкция: ",
      aftercare_link: "Уход после прокалывания ушей – полное руководство",
      h2_8: "Часто задаваемые вопросы",
      faq_1_q: "Больно ли прокалывать уши младенцам?",
      faq_1_a: "Процедура длится несколько секунд. Младенцы могут кратко плакать, но дискомфорт быстро проходит. Система Inverness Med является самым деликатным доступным методом.",
      faq_2_q: "Сколько стоит прокалывание ушей ребенку в Варшаве?",
      faq_2_a: "Цены начинаются от 150 злотых и зависят от выбранного типа сережек (титан, золото, хирургическая сталь). Стоимость включает процедуру, стерильный картридж и инструкцию по уходу.",
      faq_3_q: "Как долго заживает ухо у ребенка?",
      faq_3_a: "Мочка уха обычно заживает в течение 6-8 недель. У младенцев процесс может быть немного быстрее благодаря лучшей регенерации тканей.",
      faq_4_q: "Что делать, если у ребенка аллергия на никель?",
      faq_4_a: "Выберите серьги из медицинского титана или 24-каратного золота – они полностью свободны от никеля и безопасны для аллергиков.",
      faq_5_q: "Могу ли я купать ребенка после прокола?",
      faq_5_a: "Первые 3 дня избегайте намокания ушей. Затем вы можете нормально купать ребенка, но после купания высушите уши и промойте стерильным раствором.",
      faq_6_q: "Можно ли прокалывать уши перед посещением детского сада?",
      faq_6_a: "Нет медицинских противопоказаний. Рекомендуем прокалывать за несколько дней до возвращения в учреждение, чтобы ребенок имел время на спокойную адаптацию дома.",
      h2_9: "Резюме – выберите лучший момент для вашей семьи",
      p9_1: "Нет одного правильного ответа на вопрос, с какого возраста можно прокалывать уши ребенку. Система Inverness Med сертифицирована для детей от 0+, поэтому решение принадлежит родителям.",
      p9_2: "Ключевые факторы при выборе:",
      list_9_1: "Используйте исключительно медицинскую систему (Inverness Med), никогда обычный пистолет",
      list_9_2: "Убедитесь, что ребенок здоров и нет противопоказаний",
      list_9_3: "Будьте готовы к систематическому уходу в течение 6-8 недель",
      list_9_4: "Для старших детей учитывайте их собственное желание и готовность",
      p9_3: "В Gentle Piercing в Варшаве мы прокалываем уши детям любого возраста с заботой о безопасности и комфорте. Используем исключительно систему Inverness Med и обеспечиваем полную поддержку до и после процедуры.",
      h2_10: "Запись",
      p10_1: "Запишитесь на визит уже сегодня:",
      booksy_text: "Booksy",
      booksy_link: "https://booksy.com/pl-pl/dl/show-business/319418?utm_source=blog&utm_medium=cta&utm_campaign=children_age",
      phone_text: "Телефон",
      phone_number: "+48 573 818 260",
      phone_link: "tel:+48573818260",
      related_articles: "Связанные статьи:",
      related_1: "Inverness Med или пистолет – что безопаснее?",
      related_2: "Больно ли прокалывать уши?",
      cta: "Забронируйте визит онлайн"
    },
    en: {
      h1: "At What Age Can You Pierce a Child's Ears? Inverness Med for Children 0+",
      intro: `The question "at what age can you pierce a child's ears?" is one of the most common concerns for parents in Warsaw. Some pierce their babies' ears, others wait until the child makes the decision themselves. The answer is simple: the Inverness Med system is certified for children from 0+, which means that ear piercing is safe at any age when using the appropriate method.`,
      h2_1: "Can you safely pierce babies' ears?",
      p1_1: "Yes, piercing babies' ears is possible and safe. The Inverness Med system was designed in the USA specifically for the youngest patients and has an FDA certificate approving its use in children from the first days of life.",
      p1_2: "Unlike traditional guns, Inverness Med provides:",
      list_1_1: 'quiet operation without a loud "shot" that scares children',
      list_1_2: "gentle manual pressure instead of a sudden spring impact",
      list_1_3: "fully sterile single-use cartridges",
      list_1_4: "hypoallergenic materials safe for sensitive baby skin",
      p1_3: "According to the American Academy of Pediatrics (AAP), there is no minimum age for ear piercing, provided a sterile medical method and proper care are used.",
      p1_4: "More about the differences between methods: ",
      inverness_link: "Inverness Med vs gun – which is safer?",
      h2_2: "Age and ear piercing – what to choose?",
      p2_1: "The choice of the right age depends on individual family preferences. Here is a detailed comparison of advantages and disadvantages for different age groups:",
      h3_1: "Infants (0-12 months)",
      table_1_advantages: "Advantages",
      table_1_disadvantages: "Disadvantages",
      table_1_adv_1: "Child doesn't remember the discomfort",
      table_1_dis_1: "Requires supervision during healing",
      table_1_adv_2: "Parents have full control over care",
      table_1_dis_2: "Infant doesn't express own consent",
      table_1_adv_3: "Faster healing thanks to young tissues",
      table_1_dis_3: "Possibility of allergy (though rare)",
      table_1_adv_4: "Lower risk of earring being pulled out",
      table_1_best: "Best for: Parents who want to traditionally pierce ears at an early age and are ready for systematic care.",
      h3_2: "Young children (1-5 years)",
      table_2_adv_1: "Children can express desire to have earrings",
      table_2_dis_1: "May accidentally pull on earring",
      table_2_adv_2: "Still fast healing",
      table_2_dis_2: "Harder to explain care rules",
      table_2_adv_3: "Parents control the care process",
      table_2_dis_3: "Fear of procedure (depends on child)",
      table_2_best: "Best for: Parents who want to wait until the child shows interest, but still maintain control over care.",
      h3_3: "Older children (6+ years)",
      table_3_adv_1: "Child's conscious decision",
      table_3_dis_1: "Greater awareness = sometimes greater fear",
      table_3_adv_2: "Can take care of hygiene themselves (under supervision)",
      table_3_dis_2: "May change mind after procedure",
      table_3_adv_3: "Lower risk of losing earrings",
      table_3_adv_4: "Can choose preferred design",
      table_3_best: "Best for: Parents who want the child to make their own conscious decision and participate in care.",
      h2_3: "Most popular choice of parents in Warsaw",
      p3_1: "Based on our experience at Gentle Piercing, parents most often choose:",
      h3_4: "Early age (3-6 months)",
      quote_1: `"We pierced our daughter's ears at 4 months. She only cried for a moment and quickly forgot. Now she's 3 years old and I'm glad she didn't have to go through it consciously."`,
      h3_5: "Preschool age (5-7 years)",
      quote_2: '"We waited until our daughter asked herself. At 6 years old, she was proud of her earrings and responsibly approached care."',
      h3_6: "Before school",
      quote_3: '"We pierced just before first grade, so she had time to heal during the holidays."',
      h2_4: "When NOT to pierce ears – contraindications",
      p4_1: "Regardless of the chosen age, there are situations when the procedure should be postponed:",
      list_4_1: "Active skin infections or eczema in the ear area",
      list_4_2: "Fever, cold or body weakness",
      list_4_3: "Immediately after vaccinations (wait 2-3 days)",
      list_4_4: "Blood clotting disorders (consult with doctor)",
      list_4_5: "Strong confirmed metal allergy",
      p4_2: "Before the procedure, it's worth consulting with a pediatrician, especially if the child has health problems or allergies.",
      h2_5: "Why is Inverness Med safe for any age?",
      p5_1: "The Inverness Med system stands out with features particularly important for children's safety:",
      list_5_1: "Full sterility – single-use cartridge eliminates infection risk",
      list_5_2: `Silence – no loud "shot" doesn't scare the youngest`,
      list_5_3: "Minimal trauma – gentle pressure instead of impact = less pain and faster healing",
      list_5_4: "Safety Back – special stopper prevents accidental removal by child",
      list_5_5: "FDA and REACH certificates – medical hypoallergenic materials (titanium, 24k gold)",
      list_5_6: "Laser precision – thinner needle = faster tissue regeneration",
      p5_2: "Official manufacturer website: ",
      inverness_website: "https://invernesscorp.com/",
      p5_3: "Detailed method comparison: ",
      comparison_link: "Inverness Med vs gun – safe ear piercing",
      h2_6: "How to prepare a child for the procedure?",
      h3_7: "For infants:",
      list_6_1: "Choose a time when the child is rested and calm",
      list_6_2: "Prepare a favorite toy or pacifier",
      list_6_3: "After the procedure, hug and calm the child",
      h3_8: "For older children:",
      list_6_4: "Explain that the procedure is quick (a few seconds) and similar to a pinch",
      list_6_5: "Allow choosing earrings from the available medical range",
      list_6_6: "Praise bravery after the procedure",
      list_6_7: "Explain care rules in simple terms",
      h2_7: "What after piercing – care basics",
      p7_1: "Proper care is the key to fast healing without complications:",
      list_7_1: "Clean ears with special spray 2 times a day",
      list_7_2: "Always wash hands before touching ears",
      list_7_3: "DO NOT rotate earrings – this is an outdated myth",
      list_7_4: "Avoid wetting head for first 3 days",
      list_7_5: "Don't remove earrings for minimum 6-8 weeks",
      p7_2: "For parents of young children:",
      list_7_6: "Check stoppers daily – children may unconsciously loosen them",
      list_7_7: "Be careful when dressing (shirts over head)",
      list_7_8: "Watch for signs of infection: severe swelling, discharge, fever",
      p7_3: "Detailed instructions: ",
      aftercare_link: "Ear piercing aftercare – complete guide",
      h2_8: "Frequently asked questions",
      faq_1_q: "Does piercing babies' ears hurt?",
      faq_1_a: "The procedure lasts a few seconds. Babies may cry briefly, but the discomfort passes very quickly. The Inverness Med system is the most gentle method available.",
      faq_2_q: "How much does it cost to pierce a child's ears in Warsaw?",
      faq_2_a: "Prices start from 150 PLN and depend on the chosen type of earrings (titanium, gold, surgical steel). The cost includes the procedure, sterile cartridge and care instructions.",
      faq_3_q: "How long does a child's ear heal?",
      faq_3_a: "The earlobe usually heals within 6-8 weeks. In infants, the process may be slightly faster thanks to better tissue regeneration.",
      faq_4_q: "What to do if the child has a nickel allergy?",
      faq_4_a: "Choose earrings made of medical titanium or 24-karat gold – they are completely nickel-free and safe for allergy sufferers.",
      faq_5_q: "Can I bathe the child after piercing?",
      faq_5_a: "Avoid wetting ears for the first 3 days. Then you can normally bathe the child, but after bathing, dry the ears and clean with sterile solution.",
      faq_6_q: "Can you pierce ears before going to kindergarten?",
      faq_6_a: "There are no medical contraindications. We recommend piercing a few days before returning to the facility, so the child has time for calm adaptation at home.",
      h2_9: "Summary – choose the best moment for your family",
      p9_1: "There is no single correct answer to the question of what age to pierce a child's ears. The Inverness Med system is certified for children from 0+, so the decision belongs to parents.",
      p9_2: "Key factors when choosing:",
      list_9_1: "Use only a medical system (Inverness Med), never a regular gun",
      list_9_2: "Make sure the child is healthy and has no contraindications",
      list_9_3: "Be ready for systematic care for 6-8 weeks",
      list_9_4: "For older children, consider their own desire and readiness",
      p9_3: "At Gentle Piercing in Warsaw, we pierce children's ears of any age with care for safety and comfort. We use exclusively the Inverness Med system and provide full support before and after the procedure.",
      h2_10: "Booking",
      p10_1: "Book an appointment today:",
      booksy_text: "Booksy",
      booksy_link: "https://booksy.com/pl-pl/dl/show-business/319418?utm_source=blog&utm_medium=cta&utm_campaign=children_age",
      phone_text: "Phone",
      phone_number: "+48 573 818 260",
      phone_link: "tel:+48573818260",
      related_articles: "Related articles:",
      related_1: "Inverness Med vs gun – which is safer?",
      related_2: "Does ear piercing hurt?",
      cta: "Book a visit online"
    }
  };
  const getBooksyUrl2 = () => {
    return `https://booksy.com/pl-pl/dl/show-business/319418?utm_source=blog&utm_medium=cta&utm_campaign=children_age_${currentLang}`;
  };
  const t = content[currentLang] || content.en;
  return /* @__PURE__ */ jsxs("article", { className: "max-w-none", children: [
    /* @__PURE__ */ jsx("div", { className: "text-lg text-foreground mb-12 leading-relaxed", children: t.intro }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_1 }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p1_1 }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p1_2 }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-6 space-y-2 text-foreground mb-4", children: [
        /* @__PURE__ */ jsx("li", { children: t.list_1_1 }),
        /* @__PURE__ */ jsx("li", { children: t.list_1_2 }),
        /* @__PURE__ */ jsx("li", { children: t.list_1_3 }),
        /* @__PURE__ */ jsx("li", { children: t.list_1_4 })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p1_3 }),
      /* @__PURE__ */ jsxs("p", { className: "text-foreground mb-4", children: [
        t.p1_4,
        /* @__PURE__ */ jsx(
          Link,
          {
            to: `/${currentLang}/blog/${currentLang === "pl" ? "inverness-vs-pistolet" : currentLang === "en" ? "inverness-vs-gun" : currentLang === "uk" ? "inverness-vs-pistolet" : "inverness-vs-pistolet"}`,
            className: "text-primary hover:underline",
            children: t.inverness_link
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_2 }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-6", children: t.p2_1 }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-foreground mb-4", children: t.h3_1 }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto mb-4", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full border-collapse border border-border", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-muted", children: [
            /* @__PURE__ */ jsx("th", { className: "border border-border p-3 text-left font-semibold", children: t.table_1_advantages }),
            /* @__PURE__ */ jsx("th", { className: "border border-border p-3 text-left font-semibold", children: t.table_1_disadvantages })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: t.table_1_adv_1 }),
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: t.table_1_dis_1 })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: t.table_1_adv_2 }),
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: t.table_1_dis_2 })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: t.table_1_adv_3 }),
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: t.table_1_dis_3 })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: t.table_1_adv_4 }),
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: "-" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("p", { className: "text-foreground italic mb-4", children: t.table_1_best })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-foreground mb-4", children: t.h3_2 }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto mb-4", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full border-collapse border border-border", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-muted", children: [
            /* @__PURE__ */ jsx("th", { className: "border border-border p-3 text-left font-semibold", children: t.table_1_advantages }),
            /* @__PURE__ */ jsx("th", { className: "border border-border p-3 text-left font-semibold", children: t.table_1_disadvantages })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: t.table_2_adv_1 }),
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: t.table_2_dis_1 })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: t.table_2_adv_2 }),
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: t.table_2_dis_2 })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: t.table_2_adv_3 }),
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: t.table_2_dis_3 })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("p", { className: "text-foreground italic mb-4", children: t.table_2_best })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-foreground mb-4", children: t.h3_3 }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto mb-4", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full border-collapse border border-border", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-muted", children: [
            /* @__PURE__ */ jsx("th", { className: "border border-border p-3 text-left font-semibold", children: t.table_1_advantages }),
            /* @__PURE__ */ jsx("th", { className: "border border-border p-3 text-left font-semibold", children: t.table_1_disadvantages })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: t.table_3_adv_1 }),
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: t.table_3_dis_1 })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: t.table_3_adv_2 }),
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: t.table_3_dis_2 })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: t.table_3_adv_3 }),
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: "-" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: t.table_3_adv_4 }),
              /* @__PURE__ */ jsx("td", { className: "border border-border p-3", children: "-" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("p", { className: "text-foreground italic mb-4", children: t.table_3_best })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_3 }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p3_1 }),
      /* @__PURE__ */ jsxs("div", { className: "bg-muted/30 border-l-4 border-primary p-4 rounded-r-lg my-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-foreground mb-2", children: t.h3_4 }),
        /* @__PURE__ */ jsx("p", { className: "text-foreground italic", children: t.quote_1 })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-muted/30 border-l-4 border-primary p-4 rounded-r-lg my-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-foreground mb-2", children: t.h3_5 }),
        /* @__PURE__ */ jsx("p", { className: "text-foreground italic", children: t.quote_2 })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-muted/30 border-l-4 border-primary p-4 rounded-r-lg my-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-foreground mb-2", children: t.h3_6 }),
        /* @__PURE__ */ jsx("p", { className: "text-foreground italic", children: t.quote_3 })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_4 }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p4_1 }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-6 space-y-2 text-foreground mb-4", children: [
        /* @__PURE__ */ jsx("li", { children: t.list_4_1 }),
        /* @__PURE__ */ jsx("li", { children: t.list_4_2 }),
        /* @__PURE__ */ jsx("li", { children: t.list_4_3 }),
        /* @__PURE__ */ jsx("li", { children: t.list_4_4 }),
        /* @__PURE__ */ jsx("li", { children: t.list_4_5 })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p4_2 })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-muted/30 border-l-4 border-primary p-4 rounded-r-lg my-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-foreground mb-3", children: t.h2_5 }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-3 text-sm", children: t.p5_1 }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-6 space-y-1 text-foreground text-sm mb-3", children: [
        /* @__PURE__ */ jsx("li", { children: t.list_5_1 }),
        /* @__PURE__ */ jsx("li", { children: t.list_5_2 }),
        /* @__PURE__ */ jsx("li", { children: t.list_5_3 }),
        /* @__PURE__ */ jsx("li", { children: t.list_5_4 }),
        /* @__PURE__ */ jsx("li", { children: t.list_5_5 }),
        /* @__PURE__ */ jsx("li", { children: t.list_5_6 })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-foreground mb-0 text-sm", children: [
        t.p5_2,
        /* @__PURE__ */ jsx("a", { href: t.inverness_website, target: "_blank", rel: "nofollow noopener", className: "text-primary hover:underline", children: t.inverness_website }),
        /* @__PURE__ */ jsx("br", {}),
        t.p5_3,
        /* @__PURE__ */ jsx(
          Link,
          {
            to: `/${currentLang}/blog/${currentLang === "pl" ? "inverness-vs-pistolet" : currentLang === "en" ? "inverness-vs-gun" : currentLang === "uk" ? "inverness-vs-pistolet" : "inverness-vs-pistolet"}`,
            className: "text-primary hover:underline",
            children: t.comparison_link
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_6 }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-foreground mb-3 mt-6", children: t.h3_7 }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-6 space-y-2 text-foreground mb-6", children: [
        /* @__PURE__ */ jsx("li", { children: t.list_6_1 }),
        /* @__PURE__ */ jsx("li", { children: t.list_6_2 }),
        /* @__PURE__ */ jsx("li", { children: t.list_6_3 })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-foreground mb-3 mt-6", children: t.h3_8 }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-6 space-y-2 text-foreground mb-4", children: [
        /* @__PURE__ */ jsx("li", { children: t.list_6_4 }),
        /* @__PURE__ */ jsx("li", { children: t.list_6_5 }),
        /* @__PURE__ */ jsx("li", { children: t.list_6_6 }),
        /* @__PURE__ */ jsx("li", { children: t.list_6_7 })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_7 }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p7_1 }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-6 space-y-2 text-foreground mb-4", children: [
        /* @__PURE__ */ jsx("li", { children: t.list_7_1 }),
        /* @__PURE__ */ jsx("li", { children: t.list_7_2 }),
        /* @__PURE__ */ jsx("li", { children: t.list_7_3 }),
        /* @__PURE__ */ jsx("li", { children: t.list_7_4 }),
        /* @__PURE__ */ jsx("li", { children: t.list_7_5 })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-2 font-semibold", children: t.p7_2 }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-6 space-y-2 text-foreground mb-4", children: [
        /* @__PURE__ */ jsx("li", { children: t.list_7_6 }),
        /* @__PURE__ */ jsx("li", { children: t.list_7_7 }),
        /* @__PURE__ */ jsx("li", { children: t.list_7_8 })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-foreground mb-4", children: [
        t.p7_3,
        /* @__PURE__ */ jsx(Link, { to: `/${currentLang}/aftercare`, className: "text-primary hover:underline", children: t.aftercare_link })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_8 }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: t.faq_1_q }),
          /* @__PURE__ */ jsx("p", { className: "text-foreground", children: t.faq_1_a })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: t.faq_2_q }),
          /* @__PURE__ */ jsx("p", { className: "text-foreground", children: t.faq_2_a })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: t.faq_3_q }),
          /* @__PURE__ */ jsx("p", { className: "text-foreground", children: t.faq_3_a })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: t.faq_4_q }),
          /* @__PURE__ */ jsx("p", { className: "text-foreground", children: t.faq_4_a })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: t.faq_5_q }),
          /* @__PURE__ */ jsx("p", { className: "text-foreground", children: t.faq_5_a })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: t.faq_6_q }),
          /* @__PURE__ */ jsx("p", { className: "text-foreground", children: t.faq_6_a })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-foreground mb-4 mt-16", children: t.h2_9 }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p9_1 }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-2 font-semibold", children: t.p9_2 }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-6 space-y-2 text-foreground mb-4", children: [
        /* @__PURE__ */ jsx("li", { children: t.list_9_1 }),
        /* @__PURE__ */ jsx("li", { children: t.list_9_2 }),
        /* @__PURE__ */ jsx("li", { children: t.list_9_3 }),
        /* @__PURE__ */ jsx("li", { children: t.list_9_4 })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4", children: t.p9_3 })
    ] }),
    /* @__PURE__ */ jsx(
      BlogArticleCTA,
      {
        currentLang,
        articleId: "children-age",
        getBooksyUrl: getBooksyUrl2
      }
    )
  ] });
};
const featuredImage_400 = "/assets/images/art001-DYuSTAyl.webp";
const featuredImage_800 = "/assets/images/art001-D0GXisjM.webp";
const featuredImage_1200 = "/assets/images/art001-CRJeZDbI.webp";
const featuredImage_1600 = "/assets/images/art001-Cm9MPoP2.webp";
const featuredImage2_400 = "/assets/images/art002-S2GzAElG.webp";
const featuredImage2_800 = "/assets/images/art002-DPyzyaeg.webp";
const featuredImage2_1200 = "/assets/images/art002-N5N-Z81a.webp";
const featuredImage2_1600 = "/assets/images/art002-nkuZec0J.webp";
const featuredImage3_400 = "/assets/images/art003-anahFWwz.webp";
const featuredImage3_800 = "/assets/images/art003-CNkA3FkD.webp";
const featuredImage3_1200 = "/assets/images/art003-DeEF7kcw.webp";
const featuredImage3_1600 = "/assets/images/art003-svV-Uc8G.webp";
function BlogArticle() {
  const { t, i18n: i18n2 } = useTranslation();
  const { lang, slug } = useParams();
  if (!isSupportedLanguage(lang)) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/pl/blog", replace: true });
  }
  const currentLang = lang || "pl";
  const articleSlugs = {
    "inverness-vs-pistolet": "inverness-vs-gun",
    "inverness-vs-gun": "inverness-vs-gun",
    "czy-przekluwanie-uszu-boli": "does-ear-piercing-hurt",
    "does-ear-piercing-hurt": "does-ear-piercing-hurt",
    "chy-bolyt-prokol-vukh": "does-ear-piercing-hurt",
    "bolit-li-prokalyvanie-ushey": "does-ear-piercing-hurt",
    "od-jakiego-wieku-przekluwac-uszy-dziecku": "children-age",
    "at-what-age-to-pierce-child-ears": "children-age",
    "z-yakoho-viku-prokoluvaty-vukha-dytyni": "children-age",
    "s-kakogo-vozrasta-prokalyvat-ushi-rebenku": "children-age"
  };
  const articleId = articleSlugs[slug];
  if (!articleId) {
    return /* @__PURE__ */ jsx(Navigate, { to: `/${currentLang}/blog`, replace: true });
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [i18n2.language, slug]);
  const getArticleMetadata = () => {
    if (articleId === "inverness-vs-gun") {
      const baseUrls2 = {
        pl: "https://gentlepiercing.pl/pl/blog/inverness-vs-pistolet",
        en: "https://gentlepiercing.pl/en/blog/inverness-vs-gun",
        uk: "https://gentlepiercing.pl/uk/blog/inverness-vs-pistolet",
        ru: "https://gentlepiercing.pl/ru/blog/inverness-vs-pistolet"
      };
      const titles2 = {
        pl: "Inverness vs pistolet | Najbezpieczniejsze przekłuwanie",
        uk: "Inverness Med vs пістолет | Безпечний прокол вух",
        ru: "Inverness vs пистолет | Безопасный прокол ушей",
        en: "Inverness vs piercing gun | Safe ear piercing Warsaw"
      };
      const descriptions2 = {
        pl: "Porównanie Inverness MED i pistoletu: sterylność, hipoalergiczne kolczyki i najbezpieczniejsze przekłuwanie uszu w Warszawie dla dzieci 0+ i dorosłych.",
        uk: "Порівняння Inverness MED і пістолета: стерильність, гіпоалергенні сережки та найбезпечніший прокол вух у Варшаві для дітей 0+ і дорослих.",
        ru: "Сравнение Inverness MED и пистолета: стерильность, гипоаллергенные серьги и самый безопасный прокол ушей в Варшаве для детей 0+ и взрослых.",
        en: "Compare the Inverness MED system and piercing gun: sterility, hypoallergenic earrings, and the safest ear piercing in Warsaw for babies and adults."
      };
      return {
        title: titles2[currentLang],
        description: descriptions2[currentLang],
        url: baseUrls2[currentLang],
        hreflang: baseUrls2
      };
    }
    if (articleId === "children-age") {
      const baseUrls2 = {
        pl: "https://gentlepiercing.pl/pl/blog/od-jakiego-wieku-przekluwac-uszy-dziecku",
        en: "https://gentlepiercing.pl/en/blog/at-what-age-to-pierce-child-ears",
        uk: "https://gentlepiercing.pl/uk/blog/z-yakoho-viku-prokoluvaty-vukha-dytyni",
        ru: "https://gentlepiercing.pl/ru/blog/s-kakogo-vozrasta-prokalyvat-ushi-rebenku"
      };
      const titles2 = {
        pl: "Od jakiego wieku przekłuwać uszy dziecku? Inverness MED",
        uk: "З якого віку проколювати вуха дитині? Inverness MED",
        ru: "С какого возраста прокалывать уши ребенку? Inverness MED",
        en: "What age to pierce a child's ears? Inverness MED"
      };
      const descriptions2 = {
        pl: "Kiedy przekłuć uszy dziecku? Inverness MED jest certyfikowany dla dzieci od 0+. Przewodnik dla rodziców w Warszawie: bezpieczeństwo, przygotowanie i gojenie.",
        uk: "Коли проколювати вуха дитині? Inverness MED сертифікований для дітей від 0+. Порадник для батьків у Варшаві: безпека, підготовка та загоєння.",
        ru: "Когда прокалывать уши ребенку? Inverness MED сертифицирован для детей от 0+. Гид для родителей в Варшаве: безопасность, подготовка и заживление.",
        en: "When can you pierce a child's ears? Inverness MED is certified for babies 0+. Parent guide for Warsaw: safety, preparation, and healing."
      };
      return {
        title: titles2[currentLang],
        description: descriptions2[currentLang],
        url: baseUrls2[currentLang],
        hreflang: baseUrls2
      };
    }
    const baseUrls = {
      pl: "https://gentlepiercing.pl/pl/blog/czy-przekluwanie-uszu-boli",
      en: "https://gentlepiercing.pl/en/blog/does-ear-piercing-hurt",
      uk: "https://gentlepiercing.pl/uk/blog/chy-bolyt-prokol-vukh",
      ru: "https://gentlepiercing.pl/ru/blog/bolit-li-prokalyvanie-ushey"
    };
    const titles = {
      pl: "Czy przekłuwanie uszu boli? Inverness MED w Warszawie",
      uk: "Чи болить прокол вух? Inverness MED Варшава",
      ru: "Больно ли прокалывать уши? Inverness MED Варшава",
      en: "Does ear piercing hurt? Inverness MED Warsaw"
    };
    const descriptions = {
      pl: "Jak bardzo boli przekłuwanie uszu? Sprawdź, jak system Inverness MED minimalizuje ból, jak przebiega zabieg i jak dbać o szybkie gojenie w Warszawie.",
      uk: "Наскільки боляче проколювати вуха? Дізнайтеся, як система Inverness MED зменшує біль, як проходить процедура та як доглядати для швидкого загоєння у Варшаві.",
      ru: "Насколько больно прокалывать уши? Узнайте, как система Inverness MED снижает боль, как проходит процедура и как ухаживать для быстрого заживления в Варшаве.",
      en: "How much does ear piercing hurt? See how the Inverness MED system reduces pain, how the procedure works, and aftercare for fast healing in Warsaw."
    };
    return {
      title: titles[currentLang],
      description: descriptions[currentLang],
      url: baseUrls[currentLang],
      hreflang: baseUrls
    };
  };
  const metadata = getArticleMetadata();
  const getKeywords = () => {
    if (articleId === "inverness-vs-gun") {
      const keywords2 = {
        pl: "przekłuwanie uszu Warszawa, Inverness Med, Inverness czy pistolet, bezpieczne przekłuwanie uszu, przekłuwanie uszu dzieci, kolczyki hipoalergiczne, Inverness system",
        uk: "Inverness Med, пістолет для проколу, прокол вух Варшава, безпечне проколювання вух, Inverness vs пістолет, гіпоалергенні сережки, прокол вух дітям 0+",
        ru: "прокол ушей Варшава, Inverness система, Inverness или пистолет, медицинский прокол ушей, гипоаллергенные серьги",
        en: "ear piercing Warsaw, Inverness system, Inverness vs gun, baby ear piercing, hypoallergenic earrings, safe ear piercing"
      };
      return keywords2[currentLang];
    }
    if (articleId === "children-age") {
      const keywords2 = {
        pl: "od jakiego wieku przekłuwać uszy dziecku, przekłuwanie uszu niemowlętom, Inverness Med dla dzieci, bezpieczne przekłuwanie uszu dzieci Warszawa, przekłuwanie uszu dzieci 0+, wiek przekłuwania uszu",
        uk: "з якого віку проколювати вуха дитині, прокол вух немовлятам, Inverness Med для дітей, безпечний прокол вух дітям Варшава, прокол вух дітям 0+, вік проколу вух",
        ru: "с какого возраста прокалывать уши ребенку, прокол ушей младенцам, Inverness Med для детей, безопасный прокол ушей детям Варшава, прокол ушей детям 0+, возраст прокалывания ушей",
        en: "what age to pierce baby ears, infant ear piercing, Inverness Med for children, safe child ear piercing Warsaw, ear piercing children 0+, age to pierce ears"
      };
      return keywords2[currentLang];
    }
    const keywords = {
      pl: "przekłuwanie uszu, piercing Warszawa, Inverness MED, czy boli, dzieci, bezbolesne, bezpieczne",
      uk: "прокол вух, пірсинг Варшава, Inverness MED, чи болить, діти, безболісно, безпечно",
      ru: "прокол ушей, пирсинг Варшава, Inverness MED, больно ли, дети, безболезненно, безопасно",
      en: "ear piercing, piercing Warsaw, Inverness MED, does it hurt, children, painless, safe"
    };
    return keywords[currentLang];
  };
  const getArticleSchema = () => {
    let headline = "";
    let datePublished = "2025-10-27T00:00:00+01:00";
    let dateModified = "2025-10-27T00:00:00+01:00";
    if (articleId === "inverness-vs-gun") {
      headline = currentLang === "pl" ? "Inverness Med vs pistolet – co jest bezpieczniejsze?" : currentLang === "uk" ? "Inverness Med vs пістолет — який метод проколу вух безпечніший?" : currentLang === "ru" ? "Inverness Med или пистолет — что безопаснее?" : "Inverness vs Piercing Gun — Which Method Is Safer?";
      datePublished = "2025-11-13T00:00:00+01:00";
      dateModified = "2025-11-13T00:00:00+01:00";
    } else if (articleId === "children-age") {
      headline = currentLang === "pl" ? "Od jakiego wieku można przekłuwać uszy dziecku? Inverness Med dla dzieci 0+" : currentLang === "uk" ? "З якого віку можна проколювати вуха дитині? Inverness Med для дітей 0+" : currentLang === "ru" ? "С какого возраста можно прокалывать уши ребенку? Inverness Med для детей 0+" : "At What Age Can You Pierce a Child's Ears? Inverness Med for Children 0+";
      datePublished = "2025-12-02T00:00:00+01:00";
      dateModified = "2025-12-02T00:00:00+01:00";
    } else if (articleId === "does-ear-piercing-hurt") {
      headline = currentLang === "pl" ? "Czy przekłuwanie uszu boli?" : currentLang === "uk" ? "Чи болить прокол вух?" : currentLang === "ru" ? "Больно ли прокалывать уши?" : "Does ear piercing hurt?";
    }
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": headline,
      "description": metadata.description,
      "image": "https://gentlepiercing.pl/hero-image.jpg",
      "wordCount": 1200,
      "articleSection": "Health & Beauty",
      "keywords": getKeywords().split(", "),
      "inLanguage": currentLang,
      "author": {
        "@type": "Organization",
        "name": "Gentle Piercing"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Gentle Piercing",
        "logo": {
          "@type": "ImageObject",
          "url": "https://gentlepiercing.pl/logo.png",
          "width": 200,
          "height": 60
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": metadata.url
      },
      "datePublished": datePublished,
      "dateModified": dateModified
    };
  };
  const getFAQSchema = () => {
    if (articleId === "children-age") {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": currentLang === "pl" ? "Od jakiego wieku można przekłuwać uszy dziecku?" : currentLang === "uk" ? "З якого віку можна проколювати вуха дитині?" : currentLang === "ru" ? "С какого возраста можно прокалывать уши ребенку?" : "At what age can you pierce a child's ears?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLang === "pl" ? "System Inverness Med jest certyfikowany dla dzieci od 0+, co oznacza, że przekłuwanie uszu jest bezpieczne w każdym wieku przy użyciu odpowiedniej metody." : currentLang === "uk" ? "Система Inverness Med сертифікована для дітей від 0+, що означає, що проколювання вух безпечне в будь-якому віці при використанні відповідного методу." : currentLang === "ru" ? "Система Inverness Med сертифицирована для детей от 0+, что означает, что прокалывание ушей безопасно в любом возрасте при использовании правильного метода." : "The Inverness Med system is certified for children from 0+, which means that ear piercing is safe at any age when using the appropriate method."
            }
          },
          {
            "@type": "Question",
            "name": currentLang === "pl" ? "Czy przekłuwanie uszu niemowlętom boli?" : currentLang === "uk" ? "Чи болить прокол вух немовлятам?" : currentLang === "ru" ? "Больно ли прокалывать уши младенцам?" : "Does piercing babies' ears hurt?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLang === "pl" ? "Zabieg trwa kilka sekund. Niemowlęta mogą krótko płakać, ale dyskomfort mija bardzo szybko. System Inverness Med jest najbardziej delikatną dostępną metodą." : currentLang === "uk" ? "Процедура триває кілька секунд. Немовлята можуть коротко плакати, але дискомфорт швидко минає. Система Inverness Med є найбільш деликатним доступним методом." : currentLang === "ru" ? "Процедура длится несколько секунд. Младенцы могут кратко плакать, но дискомфорт быстро проходит. Система Inverness Med является самым деликатным доступным методом." : "The procedure lasts a few seconds. Babies may cry briefly, but the discomfort passes very quickly. The Inverness Med system is the most gentle method available."
            }
          },
          {
            "@type": "Question",
            "name": currentLang === "pl" ? "Ile kosztuje przekłucie uszu dziecku w Warszawie?" : currentLang === "uk" ? "Скільки коштує прокол вух дитині у Варшаві?" : currentLang === "ru" ? "Сколько стоит прокалывание ушей ребенку в Варшаве?" : "How much does it cost to pierce a child's ears in Warsaw?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLang === "pl" ? "Ceny zaczynają się od 150 zł i zależą od wybranego rodzaju kolczyków (tytan, złoto, stal chirurgiczna). Koszt obejmuje zabieg, sterylny kartridż i instrukcję pielęgnacji." : currentLang === "uk" ? "Ціни починаються від 150 злотих і залежать від обраного типу сережок (титан, золото, хірургічна сталь). Вартість включає процедуру, стерильний картридж та інструкцію з догляду." : currentLang === "ru" ? "Цены начинаются от 150 злотых и зависят от выбранного типа сережек (титан, золото, хирургическая сталь). Стоимость включает процедуру, стерильный картридж и инструкцию по уходу." : "Prices start from 150 PLN and depend on the chosen type of earrings (titanium, gold, surgical steel). The cost includes the procedure, sterile cartridge and care instructions."
            }
          }
        ]
      };
    }
    if (articleId === "inverness-vs-gun") {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": currentLang === "pl" ? "Czym różni się Inverness od pistoletu?" : currentLang === "uk" ? "Чим відрізняється Inverness від пістолета?" : currentLang === "ru" ? "Чем отличается Inverness от пистолета?" : "What's the difference between Inverness and a piercing gun?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLang === "pl" ? "Inverness używa delikatnego nacisku ręcznego i sterylnych kartridży, podczas gdy pistolet działa mechanizmem uderzeniowym i nie jest w pełni sterylny." : currentLang === "uk" ? "Inverness використовує плавний ручний тиск і стерильні картриджі, тоді як пістолет працює ударним механізмом і не є повністю стерильним." : currentLang === "ru" ? "Inverness использует мягкое ручное давление и стерильные картриджи, тогда как пистолет работает ударным механизмом и не является полностью стерильным." : "Inverness uses gentle hand pressure and sterile cartridges, while a piercing gun works with an impact mechanism and is not fully sterile."
            }
          },
          {
            "@type": "Question",
            "name": currentLang === "pl" ? "Czy Inverness nadaje się dla dzieci?" : currentLang === "uk" ? "Чи підходить Inverness дітям?" : currentLang === "ru" ? "Подходит ли Inverness для детей?" : "Is Inverness suitable for children?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLang === "pl" ? "Tak. Inverness Med jest oficjalnie zatwierdzony dla dzieci 0+, ponieważ zapewnia sterylność i minimalny dyskomfort." : currentLang === "uk" ? "Так. Inverness Med офіційно підходить для дітей 0+, оскільки забезпечує стерильність і мінімальний дискомфорт." : currentLang === "ru" ? "Да. Inverness Med официально подходит для детей 0+, так как обеспечивает стерильность и минимальный дискомфорт." : "Yes. Inverness Med is officially suitable for children 0+ as it provides sterility and minimal discomfort."
            }
          },
          {
            "@type": "Question",
            "name": currentLang === "pl" ? "Jakie materiały kolczyków Inverness?" : currentLang === "uk" ? "Які матеріали сережок Inverness?" : currentLang === "ru" ? "Какие материалы сережек Inverness?" : "What materials are Inverness earrings made of?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLang === "pl" ? "Kolczyki wykonane są z materiałów hipoalergicznych - tytanu, niobu, stali chirurgicznej i powłoki 24K." : currentLang === "uk" ? "Сережки виготовлені з гіпоалергенних матеріалів — титану, ніобію, медичної сталі та покриття 24K." : currentLang === "ru" ? "Серьги изготовлены из гипоаллергенных материалов — титана, ниобия, медицинской стали и покрытия 24K." : "Earrings are made from hypoallergenic materials - titanium, niobium, surgical steel and 24K coating."
            }
          }
        ]
      };
    }
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": currentLang === "pl" ? "Czy przekłuwanie uszu boli?" : currentLang === "uk" ? "Чи болить прокол вух?" : currentLang === "ru" ? "Больно ли прокалывать уши?" : "Does ear piercing hurt?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": currentLang === "pl" ? "System Inverness Med sprawia, że zabieg jest niemal bezbolesny" : currentLang === "uk" ? "Система Inverness Med робить процедуру майже безболісною" : currentLang === "ru" ? "Система Inverness Med делает процедуру почти безболезненной" : "The Inverness Med system makes the procedure almost painless"
          }
        },
        {
          "@type": "Question",
          "name": currentLang === "pl" ? "Jak długo trwa przekłucie?" : currentLang === "uk" ? "Скільки триває прокол?" : currentLang === "ru" ? "Сколько длится прокол?" : "How long does piercing take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": currentLang === "pl" ? "Samo przekłucie trwa mniej niż sekundę" : currentLang === "uk" ? "Сам прокол триває менше секунди" : currentLang === "ru" ? "Само прокалывание длится менее секунды" : "The piercing itself takes less than a second"
          }
        },
        {
          "@type": "Question",
          "name": currentLang === "pl" ? "Czy to bezpieczne dla dzieci?" : currentLang === "uk" ? "Чи безпечно для дітей?" : currentLang === "ru" ? "Безопасно ли для детей?" : "Is it safe for children?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": currentLang === "pl" ? "Tak, system jest zatwierdzony dla dzieci 0+" : currentLang === "uk" ? "Так, система схвалена для дітей 0+" : currentLang === "ru" ? "Да, система одобрена для детей 0+" : "Yes, the system is approved for children 0+"
          }
        }
      ]
    };
  };
  const getLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Gentle Piercing",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gizów 6",
      "addressLocality": "Warszawa",
      "postalCode": "01-249",
      "addressCountry": "PL"
    },
    "telephone": "+48573818260",
    "url": "https://gentlepiercing.pl",
    "sameAs": ["https://instagram.com/prokol_ushej_warszawa"],
    "openingHours": "Mo-Su 09:00-20:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "14"
    },
    "priceRange": "150-250 zł"
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("html", { lang: currentLang }),
      /* @__PURE__ */ jsx("title", { children: metadata.title }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: metadata.description }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: getKeywords() }),
      /* @__PURE__ */ jsx("meta", { name: "author", content: "Gentle Piercing" }),
      /* @__PURE__ */ jsx("meta", { name: "publisher", content: "Gentle Piercing" }),
      /* @__PURE__ */ jsx("meta", { name: "article:published_time", content: articleId === "inverness-vs-gun" ? "2025-11-13T00:00:00+01:00" : articleId === "children-age" ? "2025-12-02T00:00:00+01:00" : "2025-10-27T00:00:00+01:00" }),
      /* @__PURE__ */ jsx("meta", { name: "article:modified_time", content: articleId === "inverness-vs-gun" ? "2025-11-13T00:00:00+01:00" : articleId === "children-age" ? "2025-12-02T00:00:00+01:00" : "2025-10-27T00:00:00+01:00" }),
      /* @__PURE__ */ jsx("meta", { name: "article:section", content: "Health & Beauty" }),
      /* @__PURE__ */ jsx("meta", { name: "article:tag", content: getKeywords() }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index,follow" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: metadata.url }),
      /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "pl", href: metadata.hreflang.pl }),
      /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "uk", href: metadata.hreflang.uk }),
      /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "ru", href: metadata.hreflang.ru }),
      /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "en", href: metadata.hreflang.en }),
      /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "x-default", href: "https://gentlepiercing.pl" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: metadata.title }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: metadata.description }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: metadata.url }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "article" }),
      /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "Gentle Piercing" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://gentlepiercing.pl/hero-image.jpg" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:alt", content: currentLang === "pl" ? "Gentle Piercing - Przekłuwanie Uszu w Warszawie" : currentLang === "uk" ? "Gentle Piercing - Прокол Вух у Варшаві" : currentLang === "ru" ? "Gentle Piercing - Прокол Ушей в Варшаве" : "Gentle Piercing - Ear Piercing in Warsaw" }),
      /* @__PURE__ */ jsx("meta", { property: "og:locale", content: currentLang === "pl" ? "pl_PL" : currentLang === "en" ? "en_US" : currentLang === "uk" ? "uk_UA" : "ru_RU" }),
      currentLang !== "pl" && /* @__PURE__ */ jsx("meta", { property: "og:locale:alternate", content: "pl_PL" }),
      currentLang !== "en" && /* @__PURE__ */ jsx("meta", { property: "og:locale:alternate", content: "en_US" }),
      currentLang !== "uk" && /* @__PURE__ */ jsx("meta", { property: "og:locale:alternate", content: "uk_UA" }),
      currentLang !== "ru" && /* @__PURE__ */ jsx("meta", { property: "og:locale:alternate", content: "ru_RU" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: metadata.title }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: metadata.description }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: "https://gentlepiercing.pl/hero-image.jpg" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(getArticleSchema()) }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(getFAQSchema()) }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(getLocalBusinessSchema()) })
    ] }),
    /* @__PURE__ */ jsx(BreadcrumbSchema, { items: [
      { name: t("breadcrumb.home"), url: `https://gentlepiercing.pl/${currentLang}` },
      { name: t("breadcrumb.blog"), url: `https://gentlepiercing.pl/${currentLang}/blog` },
      {
        name: articleId === "inverness-vs-gun" ? currentLang === "pl" ? "Inverness Med vs pistolet – co jest bezpieczniejsze?" : currentLang === "uk" ? "Inverness Med vs пістолет — який метод проколу вух безпечніший?" : currentLang === "ru" ? "Inverness Med или пистолет — что безопаснее?" : "Inverness vs Piercing Gun — Which Method Is Safer?" : articleId === "children-age" ? currentLang === "pl" ? "Od jakiego wieku można przekłuwać uszy dziecku? Inverness Med dla dzieci 0+" : currentLang === "uk" ? "З якого віку можна проколювати вуха дитині? Inverness Med для дітей 0+" : currentLang === "ru" ? "С какого возраста можно прокалывать уши ребенку? Inverness Med для детей 0+" : "At What Age Can You Pierce a Child's Ears? Inverness Med for Children 0+" : articleId === "does-ear-piercing-hurt" ? currentLang === "pl" ? "Czy przekłuwanie uszu boli?" : currentLang === "uk" ? "Чи болить прокол вух?" : currentLang === "ru" ? "Больно ли прокалывать уши?" : "Does ear piercing hurt?" : "",
        url: metadata.url
      }
    ] }),
    /* @__PURE__ */ jsx(Header, { currentLang }),
    /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl", children: [
      /* @__PURE__ */ jsx("nav", { className: "mb-8", "aria-label": "Breadcrumb", children: /* @__PURE__ */ jsxs("ol", { className: "flex items-center space-x-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          Link,
          {
            to: `/${currentLang}`,
            className: "hover:text-primary transition-colors",
            children: t("breadcrumb.home")
          }
        ) }),
        /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "mx-2", children: "/" }),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: `/${currentLang}/blog`,
              className: "hover:text-primary transition-colors",
              children: t("breadcrumb.blog")
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "mx-2", children: "/" }),
          /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: articleId === "inverness-vs-gun" ? currentLang === "pl" ? "Inverness Med vs pistolet – co jest bezpieczniejsze?" : currentLang === "uk" ? "Inverness Med vs пістолет — який метод проколу вух безпечніший?" : currentLang === "ru" ? "Inverness Med или пистолет — что безопаснее?" : "Inverness vs Piercing Gun — Which Method Is Safer?" : articleId === "children-age" ? currentLang === "pl" ? "Od jakiego wieku można przekłuwać uszy dziecku? Inverness Med dla dzieci 0+" : currentLang === "uk" ? "З якого віку можна проколювати вуха дитині? Inverness Med для дітей 0+" : currentLang === "ru" ? "С какого возраста можно прокалывать уши ребенку? Inverness Med для детей 0+" : "At What Age Can You Pierce a Child's Ears? Inverness Med for Children 0+" : articleId === "does-ear-piercing-hurt" ? currentLang === "pl" ? "Czy przekłuwanie uszu boli?" : currentLang === "uk" ? "Чи болить прокол вух?" : currentLang === "ru" ? "Больно ли прокалывать уши?" : "Does ear piercing hurt?" : "" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight", children: articleId === "inverness-vs-gun" ? currentLang === "pl" ? "Inverness Med vs pistolet – co jest bezpieczniejsze?" : currentLang === "uk" ? "Inverness Med vs пістолет — який метод проколу вух безпечніший?" : currentLang === "ru" ? "Inverness Med или пистолет — что безопаснее?" : "Inverness vs Piercing Gun — Which Method Is Safer?" : articleId === "children-age" ? currentLang === "pl" ? "Od jakiego wieku można przekłuwać uszy dziecku? Inverness Med dla dzieci 0+" : currentLang === "uk" ? "З якого віку можна проколювати вуха дитині? Inverness Med для дітей 0+" : currentLang === "ru" ? "С какого возраста можно прокалывать уши ребенку? Inverness Med для детей 0+" : "At What Age Can You Pierce a Child's Ears? Inverness Med for Children 0+" : articleId === "does-ear-piercing-hurt" ? currentLang === "pl" ? "Czy przekłuwanie uszu boli?" : currentLang === "uk" ? "Чи болить прокол вух?" : currentLang === "ru" ? "Больно ли прокалывать уши?" : "Does ear piercing hurt?" : "" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-3 mb-8 flex-wrap", children: [
          /* @__PURE__ */ jsx("span", { className: "px-4 py-2 bg-muted/50 text-muted-foreground rounded-full text-sm font-medium", children: currentLang === "pl" ? "Przekłuwanie uszu" : currentLang === "uk" ? "Прокол вух" : currentLang === "ru" ? "Прокалывание ушей" : "Ear Piercing" }),
          /* @__PURE__ */ jsx("span", { className: "px-4 py-2 bg-muted/50 text-muted-foreground rounded-full text-sm font-medium", children: currentLang === "pl" ? "Bezpieczeństwo" : currentLang === "uk" ? "Безпека" : currentLang === "ru" ? "Безопасность" : "Safety" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full mb-8 rounded-xl overflow-hidden shadow-lg", children: articleId === "inverness-vs-gun" ? /* @__PURE__ */ jsx(
        "img",
        {
          src: featuredImage2_800,
          srcSet: `
                  ${featuredImage2_400} 400w,
                  ${featuredImage2_800} 800w, 
                  ${featuredImage2_1200} 1200w,
                  ${featuredImage2_1600} 1600w
                `,
          sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px",
          alt: currentLang === "pl" ? "Inverness Med vs pistolet - bezpieczne przekłuwanie uszu w Warszawie. System medyczny z USA dla dzieci 0+ i dorosłych" : currentLang === "uk" ? "Inverness Med vs пістолет - безпечне проколювання вух у Варшаві. Медична система з США для дітей 0+ та дорослих" : currentLang === "ru" ? "Inverness Med vs пистолет - безопасное прокалывание ушей в Варшаве. Медицинская система из США для детей 0+ и взрослых" : "Inverness Med vs piercing gun - safe ear piercing in Warsaw. Medical system from USA for children 0+ and adults",
          title: currentLang === "pl" ? "Inverness Med vs pistolet - bezpieczne przekłuwanie uszu w Warszawie" : currentLang === "uk" ? "Inverness Med vs пістолет - безпечне проколювання вух у Варшаві" : currentLang === "ru" ? "Inverness Med vs пистолет - безопасное прокалывание ушей в Варшаве" : "Inverness Med vs piercing gun - safe ear piercing in Warsaw",
          className: "w-full h-auto object-cover",
          loading: "eager",
          fetchPriority: "high",
          decoding: "async",
          width: "1200",
          height: "630"
        }
      ) : articleId === "children-age" ? /* @__PURE__ */ jsx(
        "img",
        {
          src: featuredImage3_800,
          srcSet: `
                  ${featuredImage3_400} 400w,
                  ${featuredImage3_800} 800w, 
                  ${featuredImage3_1200} 1200w,
                  ${featuredImage3_1600} 1600w
                `,
          sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px",
          alt: currentLang === "pl" ? "Od jakiego wieku można przekłuwać uszy dziecku? Inverness Med dla dzieci 0+ w Warszawie" : currentLang === "uk" ? "З якого віку можна проколювати вуха дитині? Inverness Med для дітей 0+ у Варшаві" : currentLang === "ru" ? "С какого возраста можно прокалывать уши ребенку? Inverness Med для детей 0+ в Варшаве" : "At What Age Can You Pierce a Child's Ears? Inverness Med for Children 0+ in Warsaw",
          title: currentLang === "pl" ? "Od jakiego wieku można przekłuwać uszy dziecku? Inverness Med dla dzieci 0+" : currentLang === "uk" ? "З якого віку можна проколювати вуха дитині? Inverness Med для дітей 0+" : currentLang === "ru" ? "С какого возраста можно прокалывать уши ребенку? Inverness Med для детей 0+" : "At What Age Can You Pierce a Child's Ears? Inverness Med for Children 0+",
          className: "w-full h-auto object-cover",
          loading: "eager",
          fetchPriority: "high",
          decoding: "async",
          width: "1200",
          height: "630"
        }
      ) : /* @__PURE__ */ jsx(
        "img",
        {
          src: featuredImage_800,
          srcSet: `
                  ${featuredImage_400} 400w,
                  ${featuredImage_800} 800w, 
                  ${featuredImage_1200} 1200w,
                  ${featuredImage_1600} 1600w
                `,
          sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px",
          alt: currentLang === "pl" ? "Procedura przekłuwania uszu systemem Inverness" : currentLang === "uk" ? "Процедура проколу вух системою Inverness" : currentLang === "ru" ? "Процедура прокалывания ушей системой Inverness" : "Ear piercing procedure with Inverness system",
          title: currentLang === "pl" ? "Procedura przekłuwania uszu systemem Inverness Med w Warszawie" : currentLang === "uk" ? "Процедура проколу вух системою Inverness Med у Варшаві" : currentLang === "ru" ? "Процедура прокалывания ушей системой Inverness Med в Варшаве" : "Ear piercing procedure with Inverness Med system in Warsaw",
          className: "w-full h-auto object-cover",
          loading: "eager",
          fetchPriority: "high",
          decoding: "async",
          width: "1200",
          height: "630"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 mb-8 text-sm text-muted-foreground justify-center flex-wrap", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: currentLang === "pl" ? "Gentle Piercing" : currentLang === "uk" ? "Gentle Piercing" : currentLang === "ru" ? "Gentle Piercing" : "Gentle Piercing" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { children: articleId === "inverness-vs-gun" ? currentLang === "pl" ? "13 listopada 2025" : currentLang === "uk" ? "13 листопада 2025" : currentLang === "ru" ? "13 ноября 2025" : "November 13, 2025" : articleId === "children-age" ? currentLang === "pl" ? "2 grudnia 2025" : currentLang === "uk" ? "2 грудня 2025" : currentLang === "ru" ? "2 декабря 2025" : "December 2, 2025" : currentLang === "pl" ? "27 października 2025" : currentLang === "uk" ? "27 жовтня 2025" : currentLang === "ru" ? "27 октября 2025" : "October 27, 2025" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { children: currentLang === "pl" ? "5 min czytania" : currentLang === "uk" ? "5 хв читання" : currentLang === "ru" ? "5 мин чтения" : "5 min read" })
        ] })
      ] }),
      articleId === "inverness-vs-gun" ? /* @__PURE__ */ jsx(ArticleInvernessVsGun, { currentLang }) : articleId === "children-age" ? /* @__PURE__ */ jsx(ArticleChildrenAge, { currentLang }) : /* @__PURE__ */ jsx(ArticleDoesItHurt, { currentLang })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const NotFound = () => {
  const location = useLocation();
  const noIndex = shouldNoIndex();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "404 - Page Not Found | Inverness MED" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "The page you're looking for doesn't exist." }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, nofollow" }),
      noIndex && /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, nofollow" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-4 text-4xl font-bold", children: "404" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4 text-xl text-gray-600", children: "Oops! Page not found" }),
      /* @__PURE__ */ jsx("a", { href: "/", className: "text-blue-500 underline hover:text-blue-700", children: "Return to Home" })
    ] }) })
  ] });
};
const SmartScrollManager = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
};
const LanguageManager = () => {
  const { i18n: i18n2 } = useTranslation();
  const location = useLocation();
  useEffect(() => {
    const lang = getLanguageFromPath(location.pathname);
    if (i18n2.language !== lang) {
      i18n2.changeLanguage(lang);
    }
    document.documentElement.lang = lang;
  }, [location.pathname, i18n2]);
  return null;
};
const EarringsRedirect = () => {
  const { lang } = useParams();
  const targetLang = isSupportedLanguage(lang) ? lang : "pl";
  return /* @__PURE__ */ jsx(Navigate, { to: `/${targetLang}`, replace: true });
};
const App = () => /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsxs(BrowserRouter, { children: [
  /* @__PURE__ */ jsx(LanguageManager, {}),
  /* @__PURE__ */ jsx(SmartScrollManager, {}),
  /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Navigate, { to: "/pl", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "/:lang", element: /* @__PURE__ */ jsx(LanguageHome, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/:lang/aftercare", element: /* @__PURE__ */ jsx(Aftercare, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/:lang/blog", element: /* @__PURE__ */ jsx(Blog, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/:lang/blog/:slug", element: /* @__PURE__ */ jsx(BlogArticle, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/:lang/earrings", element: /* @__PURE__ */ jsx(EarringsRedirect, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/aftercare", element: /* @__PURE__ */ jsx(Navigate, { to: "/pl/aftercare", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "/blog", element: /* @__PURE__ */ jsx(Navigate, { to: "/pl/blog", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "/earrings", element: /* @__PURE__ */ jsx(Navigate, { to: "/pl", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
  ] })
] }) });
if (typeof window !== "undefined") {
  i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    fallbackLng: "pl",
    supportedLngs: ["pl", "en", "ru", "uk"],
    backend: {
      loadPath: "/locales/{{lng}}/translation.json"
    },
    detection: {
      order: ["path", "localStorage", "navigator"],
      lookupFromPathIndex: 0,
      caches: ["localStorage"]
    },
    interpolation: {
      escapeValue: false
    }
  });
}
function handleRedirects() {
  if (typeof window === "undefined") return;
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const path = window.location.pathname;
  const search = window.location.search;
  const hash = window.location.hash;
  if (hostname.startsWith("www.")) {
    const newUrl = `${protocol}//${hostname.substring(4)}${path}${search}${hash}`;
    window.location.replace(newUrl);
    return;
  }
}
const initGA4 = () => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    initGoogleAnalytics();
    trackPageView(window.location.pathname);
  } else {
    setTimeout(initGA4, 50);
  }
};
const createRoot = ViteReactSSG(
  { root: App },
  ({ router, routes, isClient, initialState }) => {
    if (isClient) {
      handleRedirects();
      if (typeof window !== "undefined") {
        if (document.readyState === "complete") {
          initGA4();
        } else {
          window.addEventListener("load", initGA4);
        }
      }
    }
  }
);
export {
  Button as B,
  Card as C,
  blogThumbnail3_600 as a,
  blogThumbnail2_600 as b,
  cn as c,
  createRoot,
  blogThumbnail_600 as d,
  blogThumbnail2_400 as e,
  blogThumbnail3_400 as f,
  getLanguageFromPath as g,
  blogThumbnail_400 as h,
  CardContent as i
};
