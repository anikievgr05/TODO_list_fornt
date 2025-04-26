'use client'

import React, {ReactNode, useEffect, useRef, useState} from "react";
import {Status} from "@/types/global";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

interface OpeningProps {
    // список
    list: Array<any>
    status_list: Status
    err_list: string
    disabledList?: boolean
    placeholder_list: string
    get_list: () => void
    add_item_in_list: (item: any) => ReactNode
    // открывающаяся форма
    err_content: string
    children: ReactNode | null
    callback_click: (item: any) => void
}
const OpeningLeftBlock = ({list, status_list = 'load', callback_click, err_list, placeholder_list, get_list, add_item_in_list, children, disabledList = false}: OpeningProps) => {

    useEffect(() => {
        get_list();
    }, []);

    const handleOpenContent = (item: any) => {
        callback_click(item)
    }
    return (
        <div className={`bg-dark_charcoal  sm:rounded-lg mt-4`}>
            <div className="p-6 min-h-96 w-full rounded-lg flex items-center">
                {/* список */}
                <div className="overflow-y-scroll w-full max-h-80 max-w-screen-sm pr-2">
                    { status_list === 'load' ? (
                        Array.from({ length: 5 }, (_, index) => (
                            <div key={index} className={`animate-pulse p-2  ${index !== 4 ? 'border-b-2 border-b-deep_onyx' : '' }`}>
                                <div className="flex mb-2">
                                    <div className="w-1/4 bg-stormy_gray h-4 rounded-lg mr-2"></div>
                                    <div className="w-full bg-stormy_gray h-4 rounded-lg"></div>
                                </div>
                                <div className="w-full bg-stormy_gray h-4 rounded-lg"></div>
                            </div>
                        ))
                    ) : ( status_list === 'ok' ? (
                            list.map((item, index) =>(
                                <button key={index} disabled={disabledList} onClick={() => handleOpenContent(item)} className={`md-2 p-2 w-full hover:opacity-70 ${index !== list.length - 1 ? 'border-b-2 border-b-deep_onyx' : '' }`}>
                                    {add_item_in_list(item)}
                                </button>
                            ))
                        ) : ( status_list === 'empty' ? (
                            <div className="md-2 p-2 w-full">
                                {placeholder_list}
                            </div>
                        ) : ( status_list === 'err' ? (
                            <div className="md-2 p-2 w-full text-center text-hot_crimson">
                                {err_list}
                            </div>
                        ) : (
                            <div className="md-2 p-2 w-full text-center text-hot_crimson">
                                # Не известная ошибка
                            </div>
                        )))
                    )}
                </div>
                {/* контент */}
                <div className={`overflow-hidden pl-1.5 transition duration-150  ease-in-out border-l-2 border-l-vivid_violet h-full`}>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default OpeningLeftBlock