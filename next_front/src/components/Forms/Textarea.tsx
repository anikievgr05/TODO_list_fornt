import Label from "@/components/Label";
import {ErrorMessage, Field} from "formik";

interface TextareaProps{
    name: string
    label: string
    id?: string
    disabled?: boolean
}
const Textarea = ({id, name, label, disabled = false}: TextareaProps) => {
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
                    as="textarea"
                    id={id || name}
                    name={name}
                    type="text"
                    disabled={disabled}
                    className="text-silver_mist ml-2 mt-4 w-96 h-48 resize-none bg-transparent border-2 focus:ring-0 focus:border-silver_mist focus:outline-none border-silver_mist rounded-lg outline-none"
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
export default Textarea