import React, {ReactNode} from 'react';

interface Button {
    className?: string;
    type?: 'submit' | 'button' | 'reset';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: ReactNode
}
const Button = ({ type = 'submit', className, children, onClick }: Button) => (
    <button
        type={type}
        className={`inline-flex items-center px-4 py-2 border-2 border-vivid_violet rounded-md font-semibold text-xs text-silver_mist uppercase tracking-widest hover:opacity-50 active:opacity-75 transition ease-in-out duration-150 ${className}`}
    >
        {children}
    </button>
)

export default Button
