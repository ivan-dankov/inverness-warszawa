import { jsx, jsxs } from "react/jsx-runtime";
import { c as cn, B as Button, C as Card } from "../../main.mjs";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslation } from "react-i18next";
import "vite-react-ssg";
import "react-router-dom";
import "react-helmet-async";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-dialog";
import "@radix-ui/react-separator";
import "i18next";
import "i18next-browser-languagedetector";
import "i18next-http-backend";
const CarouselContext = React.createContext(null);
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = React.forwardRef(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const onSelect = React.useCallback((api2) => {
      if (!api2) {
        return;
      }
      setCanScrollPrev(api2.canScrollPrev());
      setCanScrollNext(api2.canScrollNext());
    }, []);
    const scrollPrev = React.useCallback(() => {
      api == null ? void 0 : api.scrollPrev();
    }, [api]);
    const scrollNext = React.useCallback(() => {
      api == null ? void 0 : api.scrollNext();
    }, [api]);
    const handleKeyDown = React.useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );
    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }
      setApi(api);
    }, [api, setApi]);
    React.useEffect(() => {
      if (!api) {
        return;
      }
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api == null ? void 0 : api.off("select", onSelect);
      };
    }, [api, onSelect]);
    return /* @__PURE__ */ jsx(
      CarouselContext.Provider,
      {
        value: {
          carouselRef,
          api,
          opts,
          orientation: orientation || ((opts == null ? void 0 : opts.axis) === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            onKeyDownCapture: handleKeyDown,
            className: cn("relative", className),
            role: "region",
            "aria-roledescription": "carousel",
            ...props,
            children
          }
        )
      }
    );
  }
);
Carousel.displayName = "Carousel";
const CarouselContent = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return /* @__PURE__ */ jsx("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className),
        ...props
      }
    ) });
  }
);
CarouselContent.displayName = "CarouselContent";
const CarouselItem = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "group",
        "aria-roledescription": "slide",
        className: cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className),
        ...props
      }
    );
  }
);
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = React.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return /* @__PURE__ */ jsxs(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollPrev,
        onClick: scrollPrev,
        ...props,
        children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Previous slide" })
        ]
      }
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = React.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return /* @__PURE__ */ jsxs(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollNext,
        onClick: scrollNext,
        ...props,
        children: [
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next slide" })
        ]
      }
    );
  }
);
CarouselNext.displayName = "CarouselNext";
const Testimonials = () => {
  const { t } = useTranslation();
  const testimonials = [
    {
      name: "Anna P",
      date: "paź 18, 2025",
      rating: 5,
      text: "Jestem zachwycona usługą:) Pani wszystko wyjaśniła, jak będzie przebiegać przekłucie, jak pielęgnować. Super podejście do dzieci:) wszystko sprawnie poszło, polecamy ❤️",
      service: "Przekłuwanie uszu z dojazdem do domu"
    },
    {
      name: "Weronika N",
      date: "paź 15, 2025",
      rating: 5,
      text: "Byłam u pani Kseniyi na przekłuciu uszu i jestem bardzo zadowolona z efektu! 💎 Wszystko odbyło się szybko, profesjonalnie i bezboleśnie. Pani Kseniya jest bardzo miła, delikatna i dokładna. Dziękuję serdecznie – polecam z całego serca! ❤️",
      service: "Przekłuwanie uszu INVERNESS MED"
    },
    {
      name: "Ivan D",
      date: "paź 15, 2025",
      rating: 5,
      text: "Jestem bardzo zadowolony! Przekłucie wykonane szybko i bez stresu. Świetny kontakt i pełen profesjonalizm — polecam!",
      service: "Przekłuwanie uszu INVERNESS MED"
    },
    {
      name: "Валерія Б",
      date: "paź 15, 2025",
      rating: 5,
      text: "Bardzo miła atmosfera i pełne zaangażowanie. Pani wszystko spokojnie wytłumaczyła, przekłucie przebiegło bez bólu i wygląda przepięknie ✨ Na pewno wrócę i będę polecać dalej!🤍",
      service: "Przekłuwanie uszu"
    },
    {
      name: "Аня М",
      date: "paź 15, 2025",
      rating: 5,
      text: "Bardzo polecam usługę przekłuwania uszu! Wszystko przebiegło świetnie i zupełnie bez bólu. Ksenia ma bardzo lekką rękę, wszystko zrobiła niezwykle dokładnie i delikatnie. Dodatkowo cieszy czystość i dbałość o higienę w salonie. Jestem bardzo zadowolona!",
      service: "Przekłuwanie uszu"
    },
    {
      name: "Polina R",
      date: "paź 16, 2025",
      rating: 5,
      text: "Bardzo polecam! Szybko, dokładnie i profesjonalnie. Jestem bardzo zadowolona😊",
      service: "Przekłucie płatka ucha INVERNESS MED"
    },
    {
      name: "Anastasiia P",
      date: "paź 16, 2025",
      rating: 5,
      text: "Jestem bardzo zadowolona! Przekłucie wykonane delikatnie i bez stresu. Świetny kontakt, wszystko wytłumaczone krok po kroku. Polecam każdemu, kto szuka bezpiecznego i profesjonalnego miejsca!",
      service: "Przekłucie chrząstki"
    },
    {
      name: "Inesa A",
      date: "paź 16, 2025",
      rating: 5,
      text: "Profesjonalne podejście, czysto, sterylnie i z uśmiechem 😊 Przekłucie wykonane perfekcyjnie, efekt piękny!",
      service: "Przekłucie chrząstki"
    },
    {
      name: "Myroslava T",
      date: "paź 16, 2025",
      rating: 5,
      text: "Bardzo zadowolona !!! Dokładnie, szybko, profesjonalne. Polecam",
      service: "Przekłuwanie uszu INVERNESS MED"
    }
  ];
  return /* @__PURE__ */ jsx("section", { id: "testimonials", className: "py-20 bg-gradient-to-b from-primary-light/10 to-background border-t border-border", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4", children: t("testimonials.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: t("testimonials.subtitle") }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4 mt-4 flex-wrap", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "flex", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(Star, { className: "h-5 w-5 fill-yellow-500 text-yellow-500" }, i)) }),
          /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold", children: "5.0" }),
          /* @__PURE__ */ jsx("a", { href: "https://booksy.com/pl-pl/dl/show-business/319418", target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: t("testimonials.onBooksy") })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "•" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "flex", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(Star, { className: "h-5 w-5 fill-yellow-500 text-yellow-500" }, i)) }),
          /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold", children: "5.0" }),
          /* @__PURE__ */ jsx("a", { href: "https://maps.app.goo.gl/6a87CL7bf8aApZHDA", target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: t("testimonials.onGoogleMaps") })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-12", children: /* @__PURE__ */ jsxs(
      Carousel,
      {
        opts: {
          align: "start",
          loop: true
        },
        className: "w-full",
        children: [
          /* @__PURE__ */ jsx(CarouselContent, { children: testimonials.map((testimonial, index) => /* @__PURE__ */ jsx(CarouselItem, { className: "md:basis-1/2 lg:basis-1/3", children: /* @__PURE__ */ jsxs(Card, { className: "p-6 h-full flex flex-col hover:shadow-card transition-shadow duration-300", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold text-foreground", children: testimonial.name }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: testimonial.date })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex", children: [...Array(testimonial.rating)].map((_, i) => /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-yellow-500 text-yellow-500" }, i)) })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-4 flex-grow", children: testimonial.text }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground/70 italic", children: testimonial.service })
          ] }) }, index)) }),
          /* @__PURE__ */ jsx(CarouselPrevious, {}),
          /* @__PURE__ */ jsx(CarouselNext, {})
        ]
      }
    ) })
  ] }) });
};
export {
  Testimonials
};
