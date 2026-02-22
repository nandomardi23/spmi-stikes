import { jsx, jsxs } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { D as DashboardLayout } from "./DashboardLayout-BbXWOl-m.js";
import "react";
import "clsx";
import "sweetalert2";
const statusColors = { dijadwalkan: "bg-blue-100 text-blue-700", berlangsung: "bg-amber-100 text-amber-700", selesai: "bg-green-100 text-green-700", dibatalkan: "bg-red-100 text-red-700" };
function Index({ user, unitKerja, recentAudits, totalTemuanOpen, totalDokumen }) {
  if (!unitKerja) {
    return /* @__PURE__ */ jsx(DashboardLayout, { title: "Portal Auditee", children: /* @__PURE__ */ jsx("div", { className: "bg-red-50 text-red-800 p-6 rounded-2xl border border-red-200", children: "Akun Anda belum dipetakan ke Unit Kerja manapun. Hubungi Admin." }) });
  }
  return /* @__PURE__ */ jsxs(DashboardLayout, { title: `Portal Auditee: ${unitKerja.nama}`, children: [
    /* @__PURE__ */ jsx(Head, { title: "Portal Auditee" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-linear-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white shadow-lg", children: [
        /* @__PURE__ */ jsx("p", { className: "text-primary-200 text-sm mb-1", children: "Unit Kerja" }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", children: unitKerja.nama }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-primary-100", children: [
          /* @__PURE__ */ jsx("span", { className: "w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center", children: "👤" }),
          unitKerja.kepala_unit?.name || "Belum di set"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-2xl", children: "⚠️" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-gray-900", children: totalTemuanOpen }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Temuan Aktif (Open/In Progress)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl", children: "📄" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-gray-900", children: totalDokumen }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Dokumen Unit" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "px-6 py-4 border-b border-gray-100 flex justify-between items-center", children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900", children: "Jadwal Audit" }) }),
      /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-50", children: recentAudits.length > 0 ? recentAudits.map((a) => /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 hover:bg-gray-50 transition", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-1", children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900", children: a.siklus_audit?.nama }),
          /* @__PURE__ */ jsx("span", { className: `px-2.5 py-1 text-xs font-medium rounded-lg ${statusColors[a.status]}`, children: a.status })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
          "Jadwal: ",
          a.tanggal_audit || "Belum dijadwalkan",
          " • Auditor: ",
          a.auditor?.name || "Belum ada"
        ] })
      ] }, a.id)) : /* @__PURE__ */ jsx("p", { className: "px-6 py-8 text-center text-gray-400", children: "Tidak ada jadwal audit untuk unit ini." }) })
    ] })
  ] });
}
export {
  Index as default
};
