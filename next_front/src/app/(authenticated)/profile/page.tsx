'use client'

import React, {useEffect, useState} from 'react'
import {useAuth} from "@/hooks/auth";
import {user_project} from "@/hooks/user_project";
import {Status} from "@/types/global";
import {UpdateUser, UpdateUserInit, UpdateUserProject, User, Users} from "@/types/User_Project";
import axios, {AxiosError} from "axios";
import {Update} from "@/validations/UserValidations";
import {Field, FormikHelpers} from "formik";
import Input from "@/components/Forms/Input";
import InputPassword from "@/components/Forms/InputPassword";
import Button from "@/components/Forms/Button";
import Checkbox from "@/components/Forms/Checkbox";
import FormСontainer from "@/components/Forms/FormСontainer";
import {log} from "next/dist/server/typescript/utils";

const Profile = () => {
    const {user} = useAuth({middleware: 'guest'})
    const {get_user, update_user_global} = user_project()
    const [statusUser, setStatusUser] = useState<Status>('load')
    const [initialValues, setInitialValues] = useState<UpdateUser|UpdateUserInit>()
    const [statusUpdate, setStatusUpdate] = useState<Status>('empty')
    const [isUpdate, setIsUpdate] = useState<null | true | false>(null)
    useEffect(() => {
        if (user.id) {
            load_content()
        }
    }, [user])

    const load_content = async () => {
        setStatusUser('load')
        try {
            const data = await get_user(user.id)
            setInitialValues(data.data);
        } catch (error) {
            setStatusUser('err')
        }
    }

    useEffect(() => {
        if (initialValues) {
            setStatusUser('ok')
        }
    }, [initialValues]);
    // отправка форма
    const submitForm = async (
        values: UpdateUserProject,
        {setErrors}: FormikHelpers<UpdateUserProject>,
    ): Promise<any> => {
        setStatusUpdate('load');
        try {
            if (!values.password && !values.password_confirmation){
                delete values.password;
                delete values.password_confirmation;
                delete values.projects;
                delete values.roles;
            }
            await update_user_global(values)
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
    return (
        <div className="py-12">
            <div className="w-full mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200 text-dark_charcoal">
                        <div className="w-full bg-dark_charcoal rounded-lg p-4">
                            {statusUser === 'load' && (
                                <div className="mt-4 h-5 text-silver_mist">Загрузка контнента...</div>
                            )}
                            {statusUser === 'ok' && (
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
                                            <Input name="name" label="Имя"/>
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
                                    </div>
                                </FormСontainer>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
