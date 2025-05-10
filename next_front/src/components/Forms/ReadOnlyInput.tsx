import Label from "@/components/Label";
import {ErrorMessage, Field} from "formik";

interface Props {
    label: string
    value: string | null
}
const ReadOnlyInput = ({label, value = null}: Props) => {
    return (
        <div className="pb-1 flex items-center">
            <Label
                className="text-silver_mist text-wrap flex items-center text-wrap"
            >
                <span className="w-44">{label}:</span>{value}
            </Label>
        </div>
    )
}
export default ReadOnlyInput