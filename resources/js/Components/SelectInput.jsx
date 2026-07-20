import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';

export default function SelectInput({
    options = [],
    value,
    onChange,
    placeholder = 'Pilih...',
    isClearable = true,
    isSearchable = true, // Not natively supported by basic Listbox, but kept for prop compatibility
    className = '',
    isDisabled = false,
    ...props
}) {
    // Determine the currently selected object based on value.
    // Defensively handle if a parent component accidentally passes an object instead of a primitive.
    const primitiveValue = typeof value === 'object' && value !== null ? value.value : value;
    
    // Use loose equality (==) in case options have numeric values but state is string, or vice versa
    const selectedOption = options.find(option => option.value == primitiveValue) || null;

    return (
        <div className={`relative ${className}`} {...props}>
            <Listbox value={selectedOption} onChange={(selected) => onChange(selected ? selected.value : '')} disabled={isDisabled}>
                {({ open }) => (
                    <>
                        <div className="relative">
                            <Listbox.Button className={`relative w-full cursor-default rounded-xl bg-gray-50 py-3 pl-4 pr-10 text-left border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm font-medium ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-300'} transition-colors`}>
                                <span className={`block truncate ${!selectedOption ? 'text-gray-400 font-normal' : 'text-gray-700'}`}>
                                    {selectedOption ? selectedOption.label : placeholder}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </Listbox.Button>
                            
                            {isClearable && selectedOption && !isDisabled && (
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-8 flex items-center px-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onChange('');
                                    }}
                                >
                                    <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                                </button>
                            )}
                        </div>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-[9999] mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {options.length === 0 ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-500 text-sm font-medium">
                                        Tidak ada opsi
                                    </div>
                                ) : (
                                    options.map((option, index) => (
                                        <Listbox.Option
                                            key={index}
                                            className={({ active }) =>
                                                `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${
                                                    active ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                                                }`
                                            }
                                            value={option}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span className={`block truncate ${selected ? 'font-semibold' : 'font-medium'}`}>
                                                        {option.label}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                active ? 'text-primary-700' : 'text-primary-600'
                                                            }`}
                                                        >
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))
                                )}
                            </Listbox.Options>
                        </Transition>
                    </>
                )}
            </Listbox>
        </div>
    );
}
