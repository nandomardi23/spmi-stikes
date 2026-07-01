export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'mt-1.5 text-[10px] font-bold text-danger-500 ' + className}>
            {message}
        </p>
    ) : null;
}
