import React from 'react';
import { useField } from 'formik';
import Dropdown from "@/components/Dropdown";

interface CustomSelectProps {
    name: string;
    label?: string;
    valueKey?: string;
    labelKey?: string;
    options: object | null;
    emptyMessage?: string;
}

const Select: React.FC<CustomSelectProps> = ({name, label, valueKey = 'id', labelKey = 'name', options, emptyMessage = 'Нет данных'}) => {
    const [field, meta, helpers] = useField(name);
    const selectedOption = options.find((opt) => opt[valueKey] === field.value);
    const handleSelect = (option) => {
        helpers.setValue(option[valueKey]);
    };

    return (
        <div className="mb-4 w-full flex items-center">
            {label && (
                <label className="block  text-sm font-medium text-silver_mist mr-4">{label}: </label>
            )}

            <Dropdown
                align="right"
                width={90}
                contentClasses = 'p-1 bg-white w-auto'
                trigger={
                    <button
                        type="button"
                        className="flex items-center min-w-[96px] justify-between w-full text-sm bg-white h-[35px] px-3 rounded-lg text-dark_charcoal focus:outline-none transition duration-150 ease-in-out border border-gray-300"
                    >
                        <span>{selectedOption ? selectedOption[labelKey] : 'Выберите...'}</span>
                        <svg
                            className="fill-current h-4 w-4 transition-transform duration-200"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                }
            >
                <div className="bg-dark_charcoal rounded-lg p-1 max-h-14 overflow-auto">
                    {options.length === 0 ? (
                        <div className="text-left block py-2 text-sm text-stormy_gray">
                            {emptyMessage}
                        </div>
                    ) : (
                        options.map((option, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleSelect(option)}
                                className={`inline-block w-full text-left ${
                                    option[valueKey] === field.value
                                        ? 'text-vivid_violet'
                                        : 'text-silver_mist hover:text-vivid_violet'
                                } py-1 text-sm hover:bg-gray-700 rounded`}
                            >
                                {option[labelKey]}
                            </button>
                        ))
                    )}
                </div>
            </Dropdown>

            {meta.touched && meta.error ? (
                <div className="text-red-500 text-sm mt-1">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default Select;