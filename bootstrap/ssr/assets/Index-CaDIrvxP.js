import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, router } from "@inertiajs/react";
import { D as DashboardLayout } from "./DashboardLayout-BbXWOl-m.js";
import { useState } from "react";
import { M as Modal } from "./Modal-BDmNznn_.js";
import Swal from "sweetalert2";
import { E as EmptyState } from "./EmptyState-DcuWdlra.js";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import "clsx";
import "@headlessui/react";
function Index({ siklusAudit }) {
  const statusColors = { perencanaan: "bg-blue-100 text-blue-700", pelaksanaan: "bg-amber-100 text-amber-700", pelaporan: "bg-purple-100 text-purple-700", selesai: "bg-green-100 text-green-700" };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
    nama: "",
    tahun: (/* @__PURE__ */ new Date()).getFullYear(),
    semester: 1,
    tanggal_mulai: "",
    tanggal_selesai: "",
    status: "perencanaan",
    deskripsi: ""
  });
  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Siklus Audit?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/dashboard/siklus-audit/${id}`);
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingData) {
      put(`/dashboard/siklus-audit/${editingData.id}`, {
        onSuccess: () => {
          closeModal();
          Swal.fire("Berhasil!", "Siklus audit telah diperbarui.", "success");
        }
      });
    } else {
      post("/dashboard/siklus-audit", {
        onSuccess: () => {
          closeModal();
          Swal.fire("Berhasil!", "Siklus audit baru telah ditambahkan.", "success");
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
      nama: item.nama,
      tahun: item.tahun,
      semester: item.semester,
      tanggal_mulai: item.tanggal_mulai,
      tanggal_selesai: item.tanggal_selesai,
      status: item.status,
      deskripsi: item.deskripsi || ""
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
  return /* @__PURE__ */ jsxs(DashboardLayout, { title: "Siklus Audit", children: [
    /* @__PURE__ */ jsx(Head, { title: "Siklus Audit" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-gray-500 uppercase tracking-widest text-[10px]", children: "Master Data" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "Kelola siklus dan periode pelaksanaan audit mutul internal" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: openCreateModal,
          className: "px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25",
          children: "+ Tambah Siklus"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100 bg-gray-50/50", children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Periode & Nama Siklus" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Tahun / Semester" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Total Audit" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-right", children: "Aksi" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50", children: siklusAudit.data.length > 0 ? siklusAudit.data.map((s) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 transition", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-linear-to-br from-indigo-50 to-indigo-100 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-extrabold text-xs", children: s.tahun }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900", children: s.nama }),
            /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400 font-medium uppercase tracking-tighter mt-0.5", children: [
              s.tanggal_mulai,
              " - ",
              s.tanggal_selesai
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
          /* @__PURE__ */ jsxs("p", { className: "font-bold text-gray-700", children: [
            "TA ",
            s.tahun
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400 font-medium uppercase tracking-tighter", children: [
            "Semester ",
            s.semester
          ] })
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-tight border ${statusColors[s.status]?.replace("bg-", "border-").replace("text-", "border-").split(" ")[0]} ${statusColors[s.status]}`, children: s.status }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900", children: s.audits_count }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-tighter", children: "Unit Auditing" })
        ] }) }),
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
      ] }, s.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, children: /* @__PURE__ */ jsx(EmptyState, { title: "Siklus Audit Belum Tersedia", message: "Belum ada periode audit yang dibuat. Silakan tambahkan siklus baru." }) }) }) })
    ] }) }) }),
    /* @__PURE__ */ jsx(Modal, { show: isModalOpen, onClose: closeModal, children: /* @__PURE__ */ jsxs("div", { className: "p-7", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-extrabold text-gray-900 mb-6 tracking-tight", children: editingData ? "Edit Siklus Audit" : "Tambah Siklus Audit Baru" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: [
            "Nama Siklus Audit ",
            /* @__PURE__ */ jsx("span", { className: "text-danger-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.nama,
              onChange: (e) => setData("nama", e.target.value),
              className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium",
              placeholder: "e.g. AMI Tahun Akademik 2025/2026"
            }
          ),
          errors.nama && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[10px] font-bold text-danger-500", children: errors.nama })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: [
              "Tahun ",
              /* @__PURE__ */ jsx("span", { className: "text-danger-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: data.tahun,
                onChange: (e) => setData("tahun", e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold"
              }
            ),
            errors.tahun && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[10px] font-bold text-danger-500", children: errors.tahun })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: [
              "Semester ",
              /* @__PURE__ */ jsx("span", { className: "text-danger-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.semester,
                onChange: (e) => setData("semester", e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold",
                children: [
                  /* @__PURE__ */ jsx("option", { value: 1, children: "Semester Ganjil (1)" }),
                  /* @__PURE__ */ jsx("option", { value: 2, children: "Semester Genap (2)" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: [
              "Tanggal Mulai ",
              /* @__PURE__ */ jsx("span", { className: "text-danger-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "date",
                value: data.tanggal_mulai,
                onChange: (e) => setData("tanggal_mulai", e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-600"
              }
            ),
            errors.tanggal_mulai && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[10px] font-bold text-danger-500", children: errors.tanggal_mulai })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: [
              "Tanggal Selesai ",
              /* @__PURE__ */ jsx("span", { className: "text-danger-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "date",
                value: data.tanggal_selesai,
                onChange: (e) => setData("tanggal_selesai", e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-600"
              }
            ),
            errors.tanggal_selesai && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[10px] font-bold text-danger-500", children: errors.tanggal_selesai })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: "Status Pelaksanaan" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: data.status,
              onChange: (e) => setData("status", e.target.value),
              className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold capitalize",
              children: [
                /* @__PURE__ */ jsx("option", { value: "perencanaan", children: "Perencanaan" }),
                /* @__PURE__ */ jsx("option", { value: "pelaksanaan", children: "Pelaksanaan" }),
                /* @__PURE__ */ jsx("option", { value: "pelaporan", children: "Pelaporan" }),
                /* @__PURE__ */ jsx("option", { value: "selesai", children: "Selesai" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: "Catatan / Deskripsi" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 3,
              value: data.deskripsi,
              onChange: (e) => setData("deskripsi", e.target.value),
              className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium",
              placeholder: "Opsional: Tambahkan informasi tambahan tentang siklus ini..."
            }
          )
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
              children: processing ? "Sedang Memproses..." : editingData ? "Perbarui Siklus" : "Simpan Siklus"
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
