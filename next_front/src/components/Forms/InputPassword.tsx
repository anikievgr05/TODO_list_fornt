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
        <div className="pt-1 pb-1 flex items-start">
            <Label
                className="pt-3 text-silver_mist flex items-center"
                htmlFor={name}
            >
                {label}:
            </Label>
            <div className="flex flex-col flex-wrap">
                <Field
                    id={id || name}
                    name={name}
                    type="password"
                    disabled={disabled}
                    className="w-96 mb-2 ml-2 pl-0 bg-transparent border-b-2 text-silver_mist focus:ring-0 focus:border-b-silver_mist border-b-silver_mist focus:outline-none focus:border-t-transparent border-t-transparent focus:border-l-transparent border-l-transparent focus:border-r-transparent border-r-transparent"
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
export default Input