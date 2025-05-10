'use client'

import React, {useEffect, useState} from 'react'
import {useProjectContext} from "@/app/context/ProjectContext";
import {Status} from "@/types/global";
import {User} from "@/types/User_Project";
import {Tracker} from "@/types/Tracker";
import {Priority} from "@/types/Priority";
import {user_project} from "@/hooks/user_project";
import {tracker} from "@/hooks/tracker";
import {priority} from "@/hooks/priority";
import FormСontainer from "@/components/Forms/FormСontainer";
import {Field, FormikHelpers} from "formik";
import {Create} from "@/validations/TaskValidations";
import {CreateDTO, CreateInitDTO} from "@/types/Task";
import ReadOnlyInput from "@/components/Forms/ReadOnlyInput";
import Input from "@/components/Forms/Input";
import Button from "@/components/Forms/Button";
import SelectMain from "@/components/Forms/SelectMain";
import DateInput from "@/components/Forms/DateInput";
import File from "@/components/Forms/File";
import {task} from "@/hooks/task";
import axios, {AxiosError} from "axios";

const CreatePage = () => {
    const {projectContext} = useProjectContext();

    // запросы
    const {get_users_in_project} = user_project()
    const {get_trackers} = tracker(projectContext)
    const {get_priorities} = priority(projectContext)
    const {create_task} = task(projectContext)
    // статусы загрузки объектов
    const [status_load_users, set_status_load_users] = useState<Status>('load')
    const [status_load_trackers, set_status_load_trackers] = useState<Status>('load')
    const [status_load_priorities, set_status_load_priorities] = useState<Status>('load')

    // хранилища объектов
    const [users, set_users] = useState<User[] | null>(null)
    const [trackers, set_trackers] = useState<Tracker[]| null>(null)
    const [priorities, set_priorities] = useState<Priority[] | null>(null)

    // данные для формы
    const [init_value, set_init_value] = useState<CreateDTO | CreateInitDTO>({
        brief_description: '',
        project_id: null,
        tracker_id: null,
        priority_id: null,
        responsible_id: null,
        reviewer_id: null,
        date_end: null,
        tz: []
    })

    // загрузка объектов
    useEffect(() => {
        load_users()
        load_trackers()
        load_priorities()
        if (projectContext) {
            set_init_value({
                brief_description: '',
                project_id: projectContext.id,
                tracker_id: null,
                priority_id: null,
                responsible_id: null,
                reviewer_id: null,
                date_end: null,
                tz: []
            })
        }
    }, [projectContext]);
    const load_users = async () => {
        if (projectContext)
        {
            try {
                const data = await get_users_in_project(projectContext.id)
                set_users(data.data.users)
            } catch (error) {
                set_status_load_users('err')
            } finally {
                if (status_load_users !== 'err') {
                    if (users && users.length === 0) {
                        set_status_load_users('empty')
                    } else {
                        set_status_load_users('ok')
                    }
                }
            }
        }
    }
    useEffect(() => {
        if (users) {
            set_status_load_users('ok');
        }
    }, [users]);
    const load_trackers = async () => {
        if (projectContext)
        {
            try {
                const data = await get_trackers()
                set_trackers(data.data.trackers)
            } catch (error) {
                set_status_load_trackers('err')
            } finally {
                if (status_load_trackers !== 'err') {
                    if (trackers && trackers.length === 0) {
                        set_status_load_trackers('empty')
                    } else {
                        set_status_load_trackers('ok')
                    }
                }
            }
        }
    }
    useEffect(() => {
        if (trackers) {
            set_status_load_trackers('ok');
        }
    }, [trackers]);
    const load_priorities = async () => {
        if (projectContext)
        {
            try {
                const data = await get_priorities()
                set_priorities(data.data.priorities)
            } catch (error) {
                set_status_load_priorities('err')
            } finally {
                if (status_load_priorities !== 'err') {
                    if (priorities && priorities.length === 0) {
                        set_status_load_priorities('empty')
                    } else {
                        set_status_load_priorities('ok')
                    }
                }
            }
        }
    }
    useEffect(() => {
        if (priorities) {
            set_status_load_priorities('ok');
        }
    }, [priorities]);
    // отправка формы
    const submitForm = async (
        values: CreateDTO,
        { setSubmitting, setErrors, resetForm }: FormikHelpers<CreateDTO>,
    ): Promise<any> => {
        try {
            const formData = new FormData();
            formData.append('brief_description', values.brief_description);
            formData.append('project_id', String(values.project_id));
            formData.append('tracker_id', String(values.tracker_id));
            formData.append('priority_id', String(values.priority_id));
            formData.append('date_end', String(values.date_end));
            if (values.responsible_id !== null) {
                formData.append('responsible_id', String(values.responsible_id));
            }
            if (values.reviewer_id !== null) {
                formData.append('reviewer_id', String(values.reviewer_id));
            }
            if (values.date_end) {
                const dateValue = values.date_end instanceof Date
                    ? values.date_end.toISOString().split('T')[0] // YYYY-MM-DD
                    : values.date_end;

                formData.append('date_end', dateValue);
            }
            if (values.tz && values.tz.length > 0) {
                values.tz.forEach((file) => {
                    if (file) {
                        formData.append('tz[]', file);
                    }
                });
            }

            // Отправляем данные
            await create_task(formData);
            resetForm();
        } catch (error: Error | AxiosError | any) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ errors?: Record<string, string[]>; message?: string }>
                if (axiosError.response?.status === 422) {
                    // Преобразуем ошибки в формат, подходящий для setErrors
                    const fieldErrors: Record<string, string> = {}
                    for (const [field, messages] of Object.entries(axiosError.response.data || {})) {
                        if (Array.isArray(messages)) {
                            // Если messages — массив строк, объединяем их через ', '
                            fieldErrors[field] = messages.join(', ');
                        } else if (typeof messages === 'string') {
                            // Если messages — строка, используем её как есть
                            fieldErrors[field] = messages;
                        } else {
                            // Если messages имеет другой тип, пропускаем или обрабатываем по необходимости
                            fieldErrors[field] = 'Неизвестная ошибка';
                        }
                    }
                    setErrors(fieldErrors)
                }
            }
        }
    }
    return (
        <div className="py-12">
            <div className="w-full sm:px-6 lg:px-8">
                <div className={` bg-white overflow-hidden sm:rounded-lg overflow-y-auto`}>
                    <div className="p-6 bg-white w-full">
                        <div className="text-dark_charcoal">Создание задачи:</div>
                        <div className="w-full bg-dark_charcoal rounded-lg px-4">
                            {status_load_trackers === 'err' || status_load_users === 'err' || status_load_priorities === 'err' ? (
                                <span className="text-hot_crimson font-medium mt-4 ml-3 animate-pulse"># Ошибка при получении данных</span>
                            ):(
                                <>
                                    {status_load_trackers === 'load' || status_load_users === 'load' || status_load_priorities === 'load' ? (
                                        <div className="mt-4">Загрузка контнента...</div>
                                    ):('')}
                                    {status_load_trackers === 'ok' && status_load_users === 'ok' && status_load_priorities === 'ok' && projectContext ? (
                                        <FormСontainer
                                            submitForm={submitForm}
                                            validation={Create}
                                            initialValues={init_value}
                                            className="w-full flex gap-2.5"
                                        >
                                            <div className="w-1/4">
                                                <Field
                                                    id="project_id"
                                                    name="project_id"
                                                    type="text"
                                                    disabled={true}
                                                    hidden={true}
                                                />
                                                <ReadOnlyInput label="Проект" value={projectContext.name}/>
                                                <Input name="brief_description" label="Короткое описание"/>
                                                <DateInput name='date_end' label='Срок до'/>
                                                <SelectMain label='Назначить на' name='responsible_id' options={users}/>
                                                <SelectMain label='Назначить проверку на' name='reviewer_id' options={users}/>
                                                <SelectMain label='Трекер' name='tracker_id' options={trackers}/>
                                                <SelectMain label='Приоритет' name='priority_id' options={priorities}/>
                                                <Button
                                                    type="submit"
                                                    className='flex'
                                                >
                                                    Сохранить
                                                </Button>
                                            </div>
                                            <File name="tz" label="Файлы с описанием задачи"/>
                                        </FormСontainer>
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

export default CreatePage
