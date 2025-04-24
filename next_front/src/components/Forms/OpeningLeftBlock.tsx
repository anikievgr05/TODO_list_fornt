'use client'

import React, {ReactNode, useEffect, useRef, useState} from "react";
interface OpeningProps {
    list: Array<any>
    children_list: (item: any) => ReactNode
    children_content: (item: any) => ReactNode
    className?: string
    placeholder: string,
    // можно оптимизировать не рендеря функцию каждый раз когда рендериться блок
    status_list: true | false | 'load'
    status_content: true | false | 'empty'
    is_load_content:  true | false | null
}
const OpeningLeftForm = ({list, className, children_list, children_content, placeholder, status_list = 'load', status_content = 'empty', is_load_content = null}: OpeningProps) => {
    const [active, setActive] = useState(false)
    const [childrenContent, setChildren] = useState<React.ReactNode>(null)
    const wrapperRef = useRef<HTMLDivElement>(null); // Ссылка на корневой элемент

    const handleOpenContent = (item: any) => {
        setActive((prevActive) => !prevActive);
        console.log(active)
        if (!active) {
            setChildren(children_content(item))
            setActive(false)
        }
    };
    // Функция для обработки кликов вне блока
    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setActive(false);
        }
    };

    // Добавляем обработчик кликов на документ при монтировании компонента
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div ref={wrapperRef} className={`${className} bg-dark_charcoal  sm:rounded-lg mb-8 mt-4`}>
            <div className="p-6 w-96 max-h-96 w-full">
                <div className='rounded-lg flex'>
                    <div className="overflow-y-scroll w-full max-h-80 max-w-screen-sm pr-2">
                        {status_list === 'load' ? (
                            Array.from({ length: 5 }, (_, index) => (
                                <div key={index} className={`animate-pulse p-2  ${index !== 4 ? 'border-b-2 border-b-deep_onyx' : '' }`}>
                                    <div className="flex mb-2">
                                        <div className="w-1/4 bg-stormy_gray h-4 rounded-lg mr-2"></div>
                                        <div className="w-full bg-stormy_gray h-4 rounded-lg"></div>
                                    </div>
                                    <div className="w-full bg-stormy_gray h-4 rounded-lg"></div>
                                </div>
                            ))
                        ) : ( status_list ? (
                                list.map((item, index) =>(
                                    <button onClick={() => handleOpenContent(item)} key={index} className={`md-2 p-2 w-full hover:opacity-70 ${index !== list.length - 1 ? 'border-b-2 border-b-deep_onyx' : '' }`}>
                                        {children_list(item)}
                                    </button>
                                ))
                            ) : (
                                <div className="md-2 p-2 w-full">
                                    Нет Данных
                                </div>
                            )
                        )}
                    </div>
                    <div className={`min-w-1 min-w-1 pl-1.5 border-l-2 border-l-deep_onyx ${!active ? 'w-full' : ''}`}>
                        {status_content === 'empty' && is_load_content === false ? (
                            <div className="p-2 text-l-deep_onyx">{placeholder}</div>
                        ) : (status_content === 'empty' && is_load_content === true ? (
                            <div className="animate-pulse p-2 w-full">
                                <div className="flex mb-2">
                                    <div className="w-1/4 bg-stormy_gray h-4 rounded-lg mr-2"></div>
                                    <div className="w-full bg-stormy_gray h-4 rounded-lg"></div>
                                </div>
                                <div className="flex mb-2">
                                    <div className="w-full bg-stormy_gray h-4 rounded-lg mr-2"></div>
                                    <div className="w-1/4 bg-stormy_gray h-4 rounded-lg "></div>
                                </div>
                                <div className="flex mb-2">
                                    <div className="w-full bg-stormy_gray h-4 rounded-lg mr-2"></div>
                                    <div className="w-1/6 bg-stormy_gray h-4 rounded-lg "></div>
                                </div>
                                <div className="w-full bg-stormy_gray h-4 rounded-lg"></div>
                            </div>
                            ) : (!status_content ? (
                                    <div className="p-2 text-hot_crimson"># Ошибка при получении данных</div>
                                ) : ( status_content && is_load_content === false ? (
                                        childrenContent
                                    ) : ('')
                                )
                            )
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OpeningLeftForm