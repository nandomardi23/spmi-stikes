import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { D as DashboardLayout } from "./DashboardLayout-BbXWOl-m.js";
import "react";
import "clsx";
import "sweetalert2";
const statusColors = { dijadwalkan: "bg-blue-100 text-blue-700", berlangsung: "bg-amber-100 text-amber-700", selesai: "bg-green-100 text-green-700", dibatalkan: "bg-red-100 text-red-700" };
const jenisColors = { observasi: "bg-blue-100 text-blue-700", minor: "bg-amber-100 text-amber-700", mayor: "bg-red-100 text-red-700" };
const temuanStatusColors = { open: "bg-red-100 text-red-700", in_progress: "bg-amber-100 text-amber-700", closed: "bg-green-100 text-green-700", verified: "bg-blue-100 text-blue-700" };
function Show({ audit }) {
  return /* @__PURE__ */ jsxs(DashboardLayout, { title: "Detail Audit", children: [
    /* @__PURE__ */ jsx(Head, { title: "Detail Audit" }),
    /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(Link, { href: "/dashboard/audit", className: "text-sm text-primary-600 hover:text-primary-700", children: "← Kembali" }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900", children: audit.unit_kerja?.nama }),
            /* @__PURE__ */ jsx("span", { className: `px-3 py-1 text-sm font-medium rounded-lg ${statusColors[audit.status]}`, children: audit.status })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Siklus:" }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900", children: audit.siklus_audit?.nama })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Auditor:" }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900", children: audit.auditor?.name || "Belum ditugaskan" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Tanggal:" }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900", children: audit.tanggal_audit || "-" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Skor:" }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900 text-lg", children: audit.skor || "-" })
            ] })
          ] }),
          audit.catatan && /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-4 border-t border-gray-100", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "Catatan:" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 mt-1", children: audit.catatan })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-100 flex justify-between items-center", children: [
            /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-gray-900", children: [
              "Temuan (",
              audit.temuans?.length || 0,
              ")"
            ] }),
            /* @__PURE__ */ jsx(Link, { href: `/dashboard/temuan/create?audit_id=${audit.id}`, className: "text-sm text-primary-600 hover:text-primary-700 font-medium", children: "+ Tambah" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-50", children: audit.temuans?.length > 0 ? audit.temuans.map((t) => /* @__PURE__ */ jsxs("div", { className: "px-6 py-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 text-xs font-medium rounded-lg ${jenisColors[t.jenis]}`, children: t.jenis }),
              /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 text-xs font-medium rounded-lg ${temuanStatusColors[t.status]}`, children: t.status }),
              t.standar_mutu && /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: t.standar_mutu.kode })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-900", children: t.deskripsi }),
            t.rekomendasi && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [
              "Rekomendasi: ",
              t.rekomendasi
            ] })
          ] }, t.id)) : /* @__PURE__ */ jsx("p", { className: "px-6 py-8 text-sm text-gray-400 text-center", children: "Belum ada temuan." }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-4", children: "Aksi" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Link, { href: `/dashboard/audit/${audit.id}/edit`, className: "block w-full text-center px-4 py-2.5 bg-primary-50 text-primary-700 font-medium rounded-xl hover:bg-primary-100 transition text-sm", children: "Edit Audit" }),
          /* @__PURE__ */ jsx(Link, { href: `/dashboard/temuan/create?audit_id=${audit.id}`, className: "block w-full text-center px-4 py-2.5 bg-amber-50 text-amber-700 font-medium rounded-xl hover:bg-amber-100 transition text-sm", children: "Tambah Temuan" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Show as default
};
