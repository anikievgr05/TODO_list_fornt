import Label from "@/components/Label";
import {ErrorMessage, Field} from "formik";

interface Props {
    label: string
    value: string | null
}
const ReadOnlyInput = ({label, value = null}: Props) => {
    return (
        <div className=" pb-1 flex items-center">
            <Label
                className="text-silver_mist text-wrap flex items-center text-wrap"
            >
                {label}:
            </Label>
            <div className="flex flex-col flex-wrap">
                <div
                    className="w-96 text-wrap ml-2 bg-transparent border-b-2 text-silver_mist focus:ring-0 focus:border-b-silver_mist border-b-silver_mist focus:outline-none focus:border-t-transparent border-t-transparent focus:border-l-transparent border-l-transparent focus:border-r-transparent border-r-transparent"
                >
                    <span>{value}</span>
                </div>

            </div>
        </div>
    )
}
export default ReadOnlyInput