import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { D as DashboardLayout } from "./DashboardLayout-BbXWOl-m.js";
import { useState } from "react";
import { M as Modal } from "./Modal-BDmNznn_.js";
import Swal from "sweetalert2";
import { E as EmptyState } from "./EmptyState-DcuWdlra.js";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import "clsx";
import "@headlessui/react";
function Index({ berita, filters }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [search, setSearch] = useState(filters.search || "");
  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
    judul: "",
    ringkasan: "",
    konten: "",
    gambar: null,
    status: "draft"
  });
  const handleSearch = (e) => {
    e.preventDefault();
    router.get("/dashboard/berita", { search }, { preserveState: true });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Berita?",
      text: "Berita yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/dashboard/berita/${id}`, {
          onSuccess: () => {
            Swal.fire("Terhapus!", "Berita telah berhasil dihapus.", "success");
          }
        });
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingData) {
      router.post(`/dashboard/berita/${editingData.id}`, {
        _method: "put",
        ...data,
        forceFormData: true
      }, {
        onSuccess: () => {
          closeModal();
          Swal.fire("Berhasil!", "Berita telah diperbarui.", "success");
        }
      });
    } else {
      post("/dashboard/berita", {
        forceFormData: true,
        onSuccess: () => {
          closeModal();
          Swal.fire("Berhasil!", "Berita telah diterbitkan.", "success");
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
      ringkasan: item.ringkasan || "",
      konten: item.konten,
      gambar: null,
      // Reset gambar to null so we don't accidentally re-upload old one unless changed
      status: item.status
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
  return /* @__PURE__ */ jsxs(DashboardLayout, { title: "Berita & Pengumuman", children: [
    /* @__PURE__ */ jsx(Head, { title: "Berita & Pengumuman" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Cari berita...",
            className: "px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none w-64 transition-all"
          }
        ),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition", children: "Cari" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: openCreateModal,
          className: "px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary-500/25 hover:from-primary-700 hover:to-primary-800 transition",
          children: "+ Tulis Berita"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100 bg-gray-50/50", children: [
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3.5 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Judul & Ringkasan" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3.5 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3.5 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Tanggal Publish" }),
          /* @__PURE__ */ jsx("th", { className: "text-right px-6 py-3.5 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50", children: berita.data.length > 0 ? berita.data.map((b) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 transition duration-200", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            b.gambar ? /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-100 shadow-sm", children: /* @__PURE__ */ jsx("img", { src: `/storage/${b.gambar}`, className: "w-full h-full object-cover", alt: b.judul }) }) : /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 border border-dashed border-gray-300", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 font-medium", children: "No Image" }) }),
            /* @__PURE__ */ jsxs("div", { className: "max-w-md", children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900 line-clamp-1", children: b.judul }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 line-clamp-1 mt-0.5", children: b.ringkasan || "Tidak ada ringkasan" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center px-2.5 py-1 text-[11px] font-bold rounded-lg ${b.status === "published" ? "bg-green-50 text-green-700 border border-green-100" : "bg-gray-50 text-gray-600 border border-gray-100"}`, children: [
            /* @__PURE__ */ jsx("span", { className: `w-1.5 h-1.5 rounded-full mr-1.5 ${b.status === "published" ? "bg-green-500" : "bg-gray-400"}` }),
            b.status === "published" ? "Terpublikasi" : "Draft"
          ] }) }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
            /* @__PURE__ */ jsx("div", { className: "text-gray-600 text-[11px] font-medium", children: b.published_at ? new Date(b.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "-" }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-400", children: b.author?.name || "Administrator" })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => openEditModal(b),
                className: "p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition duration-200",
                title: "Edit Berita",
                children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDelete(b.id),
                className: "p-2 text-danger-500 hover:bg-danger-50 rounded-xl transition duration-200",
                title: "Hapus Berita",
                children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" })
              }
            )
          ] }) })
        ] }, b.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, children: /* @__PURE__ */ jsx(EmptyState, { title: "Belum Ada Berita", message: "Mulai bagikan informasi terbaru untuk civitas STIKES." }) }) }) })
      ] }) }),
      berita.links && berita.links.length > 3 && /* @__PURE__ */ jsx("div", { className: "px-6 py-4 border-t border-gray-100 flex justify-end gap-1", children: berita.links.map((link, i) => /* @__PURE__ */ jsx(
        Link,
        {
          href: link.url || "#",
          className: `px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${link.active ? "bg-primary-600 text-white shadow-md shadow-primary-500/20" : link.url ? "text-gray-600 hover:bg-gray-100" : "text-gray-300 pointer-events-none"}`,
          dangerouslySetInnerHTML: { __html: link.label }
        },
        i
      )) })
    ] }),
    /* @__PURE__ */ jsx(Modal, { show: isModalOpen, onClose: closeModal, children: /* @__PURE__ */ jsxs("div", { className: "p-7", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center mb-6", children: /* @__PURE__ */ jsx("h2", { className: "text-xl font-extrabold text-gray-900 tracking-tight", children: editingData ? "Edit Berita" : "Tulis Berita Baru" }) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-gray-700 mb-1.5", children: [
              "Judul Berita ",
              /* @__PURE__ */ jsx("span", { className: "text-danger-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.judul,
                onChange: (e) => setData("judul", e.target.value),
                placeholder: "Masukkan judul yang menarik...",
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              }
            ),
            errors.judul && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[11px] font-medium text-danger-500 ml-1", children: errors.judul })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-gray-700 mb-1.5", children: [
              "Gambar Utama ",
              editingData && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 font-normal", children: "(Kosongkan jika tidak ingin mengubah)" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl bg-gray-50/50 hover:bg-gray-50 transition cursor-pointer relative overflow-hidden", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1 text-center", children: [
                /* @__PURE__ */ jsx("svg", { className: "mx-auto h-12 w-12 text-gray-400", stroke: "currentColor", fill: "none", viewBox: "0 0 48 48", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }),
                /* @__PURE__ */ jsx("div", { className: "flex text-sm text-gray-600", children: /* @__PURE__ */ jsx("p", { className: "pl-1", children: "Upload gambar berita (Max 2MB)" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "PNG, JPG, JPEG up to 2MB" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  accept: "image/*",
                  onChange: (e) => setData("gambar", e.target.files[0]),
                  className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                }
              )
            ] }),
            data.gambar && /* @__PURE__ */ jsxs("p", { className: "mt-2 text-[11px] text-primary-600 font-bold ml-1", children: [
              "✓ Berkas terpilih: ",
              data.gambar.name
            ] }),
            errors.gambar && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[11px] font-medium text-danger-500 ml-1", children: errors.gambar })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-1.5", children: "Ringkasan Berita" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 2,
                value: data.ringkasan,
                onChange: (e) => setData("ringkasan", e.target.value),
                placeholder: "Penjelasan singkat konten berita...",
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-gray-700 mb-1.5", children: [
              "Konten Utama ",
              /* @__PURE__ */ jsx("span", { className: "text-danger-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 8,
                value: data.konten,
                onChange: (e) => setData("konten", e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 font-sans transition-all",
                placeholder: "Tuliskan berita lengkap di sini..."
              }
            ),
            errors.konten && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[11px] font-medium text-danger-500 ml-1", children: errors.konten })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900", children: "Status Publikasi" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Tentukan apakah berita langsung dipublikasikan atau disimpan sebagai draft." })
            ] }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.status,
                onChange: (e) => setData("status", e.target.value),
                className: "px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-primary-500 outline-none",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "draft", children: "📁 Draft" }),
                  /* @__PURE__ */ jsx("option", { value: "published", children: "🚀 Published" })
                ]
              }
            )
          ] })
        ] }),
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
              children: processing ? "Sedang Memproses..." : editingData ? "Perbarui Berita" : "Terbitkan Berita"
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
