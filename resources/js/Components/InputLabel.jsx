export default function InputLabel({ value, className = '', children, required = false, ...props }) {
    return (
        <label {...props} className={`block text-sm font-bold text-gray-700 mb-1.5 ` + className}>
            {value ? value : children}
            {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
    );
}
