import Label from "@/components/Label";
import {ErrorMessage, Field} from "formik";

interface Props{
    label: string
    value: string | null
}
const ReadOnlyTextarea = ({label, value = null}: Props) => {
    return (
        <div className="pt-1 pb-1 flex items-start">
            <Label
                className="pt-3 text-silver_mist flex items-center text-wrap"
            >
                {label}:
            </Label>
            <div className="flex flex-col flex-wrap">
                <div
                    className="text-silver_mist text-wrap ml-2 mt-4 w-96 h-48 resize-none bg-transparent border-2 focus:ring-0 focus:border-silver_mist focus:outline-none border-silver_mist rounded-lg outline-none"
                >
                    <span className="py-4 px-3">{value}</span>
                </div>
            </div>
        </div>
    )
}
export default ReadOnlyTextarea