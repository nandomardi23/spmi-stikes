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
const kategoriLabels = {
  pendidikan: "Pendidikan",
  penelitian: "Penelitian",
  pengabdian: "Pengabdian",
  tata_kelola: "Tata Kelola",
  kemahasiswaan: "Kemahasiswaan",
  sdm: "SDM",
  keuangan: "Keuangan",
  sarana_prasarana: "Sarana & Prasarana"
};
const kategoriOptions = [
  { value: "pendidikan", label: "Pendidikan" },
  { value: "penelitian", label: "Penelitian" },
  { value: "pengabdian", label: "Pengabdian" },
  { value: "tata_kelola", label: "Tata Kelola" },
  { value: "kemahasiswaan", label: "Kemahasiswaan" },
  { value: "sdm", label: "SDM" },
  { value: "keuangan", label: "Keuangan" },
  { value: "sarana_prasarana", label: "Sarana & Prasarana" }
];
function Index({ standarMutu, filters }) {
  const [search, setSearch] = useState(filters.search || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
    kode: "",
    nama: "",
    deskripsi: "",
    kategori: "pendidikan",
    indikator: "",
    target: "",
    is_active: true
  });
  const handleSearch = (e) => {
    e.preventDefault();
    router.get("/dashboard/standar-mutu", { search }, { preserveState: true });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Standar Mutu?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/dashboard/standar-mutu/${id}`);
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingData) {
      put(`/dashboard/standar-mutu/${editingData.id}`, {
        onSuccess: () => {
          closeModal();
          Swal.fire("Berhasil!", "Standar mutu telah diperbarui.", "success");
        }
      });
    } else {
      post("/dashboard/standar-mutu", {
        onSuccess: () => {
          closeModal();
          Swal.fire("Berhasil!", "Standar mutu baru telah ditambahkan.", "success");
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
      kode: item.kode,
      nama: item.nama,
      deskripsi: item.deskripsi || "",
      kategori: item.kategori,
      indikator: item.indikator || "",
      target: item.target || "",
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
  return /* @__PURE__ */ jsxs(DashboardLayout, { title: "Standar Mutu", children: [
    /* @__PURE__ */ jsx(Head, { title: "Standar Mutu" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Cari standar mutu...",
            className: "px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none w-64 transition-all"
          }
        ),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition", children: "Cari" }),
        filters.search && /* @__PURE__ */ jsx(Link, { href: "/dashboard/standar-mutu", className: "px-4 py-2.5 text-danger-600 text-sm font-medium hover:underline", children: "Reset" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: openCreateModal,
          className: "px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25",
          children: "+ Tambah Standar"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100 bg-gray-50/50", children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Kode" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Nama Standar" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Kategori" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-right", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50", children: standarMutu.data.length > 0 ? standarMutu.data.map((s) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 transition", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: "px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-lg border border-indigo-100 uppercase tracking-tight", children: s.kode }) }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900", children: s.nama }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-medium uppercase tracking-tighter mt-0.5 truncate max-w-xs", children: s.target || "Tanpa Target" })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium text-gray-600", children: kategoriLabels[s.kategori] || s.kategori }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-2.5 py-1 text-[11px] font-bold rounded-lg ${s.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`, children: s.is_active ? "AKTIF" : "NON-AKTIF" }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => openEditModal(s),
                className: "p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition duration-200",
                title: "Edit",
                children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDelete(s.id),
                className: "p-2 text-danger-500 hover:bg-danger-50 rounded-xl transition duration-200",
                title: "Hapus",
                children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" })
              }
            )
          ] }) })
        ] }, s.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, children: /* @__PURE__ */ jsx(EmptyState, { title: "Standar Mutu Kosong", message: "Belum ada data standar mutu atau sesuaikan kata kunci pencarian Anda." }) }) }) })
      ] }) }),
      standarMutu.links && standarMutu.links.length > 3 && /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-t border-gray-100 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-[11px] font-bold text-gray-400 uppercase tracking-wider", children: [
          "Menampilkan ",
          standarMutu.from,
          "-",
          standarMutu.to,
          " data"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: standarMutu.links.map((link, i) => /* @__PURE__ */ jsx(
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
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-extrabold text-gray-900 mb-6 tracking-tight", children: editingData ? "Edit Standar Mutu" : "Tambah Standar Mutu Baru" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: [
              "Kode Standar ",
              /* @__PURE__ */ jsx("span", { className: "text-danger-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.kode,
                onChange: (e) => setData("kode", e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold",
                placeholder: "SM-01"
              }
            ),
            errors.kode && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[10px] font-bold text-danger-500", children: errors.kode })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: [
              "Kategori Standar ",
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
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: [
            "Nama Standar ",
            /* @__PURE__ */ jsx("span", { className: "text-danger-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.nama,
              onChange: (e) => setData("nama", e.target.value),
              className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium"
            }
          ),
          errors.nama && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[10px] font-bold text-danger-500", children: errors.nama })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: "Deskripsi Singkat" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 2,
              value: data.deskripsi,
              onChange: (e) => setData("deskripsi", e.target.value),
              className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: "Indikator Kinerja" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 2,
              value: data.indikator,
              onChange: (e) => setData("indikator", e.target.value),
              className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: "Target Capaian" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.target,
              onChange: (e) => setData("target", e.target.value),
              className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-4 bg-gray-50 rounded-2xl border border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: "is_active",
              checked: data.is_active,
              onChange: (e) => setData("is_active", e.target.checked),
              className: "w-5 h-5 rounded-lg border-gray-300 text-primary-600 focus:ring-primary-500"
            }
          ),
          /* @__PURE__ */ jsxs("label", { htmlFor: "is_active", className: "text-sm font-bold text-gray-800 cursor-pointer", children: [
            "Aktifkan Standar Mutu",
            /* @__PURE__ */ jsx("span", { className: "block text-[10px] font-normal text-gray-400 uppercase tracking-tighter", children: "Standar ini akan muncul dalam instrumen audit" })
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
              children: processing ? "Sedang Memproses..." : editingData ? "Perbarui Standar" : "Simpan Standar"
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
