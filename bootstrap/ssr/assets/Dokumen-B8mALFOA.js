import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { D as DashboardLayout } from "./DashboardLayout-BbXWOl-m.js";
import { useState } from "react";
import "clsx";
import "sweetalert2";
const kategoriOptions = [{ value: "laporan", label: "Laporan" }, { value: "bukti", label: "Bukti Pelaksanaan" }, { value: "sop", label: "SOP Unit" }, { value: "lainnya", label: "Lainnya" }];
function Dokumen({ dokumens, unitKerja }) {
  const [showUpload, setShowUpload] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({ judul: "", kategori: "bukti", file: null, deskripsi: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/auditee/dokumen", { forceFormData: true, onSuccess: () => {
      setShowUpload(false);
      reset();
    } });
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { title: "Dokumen Unit", children: [
    /* @__PURE__ */ jsx(Head, { title: "Dokumen Unit" }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-sm text-gray-500", children: [
        "Dokumen khusus untuk ",
        unitKerja.nama
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: () => setShowUpload(!showUpload), className: "px-5 py-2.5 bg-linear-to-r from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold shadow-lg", children: showUpload ? "Batal" : "+ Upload Dokumen Unit" })
    ] }),
    showUpload && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 animate-in slide-in-from-top-4", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 mb-4", children: "Upload Dokumen Baru" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1.5", children: "Judul Dokumen *" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: data.judul, onChange: (e) => setData("judul", e.target.value), className: "w-full px-4 py-2 border rounded-xl text-sm outline-none" }),
            errors.judul && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-danger-500", children: errors.judul })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1.5", children: "Kategori *" }),
            /* @__PURE__ */ jsx("select", { value: data.kategori, onChange: (e) => setData("kategori", e.target.value), className: "w-full px-4 py-2 border rounded-xl text-sm outline-none", children: kategoriOptions.map((o) => /* @__PURE__ */ jsx("option", { value: o.value, children: o.label }, o.value)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1.5", children: "File Dokumen (PDF/DOCX/JPG) *" }),
          /* @__PURE__ */ jsx("input", { type: "file", onChange: (e) => setData("file", e.target.files[0]), className: "w-full px-4 py-1.5 border rounded-xl text-sm outline-none" }),
          errors.file && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-danger-500", children: errors.file })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1.5", children: "Deskripsi" }),
          /* @__PURE__ */ jsx("textarea", { rows: 2, value: data.deskripsi, onChange: (e) => setData("deskripsi", e.target.value), className: "w-full px-4 py-2 border rounded-xl text-sm outline-none" })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, className: "px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold disabled:opacity-50", children: "Upload" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100 bg-gray-50/50", children: [
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3.5 font-semibold text-gray-600", children: "Judul" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3.5 font-semibold text-gray-600", children: "Kategori" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3.5 font-semibold text-gray-600", children: "Terbuka" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3.5 font-semibold text-gray-600", children: "Ukuran" }),
          /* @__PURE__ */ jsx("th", { className: "text-right px-6 py-3.5 font-semibold text-gray-600", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50", children: dokumens.data.length > 0 ? dokumens.data.map((d) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 transition", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium text-gray-900", children: d.judul }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-600 capitalize", children: d.kategori }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-2.5 py-1 text-xs font-medium rounded-lg ${d.is_public ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`, children: d.is_public ? "Publik" : "Internal" }) }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-gray-600", children: [
            (d.file_size / 1024).toFixed(0),
            " KB"
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsx("a", { href: `/dashboard/dokumen/${d.id}/download`, className: "text-primary-600 font-medium", children: "Download" }) })
        ] }, d.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "px-6 py-12 text-center text-gray-400", children: "Tidak ada dokumen unit yang diupload." }) }) })
      ] }),
      dokumens.links && dokumens.links.length > 3 && /* @__PURE__ */ jsx("div", { className: "px-6 py-4 border-t border-gray-100 flex justify-end gap-1", children: dokumens.links.map((link, i) => /* @__PURE__ */ jsx(Link, { href: link.url || "#", className: `px-3 py-1.5 text-sm rounded-lg ${link.active ? "bg-primary-600 text-white" : link.url ? "text-gray-600 hover:bg-gray-100" : "text-gray-300"}`, dangerouslySetInnerHTML: { __html: link.label } }, i)) })
    ] })
  ] });
}
export {
  Dokumen as default
};
