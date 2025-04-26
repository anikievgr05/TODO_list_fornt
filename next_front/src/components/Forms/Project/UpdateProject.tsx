'use client'

import {Field, FormikHelpers} from "formik";
import axios, {AxiosError} from "axios";
import {Update} from "@/validations/ProjectValidations";
import {CreateDTO, ElList, Project, ProjectInitUpdate, UpdateDTO} from "@/types/Project";
import {useAuth} from "@/hooks/auth";
import {project} from "@/hooks/project";
import OpeningBlock from "@/components/Forms/OpeningBlock";
import Label from "@/components/Label";
import Input from "@/components/Forms/Input";
import Button from "@/components/Forms/Button";
import Textarea from "@/components/Forms/Textarea";
import React, {ReactNode, useEffect, useState} from "react";
import {array} from "yup";
import OpeningLeftBlock from "@/components/Forms/OpeningLeftBlock";
import {Status} from "@/types/global";
import FormСontainer from "@/components/Forms/FormСontainer";


interface UpdateProjectProps {
    statusUpdate?: boolean
}

const UpdateProject = () => {
    const {get_projects, get_project, update_project} = project()
    const [statusProject, setStatusProject] = useState<Status>('load')
    const [projects, setProjects] = useState<Project[]>([])
    const [statusContent, setStatusContent] = useState<Status>('empty')
    const [initialValues, setInitialValues] = useState<object>({})
    const [statusUpdate, setStatusUpdate] = useState<Status>('empty')
    const [isUpdate, setIsUpdate] = useState<null | true | false>(null)
    const submitForm = async (
        values: UpdateDTO,
        {setSubmitting, setErrors}: FormikHelpers<UpdateDTO>,
    ): Promise<any> => {
        setStatusUpdate('load');
        try {
            await update_project(values)
            all_projects()
            setIsUpdate(true)
        } catch (error: Error | AxiosError | any) {
            setIsUpdate(false)
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ errors?: Record<string, string[]>; message?: string }>
                if (axiosError.response?.status === 422) {
                    const fieldErrors: Record<string, string> = {}
                    for (const [field, messages] of Object.entries(axiosError.response.data || {})) {
                        fieldErrors[field] = messages.join(', ')
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
            setStatusContent('load')
            const data = await get_project(id)
            setInitialValues(data.data.project)
        } catch (error) {
            setStatusContent('err')
        }
    }

    useEffect(() => {
        if (initialValues.id) {
            setStatusContent('ok')
        } else {
            setStatusContent('empty')
        }
    }, [initialValues]);
    const all_projects = async () => {
        try {
            setStatusProject('load')
            const data = await get_projects()
            setProjects(data.data.projects)
        } catch (error) {
            setStatusProject('err')
        } finally {
            if (statusProject !== 'err') {
                if (projects.length === 0) {
                    setStatusProject('empty')
                } else {
                    setStatusProject('ok')
                }
            }
        }
    };

    const create_list_el = (project: ElList) => {
        return (
            <div className="text-left">
                <div className="mb-2 text-silver_mist">{project.name}</div>
                <span className="text-stormy_gray">{project.description}</span>
            </div>
        );
    }
    return (
        <OpeningBlock
            title="Редактировать проекты"
            className='mb-0 flex w-full'
            callback={() => {
                setStatusContent('empty')
                all_projects()
            }}
        >
            <OpeningLeftBlock
                list={projects}
                get_list={() => all_projects()}
                placeholder_list="# Создайте проект"
                err_list="# Не удалось загрузить проекты"
                status_list={statusProject}
                disabledList={statusUpdate === 'load'}
                add_item_in_list={(e) => create_list_el(e)}
                err_content="При получении возникла ошибка"
                callback_click={(e) => {
                    setStatusContent('empty')
                    load_content(e.id)
                }}
            >
                {statusContent === 'ok' ? (
                    <FormСontainer
                        submitForm={submitForm}
                        validation={Update}
                        initialValues={initialValues}
                        classNameForm="mt-0"
                        className={`w-full ${statusUpdate === 'load' ? 'animate-pulse opacity-75' : ''}`}
                    >
                        <Field
                            id="id"
                            name="id"
                            type="text"
                            disabled={true}
                            hidden={true}
                        />
                        <Input name="name" label="Название" disabled={statusUpdate === 'load'}/>
                        <Textarea name='description' label='Описание' disabled={statusUpdate === 'load'}></Textarea>
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
                    </FormСontainer>
                ) : (statusContent === 'empty' ? (
                        <div
                            className="p-2 text-l-deep_onyx">{'<- Выберите проек, который собираетесь отредактировать'}</div>
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
                                # Не известная ошибка
                            </div>
                        )
                    )
                )}
            </OpeningLeftBlock>
        </OpeningBlock>
    )
}
export default UpdateProject