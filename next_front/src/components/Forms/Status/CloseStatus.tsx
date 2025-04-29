'use client'

import {Field, FormikHelpers} from "formik";
import axios, {AxiosError} from "axios";
import {Close} from "@/validations/RoleValidations";
import {ProjectAsProps} from "@/types/Project";
import OpeningBlock from "@/components/Forms/OpeningBlock";
import Button from "@/components/Forms/Button";
import React, {useEffect, useState} from "react";
import OpeningLeftBlock from "@/components/Forms/OpeningLeftBlock";
import {Status} from "@/types/global";
import FormСontainer from "@/components/Forms/FormСontainer";
import Checkbox from "@/components/Forms/Checkbox";
import ReadOnlyInput from "@/components/Forms/ReadOnlyInput";
import {status as status_hook} from "@/hooks/status";
import {CloseDTO, InitStatus, Status as StatusType} from "@/types/Status";

const CloseStatus: React.FC<ProjectAsProps> = ({project}) => {
    const {get_statuses_with_closed, get_status_with_closed, close_status} = status_hook(project)
    const [statusStatus, setStatusStatus] = useState<Status>('load')
    const [statuses, setStatuses] = useState<StatusType[]>([])
    const [statusContent, setStatusContent] = useState<Status>('empty')
    const [err_get_content, setErr_get_content] = useState<string | null>(null)
    const [initialValues, setInitialValues] = useState<object>({})
    const [statusUpdate, setStatusUpdate] = useState<Status>('empty')
    const [isUpdate, setIsUpdate] = useState<null | true | false>(null)
    const [infoRole, setInfoRole] = useState<StatusType | InitStatus>({id: null, name: null, project_id: project.id, is_closed: false})
    const submitForm = async (
        values: CloseDTO,
        {setErrors}: FormikHelpers<CloseDTO>,
    ): Promise<any> => {
        setStatusUpdate('load');
        try {
            await close_status(values)
            all_statuses()
            setIsUpdate(true)
        } catch (error: Error | AxiosError | any) {
            setIsUpdate(false)
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ errors?: Record<string, string[]>; message?: string }>
                if (axiosError.response?.status === 422) {

                    const fieldErrors: Record<string, string> = {}
                    for (const [field, messages] of Object.entries(axiosError.response.data.errors || axiosError.response.data || {})) {
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
            setStatusContent('load')
            const data = await get_status_with_closed(id)
            setInitialValues({
                id: data.data[0].id,
                is_closed: data.data[0].is_closed,
                agreement: false
            })
            setInfoRole(data.data[0])
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ errors?: Record<string, string[]>; message?: string }>
                if (axiosError.response?.status === 422) {
                    if (axiosError.response.data[0]) {
                        setErr_get_content(axiosError.response.data[0].join(', '))
                    } else if(axiosError.response.data.errors) {
                        setErr_get_content(axiosError.response.data.errors.join(', '))
                    }
                }
            }
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
    const all_statuses = async () => {
        try {
            setStatusStatus('load')
            const data = await get_statuses_with_closed()
            setStatuses(data.data.statuses)
        } catch (error) {
            setStatusStatus('err')
        } finally {
            if (statusStatus !== 'err') {
                if (statuses.length === 0) {
                    setStatusStatus('empty')
                } else {
                    setStatusStatus('ok')
                }
            }
        }
    };

    const create_list_el = (status: StatusType) => {
        return (
            <div className="flex items-center justify-between">
                <div className="text-left">
                    <div className="mb-2 text-silver_mist">{status.name}</div>
                </div>
                <div className={`${status.is_closed ? 'bg-hot_crimson' : 'bg-fresh_lime'} w-4 h-4 rounded-lg`}></div>
            </div>

        );
    }
    return (
        <OpeningBlock
            title="Закрыть статус"
            className='mb-0 flex w-full'
            callback={() => {
                setStatusContent('empty')
                all_statuses()
            }}
        >
            <OpeningLeftBlock
                list={statuses}
                get_list={() => all_statuses()}
                placeholder_list="# Создайте статус"
                err_list="# Не удалось загрузить роли"
                status_list={statusStatus}
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
                        validation={Close}
                        initialValues={initialValues}
                        classNameForm="mt-0"
                        className={`w-full ${statusUpdate === 'load' ? 'animate-pulse opacity-75' : ''}`}
                    >
                        <ReadOnlyInput label="Проект" value={project.name}/>
                        <Field
                            id="id"
                            name="id"
                            type="text"
                            disabled={true}
                            hidden={true}
                        />
                        <ReadOnlyInput label="Название" value={infoRole.name}/>
                        <Checkbox name="is_closed" id="is_closed" label="Закрыть/открыть статус"/>
                        <Checkbox name="agreement" id="agreement" label="Соглашение: больше нельзя будет использовать эту статус"/>
                        <div className="flex">
                            {statusUpdate !== 'load' && (
                                <Button
                                    type="submit"
                                >
                                    <span className='text-fresh_lime'>Обновить</span>
                                </Button>
                            )}
                            {isUpdate === false && (
                                <span className="text-hot_crimson font-medium mt-4 ml-3 animate-pulse">ERR</span>
                            )}
                            {isUpdate === true && (
                                <span className="text-fresh_lime font-medium mt-4 ml-3 animate-pulse">Операция завершена</span>
                            )}
                        </div>
                    </FormСontainer>
                ) : (statusContent === 'empty' ? (
                        <div
                            className="p-2 text-l-deep_onyx">{'<- Выберите статус, которую собираетесь удалить'}</div>
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
export default CloseStatus