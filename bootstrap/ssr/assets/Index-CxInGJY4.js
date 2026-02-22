import { jsxs, jsx } from "react/jsx-runtime";
import { MagnifyingGlassIcon, PhotoIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { E as EmptyState } from "./EmptyState-DcuWdlra.js";
import "react";
function Index({ galeris, filters }) {
  const [search, setSearch] = useState(filters.search || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
    judul: "",
    deskripsi: "",
    file: null,
    is_active: true
  });
  const handleSearch = (e) => {
    e.preventDefault();
    router.get("/dashboard/galeri", { search }, { preserveState: true });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Dokumentasi?",
      text: "Foto dan data dokumentasi akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/dashboard/galeri/${id}`, {
          onSuccess: () => Swal.fire("Terhapus!", "Dokumentasi telah dihapus.", "success")
        });
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingData) {
      post(`/dashboard/galeri/${editingData.id}`, {
        _method: "put",
        forceFormData: true,
        onSuccess: () => {
          closeModal();
          Swal.fire("Berhasil!", "Dokumentasi telah diperbarui.", "success");
        }
      });
    } else {
      post("/dashboard/galeri", {
        forceFormData: true,
        onSuccess: () => {
          closeModal();
          Swal.fire("Berhasil!", "Dokumentasi baru telah ditambahkan.", "success");
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
      file: null,
      is_active: item.is_active
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
  return /* @__PURE__ */ jsxs(DashboardLayout, { title: "Galeri Dokumentasi", children: [
    /* @__PURE__ */ jsx(Head, { title: "Galeri Dokumentasi" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsx("form", { onSubmit: handleSearch, className: "flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm sm:w-80", children: /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Cari dokumentasi...",
            className: "w-full pl-9 pr-4 py-2 text-sm bg-transparent border-none focus:ring-0 placeholder:text-gray-400 font-medium"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: openCreateModal,
          className: "px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25 flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsx(PhotoIcon, { className: "w-4 h-4" }),
            "+ Tambah Dokumentasi"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100 bg-gray-50/50", children: [
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Gambar" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Informasi Dokumentasi" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] hidden md:table-cell", children: "Deskripsi" }),
          /* @__PURE__ */ jsx("th", { className: "text-right px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50", children: galeris.data.length > 0 ? galeris.data.map((g) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 transition duration-200", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-tight border ${g.is_active ? "bg-green-50 text-green-700 border-green-100" : "bg-gray-100 text-gray-700 border-gray-200"}`, children: g.is_active ? "Publik" : "Draft" }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "relative group", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: `/storage/${g.file_path}`,
              alt: g.judul,
              className: "w-20 h-14 rounded-xl bg-gray-100 object-cover border border-gray-100 shadow-xs group-hover:shadow-md transition duration-300"
            }
          ) }) }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 group-hover:text-primary-600 transition", children: g.judul }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-tighter", children: [
                (g.file_size / 1024).toFixed(0),
                " KB"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-300", children: "•" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-tighter", children: new Date(g.created_at).toLocaleDateString() })
            ] })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-600 max-w-xs truncate hidden md:table-cell font-medium italic", children: g.deskripsi || "Tidak ada deskripsi" }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => openEditModal(g),
                className: "p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition duration-200",
                title: "Edit",
                children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDelete(g.id),
                className: "p-2 text-danger-500 hover:bg-danger-50 rounded-xl transition duration-200",
                title: "Hapus",
                children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" })
              }
            )
          ] }) })
        ] }, g.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, children: /* @__PURE__ */ jsx(EmptyState, { title: "Galeri Masih Kosong", message: "Belum ada foto dokumentasi kegiatan yang diunggah." }) }) }) })
      ] }) }),
      galeris.links && galeris.links.length > 3 && /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-t border-gray-100 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-[11px] font-bold text-gray-400 uppercase tracking-wider", children: [
          "Menampilkan ",
          galeris.from,
          "-",
          galeris.to,
          " data"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: galeris.links.map((link, i) => /* @__PURE__ */ jsx(
          Link,
          {
            href: link.url || "#",
            className: `px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${link.active ? "bg-primary-600 text-white shadow-md shadow-primary-500/20" : link.url ? "text-gray-600 hover:bg-gray-100" : "text-gray-300 pointer-events-none"}`,
            dangerouslySetInnerHTML: { __html: link.label }
          },
          i
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Modal, { show: isModalOpen, onClose: closeModal, children: /* @__PURE__ */ jsxs("div", { className: "p-7", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-extrabold text-gray-900 mb-6 tracking-tight", children: editingData ? "Edit Dokumentasi" : "Tambah Dokumentasi Baru" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: [
            "Judul Kegiatan ",
            /* @__PURE__ */ jsx("span", { className: "text-danger-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.judul,
              onChange: (e) => setData("judul", e.target.value),
              className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium",
              placeholder: "e.g. Workshop SPMI Tahun 2026",
              required: true
            }
          ),
          errors.judul && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[10px] font-bold text-danger-500", children: errors.judul })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: "Deskripsi / Keterangan" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 4,
              value: data.deskripsi,
              onChange: (e) => setData("deskripsi", e.target.value),
              className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium",
              placeholder: "Berikan deskripsi singkat tentang dokumentasi ini..."
            }
          ),
          errors.deskripsi && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[10px] font-bold text-danger-500", children: errors.deskripsi })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: editingData ? "Ganti Foto Dokumentasi (Opsional)" : "Foto Dokumentasi (JPG/PNG/WEBP) *" }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-full", children: /* @__PURE__ */ jsxs("label", { className: `flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${errors.file ? "border-danger-300 bg-danger-50" : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-primary-300"}`, children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center pt-5 pb-6", children: [
              /* @__PURE__ */ jsx(PhotoIcon, { className: `w-8 h-8 mb-3 ${errors.file ? "text-danger-400" : "text-gray-400"}` }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 font-bold uppercase tracking-tight", children: data.file ? data.file.name : "Klik atau seret foto ke sini" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                accept: "image/*",
                onChange: (e) => setData("file", e.target.files[0]),
                className: "hidden"
              }
            )
          ] }) }),
          errors.file && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[10px] font-bold text-danger-500", children: errors.file })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-4 rounded-xl border border-gray-100", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                id: "is_active",
                checked: data.is_active,
                onChange: (e) => setData("is_active", e.target.checked),
                className: "w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "is_active", className: "text-sm font-bold text-gray-700 cursor-pointer", children: "Tampilkan di Halaman Galeri Publik" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "ml-8 mt-1 text-[10px] text-gray-400 font-medium", children: "Jika dicentang, dokumentasi akan langsung dapat dilihat oleh pengunjung umum." })
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
              children: processing ? "Sedang Memproses..." : editingData ? "Perbarui Dokumentasi" : "Simpan Dokumentasi"
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
