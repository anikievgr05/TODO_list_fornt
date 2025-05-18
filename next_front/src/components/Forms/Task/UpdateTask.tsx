'use client'
import {TaskDTO, UpdateDTO, UpdateInitDTO} from "@/types/Task";
import React, {useEffect, useState} from "react";
import {ProjectAsProps} from "@/types/Project";
import {useProjectContext} from "@/app/context/ProjectContext";
import {useAuth} from "@/hooks/auth";
import {user_project} from "@/hooks/user_project";
import {tracker} from "@/hooks/tracker";
import {priority} from "@/hooks/priority";
import {task as task_hook} from "@/hooks/task";
import {status as status_hook} from "@/hooks/status";
import {User} from "@/types/User_Project";
import {Tracker} from "@/types/Tracker";
import {Priority} from "@/types/Priority";
import {StatusDTO} from "@/types/Status";
import {Status} from "@/types/global";
import FormСontainer from "@/components/Forms/FormСontainer";
import {UpdateValid} from "@/validations/TaskValidations";
import {Field, FormikHelpers} from "formik";
import ReadOnlyInput from "@/components/Forms/ReadOnlyInput";
import Input from "@/components/Forms/Input";
import DateInput from "@/components/Forms/DateInput";
import SelectMain from "@/components/Forms/SelectMain";
import Button from "@/components/Forms/Button";
import axios, {AxiosError} from "axios";
import File from "@/components/Forms/File";

