import Label from "@/components/Label";
import {ErrorMessage, Field, useField} from "formik";

interface InputProps {
    name: string
    label: string
    id?: string
    disabled?: boolean
    value: string
}

const Radio = ({id, name, label, disabled = false, value = ''}: InputProps) => {
    const [field, meta] = useField(name);

    return (
        <div className="pt-1 pb-1 flex items-center justify-between">
            <Label
                className="text-silver_mist flex items-center "
                htmlFor={name}
            >
                {label}:
            </Label>
            <div className="flex flex-col flex-wrap">
                <Field
                    id={id || name}
                    value={value}
                    name={name}
                    type="radio"
                    checked={field.value === value} // <-- Основная правка
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    disabled={disabled}
                    className="ml-1 appearance-none rounded-full border border-gray-300 text-vivid_violet shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 focus:border-vivid_violet checked:bg-vivid_violet checked:border-transparent disabled:opacity-50 cursor-pointer"
                />
                <ErrorMessage
                    name={name}
                    component="span"
                    className="ml-2 text-sm text-hot_crimson"
                />
            </div>
        </div>
    )
}
export default Radio