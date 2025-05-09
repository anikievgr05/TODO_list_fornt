'use client'


import {ProjectAsProps} from "@/types/Project";
import OpeningBlock from "@/components/Forms/OpeningBlock";
import React, {useEffect, useState} from "react";
import {Status} from "@/types/global";
import {priority} from "@/hooks/priority";
import {Priority} from "@/types/Priority";

const ChangeOrdePriority: React.FC<ProjectAsProps> = ({project}) => {
    const {get_priorities_with_closed, change_order} = priority(project)
    const [statusPriority, SetStatusPriority] = useState<Status>('load')
    const [priorities, SetPriorities] = useState<Priority[]>([])
    const [statusChange, setStatusChange] = useState<Status>('empty')

    useEffect(() => {
        if (priorities.length === 0) {
            SetStatusPriority('empty')
        } else {
            SetStatusPriority('ok')
        }
    }, [priorities]);

    useEffect(() => {
        if (statusChange !== 'load' && statusChange !== 'empty'){
            all_priorities()
        }
    }, [statusChange]);

    const changeOrder = async (id: number, order: 'up' | 'down') => {
        setStatusChange('load')
        try {
            await change_order(id, order)
        } catch (error) {
            console.log('# возникла ошибка')
        } finally {
            setStatusChange('ok')
        }
    }

    const all_priorities = async () => {
        try {
            SetStatusPriority('load')
            const data = await get_priorities_with_closed()
            SetPriorities(data.data.priorities)
        } catch (error) {
            SetStatusPriority('err')
        } finally {
            if (statusPriority !== 'err') {
                if (priorities.length === 0) {
                    SetStatusPriority('empty')
                } else {
                    SetStatusPriority('ok')
                }
            }
        }
    };

    return (
        <OpeningBlock
            title="Поменять порядок у приоритетов (от большего к меньшему)"
            className='mb-0 flex w-full'
            callback={() => {
                all_priorities()
            }}
        >
            <div
                className='mt-4 bg-dark_charcoal w-full h-full px-4 p-6 min-h-96 rounded-lg flex items-center'
            >
                <div className="bg-dark_charcoal overflow-y-scroll w-full max-h-80 min-h-80 max-w-screen-sm pr-2">
                    {statusPriority === 'load' ? (
                        Array.from({ length: 5 }, (_, index) => (
                            <div key={index} className={`animate-pulse p-2 min-h-[46px] ${index !== 4 ? 'border-b-2 border-b-deep_onyx' : '' }`}>
                                <div className="flex mb-2">
                                    <div className="w-1/4 bg-stormy_gray h-4 rounded-lg mr-2"></div>
                                    <div className="w-full bg-stormy_gray h-4 rounded-lg"></div>
                                </div>
                                <div className="w-full bg-stormy_gray h-4 rounded-lg"></div>
                            </div>
                        ))
                    ) : (statusPriority === 'empty' ? (
                        <div className="md-2 p-2 w-full">
                            # Создайте приоритет
                        </div>
                    ) : (statusPriority === 'err' ? (
                            <div className="md-2 p-2 w-full text-center text-hot_crimson">
                                # ошибка при загрузке
                            </div>
                        ) : (statusPriority === 'ok' ? (
                                priorities.map((status, index) => (
                                    <div key={index} className={`md-2 p-2 w-full ${index !== priorities.length - 1 ? 'border-b-2 border-b-deep_onyx' : '' } ${statusChange == 'load' && 'opacity-40'}`}>
                                        <div className="flex items-center justify-between">
                                            <div className="text-left h-7">
                                                <div className="mb-2 text-silver_mist">{status.name}</div>
                                            </div>
                                            <div className="flex items-end">
                                                <div className={`${status.is_closed ? 'bg-hot_crimson' : 'bg-fresh_lime'} w-4 h-4 rounded-lg mr-5`}></div>
                                                {index !== 0 ? (
                                                    <button className="w-7 h-5 hover:opacity-70" onClick={() => changeOrder(status.id, 'up')}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill='#8993F9'  height="19"  width="27" viewBox="0 0 384 512">{/*!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--*/}<path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
                                                    </button>
                                                ) : (
                                                    <button className="w-7 h-5" disabled={true}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill='#5B5A5F'  height="19"  width="27" viewBox="0 0 384 512">{/*!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--*/}<path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
                                                    </button>
                                                )}
                                                {index !== priorities.length - 1 ? (
                                                    <button className="w-7 h-5 hover:opacity-70 rotate-180 ml-3" onClick={() => changeOrder(status.id, 'down')}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill='#8993F9'  height="19"  width="27" viewBox="0 0 384 512">{/*!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--*/}<path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
                                                    </button>
                                                ) : (
                                                    <button className="w-7 h-5  rotate-180 ml-3" disabled={true}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill='#5B5A5F'  height="19"  width="27" viewBox="0 0 384 512">{/*!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--*/}<path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                            <div className="md-2 p-2 w-full text-center text-hot_crimson">
                                # Не известная ошибка
                            </div>
                        ))
                    ) )}
                </div>
            </div>
        </OpeningBlock>
    )
}
export default ChangeOrdePriority