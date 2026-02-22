import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { L as LandingLayout } from "./LandingLayout-Fk5-vpCX.js";
import "react";
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
const kategoriColors = {
  pendidikan: "bg-blue-100 text-blue-700",
  penelitian: "bg-purple-100 text-purple-700",
  pengabdian: "bg-green-100 text-green-700",
  tata_kelola: "bg-amber-100 text-amber-700",
  kemahasiswaan: "bg-pink-100 text-pink-700",
  sdm: "bg-indigo-100 text-indigo-700",
  keuangan: "bg-emerald-100 text-emerald-700",
  sarana_prasarana: "bg-orange-100 text-orange-700"
};
const dokumenKategoriLabels = {
  kebijakan: "Kebijakan",
  manual: "Manual",
  standar: "Standar",
  formulir: "Formulir",
  sop: "SOP",
  laporan: "Laporan",
  bukti: "Bukti",
  lainnya: "Lainnya"
};
function Index({ standarMutu, dokumenPublik, berita, galeri, visi, misi }) {
  return /* @__PURE__ */ jsxs(LandingLayout, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Beranda - SPMI STIKES Hang Tuah" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Sistem Penjaminan Mutu Internal (SPMI) STIKES Hang Tuah Tanjungpinang. Menjamin dan meningkatkan mutu pendidikan tinggi secara berkelanjutan." }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Beranda - SPMI STIKES Hang Tuah" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Sistem Penjaminan Mutu Internal (SPMI) STIKES Hang Tuah Tanjungpinang." }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsxs("section", { id: "beranda", className: "relative min-h-screen flex items-center overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-linear-to-br from-primary-900 via-primary-800 to-primary-950", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10", style: {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        } }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-32 bg-linear-to-br from-white" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur rounded-full text-primary-200 text-sm font-medium mb-6", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }),
            "Sistem Penjaminan Mutu Internal"
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6", children: [
            "STIKES Hang Tuah",
            /* @__PURE__ */ jsx("span", { className: "block text-primary-300", children: "Tanjungpinang" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg text-primary-100/80 leading-relaxed mb-10 max-w-2xl", children: [
            "Menjamin dan meningkatkan mutu pendidikan tinggi melalui siklus",
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: " PPPEP" }),
            " — Penetapan, Pelaksanaan, Pengendalian, Evaluasi, dan Peningkatan standar mutu secara berkelanjutan."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
            /* @__PURE__ */ jsx("a", { href: "#standar-mutu", className: "px-8 py-3.5 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all shadow-xl shadow-black/10", children: "Lihat Standar Mutu" }),
            /* @__PURE__ */ jsx("a", { href: "#dokumen", className: "px-8 py-3.5 bg-white/10 backdrop-blur text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all", children: "Dokumen Publik" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-16", children: [
          { label: "Standar Mutu", value: standarMutu.length },
          { label: "Dokumen Publik", value: dokumenPublik.length },
          { label: "Galeri", value: galeri?.length || 0 },
          { label: "Berita", value: berita.length }
        ].map((stat, i) => /* @__PURE__ */ jsxs("div", { className: "bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/10", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-3xl font-bold text-white", children: [
            stat.value,
            stat.suffix && /* @__PURE__ */ jsx("span", { className: "text-lg ml-1", children: stat.suffix })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-primary-200 mt-1", children: stat.label })
        ] }, i)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { id: "visi-misi", className: "py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("span", { className: "text-primary-600 font-semibold text-sm uppercase tracking-wider", children: "Identitas Institusi" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-gray-900 mt-3", children: "Visi & Misi" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-linear-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white shadow-xl", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxs("svg", { className: "w-7 h-7", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
            /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
            /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
          ] }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", children: "VISI" }),
          /* @__PURE__ */ jsx("p", { className: "text-primary-100 leading-relaxed whitespace-pre-wrap", children: visi })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-3xl p-8 border border-gray-100", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx("svg", { className: "w-7 h-7 text-primary-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 mb-4", children: "MISI" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: misi.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-600", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-6 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5", children: i + 1 }),
            /* @__PURE__ */ jsx("span", { className: "text-sm leading-relaxed", children: item })
          ] }, i)) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("span", { className: "text-primary-600 font-semibold text-sm uppercase tracking-wider", children: "Siklus Mutu" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-gray-900 mt-3", children: "Siklus PPPEP" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-3 max-w-2xl mx-auto", children: "Lima tahap penjaminan mutu internal yang diterapkan secara berkelanjutan" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6", children: [
        { step: "P", title: "Penetapan", desc: "Menetapkan standar mutu yang harus dicapai", color: "from-blue-500 to-blue-600", icon: "📋" },
        { step: "P", title: "Pelaksanaan", desc: "Melaksanakan standar mutu yang telah ditetapkan", color: "from-green-500 to-green-600", icon: "⚙️" },
        { step: "E", title: "Evaluasi", desc: "Mengevaluasi pelaksanaan standar mutu", color: "from-amber-500 to-amber-600", icon: "📊" },
        { step: "P", title: "Pengendalian", desc: "Mengendalikan pelaksanaan agar sesuai standar", color: "from-purple-500 to-purple-600", icon: "🔍" },
        { step: "P", title: "Peningkatan", desc: "Meningkatkan standar mutu secara berkelanjutan", color: "from-rose-500 to-rose-600", icon: "🚀" }
      ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: `w-16 h-16 bg-linear-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`, children: /* @__PURE__ */ jsx("span", { className: "text-2xl", children: item.icon }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 mb-2", children: item.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 leading-relaxed", children: item.desc })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "standar-mutu", className: "py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("span", { className: "text-primary-600 font-semibold text-sm uppercase tracking-wider", children: "Jaminan Kualitas" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-gray-900 mt-3", children: "Standar Mutu" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-3", children: "Standar mutu yang ditetapkan untuk menjamin kualitas pendidikan" })
      ] }),
      standarMutu.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: standarMutu.map((standar) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-lg", children: standar.kode }),
          /* @__PURE__ */ jsx("span", { className: `px-2.5 py-1 text-xs font-medium rounded-lg ${kategoriColors[standar.kategori] || "bg-gray-100 text-gray-600"}`, children: kategoriLabels[standar.kategori] || standar.kategori })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition", children: standar.nama }),
        standar.deskripsi && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 line-clamp-3 leading-relaxed", children: standar.deskripsi }),
        standar.target && /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-4 border-t border-gray-100", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Target:" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-700", children: standar.target })
        ] })
      ] }, standar.id)) }) : /* @__PURE__ */ jsx("div", { className: "text-center py-12 bg-gray-50 rounded-2xl", children: /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Belum ada standar mutu yang dipublikasikan." }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "dokumen", className: "py-24 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("span", { className: "text-primary-600 font-semibold text-sm uppercase tracking-wider", children: "Transparansi" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-gray-900 mt-3", children: "Dokumen Publik" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-3", children: "Dokumen mutu yang dapat diakses oleh publik" })
      ] }),
      dokumenPublik.length > 0 ? /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50/50 border-b border-gray-100", children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-1/2", children: "Nama Dokumen" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap hidden sm:table-cell", children: "Kategori" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap hidden md:table-cell", children: "Ukuran" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right w-24", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50", children: dokumenPublik.map((doc) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors group", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-primary-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" }) }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900 group-hover:text-primary-600 transition-colors", children: doc.judul }),
              doc.deskripsi && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1 line-clamp-1", children: doc.deskripsi }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mt-2 sm:hidden", children: [
                /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded", children: dokumenKategoriLabels[doc.kategori] || doc.kategori }),
                /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-400", children: [
                  (doc.file_size / 1024).toFixed(0),
                  " KB"
                ] })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 hidden sm:table-cell align-middle", children: /* @__PURE__ */ jsx("span", { className: "inline-flex px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg", children: dokumenKategoriLabels[doc.kategori] || doc.kategori }) }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 hidden md:table-cell align-middle text-sm text-gray-500", children: [
            (doc.file_size / 1024).toFixed(0),
            " KB"
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right align-middle", children: /* @__PURE__ */ jsx(
            "a",
            {
              href: `/dashboard/dokumen/${doc.id}/download`,
              className: "inline-flex items-center justify-center p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors group/btn",
              title: "Download Dokumen",
              children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) })
            }
          ) })
        ] }, doc.id)) })
      ] }) }) }) : /* @__PURE__ */ jsx("div", { className: "text-center py-12 bg-white rounded-2xl", children: /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Belum ada dokumen publik yang tersedia." }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "galeri", className: "py-24 bg-gray-50 border-t border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("span", { className: "text-primary-600 font-semibold text-sm uppercase tracking-wider", children: "Dokumentasi" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-gray-900 mt-3", children: "Galeri Kegiatan" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-3", children: "Dokumentasi kegiatan terkait penjaminan mutu" })
      ] }),
      galeri && galeri.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6", children: galeri.map((g) => /* @__PURE__ */ jsx("div", { className: "group cursor-pointer", children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-4/3 rounded-2xl overflow-hidden bg-gray-200 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: `/storage/${g.file_path}`,
            alt: g.judul,
            className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-white font-medium text-sm line-clamp-2 leading-tight", children: g.judul }),
          g.deskripsi && /* @__PURE__ */ jsx("p", { className: "text-white/80 text-xs mt-1 line-clamp-1", children: g.deskripsi })
        ] })
      ] }) }, g.id)) }) : /* @__PURE__ */ jsx("div", { className: "text-center py-12 bg-white rounded-2xl", children: /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Belum ada dokumentasi kegiatan." }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "berita", className: "py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("span", { className: "text-primary-600 font-semibold text-sm uppercase tracking-wider", children: "Informasi Terbaru" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-gray-900 mt-3", children: "Berita & Pengumuman" })
      ] }),
      berita.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-8", children: berita.map((item, i) => /* @__PURE__ */ jsx("a", { href: `/berita/${item.slug}`, className: "group block h-full", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300", children: [
        item.gambar && /* @__PURE__ */ jsx("div", { className: "aspect-video bg-gray-200 overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: `/storage/${item.gambar}`, alt: item.judul, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" }) }),
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-2", children: item.published_at ? new Date(item.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "" }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 group-hover:text-primary-600 transition mb-2", children: item.judul }),
          item.ringkasan && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 line-clamp-2", children: item.ringkasan })
        ] })
      ] }) }, item.id)) }) : /* @__PURE__ */ jsx("div", { className: "text-center py-12 bg-gray-50 rounded-2xl", children: /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Belum ada berita atau pengumuman." }) })
    ] }) })
  ] });
}
export {
  Index as default
};
