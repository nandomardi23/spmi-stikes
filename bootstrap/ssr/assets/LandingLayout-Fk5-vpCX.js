import { jsxs, jsx } from "react/jsx-runtime";
import { usePage, Link } from "@inertiajs/react";
import { useState } from "react";
function LandingLayout({ children }) {
  const { auth } = usePage().props;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", children: [
    /* @__PURE__ */ jsx("nav", { className: "fixed top-0 left-0 right-0 z-50 glass shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center h-16", children: [
        /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-linear-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsx("span", { className: "text-white font-extrabold text-sm", children: "HT" }) }),
          /* @__PURE__ */ jsxs("div", { className: "hidden sm:block", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-sm font-bold text-gray-900 leading-tight", children: "SPMI" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 leading-tight", children: "STIKES Hang Tuah" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-1", children: [
          /* @__PURE__ */ jsx("a", { href: "#beranda", className: "px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-all", children: "Beranda" }),
          /* @__PURE__ */ jsx("a", { href: "#visi-misi", className: "px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-all", children: "Visi & Misi" }),
          /* @__PURE__ */ jsx("a", { href: "#standar-mutu", className: "px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-all", children: "Standar Mutu" }),
          /* @__PURE__ */ jsx("a", { href: "#dokumen", className: "px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-all", children: "Dokumen" }),
          /* @__PURE__ */ jsx("a", { href: "#berita", className: "px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-all", children: "Berita" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          auth.user ? /* @__PURE__ */ jsx(
            Link,
            {
              href: auth.user.roles.includes("auditee") ? "/auditee" : "/dashboard",
              className: "px-5 py-2 bg-linear-to-br from-primary-600 to-primary-700 text-white text-sm font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-500/25",
              children: "Dashboard"
            }
          ) : /* @__PURE__ */ jsx(
            Link,
            {
              href: "/login",
              className: "px-5 py-2 bg-linear-to-br from-primary-600 to-primary-700 text-white text-sm font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-500/25",
              children: "Login"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setMobileMenuOpen(!mobileMenuOpen),
              className: "md:hidden p-2 rounded-lg hover:bg-gray-100 transition",
              children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: mobileMenuOpen ? /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) : /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })
            }
          )
        ] })
      ] }),
      mobileMenuOpen && /* @__PURE__ */ jsxs("div", { className: "md:hidden pb-4 border-t border-gray-100 mt-2 pt-4 space-y-1", children: [
        /* @__PURE__ */ jsx("a", { href: "#beranda", className: "block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 rounded-lg", children: "Beranda" }),
        /* @__PURE__ */ jsx("a", { href: "#visi-misi", className: "block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 rounded-lg", children: "Visi & Misi" }),
        /* @__PURE__ */ jsx("a", { href: "#standar-mutu", className: "block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 rounded-lg", children: "Standar Mutu" }),
        /* @__PURE__ */ jsx("a", { href: "#dokumen", className: "block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 rounded-lg", children: "Dokumen" }),
        /* @__PURE__ */ jsx("a", { href: "#berita", className: "block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 rounded-lg", children: "Berita" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("main", { children }),
    /* @__PURE__ */ jsx("footer", { className: "bg-gray-900 text-gray-300", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-linear-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-white font-extrabold text-sm", children: "HT" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-white font-bold", children: "SPMI STIKES Hang Tuah" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Tanjungpinang" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 leading-relaxed", children: "Sistem Penjaminan Mutu Internal untuk menjamin dan meningkatkan mutu pendidikan tinggi di STIKES Hang Tuah Tanjungpinang." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold mb-4", children: "Tautan Cepat" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#beranda", className: "hover:text-primary-400 transition", children: "Beranda" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#visi-misi", className: "hover:text-primary-400 transition", children: "Visi & Misi" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#standar-mutu", className: "hover:text-primary-400 transition", children: "Standar Mutu" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#dokumen", className: "hover:text-primary-400 transition", children: "Dokumen" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold mb-4", children: "Kontak" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-400", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4 mt-0.5 shrink-0", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
                /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
                /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
              ] }),
              "Tanjungpinang, Kepulauan Riau"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 shrink-0", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
              "spmi@stikeshangtuah-tpi.ac.id"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500", children: /* @__PURE__ */ jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " STIKES Hang Tuah Tanjungpinang. All rights reserved."
      ] }) })
    ] }) })
  ] });
}
export {
  LandingLayout as L
};
