import Label from "@/components/Label";
import {ErrorMessage, Field} from "formik";

interface InputProps{
    name: string
    label: string
    id?: string
    emptyOption?: boolean
    options: object
}
const SelectMain = ({id, name, label, emptyOption = true, options}: InputProps) => {
    return (
        <div className="pt-1 pb-1 flex w-full flex-col">
            <div className="w-full flex items-center">
                <Label
                    className="text-silver_mist flex items-center "
                    htmlFor={name}
                >
                    <span className="w-44">{label}:</span>
                </Label>
                <div className="flex flex-col w-full">
                    <Field as="select" id={id || name} name={name} className="w-full py-1 h-8 text-sm rounded-lg text-dark_charcoal focus:ring-transparent focus:outline-transparent focus:border-transparent">
                        {emptyOption && (<option value="" className="text-sm">Выберите</option>)}
                        {options.map((option) => (
                           <><option value={option.id}>{option.name}</option></>
                        ))}
                    </Field>
                </div>
            </div>
            <ErrorMessage
                name={name}
                component="span"
                className="text-sm text-hot_crimson"
            />
        </div>
    )
}
export default SelectMain