'use client'

import Link from "next/link"
import React, {ElementType, useEffect, useState} from "react";
import {TaskDTO} from "@/types/Task";
import ReadOnlyInput from "@/components/Forms/ReadOnlyInput";
import {useProjectContext} from "@/app/context/ProjectContext";
import {useAuth} from "@/hooks/auth";
import MainTasks from "@/components/Icons/MainTasks";
import {StatusDTO} from "@/types/Status";
import {Status as StatusLoad} from "@/types/global";
import {tracker} from "@/hooks/tracker";
import {status as status_hook} from "@/hooks/status";
import {task} from "@/hooks/task";

const Show = ({ param_task }: {param_task: TaskDTO }) => {
    const {projectContext} = useProjectContext();
    const {user} = useAuth({middleware: 'guest'})
    const {get_next_status} = status_hook(projectContext)
    const {change_the_status_task} = task(projectContext)

    // хранилище
    const [next_status, set_next_status] = useState<StatusDTO | null>()
    const [status, set_status] = useState<StatusDTO>(param_task.status)

    // статусы загрузки
    const [status_load_status, set_status_load_status] = useState<StatusLoad>('load')
    const [status_load_update_status, set_status_load_update_status] = useState<StatusLoad>('load')

    // запросы
    useEffect(() => {
        load_next_status()
    }, [projectContext]);
    const load_next_status = async () => {
        if (projectContext)
        {
            try {
                const data = await get_next_status(status.id)
                set_next_status(data.data[0])
            } catch (error) {
                set_status_load_status('err')
            } finally {
                if (status_load_status !== 'err') {
                    if (next_status && next_status.length === 0) {
                        set_status_load_status('empty')
                    } else {
                        set_status_load_status('ok')
                    }
                }
            }
        }
    }
    useEffect(() => {
        if (next_status) {
            set_status_load_status('ok');
        }
    }, [next_status]);

    const set_new_status = (new_status: StatusDTO) => {
        set_status(new_status)
        set_status_load_update_status('load')
    }
    const change_the_status = async () => {
        if (projectContext)
        {
            try {
                await change_the_status_task(param_task.id)
                set_status_load_update_status('ok')
            } catch (error) {
                set_status_load_update_status('err')
            } finally {
                if (status_load_update_status !== 'err') {
                    if (next_status && next_status.length === 0) {
                        set_status_load_update_status('empty')
                    } else {
                        set_status_load_update_status('ok')
                    }
                }
            }
        }
    }
    useEffect(() => {
        if (status_load_update_status== 'ok') {
            load_next_status()
        }
    }, [status_load_update_status]);
    return (
        <div className='py-2 w-full flex gap-2.5'>
            <div className="w-1/4 border-r-2 border-vivid_violet">
                <ReadOnlyInput label="Проект" value={projectContext.name}/>
                <ReadOnlyInput label="Краткое описание" value={param_task.brief_description}/>
                <ReadOnlyInput label="Срок до" value={param_task.date_end}/>
                <ReadOnlyInput label="Приоритет" value={param_task.priority.name}/>
                <div className="flex items-center">
                    <ReadOnlyInput label="Статус" value={status.name}/>
                    {next_status?.id ? (
                        <>
                            <button className="text-vivid_violet px-2 text-sm" onClick={() => {
                                set_new_status(next_status)
                                change_the_status()
                            }}>-></button>
                            <span  className="text-sm">{next_status.name}</span>
                        </>
                    ): ('')}
                </div>
                <ReadOnlyInput label="Трекер" value={param_task.tracker.name}/>
                <ReadOnlyInput label="Автор" value={param_task.author.name}/>
                <ReadOnlyInput label="Назначена" value={param_task.responsible?.name == user?.name ? 'мне' : user?.name ?? '-'}/>
                <ReadOnlyInput label="Проверяет" value={param_task.reviewer?.name == user?.name ? 'я' : user?.name ?? '-'}/>
            </div>
            <div className='flex flex-col'>
                <div>Файлы:</div>
                {param_task.files.map((file, index) => (
                    <Link className='flex items-center hover:text-vivid_violet' key={index} href={`http://localhost/api/${projectContext.id}/task/get_file/${file.id}`}>
                        <MainTasks height='10' width='10' fill='#B2B1B6' classContainer='pr-2'/>
                        {file.name}
                    </Link>
                ))}
            </div>
        </div>
    )

}

export default Show