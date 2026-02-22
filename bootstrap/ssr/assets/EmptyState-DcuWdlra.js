import { jsx, jsxs } from "react/jsx-runtime";
import "react";
function EmptyState({ icon, title, description }) {
  return /* @__PURE__ */ jsx("tr", { className: "border-b-0", children: /* @__PURE__ */ jsx("td", { colSpan: "100%", className: "px-6 py-16 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center max-w-sm mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 text-gray-400", children: icon || /* @__PURE__ */ jsx("svg", { className: "w-10 h-10", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" }) }) }),
    /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-gray-900 mb-1", children: title || "Data Kosong" }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 leading-relaxed", children: description || "Belum ada data apa pun yang ditambahkan di tabel ini. Silakan buat data baru melalui tombol tambah di atas." })
  ] }) }) });
}
export {
  EmptyState as E
};
