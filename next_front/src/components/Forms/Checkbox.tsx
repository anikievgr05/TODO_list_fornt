import Label from "@/components/Label";
import {ErrorMessage, Field} from "formik";

interface CheckboxProps{
    name: string
    label: string
    disabled?: boolean
}
const Checkbox = ({name, label, disabled = false}: CheckboxProps) => {
    return (
        <div>
            <div className="pt-3 pb-1 flex items-center">
                <Label
                    className="text-silver_mist flex items-center text-center"
                    htmlFor={name}
                >
                    {label}:
                </Label>
                <div className="flex flex-col flex-wrap">
                    <Field
                        type="checkbox"
                        name={name}
                        className="rounded border-gray-300 text-vivid_violet shadow-sm focus:border-vivid_violet focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
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