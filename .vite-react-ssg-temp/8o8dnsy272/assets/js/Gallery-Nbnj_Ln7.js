import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { c as cn, B as Button } from "../../main.mjs";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import "vite-react-ssg";
import "react-router-dom";
import "react-helmet-async";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-separator";
import "i18next";
import "i18next-browser-languagedetector";
import "i18next-http-backend";
const Dialog = SheetPrimitive.Root;
const DialogPortal = SheetPrimitive.Portal;
const DialogOverlay = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Overlay, { ref, className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className), ...props }));
DialogOverlay.displayName = SheetPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({
  className,
  children,
  ...props
}, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(SheetPrimitive.Content, { ref, className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className), ...props, children: [
    children,
    /* @__PURE__ */ jsx(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none", children: /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" }) })
  ] })
] }));
DialogContent.displayName = SheetPrimitive.Content.displayName;
const DialogTitle = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Title, { ref, className: cn("text-lg font-semibold leading-none tracking-tight", className), ...props }));
DialogTitle.displayName = SheetPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({
  className,
  ...props
}, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Description, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
DialogDescription.displayName = SheetPrimitive.Description.displayName;
const img0968_thumb = "/assets/images/IMG_0968-DnohO56o.webp";
const img0968_full = "/assets/images/IMG_0968-Y3ZO87ov.webp";
const img0969_thumb = "/assets/images/IMG_0969-D4ww93fj.webp";
const img0969_full = "/assets/images/IMG_0969-DBGRNZBt.webp";
const img0970_thumb = "/assets/images/IMG_0970-DCZDsQZW.webp";
const img0970_full = "/assets/images/IMG_0970-Dwykfcs3.webp";
const img0971_thumb = "/assets/images/IMG_0971-Crysssvj.webp";
const img0971_full = "/assets/images/IMG_0971-Bp7RkCoI.webp";
const img0972_thumb = "/assets/images/IMG_0972-CM1PGUsh.webp";
const img0972_full = "/assets/images/IMG_0972-DIGW53bI.webp";
const img0973_thumb = "/assets/images/IMG_0973-z_bnd51S.webp";
const img0973_full = "/assets/images/IMG_0973-BkUEJRJk.webp";
const img0974_thumb = "/assets/images/IMG_0974-DwbH89ap.webp";
const img0974_full = "/assets/images/IMG_0974-CDKUPAMk.webp";
const img0975_thumb = "/assets/images/IMG_0975-BDZF8ubM.webp";
const img0975_full = "/assets/images/IMG_0975-Botj0X-i.webp";
const img0976_thumb = "/assets/images/IMG_0976-DGCXO2FV.webp";
const img0976_full = "/assets/images/IMG_0976-Hw1T2J8k.webp";
const img0977_thumb = "/assets/images/IMG_0977-Dz1QLmZI.webp";
const img0977_full = "/assets/images/IMG_0977-BbpRlnxZ.webp";
const img0978_thumb = "/assets/images/IMG_0978-M-52fSCC.webp";
const img0978_full = "/assets/images/IMG_0978-uaBChukA.webp";
const img0979_thumb = "/assets/images/IMG_0979-DPpBXEvA.webp";
const img0979_full = "/assets/images/IMG_0979-DX94zhaR.webp";
const img0980_thumb = "/assets/images/IMG_0980-D4sl0SJB.webp";
const img0980_full = "/assets/images/IMG_0980-Cba0WmDl.webp";
const img0981_thumb = "/assets/images/IMG_0981-ua5Ih7oj.webp";
const img0981_full = "/assets/images/IMG_0981-Dxc0RypC.webp";
const img0982_thumb = "/assets/images/IMG_0982-BKA_We8U.webp";
const img0982_full = "/assets/images/IMG_0982-B_nznS-H.webp";
const img0983_thumb = "/assets/images/IMG_0983-CYpZ9aVq.webp";
const img0983_full = "/assets/images/IMG_0983-BrdjcIL-.webp";
const img0984_thumb = "/assets/images/IMG_0984-Cc_k6Pbu.webp";
const img0984_full = "/assets/images/IMG_0984-UdTlTDAL.webp";
const img0985_thumb = "/assets/images/IMG_0985-DF4HNnlx.webp";
const img0985_full = "/assets/images/IMG_0985-DGhRtqNv.webp";
const Gallery = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const galleryImages = [
    { thumb: img0985_thumb, full: img0985_full, alt: "Przekłucie uszu dziecka przed i po z niebieskim kolczykiem - Inverness MED" },
    { thumb: img0984_thumb, full: img0984_full, alt: "Przekłucie płatka ucha przed i po z kryształowym kolczykiem - medyczne przekłuwanie" },
    { thumb: img0983_thumb, full: img0983_full, alt: "Przekłucie ucha dziecka z perłowym kolczykiem Inverness" },
    { thumb: img0982_thumb, full: img0982_full, alt: "Przekłucie płatka i conch przed i po z wiszącymi kolczykami kryształowymi" },
    { thumb: img0981_thumb, full: img0981_full, alt: "Przekłucie helix i płatka ucha z kolczykami złotymi i kryształami" },
    { thumb: img0980_thumb, full: img0980_full, alt: "Przekłucie ucha dziecka przed i po z różowym kwiatowym kolczykiem" },
    { thumb: img0979_thumb, full: img0979_full, alt: "Profesjonalne przekłucie uszu dziecka z fioletowym kryształowym kolczykiem" },
    { thumb: img0978_thumb, full: img0978_full, alt: "Medyczne przekłucie ucha dziewczynki z holograficznym kolczykiem" },
    { thumb: img0977_thumb, full: img0977_full, alt: "Zadowolone dziecko po przekłuciu uszu - bezbolesny system Inverness MED" },
    { thumb: img0976_thumb, full: img0976_full, alt: "Przekłucie uszu dziecka ze złotymi kolczykami w salonie Inverness MED" },
    { thumb: img0975_thumb, full: img0975_full, alt: "Luksusowe przekłucie ucha z czterema kolczykami - księżyc, krzyżyk i kryształy" },
    { thumb: img0974_thumb, full: img0974_full, alt: "Przekłucie płatka ucha dziecka ze złotym kwiatkiem Inverness" },
    { thumb: img0973_thumb, full: img0973_full, alt: "Przekłucie conch i płatka z trzema złotymi kolczykami z gwiazdką" },
    { thumb: img0972_thumb, full: img0972_full, alt: "Przekłucie rook i helix z kryształowymi kolczykami medycznymi" },
    { thumb: img0971_thumb, full: img0971_full, alt: "Przekłucie rook, daith i płatka ze złotymi wiszącymi kolczykami z kryształami" },
    { thumb: img0970_thumb, full: img0970_full, alt: "Przekłucie tragus i płatka z błyszczącym wiszącym kolczykiem kryształowym" },
    { thumb: img0969_thumb, full: img0969_full, alt: "Przekłucie conch z czerwonym kryształem i płatka z kryształem Inverness MED" },
    { thumb: img0968_thumb, full: img0968_full, alt: "Przekłucie płatka ucha ze złotą gwiazdką - minimalistyczny kolczyk medyczny" }
  ];
  const openImage = (index) => {
    setSelectedImage(index);
  };
  const closeImage = () => {
    setSelectedImage(null);
  };
  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };
  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };
  return /* @__PURE__ */ jsxs("section", { id: "gallery", className: "py-20 bg-gradient-to-b from-primary-light/10 to-background border-t border-border", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4", children: t("gallery.title") }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: t("gallery.subtitle") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: [
        galleryImages.slice(0, 7).map((image, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative aspect-square overflow-hidden rounded-lg shadow-soft hover:shadow-card transition-shadow duration-300 group cursor-pointer",
            onClick: () => openImage(index),
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: image.thumb,
                  alt: image.alt,
                  className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
                  loading: "lazy",
                  decoding: "async",
                  width: "400",
                  height: "400"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" })
            ]
          },
          index
        )),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "relative aspect-square overflow-hidden rounded-lg shadow-soft hover:shadow-card transition-all duration-300 group cursor-pointer bg-muted/50 flex items-center justify-center hover:bg-primary/10",
            onClick: () => openImage(0),
            children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-foreground group-hover:scale-105 transition-transform duration-300", children: t("gallery.seeAll") }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t("gallery.photoCount", { count: galleryImages.length }) })
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: selectedImage !== null, onOpenChange: () => closeImage(), children: /* @__PURE__ */ jsx(DialogContent, { className: "max-w-[95vw] h-[100dvh] md:max-h-[95vh] p-0 bg-black/95 border-none", children: /* @__PURE__ */ jsxs(
      "div",
      {
        className: "relative w-full h-full flex items-center justify-center",
        children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "absolute top-4 right-4 z-50 text-white hover:bg-white/20 h-12 w-12",
              onClick: closeImage,
              children: /* @__PURE__ */ jsx(X, { className: "h-6 w-6" })
            }
          ),
          selectedImage !== null && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: galleryImages[selectedImage].full,
                alt: galleryImages[selectedImage].alt,
                className: "max-w-full max-h-full object-contain animate-fade-in",
                loading: "eager",
                decoding: "async",
                draggable: false
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "hidden md:flex absolute left-4 z-50 text-white hover:bg-white/20 h-16 w-16",
                onClick: prevImage,
                children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-8 w-8" })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "hidden md:flex absolute right-4 z-50 text-white hover:bg-white/20 h-16 w-16",
                onClick: nextImage,
                children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-8 w-8" })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "md:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4 z-50", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "text-white hover:bg-white/20 h-14 w-14",
                  onClick: (e) => {
                    e.stopPropagation();
                    prevImage();
                  },
                  children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-8 w-8" })
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "text-white hover:bg-white/20 h-14 w-14",
                  onClick: (e) => {
                    e.stopPropagation();
                    nextImage();
                  },
                  children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-8 w-8" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full", children: [
              selectedImage + 1,
              " / ",
              galleryImages.length
            ] })
          ] })
        ]
      }
    ) }) })
  ] });
};
export {
  Gallery
};
