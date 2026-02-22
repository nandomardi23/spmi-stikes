import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { D as DashboardLayout } from "./DashboardLayout-BbXWOl-m.js";
import { useState } from "react";
import { M as Modal } from "./Modal-BDmNznn_.js";
import Swal from "sweetalert2";
import { E as EmptyState } from "./EmptyState-DcuWdlra.js";
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import "clsx";
import "@headlessui/react";
const statusColors = { dijadwalkan: "bg-blue-100 text-blue-700", berlangsung: "bg-amber-100 text-amber-700", selesai: "bg-green-100 text-green-700", dibatalkan: "bg-red-100 text-red-700" };
function Index({ audits, siklusAudit = [], unitKerja = [], auditors = [], filters }) {
  const [status, setStatus] = useState(filters.status || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
    siklus_audit_id: "",
    unit_kerja_id: "",
    auditor_id: "",
    tanggal_audit: "",
    status: "dijadwalkan",
    catatan: ""
  });
  const handleFilter = (val) => {
    setStatus(val);
    router.get("/dashboard/audit", { status: val, siklus: filters.siklus }, { preserveState: true });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Audit?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/dashboard/audit/${id}`);
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingData) {
      put(`/dashboard/audit/${editingData.id}`, {
        onSuccess: () => {
          closeModal();
          Swal.fire("Berhasil!", "Data audit telah diperbarui.", "success");
        }
      });
    } else {
      post("/dashboard/audit", {
        onSuccess: () => {
          closeModal();
          Swal.fire("Berhasil!", "Audit baru telah dijadwalkan.", "success");
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
      siklus_audit_id: item.siklus_audit_id,
      unit_kerja_id: item.unit_kerja_id,
      auditor_id: item.auditor_id || "",
      tanggal_audit: item.tanggal_audit || "",
      status: item.status,
      catatan: item.catatan || ""
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
  return /* @__PURE__ */ jsxs(DashboardLayout, { title: "Audit", children: [
    /* @__PURE__ */ jsx(Head, { title: "Audit" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm w-fit", children: ["", "dijadwalkan", "berlangsung", "selesai"].map((s) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleFilter(s),
          className: `px-5 py-2 text-xs font-bold rounded-xl transition-all uppercase tracking-tight ${status === s ? "bg-primary-600 text-white shadow-md shadow-primary-500/20" : "text-gray-500 hover:bg-gray-50"}`,
          children: s || "Semua"
        },
        s
      )) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: openCreateModal,
          className: "px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25",
          children: "+ Jadwalkan Audit"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100 bg-gray-50/50", children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Unit Kerja & Siklus" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Auditor" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Jadwal Pelaksanaan" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px]", children: "Hasil / Skor" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-[10px] text-right", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50", children: audits.data.length > 0 ? audits.data.map((a) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 transition", children: [
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900", children: a.unit_kerja?.nama }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-medium uppercase tracking-tighter mt-0.5", children: a.siklus_audit?.nama })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-[10px] font-bold text-primary-600 border border-primary-100 italic", children: a.auditor?.name?.charAt(0) || "-" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", children: a.auditor?.name || "Belum Ditunjuk" })
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-600 font-medium", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("span", { children: a.tanggal_audit || "Belum Diatur" }),
            a.tanggal_audit && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-tight", children: "Tersinkron dengan Kalender" })
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-tight border ${statusColors[a.status]?.replace("bg-", "border-").replace("text-", "border-").split(" ")[0]} ${statusColors[a.status]}`, children: a.status }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: a.skor ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-xs font-bold text-green-700 border border-green-100", children: a.skor }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-tighter", children: "Point" })
          ] }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-xs italic", children: "Belum Dinilai" }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: `/dashboard/audit/${a.id}`,
                className: "p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition duration-200",
                title: "Detail Audit",
                children: /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => openEditModal(a),
                className: "p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition duration-200",
                title: "Edit",
                children: /* @__PURE__ */ jsx(PencilSquareIcon, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDelete(a.id),
                className: "p-2 text-danger-500 hover:bg-danger-50 rounded-xl transition duration-200",
                title: "Hapus",
                children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-5 h-5" })
              }
            )
          ] }) })
        ] }, a.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, children: /* @__PURE__ */ jsx(EmptyState, { title: "Audit Tidak Ditemukan", message: "Belum ada jadwal audit atau sesuaikan filter status Anda." }) }) }) })
      ] }) }),
      audits.links && audits.links.length > 3 && /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-t border-gray-100 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-[11px] font-bold text-gray-400 uppercase tracking-wider", children: [
          "Menampilkan ",
          audits.from,
          "-",
          audits.to,
          " data"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: audits.links.map((link, i) => /* @__PURE__ */ jsx(
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
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-extrabold text-gray-900 mb-6 tracking-tight", children: editingData ? "Edit Jadwal Audit" : "Jadwalkan Audit Baru" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: [
              "Siklus Audit ",
              /* @__PURE__ */ jsx("span", { className: "text-danger-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.siklus_audit_id,
                onChange: (e) => setData("siklus_audit_id", e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Pilih Siklus" }),
                  siklusAudit.map((s) => /* @__PURE__ */ jsx("option", { value: s.id, children: s.nama }, s.id))
                ]
              }
            ),
            errors.siklus_audit_id && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[10px] font-bold text-danger-500", children: errors.siklus_audit_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: [
              "Unit Kerja Auditee ",
              /* @__PURE__ */ jsx("span", { className: "text-danger-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.unit_kerja_id,
                onChange: (e) => setData("unit_kerja_id", e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Pilih Unit" }),
                  unitKerja.map((u) => /* @__PURE__ */ jsx("option", { value: u.id, children: u.nama }, u.id))
                ]
              }
            ),
            errors.unit_kerja_id && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[10px] font-bold text-danger-500", children: errors.unit_kerja_id })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: "Pilih Auditor" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: data.auditor_id,
              onChange: (e) => setData("auditor_id", e.target.value),
              className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Pilih Auditor (Boleh menyusul)" }),
                auditors.map((a) => /* @__PURE__ */ jsx("option", { value: a.id, children: a.name }, a.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: "Tanggal Pelaksanaan" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "date",
                value: data.tanggal_audit,
                onChange: (e) => setData("tanggal_audit", e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium text-gray-600"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: "Status Audit" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.status,
                onChange: (e) => setData("status", e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold capitalize",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "dijadwalkan", children: "Dijadwalkan" }),
                  /* @__PURE__ */ jsx("option", { value: "berlangsung", children: "Berlangsung" }),
                  /* @__PURE__ */ jsx("option", { value: "selesai", children: "Selesai" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1.5", children: "Catatan Perencanaan" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 3,
              value: data.catatan,
              onChange: (e) => setData("catatan", e.target.value),
              className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-medium",
              placeholder: "Opsional: Tambahkan informasi awal atau instruksi untuk auditor..."
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
              children: processing ? "Sedang Memproses..." : editingData ? "Perbarui Jadwal" : "Simpan Jadwal"
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
