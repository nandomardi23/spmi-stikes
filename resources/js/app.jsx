import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

if (typeof window !== 'undefined' && import.meta.env.DEV) {
    import('react-scan').then(({ scan }) => scan({ enabled: true }));
}

import Swal from 'sweetalert2';

const originalSwalFire = Swal.fire;
Swal.fire = function(...args) {
    let isSuccess = false;
    let config = {};

    if (args.length > 0 && typeof args[0] === 'object') {
        config = { ...args[0] };
        if (config.icon === 'success' || config.icon === 'info') {
            isSuccess = true;
        }
    } else if (args.length >= 3 && typeof args[0] === 'string') {
        if (args[2] === 'success' || args[2] === 'info') {
            isSuccess = true;
        }
    } else if (args.length === 2 && typeof args[0] === 'string' && (args[0].toLowerCase().includes('berhasil') || args[0].toLowerCase().includes('sukses'))) {
         isSuccess = true;
         // convert to object
         args = [{ title: args[0], text: args[1], icon: 'success' }];
    } else if (args.length === 1 && typeof args[0] === 'string' && (args[0].toLowerCase().includes('berhasil') || args[0].toLowerCase().includes('sukses'))) {
         isSuccess = true;
         args = [{ title: args[0], icon: 'success' }];
    }

    if (isSuccess) {
        if (typeof args[0] === 'object') {
            if (config.timer === undefined) config.timer = 2000;
            if (config.timerProgressBar === undefined) config.timerProgressBar = true;
            if (config.showConfirmButton === undefined) config.showConfirmButton = false;
            return originalSwalFire.call(this, config);
        } else {
            return originalSwalFire.call(this, {
                title: args[0],
                text: args[1],
                icon: args[2],
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            });
        }
    }

    return originalSwalFire.apply(this, args);
};

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

