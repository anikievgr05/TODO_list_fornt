'use client'

import React, {useEffect, useState} from 'react'
import {useProjectContext} from "@/app/context/ProjectContext";
import {useAuth} from "@/hooks/auth";
import {task} from "@/hooks/task";
import {Status} from "@/types/global";
import {TaskDTO} from "@/types/Task";
import UpdateTask from "@/components/Forms/Task/UpdateTask";
import ShowTask from "@/components/Forms/Task/ShowTask";

const Task = (task_props: object) => {
    const {projectContext} = useProjectContext();
    const {user} = useAuth({middleware: 'guest'})
    const {get_task} = task(projectContext)

    // хранилище
    const [task_data, set_task] = useState<TaskDTO | null>()
    const [is_update, set_is_update] = useState(false)
    const handle_task_update = () => {
        load_task()
    }
    // статусы загрузки
    const [status, set_load_status] = useState<Status>('load')
    useEffect(() => {
        if (task_data) {
            set_load_status('ok');
        }
    }, [task_data]);
    // обработчики
    const change_is_update = ()=> {
        if (is_update) {
            set_is_update(false)
        } else {
            set_is_update(true)
        }
    }
    // запросы
    useEffect(() => {
            load_task()
    }, [projectContext]);
    const load_task = async () => {
        if (projectContext)
        {
            try {
                const data = await get_task(task_props.params.task_id)
                set_task(data.data)
            } catch (error) {
                set_load_status('err')
            } finally {
                if (set_load_status !== 'err') {
                    if (task && task.length === 0) {
                        set_load_status('empty')
                    } else {
                        set_load_status('ok')
                    }
                }
            }
        }
    }

    const change_next_the_status_task = async ()=> {
        if (projectContext)
        {
            try {
                const data = await get_task(task_props.params.task_id)
                set_task(data.data)
            } catch (error) {
                set_load_status('err')
            } finally {
                if (set_load_status !== 'err') {
                    if (task && task.length === 0) {
                        set_load_status('empty')
                    } else {
                        set_load_status('ok')
                    }
                }
            }
        }
    }
    return (
        <div className="py-12">
            <div className="w-full sm:px-6 lg:px-8">
                <div className={` bg-white overflow-hidden sm:rounded-lg overflow-y-auto`}>
                    <div className="p-6 bg-white w-full">
                        <div className="w-full bg-dark_charcoal rounded-lg px-4 relative">
                            {!is_update ? (
                                <ShowTask task_id={task_props.params.task_id}/>
                            ) : (
                                <UpdateTask task_id={task_props.params.task_id}/>
                            )}
                            {!is_update ? (
                                <button className="text-vivid_violet px-2 text-sm absolute top-2 right-2" onClick={change_is_update}>Редактировать</button>
                            ) : ('')}
                            {is_update ? (
                                <button className="text-vivid_violet px-2 text-sm absolute top-2 right-2" onClick={change_is_update}>Вернуться к просмотру</button>
                            ) : ('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task
