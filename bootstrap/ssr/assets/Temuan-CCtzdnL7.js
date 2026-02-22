import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { D as DashboardLayout } from "./DashboardLayout-BbXWOl-m.js";
import "react";
import "clsx";
import "sweetalert2";
const jenisColors = { observasi: "bg-blue-100 text-blue-700", minor: "bg-amber-100 text-amber-700", mayor: "bg-red-100 text-red-700" };
const statusColors = { open: "bg-red-100 text-red-700", in_progress: "bg-amber-100 text-amber-700", closed: "bg-green-100 text-green-700", verified: "bg-blue-100 text-blue-700" };
function Temuan({ temuans }) {
  return /* @__PURE__ */ jsxs(DashboardLayout, { title: "Temuan Audit", children: [
    /* @__PURE__ */ jsx(Head, { title: "Temuan Audit" }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-6", children: "Daftar temuan audit yang perlu ditindaklanjuti oleh unit kerja Anda." }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100 bg-gray-50/50", children: [
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3.5 font-semibold text-gray-600", children: "Pelaksanaan Audit" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3.5 font-semibold text-gray-600", children: "Jenis" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3.5 font-semibold text-gray-600", children: "Deskripsi" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3.5 font-semibold text-gray-600", children: "Batas Waktu" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3.5 font-semibold text-gray-600", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "text-right px-6 py-3.5 font-semibold text-gray-600", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50", children: temuans.data.length > 0 ? temuans.data.map((t) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 transition", children: [
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 font-medium text-gray-900 text-xs", children: [
            t.audit?.siklus_audit?.nama,
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: t.audit?.tanggal_audit })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-2.5 py-1 text-xs font-medium rounded-lg ${jenisColors[t.jenis]}`, children: t.jenis }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-600 max-w-xs truncate", children: t.deskripsi }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-500 text-xs", children: t.batas_waktu || "-" }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-2.5 py-1 text-xs font-medium rounded-lg ${statusColors[t.status]}`, children: t.status }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsx(Link, { href: `/auditee/temuan/${t.id}`, className: "text-primary-600 font-medium", children: "Lihat Detail & Tindak Lanjut" }) })
        ] }, t.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, className: "px-6 py-12 text-center text-gray-400", children: "Tidak ada temuan." }) }) })
      ] }),
      temuans.links && temuans.links.length > 3 && /* @__PURE__ */ jsx("div", { className: "px-6 py-4 border-t border-gray-100 flex justify-end gap-1", children: temuans.links.map((link, i) => /* @__PURE__ */ jsx(Link, { href: link.url || "#", className: `px-3 py-1.5 text-sm rounded-lg ${link.active ? "bg-primary-600 text-white" : link.url ? "text-gray-600 hover:bg-gray-100" : "text-gray-300"}`, dangerouslySetInnerHTML: { __html: link.label } }, i)) })
    ] })
  ] });
}
export {
  Temuan as default
};
