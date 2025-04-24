'use client'

import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import axios, {AxiosError} from "axios";
import {Create} from "@/validations/ProjectValidations";
import {CreateDTO} from "@/types/Project";
import {useAuth} from "@/hooks/auth";
import {project} from "@/hooks/project";
import OpeningForm from "@/components/Forms/OpeningForm";
import Label from "@/components/Label";
import FormContainer from "@/components/Forms/Form";
import Input from "@/components/Forms/Input";
import Button from "@/components/Forms/Button";
import Textarea from "@/components/Forms/Textarea";
import {useState} from "react";
import {array} from "yup";


const UpdateProject = () => {
    const { create_project, get_projects } = project()
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [statusProject, setStatusProject] = useState<'ok' | 'error' | null>(null);
    const [projects, setProjects] = useState<any[]>([]);

    const submitForm = async (
        values: CreateDTO,
        { setSubmitting, setErrors, resetForm }: FormikHelpers<CreateDTO>,
    ): Promise<any> => {

        // setStatus(null);
        try {
            // await create_project(values)
            // setStatus('ok'); // Устанавливаем статус OK
            resetForm();
        } catch (error: Error | AxiosError | any) {
            // setStatus('error'); // Устанавливаем статус ERR
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ errors?: Record<string, string[]>; message?: string }>
                if (axiosError.response?.status === 422) {
                    // Преобразуем ошибки в формат, подходящий для setErrors
                    const fieldErrors: Record<string, string> = {}
                    for (const [field, messages] of Object.entries(axiosError.response.data || {})) {
                        fieldErrors[field] = messages.join(', ') // Объединяем массив ошибок в строку
                    }
                    setErrors(fieldErrors)
                }
            }
        } finally {
            // setIsLoading(false);
            setSubmitting(false);
            setTimeout(() => {
                // setStatus(null);
            }, 10000);
        }
    }

    const all_projects = async () => {
        try {
            setIsLoadingProjects(true)
            const data = await get_projects()
            setProjects(data.data.projects)
        } catch (error) {
            setStatusProject('error')
        } finally {
            setIsLoadingProjects(false)

        }
    };

    return (
        <OpeningForm
            title="Редактировать проекты"
            className='mb-0 flex w-full'
            callback={all_projects}
        >
            <div className="flex w-full">
                <div className="bg-dark_charcoal max-h-96 rounded-lg mt-4 mr-5 overflow-y-scroll w-80">
                    {projects && projects.length > 0 ? (
                        projects.map((project, index) => (
                            <div className="border-b-2 border-deep_onyx" key={project.id}>
                                <button className="p-3.5 w-full text-left">
                                    <span className="font-medium text-sm text-silver_mist ">{project.name}</span>
                                    <div className="text-sm text-stormy_gray">{project.description}</div>
                                </button>
                            </div>
                        ))
                    ) : ( isLoadingProjects ? (
                            Array.from({ length: 11 }, (_, index) => (
                                <div key={index} className="animate-pulse p-3.5 border-b-2 border-b-deep_onyx">
                                    <div className="w-64 bg-stormy_gray h-5 rounded-lg mb-2"></div>
                                    <div className="w-64 bg-stormy_gray h-5 rounded-lg"></div>
                                </div>
                            ))
                        ) : (
                            <div className="p-3.5 border-b-2 border-b-deep_onyx">
                                <div className="w-64 text-stormy_gray h-5 rounded-lg mb-2">Нет доступных данных</div>
                            </div>
                        )
                    )}
                </div>

                <FormContainer
                    submitForm={submitForm}
                    validation={Create}
                    initialValues={{name: '', description: ''}}
                    className={isLoading ? 'animate-pulse opacity-10': ''}
                >
                    <Input disabled={isLoading} name="name" label="Название"/>
                    <Textarea disabled={isLoading} name='description' label='Описание'></Textarea>
                    <Button
                        type="submit"
                        className='flex'
                        disabled={isLoading}
                    >
                        {isLoading ? "Сохранение..." : "Сохранить"}
                    </Button>
                    {status === 'ok' && (
                        <span className="text-fresh_lime font-medium ml-3 animate-pulse">OK</span>
                    )}
                    {status === 'error' && (
                        <span className="text-hot_crimson font-medium  ml-3 animate-pulse">ERR</span>
                    )}
                </FormContainer>
            </div>
        </OpeningForm>
    )
}
export default UpdateProject