import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

/**
 * Generic CRUD service for delete operations with SweetAlert2 confirmation.
 * 
 * @param {Object} config
 * @param {string} config.routePrefix - Base route (e.g. '/dashboard/temuan')
 * @param {string} config.entityName - Entity name for dialog (e.g. 'Temuan')
 * @param {string} config.warningMessage - Extra warning HTML below title
 */
export function createCrudService({ routePrefix, entityName, warningMessage = '' }) {
    return {
        delete: (id) => {
            Swal.fire({
                title: `Hapus ${entityName}?`,
                html: `Data yang dihapus tidak dapat dikembalikan!${warningMessage ? `<br><br><span class='text-sm text-red-500 font-bold'>${warningMessage}</span>` : ''}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Ya, Hapus!',
                cancelButtonText: 'Batal',
            }).then((result) => {
                if (result.isConfirmed) {
                    router.delete(`${routePrefix}/${id}`);
                }
            });
        },
    };
}
