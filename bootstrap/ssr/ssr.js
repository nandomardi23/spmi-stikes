import { jsx } from "react/jsx-runtime";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => title ? `${title} - SPMI STIKES Hang Tuah` : "SPMI STIKES Hang Tuah",
    resolve: (name) => resolvePageComponent(
      `./Pages/${name}.jsx`,
      /* @__PURE__ */ Object.assign({ "./Pages/Auditee/Dokumen.jsx": () => import("./assets/Dokumen-B8mALFOA.js"), "./Pages/Auditee/Index.jsx": () => import("./assets/Index-CLk8jWeA.js"), "./Pages/Auditee/ShowTemuan.jsx": () => import("./assets/ShowTemuan-BqnOC9tp.js"), "./Pages/Auditee/Temuan.jsx": () => import("./assets/Temuan-CCtzdnL7.js"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-Cr5kJhlQ.js"), "./Pages/Dashboard/Audit/Index.jsx": () => import("./assets/Index-a3B3HRXw.js"), "./Pages/Dashboard/Audit/Show.jsx": () => import("./assets/Show-D5pCPa5o.js"), "./Pages/Dashboard/Berita/Index.jsx": () => import("./assets/Index-Cn1bg5fl.js"), "./Pages/Dashboard/Dokumen/Index.jsx": () => import("./assets/Index-BbezW6N8.js"), "./Pages/Dashboard/Galeri/Index.jsx": () => import("./assets/Index-CxInGJY4.js"), "./Pages/Dashboard/Index.jsx": () => import("./assets/Index-DUog_x11.js"), "./Pages/Dashboard/Pengaturan/Index.jsx": () => import("./assets/Index-Dx3_RVnW.js"), "./Pages/Dashboard/SiklusAudit/Index.jsx": () => import("./assets/Index-CaDIrvxP.js"), "./Pages/Dashboard/StandarMutu/Index.jsx": () => import("./assets/Index-fIjlhruo.js"), "./Pages/Dashboard/Temuan/Index.jsx": () => import("./assets/Index-CuFnvZRw.js"), "./Pages/Dashboard/UnitKerja/Index.jsx": () => import("./assets/Index-Dy_dtq9Y.js"), "./Pages/Dashboard/Users/Index.jsx": () => import("./assets/Index-BIl8Xmu9.js"), "./Pages/Landing/BeritaDetail.jsx": () => import("./assets/BeritaDetail-D2IP85vM.js"), "./Pages/Landing/Index.jsx": () => import("./assets/Index-C2ufyIXX.js") })
    ),
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  })
);
