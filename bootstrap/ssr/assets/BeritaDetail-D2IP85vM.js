import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { L as LandingLayout } from "./LandingLayout-Fk5-vpCX.js";
import "react";
function BeritaDetail({ berita }) {
  return /* @__PURE__ */ jsxs(LandingLayout, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: `${berita.judul} - SPMI STIKES Hang Tuah` }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: berita.ringkasan || berita.judul }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: berita.judul }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: berita.ringkasan || berita.judul }),
      berita.gambar && /* @__PURE__ */ jsx("meta", { property: "og:image", content: `/storage/${berita.gambar}` }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "article" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "pt-24 pb-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("a", { href: "/#berita", className: "inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 mb-8", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }),
        "Kembali ke Beranda"
      ] }),
      berita.gambar && /* @__PURE__ */ jsx("div", { className: "aspect-video rounded-2xl overflow-hidden mb-8", children: /* @__PURE__ */ jsx("img", { src: `/storage/${berita.gambar}`, alt: berita.judul, className: "w-full h-full object-cover" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4 text-sm text-gray-500", children: [
        berita.published_at && /* @__PURE__ */ jsx("span", { children: new Date(berita.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) }),
        berita.author && /* @__PURE__ */ jsxs("span", { children: [
          "• ",
          berita.author.name
        ] })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl font-bold text-gray-900 mb-6", children: berita.judul }),
      /* @__PURE__ */ jsx("div", { className: "prose prose-lg max-w-none", dangerouslySetInnerHTML: { __html: berita.konten } })
    ] }) })
  ] });
}
export {
  BeritaDetail as default
};
