'use client'

import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import axios, {AxiosError} from "axios";
import {Create} from "@/validations/ProjectValidations";
import { CreateDTO } from "@/types/Project";
import {useAuth} from "@/hooks/auth";
import {project} from "@/hooks/project";
import OpeningForm from "@/components/Forms/OpeningForm";
import Label from "@/components/Label";
import FormContainer from "@/components/Forms/Form";
import Input from "@/components/Forms/Input";
import Button from "@/components/Forms/Button";
import Textarea from "@/components/Forms/Textarea";
import {useState} from "react";


const UpdateProject = () => {
    const { create_project, get_projects } = project()
    const [isLoading, setIsLoadingProjects] = useState(false);
    const [status, setStatus] = useState<'ok' | 'error' | null>(null);

    const submitForm = async (
        values: CreateDTO,
        { setSubmitting, setErrors, resetForm }: FormikHelpers<CreateDTO>,
    ): Promise<any> => {
        // setIsLoading(true);
        setStatus(null);
        try {
            // await create_project(values)
            setStatus('ok'); // Устанавливаем статус OK
            resetForm();
        } catch (error: Error | AxiosError | any) {
            setStatus('error'); // Устанавливаем статус ERR
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
                setStatus(null);
            }, 10000);
        }
    }

    const all_projects = async () => {
        try {
            const projects = await get_projects();
            console.log(projects)
        } catch (error) {

        } finally {

        }
    };

    return (
        <OpeningForm
            title="Редактировать проекты"
            className='mb-0 flex'
            callback={all_projects}
        >
            <div className="flex">
                <div>sdfasdf</div>
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