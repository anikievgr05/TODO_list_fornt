'use client'

import {Field, FormikHelpers} from "formik";
import axios, {AxiosError} from "axios";
import {Update, UpdateRole} from "@/validations/UserValidations";
import {ElList, Project, ProjectAsProps, UpdateDTO} from "@/types/Project";
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
import {UpdateRoleUser, UpdateUserProject, User, Users} from "@/types/User_Project";
import InputPassword from "@/components/Forms/InputPassword";
import Checkbox from "@/components/Forms/Checkbox";
import Radio from "@/components/Forms/Radio";
import {role} from "@/hooks/role";
const UpdateRoleUser: React.FC<ProjectAsProps> = ({project}) => {
    const {get_roles_with_closed, get_user_by_project, update_role} = user_project()
    const {get_roles} = role(project)
    const [statusUser, setStatusUser] = useState<Status>('load')
    const [users, setUsers] = useState<Users[]>([])
    const [statusContent, setStatusContent] = useState<Status>('empty')
    const [err_get_content, setErr_get_content] = useState<string | null>(null)
    const [initialValues, setInitialValues] = useState<object>({})
    const [statusUpdate, setStatusUpdate] = useState<Status>('empty')
    const [isUpdate, setIsUpdate] = useState<null | true | false>(null)
    const [roles, setRole] = useState<object>({})
    const [status_loadRoles, setStatus_loadRoles] = useState<Status>('empty')
    const submitForm = async (
        values: UpdateRoleUser,
        {setErrors}: FormikHelpers<UpdateRoleUser>,
    ): Promise<any> => {
        setStatusUpdate('load');
        try {
            const roleId = parseInt(values.role.replace('roleId_', ''), 10);
            await update_role({
                id: values.id,
                role: roleId,
                project_id: project.id
            })
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

    const load_roles = async () => {
        try {
            setRole({})
            setStatus_loadRoles('load')
            const user_roles = await get_roles()
            setRole(user_roles.data.roles)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ errors?: Record<string, string[]>; message?: string }>
                if (axiosError.response?.status === 422) {
                    setErr_get_content(axiosError.response.data.join(', '))
                }
            }
            setStatus_loadRoles('err')
        }
    }
    useEffect(() => {
        if (roles) {
            setStatus_loadRoles('ok')
        } else {
            setStatus_loadRoles('empty')
        }
    }, [roles]);
    const load_content = async (id: number) => {
        try {
            setRole({})
            setStatusContent('load')
            const data = await get_user_by_project(id, project.id)
            setInitialValues(formatInitialValues(data.data))
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
        return {
            id: userData.id,
            role: (userData.roles[0] ? 'roleId_' + userData.roles[0].id : ''),
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
            const data = await get_roles_with_closed(project.id)
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
            title={`Обновить роль пользователю на проекте "${project.name}"`}
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
                    load_roles()
                }}
            >
                {statusContent === 'ok' && status_loadRoles === 'ok' ? (
                    <div className="flex">
                        <FormСontainer
                            submitForm={submitForm}
                            validation={UpdateRole}
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
                                    {Object.keys(roles).map((role) => (
                                        <div key={role}>
                                            <Radio name="role" label={roles[role].name} value={`roleId_${roles[role].id}`}/>
                                        </div>
                                    ))}
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
export default UpdateRoleUser