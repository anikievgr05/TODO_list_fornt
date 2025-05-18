import Label from "@/components/Label";
import {ErrorMessage, Field, useField} from "formik";

interface InputProps{
    name: string;
    label: string;
}
const File = ({ name, label}: InputProps) => {
    const [field, meta, helpers] = useField(name);
    const currentFiles = meta.value || [];

    const handleAddFile = () => {
        helpers.setValue([...currentFiles, null]);
    };

    const handleRemoveFile = (index: number) => {
        const newFiles = [...currentFiles];
        newFiles.splice(index, 1);
        helpers.setValue(newFiles);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0] || null;

        const newFiles = [...currentFiles];
        newFiles[index] = file;
        helpers.setValue(newFiles);
    };

    return (
        <div className="pt-1 pb-1 flex items-start justify-between flex-col w-full max-w-[473px]">
            <label className="pt-3 text-silver_mist flex w-full">
                <span className="min-w-44 w-44">{label}:</span>
                <div className="flex flex-col justify-start">
                    {currentFiles.map((_: any, index: number) => (
                        <div key={index} className="flex gap-2 mb-2 w-full">
                            <input
                                name={`${name}[${index}]`}
                                id={`${name}[${index}]`}
                                type="file"
                                onChange={(e) => handleFileChange(e, index)}
                                className="pl-0 pr-0 bg-transparent text-silver_mist focus:ring-0 focus:border-b-silver_mist border-b-silver_mist focus:outline-none focus:border-t-transparent border-t-transparent focus:border-l-transparent border-l-transparent focus:border-r-transparent border-r-transparent"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveFile(index)}
                                className="text-hot_crimson"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddFile}
                        className="text-vivid_violet text-sm text-left"
                    >
                        + Добавить файл
                    </button>
                </div>
            </label>

            <ErrorMessage
                name={name}
                component="span"
                className="text-sm text-hot_crimson"
            />
        </div>
    );
};
export default File