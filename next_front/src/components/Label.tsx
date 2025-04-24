import { ReactNode } from "react";

interface Label {
    className?: string,
    htmlFor?: string
    children: ReactNode;
}

const Label = ({ className, children, htmlFor }: Label) => (
    <label
        className={`${className} block font-medium text-sm `}
        htmlFor={htmlFor}
    >
        {children}
    </label>
)

export default Label
