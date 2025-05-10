'use client'

import {Field, FormikHelpers} from "formik";
import axios, {AxiosError} from "axios";
import {Update} from "@/validations/UserValidations";
import {ElList, Project, UpdateDTO} from "@/types/Project";
import {project} from "@/hooks/project";
import OpeningBlock from "@/components/Forms/OpeningBlock";
import Input from "@/components/Forms/Input";
import Button from "@/components/Forms/Button";
import Textarea from "@/components/Forms/Textarea";
import React, {useEffect, useState} from "react";
import OpeningLeftBlock from "@/components/Forms/OpeningLeftBlock";
import {Status} from "@/types/global";
import FormСontainer from "@/components/Forms/FormСontainer";
import {user_project} from "@/hooks/user_project";
import {UpdateUserProject, User, Users} from "@/types/User_Project";
import InputPassword from "@/components/Forms/InputPassword";
import Checkbox from "@/components/Forms/Checkbox";
const UpdateUser = () => {
    const {get_users, get_user, update_user_global} = user_project()
    const [statusUser, setStatusUser] = useState<Status>('load')
    const [users, setUsers] = useState<Users[]>([])
    const [statusContent, setStatusContent] = useState<Status>('empty')
    const [err_get_content, setErr_get_content] = useState<string | null>(null)
    const [initialValues, setInitialValues] = useState<object>({})
    const [statusUpdate, setStatusUpdate] = useState<Status>('empty')
    const [isUpdate, setIsUpdate] = useState<null | true | false>(null)
    const [projects, setProjects] = useState<object>({})
    const submitForm = async (
        values: UpdateUserProject,
        {setErrors}: FormikHelpers<UpdateUserProject>,
    ): Promise<any> => {
        setStatusUpdate('load');
        try {
            await update_user_global(values)
            all_users()
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
        }
    }


    const load_content = async (id: number) => {
        try {
            setProjects({})
            setStatusContent('load')
            const data = await get_user(id)
            setInitialValues(formatInitialValues(data.data));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ errors?: Record<string, string[]>; message?: string }>
                if (axiosError.response?.status === 422) {
                    setErr_get_content(axiosError.response.data.join(', '))
                }
            }
            setStatusContent('err')
        }
    }

    const formatInitialValues = (userData : any) => {
        const projectsUser = userData.projects.reduce((acc, project) => {
            acc[project.id] = {name: project.name}
            return acc;
        }, {})
        setProjects(projectsUser)
        return {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            projects: userData.projects.reduce((acc, project) => {
                acc[project.id] = project.pivot?.is_fired ?? false;
                return acc;
            }, {}),
        };
    };

    useEffect(() => {
        if (initialValues.id) {
            setStatusContent('ok')
        } else {
            setStatusContent('empty')
        }
    }, [initialValues]);
    const all_users = async () => {
        try {
            setStatusUser('load')
            const data = await get_users()
            setUsers(data.data.users)
        } catch (error) {
            setStatusUser('err')
        } finally {
            if (statusUser !== 'err') {
                if (users.length === 0) {
                    setStatusUser('empty')
                } else {
                    setStatusUser('ok')
                }
            }
        }
    };

    const create_list_el = (user: User) => {
        return (
            <div className="text-left">
                <div className="mb-2 text-silver_mist">{user.name}</div>
                <span className="text-stormy_gray">{user.email}</span>
            </div>
        );
    }
    return (
        <OpeningBlock
            title="Редактировать пользователей"
            className='mb-0 flex w-full'
            callback={() => {
                setStatusContent('empty')
                all_users()
            }}
        >
            <OpeningLeftBlock
                list={users}
                get_list={() => all_users()}
                placeholder_list="#"
                err_list="# Не удалось загрузить пользователей"
                status_list={statusUser}
                disabledList={statusUpdate === 'load'}
                add_item_in_list={(e) => create_list_el(e)}
                err_content="При получении возникла ошибка"
                callback_click={(e) => {
                    setStatusContent('empty')
                    load_content(e.id)
                }}
            >
                {statusContent === 'ok' ? (
                    <div className="flex">
                        <FormСontainer
                            submitForm={submitForm}
                            validation={Update}
                            initialValues={initialValues}
                            classNameForm="mt-0"
                            className={`w-full ${statusUpdate === 'load' ? 'animate-pulse opacity-75' : ''}`}
                        >
                            <div className='flex'>
                                <div className="mr-4">
                                    <Field
                                        id="id"
                                        name="id"
                                        type="text"
                                        disabled={true}
                                        hidden={true}
                                    />
                                    <Input name="name" label="Название" disabled={statusUpdate === 'load'}/>
                                    <Input name="email" label="Почта"/>
                                    <InputPassword name="password" label="Парль"/>
                                    <InputPassword name="password_confirmation" label="Повторите пароль"/>
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
                                <div className="w-full max-h-64 overflow-y-scroll pr-2">
                                    {Object.keys(initialValues.projects).map((projectId) => (
                                        <div key={projectId}>
                                            <Checkbox label={`Скрыть для ${initialValues.name} проект "${projects[projectId].name}" да/нет`} name={`projects.${projectId}`} id={`projects.${projectId}`}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FormСontainer>
                    </div>
                ) : (statusContent === 'empty' ? (
                        <div
                            className="p-2 text-l-deep_onyx">{'<- Выберите пользоватлей, которого собираетесь отредактировать'}</div>
                    ) : (statusContent == 'load' ? (
                            <div className="animate-pulse p-2 w-96 h-80 h-full">
                                <div className="flex mb-2">
                                    <div className="w-1/4 bg-stormy_gray h-4 rounded-lg mr-2"></div>
                                    <div className="w-full bg-stormy_gray h-4 rounded-lg"></div>
                                </div>
                                <div className="w-full bg-stormy_gray h-4 rounded-lg mb-2"></div>
                                <div className="flex mb-2">
                                    <div className="w-full bg-stormy_gray h-4 rounded-lg mr-2"></div>
                                    <div className="w-1/4 bg-stormy_gray h-4 rounded-lg"></div>
                                </div>
                                <div className="flex mb-2">
                                    <div className="w-full bg-stormy_gray h-4 rounded-lg mr-2"></div>
                                    <div className="w-1/4 bg-stormy_gray h-4 rounded-lg mr-2"></div>
                                    <div className="w-1/4 bg-stormy_gray h-4 rounded-lg"></div>
                                </div>
                            </div>
                        ) : (
                            <div className="md-2 p-2 w-full text-center text-hot_crimson">
                                {err_get_content}
                            </div>
                        )
                    )
                )}
            </OpeningLeftBlock>
        </OpeningBlock>
    )
}
export default UpdateUser