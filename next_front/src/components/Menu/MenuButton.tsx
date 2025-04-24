import Link from "next/link"
import { ElementType } from "react";

interface MenuButton {
    IconComponent: ElementType,
    text: string,
    classes?: string,
    href: string,
    active: boolean
}
const MenuButton = ({ IconComponent, text, classes, href, active}: MenuButton) => (
    <Link
        href={href}
        className="pl-2 w-[44px] h-full hover:w-52 transition-all duration-300 delay-300 ease-in-out flex items-center whitespace-nowrap"
    >
        <div className={`${classes} flex items-center flex-nowrap border-transparent w-full bg-white rounded-lg overflow-hidden p-1 transition-all duration-100 ease-in-out text-dark_charcoal  ${active ? 'border-b-4 border-vivid_violet' : ''}`}>
            <IconComponent
                classContainer="border-2 p-1 inline-block border-dark_charcoal rounded-md"
                fill="#27262B"
                width="15px"
                height="15px"
            />
           <span className="ml-2 text-nowrap">{text}</span>
        </div>
    </Link>
)

export default MenuButton