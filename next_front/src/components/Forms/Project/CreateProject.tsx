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


const CreateProject = () => {
    const { create_project } = project()
    const submitForm = async (
        values: CreateDTO,
        { setSubmitting, setErrors }: FormikHelpers<CreateDTO>,
    ): Promise<any> => {
        try {
            await create_project(values)
        } catch (error: Error | AxiosError | any) {
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
            setSubmitting(false)
        }
    }
    return (
        <OpeningForm
            title="Настройка проектов"
        >
            <OpeningForm
                title="Создать проект"
            >
                <FormContainer
                    submitForm={submitForm}
                    validation={Create}
                    initialValues={{name: '', description: ''}}
                >
                    <Input name="name" label="Название"/>
                    <Textarea name='description' label='Описание'></Textarea>
                    <Button
                        type="submit"
                    >
                        Сохранить
                    </Button>
                </FormContainer>
            </OpeningForm>
        </OpeningForm>
    )
}
export default CreateProject