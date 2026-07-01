import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function TableActions({ onView, onEdit, onDelete }) {
    return (
        <div className="flex items-center justify-center gap-1.5">
            {onView && (
                <button 
                    onClick={onView} 
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition duration-200" 
                    title="Detail"
                >
                    <EyeIcon className="w-5 h-5" />
                </button>
            )}
            {onEdit && (
                <button 
                    onClick={onEdit} 
                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition duration-200" 
                    title="Edit"
                >
                    <PencilSquareIcon className="w-5 h-5" />
                </button>
            )}
            {onDelete && (
                <button 
                    onClick={onDelete} 
                    className="p-2 text-danger-500 hover:bg-danger-50 rounded-xl transition duration-200" 
                    title="Hapus"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            )}
        </div>
    );
}
