import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { c as cn } from "../../main.mjs";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "vite-react-ssg";
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
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
const FAQ = () => {
  const { t } = useTranslation();
  const faqs = t("faq.items", { returnObjects: true });
  const aftercareLink = t("faq.aftercareLink");
  return /* @__PURE__ */ jsx("section", { id: "faq", className: "py-20 bg-background border-t border-border", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4", children: t("faq.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: t("faq.subtitle") })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: faqs.map((faq, index) => /* @__PURE__ */ jsxs(AccordionItem, { value: `item-${index}`, children: [
      /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left text-base sm:text-lg", children: faq.question }),
      /* @__PURE__ */ jsxs(AccordionContent, { className: "text-muted-foreground text-sm sm:text-base", children: [
        faq.answer,
        faq.link && /* @__PURE__ */ jsxs(Fragment, { children: [
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/aftercare", className: "text-primary hover:underline font-medium", children: aftercareLink })
        ] })
      ] })
    ] }, index)) }) })
  ] }) });
};
export {
  FAQ
};
