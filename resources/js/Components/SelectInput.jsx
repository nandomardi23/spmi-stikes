import React from 'react';
import Select from 'react-select';

export default function SelectInput({
    options = [],
    value,
    onChange,
    placeholder = 'Pilih...',
    isClearable = true,
    isSearchable = true,
    className = '',
    isDisabled = false,
    ...props
}) {
    // Determine the currently selected object based on value
    const selectedOption = options.find(option => option.value == value) || null;

    return (
        <Select
            value={selectedOption}
            onChange={(selected) => onChange(selected ? selected.value : '')}
            options={options}
            placeholder={placeholder}
            isClearable={isClearable}
            isSearchable={isSearchable}
            isDisabled={isDisabled}
            className={`text-sm font-medium ${className}`}
            styles={{
                control: (base) => ({
                    ...base,
                    backgroundColor: '#f9fafb', // bg-gray-50
                    borderColor: '#e5e7eb', // border-gray-200
                    borderRadius: '0.75rem', // rounded-xl
                    padding: '0.25rem', // similar to py-3 px-4 after adjustment
                    boxShadow: 'none',
                    '&:hover': {
                        borderColor: '#d1d5db' // hover border-gray-300
                    }
                }),
                menu: (base) => ({
                    ...base,
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    zIndex: 50
                }),
                option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected 
                        ? '#0284c7' // primary-600 roughly 
                        : state.isFocused 
                            ? '#f0f9ff' // primary-50 
                            : 'white',
                    color: state.isSelected ? 'white' : '#374151', // text-gray-700
                    cursor: 'pointer'
                }),
                singleValue: (base) => ({
                    ...base,
                    color: '#111827', // text-gray-900
                    fontWeight: '600'
                })
            }}
            {...props}
        />
    );
}
