import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useForm, Head } from "@inertiajs/react";
import "react";
function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    remember: false
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/login");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Login" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex", children: [
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary-900 via-primary-800 to-primary-950 relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10", style: {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        } }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col justify-center px-16", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur", children: /* @__PURE__ */ jsx("span", { className: "text-white font-extrabold text-xl", children: "HT" }) }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-extrabold text-white mb-4", children: [
            "SPMI",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-primary-300", children: "STIKES Hang Tuah" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-primary-200/70 text-lg leading-relaxed max-w-md", children: "Sistem Penjaminan Mutu Internal untuk menjamin kualitas pendidikan tinggi kesehatan." }),
          /* @__PURE__ */ jsx("div", { className: "mt-12 grid grid-cols-2 gap-4", children: [
            { icon: "🎯", text: "Penetapan Standar" },
            { icon: "📊", text: "Monitoring Mutu" },
            { icon: "🔍", text: "Audit Internal" },
            { icon: "📈", text: "Peningkatan Berkelanjutan" }
          ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 bg-white/5 rounded-xl p-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xl", children: item.icon }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-primary-100 font-medium", children: item.text })
          ] }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full lg:w-1/2 flex items-center justify-center p-8", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:hidden mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-linear-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx("span", { className: "text-white font-extrabold", children: "HT" }) }),
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "SPMI STIKES Hang Tuah" })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Selamat Datang" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-8", children: "Masuk ke dashboard untuk mengelola sistem penjaminan mutu." }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Email" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                value: data.email,
                onChange: (e) => setData("email", e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition outline-none",
                placeholder: "email@stikeshangtuah-tpi.ac.id",
                autoFocus: true
              }
            ),
            errors.email && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-sm text-danger-500", children: errors.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Password" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "password",
                value: data.password,
                onChange: (e) => setData("password", e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition outline-none",
                placeholder: "••••••••"
              }
            ),
            errors.password && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-sm text-danger-500", children: errors.password })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                id: "remember",
                checked: data.remember,
                onChange: (e) => setData("remember", e.target.checked),
                className: "w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "remember", className: "text-sm text-gray-600", children: "Ingat saya" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "w-full py-3.5 bg-linear-to-br from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 transition-all shadow-lg shadow-primary-500/25",
              children: processing ? "Memproses..." : "Masuk"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-6 text-center text-sm text-gray-400", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " STIKES Hang Tuah Tanjungpinang"
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Login as default
};
