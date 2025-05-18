'use client'

import React, {useEffect, useState} from 'react'
import {useProjectContext} from "@/app/context/ProjectContext";
import {useAuth} from "@/hooks/auth";
import {task, task as task_hook} from "@/hooks/task";
import {Status as StatusLoad, Status} from "@/types/global";
import {TaskDTO} from "@/types/Task";
import Show from "@/app/(authenticated)/[project_name]/tasks/[task_id]/Show";
import UpdateTask from "@/components/Forms/Task/UpdateTask";
import ReadOnlyInput from "@/components/Forms/ReadOnlyInput";
import Link from "next/link";
import MainTasks from "@/components/Icons/MainTasks";
import {StatusDTO} from "@/types/Status";
import {status as status_hook} from "@/hooks/status";

const ShowTask = ({task_id}) => {
    const {projectContext} = useProjectContext();
    const {user} = useAuth({middleware: 'guest'})
    // запросы
    const {get_task, change_the_status_task} = task_hook(projectContext)
    const {get_next_status} = status_hook(projectContext)
    // статусы загрузки объектов
    const [status_load_status, set_status_load_status] = useState<StatusLoad>('load')
    const [next_status, set_next_status] = useState<StatusDTO | null>()
    const [status_load_task, set_status_load_task] = useState<Status>('load')
    const [status_load_update_status, set_status_load_update_status] = useState<StatusLoad>('load')
    // хранилище объектов
    const [task, set_task] = useState<TaskDTO | null>()
    const [status, set_status] = useState<StatusDTO | null>(null)
    // загрузка объектов
    useEffect(() => {
        load_task()
    }, [projectContext]);
    useEffect(() => {
        if (projectContext && status?.id) {
            load_next_status();
        }
    }, [projectContext, status?.id]);
    const load_task = async () => {
        if (projectContext)
        {
            try {
                const data = await get_task(task_id)
                set_task(data.data[0])
            } catch (error) {
                set_status_load_task('err')
            } finally {
                if (status_load_task !== 'err') {
                    if (task && task.length === 0) {
                        set_status_load_task('empty')
                    } else {
                        set_status_load_task('ok')
                    }
                }
            }
        }
    }
    useEffect(() => {
        if (task) {
            set_status_load_task('ok');
            set_status(task.status)
        }
    }, [task]);
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
        load_next_status()
    }, [projectContext]);
    const set_new_status = (new_status: StatusDTO) => {
        set_status(new_status)
        set_status_load_update_status('load')
    }
    const change_the_status = async () => {
        if (projectContext)
        {
            try {
                await change_the_status_task(task_id)
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
    return(
        <>
            {status_load_task=='load' && (
                <div className="mt-4 h-5">Загрузка контнента...</div>
            )}
            {status_load_task == 'ok' && status_load_status == 'ok' && status && (
                <div className='py-2 w-full flex gap-2.5'>
                    <div className="w-1/4 border-r-2 border-vivid_violet">
                        <ReadOnlyInput label="Проект" value={projectContext.name}/>
                        <ReadOnlyInput label="Краткое описание" value={task.brief_description}/>
                        <ReadOnlyInput label="Срок до" value={task.date_end}/>
                        <ReadOnlyInput label="Приоритет" value={task.priority.name}/>
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
                        <ReadOnlyInput label="Трекер" value={task.tracker.name}/>
                        <ReadOnlyInput label="Автор" value={task.author.name}/>
                        <ReadOnlyInput label="Назначена" value={task.responsible?.name == user?.name ? 'мне' : user?.name ?? '-'}/>
                        <ReadOnlyInput label="Проверяет" value={task.reviewer?.name == user?.name ? 'я' : user?.name ?? '-'}/>
                    </div>
                    <div className='flex flex-col'>
                        <div>Файлы:</div>
                        {task.files.map((file, index) => (
                            <Link className='flex items-center hover:text-vivid_violet' key={index} href={`http://localhost/api/${projectContext.id}/task/get_file/${file.id}`}>
                                <MainTasks height='10' width='10' fill='#B2B1B6' classContainer='pr-2'/>
                                {file.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default ShowTask
