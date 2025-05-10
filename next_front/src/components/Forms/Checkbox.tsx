import Label from "@/components/Label";
import {ErrorMessage, Field} from "formik";

interface CheckboxProps{
    id: string
    name: string
    label: string
    disabled?: boolean
}
const Checkbox = ({ id, name, label, disabled = false}: CheckboxProps) => {
    return (
        <div>
            <div className="pt-3 pb-1 flex items-center">
                <Label
                    className="text-silver_mist flex items-center text-left"
                    htmlFor={name}
                >
                    <span className="w-52 max-w-44">{label}:</span>
                    <Field
                        type="checkbox"
                        name={name}
                        id={id}
                        className="rounded border-gray-300 text-vivid_violet shadow-sm focus:border-vivid_violet focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </Label>
            </div>
            <ErrorMessage
                name={name}
                component="span"
                className="ml-2 text-sm text-hot_crimson"
            />
        </div>
    )
}
export default Checkbox