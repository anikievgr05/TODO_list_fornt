import React, {ReactNode} from 'react';

interface Button {
    className?: string;
    type?: 'submit' | 'button' | 'reset';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: ReactNode
}
const Button = ({ type = 'submit', children, onClick }: Button) => (
    <button
        type={type}
        className={`text-sm mt-4 hover:opacity-20 transition-all duration-100 ease-in active:opacity-5 border-none pl-0 text-fresh_lime`}
    >
        {children}
    </button>
)

export default Button
