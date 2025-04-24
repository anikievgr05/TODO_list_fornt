import Link, {LinkProps} from 'next/link'
import {ReactNode} from "react";

interface IconProps {
    children: ReactNode
    className: string
    active?: boolean
    href: string
}

const IconLink = ({
      active = false,
      className,
      children,
      href
}: IconProps) => (
    <Link
        href={href}
        className={`${className} text-xl text-silver_mist ${
            active
                ? 'border-indigo-400 text-gray-900 focus:border-indigo-700'
                : 'border-transparent text-gray-500 hover:opacity-75 focus:opacity-50'
        }`}
    >
        {children}
    </Link>
)
export default IconLink