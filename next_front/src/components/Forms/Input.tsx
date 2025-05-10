import Label from "@/components/Label";
import {ErrorMessage, Field} from "formik";

interface InputProps{
    name: string
    label: string
    id?: string
    disabled?: boolean
}
const Input = ({id, name, label, disabled = false}: InputProps) => {
    return (
        <div className="pt-1 pb-1 flex items-start justify-between flex-col">
            <Label
                className="pt-3 text-silver_mist flex items-center w-full"
                htmlFor={name}
            >
                <span className="w-44 min-w-44">{label}:</span>
                <Field
                    id={id || name}
                    name={name}
                    type="text"
                    disabled={disabled}
                    className="mb-2 pl-0 w-full max-w-[418px] pr-0 bg-transparent border-b-2 text-silver_mist focus:ring-0 focus:border-b-silver_mist border-b-silver_mist focus:outline-none focus:border-t-transparent border-t-transparent focus:border-l-transparent border-l-transparent focus:border-r-transparent border-r-transparent"
                />
            </Label>
            <div className="flex flex-col flex-wrap">
                <ErrorMessage
                    name={name}
                    component="span"
                    className="text-sm text-hot_crimson"
                />
            </div>
        </div>
    )
}
export default Input