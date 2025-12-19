import { jsxs, jsx } from "react/jsx-runtime";
import { B as Button, C as Card } from "../../main.mjs";
import { Navigation, MapPin, Phone, Mail, Instagram, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import "vite-react-ssg";
import "react-router-dom";
import "react";
import "./react-core-DmnhavI8.js";
import "react-fast-compare";
import "invariant";
import "shallowequal";
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
const Map = () => {
  const handleGetDirections = () => {
    window.open("https://maps.app.goo.gl/QYu9H57wTRXZ3rxK9", "_blank");
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full h-[400px]", children: [
    /* @__PURE__ */ jsx(
      "iframe",
      {
        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.9610761754225!2d20.942375977015534!3d52.22592497198555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47193341d4989f85%3A0xfd7aab178ccbd285!2sGentle%20Piercing%20-%20Przek%C5%82uwanie%20Uszu%20Warszawa!5e0!3m2!1sen!2spl!4v1761245833409!5m2!1sen!2spl",
        width: "100%",
        height: "100%",
        style: { border: 0 },
        allowFullScreen: true,
        loading: "lazy",
        referrerPolicy: "no-referrer-when-downgrade",
        title: "Gentle Piercing - Przekłuwanie Uszu Warszawa",
        className: "rounded-lg shadow-lg"
      }
    ),
    /* @__PURE__ */ jsxs(
      Button,
      {
        onClick: handleGetDirections,
        className: "absolute bottom-4 left-4 z-10 shadow-lg",
        variant: "default",
        children: [
          /* @__PURE__ */ jsx(Navigation, { className: "mr-2 h-4 w-4" }),
          "Get Directions"
        ]
      }
    )
  ] });
};
const Contact = () => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsx("section", { id: "contact", className: "py-20 bg-background border-t border-border", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4", children: t("contact.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: t("contact.subtitle") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs(Card, { className: "p-8 shadow-card", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-foreground mb-6", children: t("contact.contactInfo") }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-6 w-6 text-primary mt-1 flex-shrink-0" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-foreground mb-1", children: t("contact.location") }),
              /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mb-2", children: [
                "Gizów 6/208",
                /* @__PURE__ */ jsx("br", {}),
                "01-249 Warszawa, Wola"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-primary font-medium", children: t("contact.mobileVisit") })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-6 w-6 text-primary mt-1 flex-shrink-0" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-foreground mb-1", children: t("contact.phone") }),
              /* @__PURE__ */ jsx("a", { href: "tel:+48573818260", className: "text-primary hover:underline", children: "+48 573 818 260" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: t("contact.messengers") })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx(Mail, { className: "h-6 w-6 text-primary mt-1 flex-shrink-0" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-foreground mb-1", children: t("contact.email") }),
              /* @__PURE__ */ jsx("a", { href: "mailto:piercinggentle@gmail.com", className: "text-primary hover:underline", children: t("contact.emailAddress") })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx(Instagram, { className: "h-6 w-6 text-primary mt-1 flex-shrink-0" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-foreground mb-1", children: t("contact.instagram") }),
              /* @__PURE__ */ jsx("a", { href: "https://instagram.com/prokol_ushej_warszawa", target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: "@prokol_ushej_warszawa" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx(Clock, { className: "h-6 w-6 text-primary mt-1 flex-shrink-0" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-foreground mb-1", children: t("contact.hours") }),
              /* @__PURE__ */ jsx("div", { className: "space-y-1 text-muted-foreground", children: /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
                  t("contact.days"),
                  ":"
                ] }),
                " 10:00 - 20:00"
              ] }) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "p-8 shadow-card", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-foreground mb-6", children: t("contact.location") }),
        /* @__PURE__ */ jsx(Map, {})
      ] })
    ] })
  ] }) });
};
export {
  Contact
};
