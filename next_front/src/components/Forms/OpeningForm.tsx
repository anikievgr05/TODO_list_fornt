'use client'

import React, {ReactNode, useEffect, useRef, useState} from "react";
import {Create as V_Create} from "@/validations/ProjectValidations";
import {Form, Formik, FormikHelpers} from "formik";
interface OpeningFormProps {
    title: string
    className?: string
    callback?: () => void
    children: ReactNode
}
const OpeningForm = ({title, className, callback, children}: OpeningFormProps) => {
    const [active, setActive] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null); // Ссылка на корневой элемент

    const toggleActive = () => {
        if (callback && !active) {
            callback();
        }
        setActive((prevActive) => !prevActive);
    };
    // Функция для обработки кликов вне блока
    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setActive(false); // Скрываем блок, если клик был вне его
        }
    };

    // Добавляем обработчик кликов на документ при монтировании компонента
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside); // Удаляем обработчик при размонтировании
        };
    }, []);
    return (
        <div ref={wrapperRef} className={`${className} bg-white overflow-hidden sm:rounded-lg mb-8 overflow-y-auto`}>
            <div className="p-6 bg-white">
                <div className='rounded-lg'>
                    <button
                        className="flex items-center text-dark_charcoal w-full"
                        onClick={toggleActive}>
                        <div className="ml-1 mr-2">
                            <svg
                                className={`fill-current h-4 w-4 transition-all duration-300 ease-in ${ active ? 'rotate-180' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <span>{title}</span>
                    </button>
                    <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden rounded-lg ${
                            active
                                ? 'overflow-y-scroll max-h-[700px] opacity-100 visible '
                                : 'max-h-0'
                        }`}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OpeningForm