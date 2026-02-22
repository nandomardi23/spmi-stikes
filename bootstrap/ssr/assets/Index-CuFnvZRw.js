import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, router, Link } from "@inertiajs/react";
import { D as DashboardLayout } from "./DashboardLayout-BbXWOl-m.js";
import { useState } from "react";
import { M as Modal } from "./Modal-BDmNznn_.js";
import Swal from "sweetalert2";
import { E as EmptyState } from "./EmptyState-DcuWdlra.js";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import "clsx";
import "@headlessui/react";
const jenisColors = { observasi: "bg-blue-100 text-blue-700", minor: "bg-amber-100 text-amber-700", mayor: "bg-red-100 text-red-700" };
const statusColors = { open: "bg-red-100 text-red-700", in_progress: "bg-amber-100 text-amber-700", closed: "bg-green-100 text-green-700", verified: "bg-blue-100 text-blue-700" };
function Index({ temuans, audits = [], standarMutu = [], filters, audit_id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
    audit_id: audit_id || "",
    standar_mutu_id: "",
    jenis: "observasi",
    deskripsi: "",
    rekomendasi: "",
    batas_waktu: "",
    status: "open"
  });
  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Temuan?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/dashboard/temuan/${id}`);
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingData) {
      put(`/dashboard/temuan/${editingData.id}`, {
        onSuccess: () => {
          closeModal();
          Swal.fire("Berhasil!", "Temuan telah diperbarui.", "success");
        }
      });
    } else {
      post("/dashboard/temuan", {
        onSuccess: () => {
          closeModal();
          Swal.fire("Berhasil!", "Temuan baru telah ditambahkan.", "success");
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
      audit_id: item.audit_id,
      standar_mutu_id: item.standar_mutu_id || "",
      jenis: item.jenis,
      deskripsi: item.deskripsi,
      rekomendasi: item.rekomendasi || "",
      batas_waktu: item.batas_waktu || "",
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
  return /* @__PURE__ */ jsxs(DashboardLayout, { title: "Temuan Audit", children: [
    /* @__PURE__ */ jsx(Head, { title: "Temuan Audit" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm w-fit", children: ["", "open", "in_progress", "closed"].map((s) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => router.get("/dashboard/temuan", { status: s }, { preserveState: true }),
          className: `px-5 py-2 text-xs font-bold rounded-xl transition-all uppercase tracking-tight ${(filters.status || "") === s ? "bg-primary-600 text-white shadow-md shadow-primary-500/20" : "text-gray-500 hover:bg-gray-50"}`,
          children: s || "Semua"
        },
        s
      )) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: openCreateModal,
          className: "px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary-500/25 transition hover:from-primary-700 hover:to-primary-800",
          children: "+ Tambah Temuan"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100 bg-gray-50/50", children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Unit Kerja & Audit" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Jenis Temuan" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Deskripsi Permasalahan" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-right", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50", children: temuans.data.length > 0 ? temuans.data.map((t) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 transition", children: [
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900", children: t.audit?.unit_kerja?.nama }),
            /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400 font-medium uppercase tracking-tighter mt-0.5 italic", children: [
              "ID Audit: #",
              t.audit_id
            ] })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-tight border ${jenisColors[t.jenis]?.replace("bg-", "border-").replace("text-", "border-").split(" ")[0]} ${jenisColors[t.jenis]}`, children: t.jenis }) }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 max-w-xs truncate font-medium", children: t.deskripsi }),
            t.standar_mutu && /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-primary-600 font-bold uppercase mt-1", children: [
              "Standar: ",
              t.standar_mutu.kode
            ] })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-tight border ${statusColors[t.status]?.replace("bg-", "border-").replace("text-", "border-").split(" ")[0]} ${statusColors[t.status]}`, children: t.status }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => openEditModal(t),
                className: "p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition duration-200",
                title: "Edit",
                children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDelete(t.id),
                className: "p-2 text-danger-500 hover:bg-danger-50 rounded-xl transition duration-200",
                title: "Hapus",
                children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" })
              }
            )
          ] }) })
        ] }, t.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, children: /* @__PURE__ */ jsx(EmptyState, { title: "Temuan Belum Tersedia", message: "Belum ada data temuan audit yang tercatat." }) }) }) })
      ] }) }),
      temuans.links && temuans.links.length > 3 && /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-t border-gray-100 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-[11px] font-bold text-gray-400 uppercase tracking-wider", children: [
          "Menampilkan ",
          temuans.from,
          "-",
          temuans.to,
          " data"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: temuans.links.map((link, i) => /* @__PURE__ */ jsx(
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
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-extrabold text-gray-900 mb-6 tracking-tight", children: editingData ? "Edit Temuan Audit" : "Tambah Temuan Baru" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: [
            "Pilih Jadwal Audit ",
            /* @__PURE__ */ jsx("span", { className: "text-danger-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: data.audit_id,
              onChange: (e) => setData("audit_id", e.target.value),
              className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Pilih Audit" }),
                audits.map((a) => /* @__PURE__ */ jsxs("option", { value: a.id, children: [
                  a.unit_kerja?.nama,
                  " - ",
                  a.tanggal_audit
                ] }, a.id))
              ]
            }
          ),
          errors.audit_id && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[10px] font-bold text-danger-500", children: errors.audit_id })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: "Standar Terkait" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.standar_mutu_id,
                onChange: (e) => setData("standar_mutu_id", e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-600",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Pilih Standar" }),
                  standarMutu.map((s) => /* @__PURE__ */ jsxs("option", { value: s.id, children: [
                    s.kode,
                    " - ",
                    s.nama
                  ] }, s.id))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: [
              "Jenis Temuan ",
              /* @__PURE__ */ jsx("span", { className: "text-danger-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.jenis,
                onChange: (e) => setData("jenis", e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold capitalize",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "observasi", children: "Observasi" }),
                  /* @__PURE__ */ jsx("option", { value: "minor", children: "Minor" }),
                  /* @__PURE__ */ jsx("option", { value: "mayor", children: "Mayor" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: [
            "Deskripsi Ketidaksesuaian ",
            /* @__PURE__ */ jsx("span", { className: "text-danger-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 4,
              value: data.deskripsi,
              onChange: (e) => setData("deskripsi", e.target.value),
              className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium",
              placeholder: "Jelaskan secara detail temuan atau ketidaksesuaian yang ditemukan..."
            }
          ),
          errors.deskripsi && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[10px] font-bold text-danger-500", children: errors.deskripsi })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: "Rekomendasi Perbaikan" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 3,
              value: data.rekomendasi,
              onChange: (e) => setData("rekomendasi", e.target.value),
              className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-primary-700",
              placeholder: "Masukan saran atau tindakan perbaikan yang direkomendasikan..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: "Batas Waktu Perbaikan" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "date",
                value: data.batas_waktu,
                onChange: (e) => setData("batas_waktu", e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-600"
              }
            )
          ] }),
          editingData && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: "Status Penyelesaian" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.status || "",
                onChange: (e) => setData("status", e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold capitalize",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "open", children: "Open" }),
                  /* @__PURE__ */ jsx("option", { value: "in_progress", children: "In Progress" }),
                  /* @__PURE__ */ jsx("option", { value: "verified", children: "Verified" }),
                  /* @__PURE__ */ jsx("option", { value: "closed", children: "Closed" })
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
              children: processing ? "Sedang Memproses..." : editingData ? "Perbarui Temuan" : "Simpan Temuan"
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
