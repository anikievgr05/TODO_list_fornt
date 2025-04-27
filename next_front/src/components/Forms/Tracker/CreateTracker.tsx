'use client'

import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import axios, {AxiosError} from "axios";
import {Create} from "@/validations/ProjectValidations";
import { CreateDTO } from "@/types/Project";
import {useAuth} from "@/hooks/auth";
import {project} from "@/hooks/project";
import OpeningBlock from "@/components/Forms/OpeningBlock";
import Label from "@/components/Label";
import FormContainer from "@/components/Forms/FormСontainer";
import Input from "@/components/Forms/Input";
import Button from "@/components/Forms/Button";
import Textarea from "@/components/Forms/Textarea";
import {useState} from "react";


const CreateTracker = () => {
    const { create_project } = project()
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'ok' | 'error' | null>(null);

    const submitForm = async (
        values: CreateDTO,
        { setSubmitting, setErrors, resetForm }: FormikHelpers<CreateDTO>,
    ): Promise<any> => {
        setIsLoading(true);
        setStatus(null);
        try {
            await create_project(values)
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
        } finally {
            setIsLoading(false);
            setSubmitting(false);
            setTimeout(() => {
                setStatus(null);
            }, 10000);
        }
    }
    return (
        <OpeningBlock
            title="Создать проект"
            className='mb-0'
        >
            <FormContainer
                submitForm={submitForm}
                validation={Create}
                initialValues={{name: '', description: ''}}
                className={isLoading ? 'animate-pulse opacity-10' : ''}
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
        </OpeningBlock>
    )
}
export default CreateTracker