const UpdateTask = ({task_id}) =>{
    const {projectContext} = useProjectContext();
    const {user} = useAuth({middleware: 'guest'})
    // запросы
    const {update_task, get_task, delete_file} = task_hook(projectContext)
    const {get_users_in_project} = user_project()
    const {get_trackers} = tracker(projectContext)
    const {get_priorities} = priority(projectContext)
    const {get_statuses} = status_hook(projectContext)
    // статусы загрузки объектов
    const [status_load_users, set_status_load_users] = useState<Status>('load')
    const [status_load_trackers, set_status_load_trackers] = useState<Status>('load')
    const [status_load_priorities, set_status_load_priorities] = useState<Status>('load')
    const [status_load_statuses, set_status_load_statuses] = useState<Status>('load')
    const [status_load_task, set_status_load_task] = useState<Status>('load')
    const [statusUpdate, setStatusUpdate] = useState<Status>('empty')
    const [isUpdate, setIsUpdate] = useState<null | true | false>(null)
    // хранилища объектов
    const [task, set_task] = useState<TaskDTO | null>()
    const [users, set_users] = useState<User[] | null>(null)
    const [trackers, set_trackers] = useState<Tracker[]| null>(null)
    const [priorities, set_priorities] = useState<Priority[] | null>(null)
    const [statuses, set_statuses] = useState<StatusDTO[] | null>(null)

    // данные для формы
    const [init_value, set_init_value] = useState<UpdateDTO | UpdateInitDTO>({
        brief_description: '',
        project_id: null,
        tracker_id: null,
        priority_id: null,
        responsible_id: null,
        reviewer_id: null,
        date_end: null,
        status_id: null,
        tz: []
    })
    // загрузка объектов
    useEffect(() => {
        load_task()
        load_users()
        load_trackers()
        load_priorities()
        load_status()
    }, [projectContext]);
    useEffect(() => {
        if (projectContext && task) {
            set_init_value({
                brief_description: task.brief_description,
                project_id: projectContext.id,
                tracker_id: task.tracker.id,
                priority_id: task.priority.id,
                responsible_id: task.responsible?.id,
                reviewer_id: task.reviewer?.id,
                date_end: task.date_end,
                status_id: task.status_id,
                tz: []
            });
        }
    }, [task, projectContext]);
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
        }
    }, [task]);
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
    const load_status = async () => {
        if (projectContext)
        {
            try {
                const data = await get_statuses()
                set_statuses(data.data.statuses)
            } catch (error) {
                set_status_load_users('err')
            } finally {
                if (status_load_statuses !== 'err') {
                    if (statuses && statuses.length === 0) {
                        set_status_load_statuses('empty')
                    } else {
                        set_status_load_statuses('ok')
                    }
                }
            }
        }
    }
    useEffect(() => {
        if (statuses) {
            set_status_load_statuses('ok');
        }
    }, [statuses]);
    // отправка формы
    const submitForm = async (
        values: UpdateDTO,
        { setSubmitting, setErrors, resetForm }: FormikHelpers<UpdateDTO>,
    ): Promise<any> => {
        setStatusUpdate('load');
        try {
            const formData = new FormData();
            formData.append('brief_description', String(values.brief_description));
            formData.append('project_id', String(values.project_id));
            formData.append('tracker_id', String(values.tracker_id));
            formData.append('priority_id', String(values.priority_id));
            formData.append('responsible_id', String(values.responsible_id));
            formData.append('date_end', String(values.date_end));
            formData.append('status_id', String(values.status_id));
            if (values.reviewer_id !== null && values.reviewer_id !== undefined) {
                formData.append('reviewer_id', String(values.reviewer_id));
            }
            if (values.tz && values.tz.length > 0) {
                values.tz.forEach((file) => {
                    if (file) {
                        formData.append('tz[]', file);
                    }
                });
            }
            // Отправляем данные
            await update_task(task_id, formData);
            setIsUpdate(true)
        } catch (error: Error | AxiosError | any) {
            setIsUpdate(false)
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ errors?: Record<string, string[]>; message?: string }>
                if (axiosError.response?.status === 422) {
                    const fieldErrors: Record<string, string> = {}

                    for (const [field, messages] of Object.entries(axiosError.response.data || {})) {
                        if (Array.isArray(messages)) {
                            fieldErrors[field] = messages.join(', ');
                        } else if (typeof messages === 'string') {
                            fieldErrors[field] = messages;
                        } else {
                            fieldErrors[field] = 'Неизвестная ошибка';
                        }
                    }
                    setErrors(fieldErrors)
                }
            }
        } finally {
            setStatusUpdate('ok')
            setTimeout(() => {
                setIsUpdate(null);
            }, 5000);
            load_task()
        }
    }
    // удаление файлов
    const on_remove = async (file) => {
        if (projectContext)
        {
            const isConfirmed = window.confirm("Вы уверены, что хотите удалить этот файл?");
            try {
                if (isConfirmed) {
                    const data = await delete_file(file.id)
                    if (task && task.files) {
                        const updatedFiles = task.files.filter(f => f.id !== file.id);
                        set_task({
                            ...task,
                            files: updatedFiles,
                        });
                    }
                }
            } catch (error) {
            } finally {

            }
        }
    }
    return (
        <div>
            {status_load_trackers === 'err' || status_load_users === 'err' || status_load_priorities === 'err' || status_load_task === 'err' ? (
                <span className="text-hot_crimson font-medium mt-4 ml-3 animate-pulse"># Ошибка при получении данных</span>
            ):(
                <>
                    {status_load_trackers === 'load' || status_load_users === 'load' || status_load_priorities === 'load' ? (
                        <div className="mt-4 h-5">Загрузка контнента...</div>
                    ):('')}
                    {status_load_statuses === 'ok' && status_load_task==='ok' && status_load_trackers === 'ok' && status_load_users === 'ok' && status_load_priorities === 'ok' && projectContext ? (
                        <FormСontainer
                            submitForm={submitForm}
                            validation={UpdateValid}
                            initialValues={init_value}
                            className="w-full flex gap-2.5"
                        >
                            <div className="w-1/4 pr-2 border-r-vivid_violet border-r-2">
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
                                <SelectMain label='Статус' name='status_id' options={statuses}/>
                                <div className="flex">
                                    {statusUpdate !== 'load' && (
                                        <Button
                                            type="submit"
                                        >
                                            Сохранить
                                        </Button>
                                    )}
                                    {isUpdate === false && (
                                        <span className="text-hot_crimson font-medium mt-4 ml-3 animate-pulse">ERR</span>
                                    )}
                                    {isUpdate === true && (
                                        <span className="text-fresh_lime font-medium mt-4 ml-3 animate-pulse">Данные сохранены</span>
                                    )}
                                </div>
                            </div>
                            <File name="tz" label="Добавить файлы"/>
                            <div>
                                <label className="pt-3 text-silver_mist flex w-full">
                                    <span className="min-w-44 w-44">Удалить файлы:</span>
                                    <div className='flex flex-col'>
                                        {task?.files.map((file, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <a href={`http://localhost/api/${task.id}/task/get_file/${file.id}`} target="_blank" rel="noopener noreferrer" className="text-vivid_violet">
                                                    {file.name}
                                                </a>
                                                <button
                                                    type="button"
                                                    onClick={() => on_remove(file)}
                                                    className="text-hot_crimson"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </label>
                            </div>
                        </FormСontainer>
                    ):('')}
                </>
            )}
        </div>
    )
}
export default UpdateTask