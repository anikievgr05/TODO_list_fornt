'use client'

import {useAuth} from '@/hooks/auth'
import React, {useEffect, useState} from "react";
import {useProjectContext} from "@/app/context/ProjectContext";
import {task} from "@/hooks/task";
import {User} from "@/types/User_Project";
import {Status} from "@/types/global";
import {FiltersDTO, TaskDTO, TasksDTO} from "@/types/Task";
import Link from "next/link";
import Pagination from "@/components/Forms/Pagination";


export default function Task() {
    const {user} = useAuth({middleware: 'guest'})
    const { projectContext, setProjectContext } = useProjectContext();

    //запросы
    const {get_tasks} = task(projectContext)

    // хранилища
    const [tasks, set_tasks] = useState<TasksDTO | null>(null)
    const [filters, set_filters] = useState<FiltersDTO>({page: 1, order_by_field: null, order_by_method: null})
    //статусы
    const [status_load_tasks, set_status_load_tasks] = useState<Status>('load')

    // обработка событий
    const update_filters = (newValues: any) => {
        set_filters((prev) => {
            if (!prev) {
                // Если prev === undefined, возвращаем значение по умолчанию
                return {
                    order_by_field: null,
                    order_by_method: null,
                    page: 1,
                    ...newValues,
                };
            }

            // Обновляем только те поля, что переданы в newValues
            const entries = Object.entries(newValues) as [keyof FiltersDTO, any][];
            const updated = { ...prev };

            for (const [key, value] of entries) {
                updated[key] = value;
            }

            return updated;
        });
    };
    const handle_page_change = (page: number) => {
        update_filters({page: page})

    };
    useEffect(() => {
        if (filters && projectContext) {
            load_tasks(filters);
        }
    }, [filters, projectContext]);

    const сhange_the_sorting_method = (order_by_method: string | null)=> {
        if (filters.order_by_method == null) {
            return 'asc'
        } else if (filters.order_by_method == 'asc'){
            return 'desc'
        } else if (filters.order_by_method == 'desc'){
            return null
        } else {
            return null
        }
    }
    const set_order_by_field = (field: string) => {
        if (filters.order_by_field !== field) {
            update_filters({order_by_field: field, order_by_method: 'asc'})
        } else {
            update_filters({order_by_method: сhange_the_sorting_method(filters.order_by_method)})
        }
    }
    //запросы
    useEffect(() => {
        load_tasks()
    }, [projectContext]);
    const load_tasks = async (data: FiltersDTO) => {
        if (projectContext)
        {
            try {
                const data = await get_tasks(filters)
                set_tasks({
                    tasks: data.data.tasks,
                    lastPage: data.data.lastPage,
                    currentPage: data.data.currentPage
                })
            } catch (error) {
                set_status_load_tasks('err')
            } finally {
                if (status_load_tasks !== 'err') {
                    if (tasks && tasks.length === 0) {
                        set_status_load_tasks('empty')
                    } else {
                        set_status_load_tasks('ok')
                    }
                }
            }
        }
    }
    useEffect(() => {
        if (tasks) {
            set_status_load_tasks('ok');
        }
    }, [tasks]);

    // компоненты доп

    const button = (type: string) => (
        <button
            className="flex items-center text-text-silver_mist"
            onClick={() => set_order_by_field(type)}>
            <div className="ml-1 mr-2 flex flex-col">
                <svg
                    className={`fill-current h-3 w-4 transition-all duration-300 ease-in rotate-180`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
                <svg
                    className={`fill-current h-3 w-4 transition-all duration-300 ease-in`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </button>
    )
    return (
        <div className="py-12">
            <div className="w-full mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200 text-dark_charcoal">
                        <div className="w-full bg-dark_charcoal rounded-lg p-4">
                            {status_load_tasks === 'err' ? (
                                <span className="text-hot_crimson font-medium  ml-3 animate-pulse"># Ошибка при получении данных</span>
                            ):(
                                <>
                                    {status_load_tasks === 'load' ? (
                                        <div>Загрузка контнента...</div>
                                    ):('')}
                                    {status_load_tasks === 'ok' && projectContext && tasks ? (
                                        <div>
                                            <table className="table-auto text-silver_mist w-full">
                                                <thead>
                                                <tr className="border-b-2 border-silver_mist">
                                                    <th className="flex justify-center">
                                                        <span>#</span>
                                                        {button('id')}
                                                    </th>
                                                    <th>
                                                        <span>Краткое описание</span>
                                                    </th>
                                                    <th>
                                                        <span>Трекер</span>
                                                    </th>
                                                    <th>
                                                       <span>Статус</span>
                                                    </th>
                                                    <th>
                                                        <span>Приоритет</span>
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {tasks && tasks.tasks.map((task: TaskDTO) => (
                                                    <Link href={`/${projectContext.name}/tasks/${task.id}`} key={task.id} className="contents">
                                                        <tr className="hover:text-vivid_violet cursor-pointer mb-2 border-b-2 border-stormy_gray">
                                                            <td className="text-center p-2">T{task.id}</td>
                                                            <td className="text-center p-2">{task.brief_description}</td>
                                                            <td className="text-center p-2">{task.tracker.name}</td>
                                                            <td className="text-center p-2">{task.status.name}</td>
                                                            <td className="text-center p-2">{task.priority.name}</td>
                                                        </tr>
                                                    </Link>
                                                ))}
                                                </tbody>
                                            </table>
                                            <Pagination currentPage={tasks.currentPage} lastPage={tasks.lastPage} onPageChange={handle_page_change} />
                                        </div>
                                    ):('')}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
)
}