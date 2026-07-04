import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

/**
 * Generic CRUD form hook for Inertia.js pages.
 * 
 * @param {Object} options
 * @param {string} options.routePrefix - Base route (e.g. '/dashboard/temuan')
 * @param {Object} options.initialData - Default form values
 * @param {Function} options.mapEditData - Maps an item to form data for editing
 * @param {string} options.successCreateMessage - Message shown after create
 * @param {string} options.successUpdateMessage - Message shown after update
 * @param {boolean} options.autoOpenOnMount - If true, opens modal on mount
 * @param {Object} options.submitOptions - Extra options for Inertia post/put
 */
export default function useCrudForm({
    routePrefix,
    initialData = {},
    mapEditData = null,
    successCreateMessage = 'Data baru telah ditambahkan.',
    successUpdateMessage = 'Data telah diperbarui.',
    autoOpenOnMount = false,
    submitOptions = {},
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm(initialData);

    useEffect(() => {
        if (autoOpenOnMount) {
            setIsModalOpen(true);
        }
    }, []);

    const openCreateModal = () => {
        reset();
        setData(initialData);
        clearErrors();
        setEditingData(null);
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        clearErrors();
        setEditingData(item);
        if (mapEditData) {
            setData(mapEditData(item));
        } else {
            // Fallback: map item fields matching initialData keys
            const mapped = {};
            for (const key of Object.keys(initialData)) {
                mapped[key] = item[key] ?? initialData[key];
            }
            setData(mapped);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            reset();
            setData(initialData);
            clearErrors();
            setEditingData(null);
        }, 150);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const mergedOptions = { ...submitOptions };

        if (editingData) {
            put(`${routePrefix}/${editingData.id}`, {
                ...mergedOptions,
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', successUpdateMessage, 'success');
                    mergedOptions.onSuccess?.();
                },
            });
        } else {
            post(routePrefix, {
                ...mergedOptions,
                onSuccess: () => {
                    closeModal();
                    Swal.fire('Berhasil!', successCreateMessage, 'success');
                    mergedOptions.onSuccess?.();
                },
            });
        }
    };

    return {
        data, setData, processing, errors,
        isModalOpen, editingData,
        openCreateModal, openEditModal, closeModal, handleSubmit,
    };
}
