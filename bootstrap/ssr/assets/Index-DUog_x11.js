import { jsx, jsxs } from "react/jsx-runtime";
import { BuildingOfficeIcon, ClipboardDocumentCheckIcon, MagnifyingGlassIcon, ChartBarSquareIcon, ExclamationTriangleIcon, ArrowPathIcon, DocumentIcon, UsersIcon } from "@heroicons/react/24/outline";
import { D as DashboardLayout } from "./DashboardLayout-BbXWOl-m.js";
import { Head, Link } from "@inertiajs/react";
import "react";
import "clsx";
import "sweetalert2";
const statusColors = {
  dijadwalkan: "bg-blue-100 text-blue-700",
  berlangsung: "bg-amber-100 text-amber-700",
  selesai: "bg-green-100 text-green-700",
  dibatalkan: "bg-red-100 text-red-700",
  open: "bg-red-100 text-red-700",
  in_progress: "bg-amber-100 text-amber-700",
  closed: "bg-green-100 text-green-700",
  verified: "bg-blue-100 text-blue-700"
};
const jenisColors = {
  observasi: "bg-blue-100 text-blue-700",
  minor: "bg-amber-100 text-amber-700",
  mayor: "bg-red-100 text-red-700"
};
function Index({ stats, recentAudits, recentTemuan }) {
  const statCards = [
    { label: "Unit Kerja", value: stats.total_unit_kerja, icon: /* @__PURE__ */ jsx(BuildingOfficeIcon, { className: "w-5 h-5" }), color: "from-blue-500 to-blue-600", shadow: "shadow-blue-500/20" },
    { label: "Standar Mutu", value: stats.total_standar, icon: /* @__PURE__ */ jsx(ClipboardDocumentCheckIcon, { className: "w-5 h-5" }), color: "from-purple-500 to-purple-600", shadow: "shadow-purple-500/20" },
    { label: "Total Audit", value: stats.total_audit, icon: /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "w-5 h-5" }), color: "from-amber-500 to-amber-600", shadow: "shadow-amber-500/20" },
    { label: "Audit Berjalan", value: stats.audit_berlangsung, icon: /* @__PURE__ */ jsx(ChartBarSquareIcon, { className: "w-5 h-5" }), color: "from-green-500 to-green-600", shadow: "shadow-green-500/20" },
    { label: "Temuan Terbuka", value: stats.temuan_open, icon: /* @__PURE__ */ jsx(ExclamationTriangleIcon, { className: "w-5 h-5" }), color: "from-red-500 to-red-600", shadow: "shadow-red-500/20" },
    { label: "Dalam Proses", value: stats.temuan_in_progress, icon: /* @__PURE__ */ jsx(ArrowPathIcon, { className: "w-5 h-5" }), color: "from-orange-500 to-orange-600", shadow: "shadow-orange-500/20" },
    { label: "Total Dokumen", value: stats.total_dokumen, icon: /* @__PURE__ */ jsx(DocumentIcon, { className: "w-5 h-5" }), color: "from-teal-500 to-teal-600", shadow: "shadow-teal-500/20" },
    { label: "Total Pengguna", value: stats.total_users, icon: /* @__PURE__ */ jsx(UsersIcon, { className: "w-5 h-5" }), color: "from-indigo-500 to-indigo-600", shadow: "shadow-indigo-500/20" }
  ];
  return /* @__PURE__ */ jsxs(DashboardLayout, { title: "Dashboard Overview", children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-extrabold text-gray-900 tracking-tight", children: "Dashboard Overview" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 font-medium mt-1", children: "Pantau performa dan ringkasan penjaminan mutu Anda secara real-time." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-5 mb-10", children: statCards.map((card, i) => /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`, children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsx("div", { className: `p-2.5 bg-linear-to-br ${card.color} rounded-xl text-white shadow-lg ${card.shadow} group-hover:scale-110 transition duration-300`, children: card.icon }) }),
      /* @__PURE__ */ jsx("p", { className: "text-3xl font-black text-gray-900 tracking-tight", children: card.value }),
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider", children: card.label })
    ] }, i)) }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-extrabold text-gray-900 tracking-tight", children: "Audit Terbaru" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5", children: "Jadwal pelaksanaan audit" })
          ] }),
          /* @__PURE__ */ jsx(Link, { href: "/dashboard/audit", className: "text-xs text-primary-600 hover:text-primary-700 font-extrabold uppercase tracking-tight bg-primary-50 px-3 py-1.5 rounded-lg transition", children: "Lihat Semua" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-50 flex-1", children: recentAudits.length > 0 ? recentAudits.map((audit) => /* @__PURE__ */ jsx("div", { className: "px-8 py-5 hover:bg-gray-50/50 transition duration-200 group", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition", children: /* @__PURE__ */ jsx(BuildingOfficeIcon, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 text-sm group-hover:text-primary-700 transition", children: audit.unit_kerja?.nama }),
              /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1 italic", children: [
                audit.siklus_audit?.nama,
                " • ",
                audit.auditor?.name || "Belum ditugaskan"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: `px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-tight border ${statusColors[audit.status]?.replace("bg-", "border-").replace("text-", "border-").split(" ")[0]} ${statusColors[audit.status]}`, children: audit.status })
        ] }) }, audit.id)) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-gray-400", children: [
          /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "w-12 h-12 mb-3 opacity-20" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium tracking-tight", children: "Belum ada data audit terbaru." })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-extrabold text-gray-900 tracking-tight", children: "Temuan Aktif" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5", children: "Ketidaksesuaian yang ditemukan" })
          ] }),
          /* @__PURE__ */ jsx(Link, { href: "/dashboard/temuan", className: "text-xs text-primary-600 hover:text-primary-700 font-extrabold uppercase tracking-tight bg-primary-50 px-3 py-1.5 rounded-lg transition", children: "Lihat Semua" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-50 flex-1", children: recentTemuan.length > 0 ? recentTemuan.map((temuan) => /* @__PURE__ */ jsxs("div", { className: "px-8 py-5 hover:bg-gray-50/50 transition duration-200 group", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-tighter border ${jenisColors[temuan.jenis]?.replace("bg-", "border-").replace("text-", "border-").split(" ")[0]} ${jenisColors[temuan.jenis]}`, children: temuan.jenis }),
            /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-tighter border ${statusColors[temuan.status]?.replace("bg-", "border-").replace("text-", "border-").split(" ")[0]} ${statusColors[temuan.status]}`, children: temuan.status })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900 group-hover:text-primary-700 transition line-clamp-1", children: temuan.deskripsi }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1 italic", children: temuan.audit?.unit_kerja?.nama })
        ] }, temuan.id)) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-gray-400", children: [
          /* @__PURE__ */ jsx(ExclamationTriangleIcon, { className: "w-12 h-12 mb-3 opacity-20" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium tracking-tight", children: "Tidak ada temuan aktif saat ini." })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Index as default
};
