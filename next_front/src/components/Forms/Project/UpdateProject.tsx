'use client'

import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import axios, {AxiosError} from "axios";
import {Create} from "@/validations/ProjectValidations";
import {CreateDTO} from "@/types/Project";
import {useAuth} from "@/hooks/auth";
import {project} from "@/hooks/project";
import OpeningBlock from "@/components/Forms/OpeningBlock";
import Label from "@/components/Label";
import FormContainer from "@/components/Forms/Form";
import Input from "@/components/Forms/Input";
import Button from "@/components/Forms/Button";
import Textarea from "@/components/Forms/Textarea";
import {useState} from "react";
import {array} from "yup";
import OpeningLeftBlock from "@/components/Forms/OpeningLeftBlock";


const UpdateProject = () => {
    const { create_project, get_projects, get_project } = project()
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);
    const [isLoadingContent, setIsLoadingContent] = useState(false);
    const [statusProject, setStatusProject] = useState<true | false | 'load'>('load');
    const [statusContent, setStatusContent] = useState<true | false | 'empty'>('empty');
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
            setStatusProject(true)
        } catch (error) {
            setStatusProject(false)
        }
    };

    const create_from = async (project_data: { id: number }) => {
        setStatusContent('empty')
        try {
            setIsLoadingContent(true)
            const data = await get_project({ id: project_data.project.id }); // Получаем данные проекта
            setStatusContent(true)
            return (
                <div>
                    тут ты пилишь форму
                </div>
            );
        } catch (error) {
            setStatusContent(false)
        } finally {
            setIsLoadingContent(false)
        }
    };
    const create_list_el = ({project}: { project: any }) => {
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
            callback={all_projects}
        >
            <OpeningLeftBlock
                list={projects}
                status_list={statusProject}
                status_content={statusContent}
                children_list={(e) => create_list_el({project: e})}
                placeholder="<- Выбирите проект для редактирования"
                children_content={(e) => create_from({project: e})}
                is_load_content={isLoadingContent}
            />
            </OpeningBlock>
    )
}
export default UpdateProject