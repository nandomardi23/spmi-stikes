import { scan } from 'react-scan';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

if (typeof window !== 'undefined') {
    scan({ enabled: import.meta.env.DEV });
}

createInertiaApp({
    title: (title) => title ? `${title} - SPMI STIKES Hang Tuah` : 'SPMI STIKES Hang Tuah',
    resolve: (name) => resolvePageComponent(
        `./Pages/${name}.jsx`,
        import.meta.glob('./Pages/**/*.jsx')
    ),
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: '#3b82f6',
        showSpinner: true,
    },
});

