'use client'

import {Field, FormikHelpers} from "formik";
import axios, {AxiosError} from "axios";
import {Create} from "@/validations/TrackerValidations";
import {ProjectAsProps} from "@/types/Project";
import OpeningBlock from "@/components/Forms/OpeningBlock";
import FormContainer from "@/components/Forms/FormСontainer";
import Input from "@/components/Forms/Input";
import Button from "@/components/Forms/Button";
import React, {useState} from "react";
import {Status} from "@/types/global";
import {Tracker} from "@/types/Tracker";
import {tracker} from "@/hooks/tracker";
import ReadOnlyInput from "@/components/Forms/ReadOnlyInput";


const CreateTracker: React.FC<ProjectAsProps> = ({project}) => {
    const { create_tracker } = tracker()
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<Status>('empty');

    const submitForm = async (
        values: Tracker,
        { setSubmitting, setErrors, resetForm }: FormikHelpers<Tracker>,
    ): Promise<any> => {
        setIsLoading(true);
        setStatus('load');
        try {
            console.log()
            await create_tracker(values)
            setStatus('ok'); // Устанавливаем статус OK
            resetForm();
        } catch (error: Error | AxiosError | any) {
            setStatus('err'); // Устанавливаем статус ERR
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
                setStatus('load');
            }, 10000);
        }
    }
    return (
        <OpeningBlock
            title="Создать трекер"
            className='mb-0'
        >
            <FormContainer
                submitForm={submitForm}
                validation={Create}
                initialValues={{name: '', project_id: project.id }}
                className={isLoading ? 'animate-pulse opacity-10' : ''}
            >
                <ReadOnlyInput label="Проект" value={project.name}/>
                <Field
                    id="project_id"
                    name="project_id"
                    type="text"
                    disabled={true}
                    hidden={true}
                />
                <Input disabled={isLoading} name="name" label="Название"/>
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
                {status === 'err' && (
                    <span className="text-hot_crimson font-medium  ml-3 animate-pulse">ERR</span>
                )}
            </FormContainer>
        </OpeningBlock>
    )
}
export default CreateTracker