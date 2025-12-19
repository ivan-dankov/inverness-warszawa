import { jsx, jsxs } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { c as cn, C as Card } from "../../main.mjs";
import * as React from "react";
import { Sparkles, Check, X, AlertCircle } from "lucide-react";
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
const Table = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx("table", { ref, className: cn("w-full caption-bottom text-sm", className), ...props }) })
);
Table.displayName = "Table";
const TableHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props })
);
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props })
);
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("tfoot", { ref, className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className), ...props })
);
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "tr",
    {
      ref,
      className: cn("border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50", className),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "th",
    {
      ref,
      className: cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      ),
      ...props
    }
  )
);
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("td", { ref, className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className), ...props })
);
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("caption", { ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props })
);
TableCaption.displayName = "TableCaption";
const Comparison = () => {
  const { t } = useTranslation();
  const methods = ["gun", "needle", "inverness"];
  const attributes = ["sterility", "comfort", "healing", "childrenSuitability", "cartilageSuitability", "features"];
  const getIcon = (method, attribute) => {
    if (method === "inverness") {
      return /* @__PURE__ */ jsx(Check, { className: "h-5 w-5 text-primary inline-block mr-2" });
    }
    if (method === "gun" && (attribute === "sterility" || attribute === "comfort" || attribute === "healing" || attribute === "childrenSuitability" || attribute === "cartilageSuitability")) {
      return /* @__PURE__ */ jsx(X, { className: "h-5 w-5 text-destructive inline-block mr-2" });
    }
    if (method === "needle" && attribute === "cartilageSuitability") {
      return /* @__PURE__ */ jsx(Check, { className: "h-5 w-5 text-primary inline-block mr-2" });
    }
    return /* @__PURE__ */ jsx(AlertCircle, { className: "h-5 w-5 text-muted-foreground inline-block mr-2" });
  };
  return /* @__PURE__ */ jsx("section", { id: "comparison", className: "py-20 bg-background border-t border-border", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4", children: t("comparison.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground mb-2", children: t("comparison.subtitle") }),
      /* @__PURE__ */ jsx("p", { className: "text-base text-muted-foreground max-w-3xl mx-auto", children: t("comparison.description") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto mb-8", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-center text-foreground mb-8", children: t("comparison.tableTitle") }),
      /* @__PURE__ */ jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsx(Card, { className: "overflow-hidden", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { className: "bg-muted/50", children: [
          /* @__PURE__ */ jsx(TableHead, { className: "w-1/4 font-semibold text-foreground", children: t("comparison.attributes.method") }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-center font-semibold text-foreground", children: t("comparison.methods.gun.name") }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-center font-semibold text-foreground", children: t("comparison.methods.needle.name") }),
          /* @__PURE__ */ jsxs(TableHead, { className: "text-center font-semibold text-foreground bg-primary/5 border-l-4 border-primary", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5 text-primary inline-block mr-2" }),
            t("comparison.methods.inverness.name")
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: attributes.map((attr) => /* @__PURE__ */ jsxs(TableRow, { className: "hover:bg-muted/30", children: [
          /* @__PURE__ */ jsx(TableCell, { className: "font-medium text-foreground", children: t(`comparison.attributes.${attr}`) }),
          methods.map((method) => /* @__PURE__ */ jsxs(
            TableCell,
            {
              className: `text-sm ${method === "inverness" ? "bg-primary/5 border-l-4 border-primary font-medium" : ""}`,
              children: [
                getIcon(method, attr),
                t(`comparison.methods.${method}.${attr}`)
              ]
            },
            method
          ))
        ] }, attr)) })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "lg:hidden space-y-6", children: methods.map((method) => /* @__PURE__ */ jsxs(
        Card,
        {
          className: `p-6 ${method === "inverness" ? "border-2 border-primary bg-primary/5" : ""}`,
          children: [
            /* @__PURE__ */ jsxs("h4", { className: `text-xl font-bold mb-4 flex items-center ${method === "inverness" ? "text-primary" : "text-foreground"}`, children: [
              method === "inverness" && /* @__PURE__ */ jsx(Sparkles, { className: "h-6 w-6 mr-2" }),
              t(`comparison.methods.${method}.name`)
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4", children: attributes.map((attr) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-semibold text-sm text-muted-foreground mb-1", children: t(`comparison.attributes.${attr}`) }),
              /* @__PURE__ */ jsxs("div", { className: "text-sm text-foreground flex items-start", children: [
                getIcon(method, attr),
                /* @__PURE__ */ jsx("span", { className: "flex-1", children: t(`comparison.methods.${method}.${attr}`) })
              ] })
            ] }, attr)) })
          ]
        },
        method
      )) })
    ] })
  ] }) });
};
export {
  Comparison
};
