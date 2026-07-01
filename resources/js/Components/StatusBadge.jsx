export default function StatusBadge({ active = true, activeText = "Aktif", inactiveText = "Nonaktif" }) {
    return (
        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border uppercase tracking-tight ${active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
            {active ? activeText : inactiveText}
        </span>
    );
}
