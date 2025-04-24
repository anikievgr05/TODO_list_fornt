import React, {ReactNode} from 'react';

interface Button {
    className?: string
    type?: 'submit' | 'button' | 'reset'
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    children: ReactNode
    disabled?: boolean
}
const Button = ({ type = 'submit', children, onClick, disabled = false }: Button) => (
    <button
        type={type}
        disabled={disabled}
        className={`text-sm mt-4 hover:opacity-20 font-medium transition-all duration-100 ease-in active:opacity-5 border-none pl-0 text-fresh_lime`}
    >
        {children}
    </button>
)

export default Button
