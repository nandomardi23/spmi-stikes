import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { D as DashboardLayout } from "./DashboardLayout-BbXWOl-m.js";
import { useState } from "react";
import { M as Modal } from "./Modal-BDmNznn_.js";
import Swal from "sweetalert2";
import { E as EmptyState } from "./EmptyState-DcuWdlra.js";
import { ArrowDownTrayIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import "clsx";
import "@headlessui/react";
const kategoriLabels = {
  kebijakan: "Kebijakan",
  manual: "Manual",
  standar: "Standar",
  formulir: "Formulir",
  sop: "SOP",
  laporan: "Laporan",
  bukti: "Bukti",
  lainnya: "Lainnya"
};
const kategoriOptions = [
  { value: "kebijakan", label: "Kebijakan" },
  { value: "manual", label: "Manual" },
  { value: "standar", label: "Standar" },
  { value: "formulir", label: "Formulir" },
  { value: "sop", label: "SOP" },
  { value: "laporan", label: "Laporan" },
  { value: "bukti", label: "Bukti" },
  { value: "lainnya", label: "Lainnya" }
];
function Index({ dokumens, filters }) {
  const [search, setSearch] = useState(filters.search || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const { data, setData, post, processing, errors, reset, clearErrors, transform } = useForm({
    judul: "",
    deskripsi: "",
    kategori: "kebijakan",
    nomor_dokumen: "",
    tanggal_dokumen: "",
    file: null,
    is_public: false
  });
  const handleSearch = (e) => {
    e.preventDefault();
    router.get("/dashboard/dokumen", { search }, { preserveState: true });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Dokumen?",
      text: "File dokumen juga akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/dashboard/dokumen/${id}`);
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingData) {
      transform((data2) => ({ ...data2, _method: "put" }));
      post(`/dashboard/dokumen/${editingData.id}`, {
        forceFormData: true,
        onSuccess: () => {
          closeModal();
          Swal.fire("Berhasil!", "Dokumen telah diperbarui.", "success");
        },
        onFinish: () => transform((data2) => data2)
        // reset transform
      });
    } else {
      post("/dashboard/dokumen", {
        forceFormData: true,
        onSuccess: () => {
          closeModal();
          Swal.fire("Berhasil!", "Dokumen telah diupload.", "success");
        }
      });
    }
  };
  const openCreateModal = () => {
    reset();
    clearErrors();
    setEditingData(null);
    setIsModalOpen(true);
  };
  const openEditModal = (item) => {
    clearErrors();
    setEditingData(item);
    setData({
      judul: item.judul,
      deskripsi: item.deskripsi || "",
      kategori: item.kategori,
      nomor_dokumen: item.nomor_dokumen || "",
      tanggal_dokumen: item.tanggal_dokumen || "",
      file: null,
      is_public: item.is_public
    });
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      reset();
      clearErrors();
      setEditingData(null);
    }, 150);
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { title: "Dokumen Mutu", children: [
    /* @__PURE__ */ jsx(Head, { title: "Dokumen Mutu" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Cari dokumen...",
            className: "px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none w-64 transition-all"
          }
        ),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition", children: "Cari" }),
        filters.search && /* @__PURE__ */ jsx(Link, { href: "/dashboard/dokumen", className: "px-4 py-2.5 text-danger-600 text-sm font-medium hover:underline", children: "Reset" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: openCreateModal,
          className: "px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25",
          children: "+ Upload Dokumen"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100 bg-gray-50/50", children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Judul & Informasi" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Kategori" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Publikasi" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Uploader" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-right", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50", children: dokumens.data.length > 0 ? dokumens.data.map((d) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 transition", children: [
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900", children: d.judul }),
            /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-500 font-medium mt-0.5 tracking-tight uppercase", children: [
              d.nomor_dokumen || "Tanpa Nomor",
              " • ",
              d.tanggal_dokumen || "-",
              " • ",
              (d.file_size / 1024).toFixed(0),
              " KB"
            ] })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-md border border-indigo-100 uppercase tracking-tight", children: kategoriLabels[d.kategori] || d.kategori }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-2.5 py-1 text-[11px] font-bold rounded-lg ${d.is_public ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`, children: d.is_public ? "PUBLIK" : "INTERNAL" }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-600 font-medium text-xs tracking-tight", children: d.uploader?.name || "-" }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: `/dashboard/dokumen/${d.id}/download`,
                className: "p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition duration-200",
                title: "Download",
                children: /* @__PURE__ */ jsx(ArrowDownTrayIcon, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => openEditModal(d),
                className: "p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition duration-200",
                title: "Edit",
                children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDelete(d.id),
                className: "p-2 text-danger-500 hover:bg-danger-50 rounded-xl transition duration-200",
                title: "Hapus",
                children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" })
              }
            )
          ] }) })
        ] }, d.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, children: /* @__PURE__ */ jsx(EmptyState, { title: "Dokumen Tidak Ditemukan", message: "Belum ada dokumen yang diupload atau sesuaikan filter pencarian." }) }) }) })
      ] }) }),
      dokumens.links && dokumens.links.length > 3 && /* @__PURE__ */ jsx("div", { className: "px-6 py-4 border-t border-gray-100 flex justify-end gap-1", children: dokumens.links.map((link, i) => /* @__PURE__ */ jsx(
        Link,
        {
          href: link.url || "#",
          className: `px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${link.active ? "bg-primary-600 text-white shadow-md shadow-primary-500/20" : link.url ? "text-gray-600 hover:bg-gray-100" : "text-gray-300 pointer-events-none"}`,
          dangerouslySetInnerHTML: { __html: link.label }
        },
        i
      )) })
    ] }),
    /* @__PURE__ */ jsx(Modal, { show: isModalOpen, onClose: closeModal, children: /* @__PURE__ */ jsxs("div", { className: "p-7", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-extrabold text-gray-900 mb-6 tracking-tight", children: editingData ? "Edit Dokumen" : "Upload Dokumen Baru" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: [
              "Kategori Dokumen ",
              /* @__PURE__ */ jsx("span", { className: "text-danger-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "select",
              {
                value: data.kategori,
                onChange: (e) => setData("kategori", e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold",
                children: kategoriOptions.map((o) => /* @__PURE__ */ jsx("option", { value: o.value, children: o.label }, o.value))
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: "Nomor Dokumen" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.nomor_dokumen,
                onChange: (e) => setData("nomor_dokumen", e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium",
                placeholder: "e.g. 001/SK/LPM/2026"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: [
            "Judul Dokumen ",
            /* @__PURE__ */ jsx("span", { className: "text-danger-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.judul,
              onChange: (e) => setData("judul", e.target.value),
              className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium",
              placeholder: "e.g. Kebijakan Mutu STIKES Surabaya"
            }
          ),
          errors.judul && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[10px] font-bold text-danger-500", children: errors.judul })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: "Ringkasan / Deskripsi" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 3,
              value: data.deskripsi,
              onChange: (e) => setData("deskripsi", e.target.value),
              className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium",
              placeholder: "Jelaskan isi singkat dokumen ini..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: "Tanggal Terbit" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "date",
                value: data.tanggal_dokumen,
                onChange: (e) => setData("tanggal_dokumen", e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: [
              "File Dokumen (PDF/DOCX) ",
              editingData && /* @__PURE__ */ jsx("span", { className: "text-[10px] font-normal text-gray-400 ml-1", children: "(Kosongkan jika tidak ubah)" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                onChange: (e) => setData("file", e.target.files[0]),
                className: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-extrabold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              }
            ),
            errors.file && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[10px] font-bold text-danger-500", children: errors.file })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-4 bg-gray-50 rounded-2xl border border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: "is_public",
              checked: data.is_public,
              onChange: (e) => setData("is_public", e.target.checked),
              className: "w-5 h-5 rounded-lg border-gray-300 text-primary-600 focus:ring-primary-500"
            }
          ),
          /* @__PURE__ */ jsxs("label", { htmlFor: "is_public", className: "text-sm font-bold text-gray-800 cursor-pointer", children: [
            "Publikasikan Dokumen",
            /* @__PURE__ */ jsx("span", { className: "block text-[10px] font-normal text-gray-400 uppercase tracking-tighter", children: "Dapat diakses oleh pengunjung umum (Public Access)" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-6 border-t border-gray-100", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: closeModal,
              className: "px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition duration-200 text-sm",
              children: "Batal"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "px-8 py-3 bg-linear-to-br from-primary-600 to-primary-700 text-white font-extrabold rounded-xl disabled:opacity-50 transition duration-200 shadow-xl shadow-primary-500/25 hover:from-primary-700 hover:to-primary-800 text-sm",
              children: processing ? "Sedang Memproses..." : editingData ? "Perbarui Dokumen" : "Upload Dokumen"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Index as default
};
