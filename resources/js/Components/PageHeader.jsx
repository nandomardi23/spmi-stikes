import { Link } from '@inertiajs/react';

export default function PageHeader({ title, description, onAdd, addText = "+ Tambah Data" }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">{title}</h3>
                {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
            </div>
            {onAdd && (
                <button 
                    onClick={onAdd} 
                    className="px-5 py-2.5 bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg shadow-primary-500/25 shrink-0"
                >
                    {addText}
                </button>
            )}
        </div>
    );
}
