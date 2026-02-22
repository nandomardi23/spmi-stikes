import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { D as DashboardLayout } from "./DashboardLayout-BbXWOl-m.js";
import "react";
import "clsx";
import "sweetalert2";
const jenisColors = { observasi: "bg-blue-100 text-blue-700", minor: "bg-amber-100 text-amber-700", mayor: "bg-red-100 text-red-700" };
const statusColors = { open: "bg-red-100 text-red-700", in_progress: "bg-amber-100 text-amber-700", closed: "bg-green-100 text-green-700", verified: "bg-blue-100 text-blue-700" };
function Show({ temuan, tindakLanjuts }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    temuan_id: temuan.id,
    deskripsi: "",
    bukti_file: null,
    status: "in_progress"
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/auditee/tindak-lanjut", {
      forceFormData: true,
      onSuccess: () => reset("deskripsi", "bukti_file")
    });
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { title: "Detail Temuan & Tindak Lanjut", children: [
    /* @__PURE__ */ jsx(Head, { title: "Detail Temuan & Tindak Lanjut" }),
    /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(Link, { href: "/auditee/temuan", className: "text-sm text-primary-600", children: "← Kembali ke Daftar Temuan" }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900", children: "Deskripsi Temuan" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: `px-2.5 py-1 text-xs font-medium rounded-lg ${jenisColors[temuan.jenis]}`, children: temuan.jenis }),
              /* @__PURE__ */ jsx("span", { className: `px-2.5 py-1 text-xs font-medium rounded-lg ${statusColors[temuan.status]}`, children: temuan.status })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 mb-4", children: temuan.deskripsi }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-500 block", children: "Jadwal Audit:" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: temuan.audit?.siklus_audit?.nama })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-500 block", children: "Batas Waktu:" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-danger-600", children: temuan.batas_waktu || "Tidak ditentukan" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-500 block", children: "Rekomendasi Auditor:" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: temuan.rekomendasi || "-" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 mb-6", children: "Riwayat Tindak Lanjut" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-6", children: tindakLanjuts.length > 0 ? tindakLanjuts.map((tl, index) => /* @__PURE__ */ jsxs("div", { className: "relative pl-6 border-l-2 border-primary-200", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute w-3 h-3 bg-primary-500 rounded-full -left-[7px] top-1 border-2 border-white" }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-2", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900 text-sm", children: tl.user?.name || "User" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: new Date(tl.created_at).toLocaleString("id-ID") })
                ] }),
                /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 text-xs font-medium rounded-lg ${statusColors[tl.status]}`, children: tl.status })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 mt-2", children: tl.deskripsi }),
              tl.bukti_file && /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsx("a", { href: `/storage/${tl.bukti_file}`, target: "_blank", rel: "noreferrer", className: "text-xs text-primary-600 bg-primary-50 px-3 py-1.5 rounded-lg border border-primary-100 inline-flex items-center gap-1", children: "📄 Lihat Bukti Lampiran" }) })
            ] })
          ] }, tl.id)) : /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 italic", children: "Belum ada riwayat tindak lanjut." }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 mb-4", children: "Update Progress" }),
        temuan.status === "closed" || temuan.status === "verified" ? /* @__PURE__ */ jsxs("div", { className: "bg-green-50 text-green-800 p-4 rounded-xl text-sm border border-green-200", children: [
          "Temuan ini sudah berstatus ",
          temuan.status,
          " dan tidak bisa diupdate lagi."
        ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1.5", children: "Deskripsi Tindakan *" }),
            /* @__PURE__ */ jsx("textarea", { rows: 3, value: data.deskripsi, onChange: (e) => setData("deskripsi", e.target.value), className: "w-full px-4 py-2 border rounded-xl text-sm outline-none", placeholder: "Jelaskan tindakan yang telah dilakukan..." }),
            errors.deskripsi && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-danger-500", children: errors.deskripsi })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1.5", children: "File Bukti (Opsional)" }),
            /* @__PURE__ */ jsx("input", { type: "file", onChange: (e) => setData("bukti_file", e.target.files[0]), className: "w-full px-4 py-1.5 border rounded-xl text-sm outline-none" }),
            errors.bukti_file && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-danger-500", children: errors.bukti_file })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1.5", children: "Update Status ke" }),
            /* @__PURE__ */ jsxs("select", { value: data.status, onChange: (e) => setData("status", e.target.value), className: "w-full px-4 py-2 border rounded-xl text-sm outline-none", children: [
              /* @__PURE__ */ jsx("option", { value: "in_progress", children: "In Progress (Sedang dikerjakan)" }),
              /* @__PURE__ */ jsx("option", { value: "closed", children: "Closed (Selesai)" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, className: "w-full py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold disabled:opacity-50", children: "Kirim Update" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Show as default
};
