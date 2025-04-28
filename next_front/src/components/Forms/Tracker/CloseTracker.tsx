'use client'

import {Field, FormikHelpers} from "formik";
import axios, {AxiosError} from "axios";
import {Close} from "@/validations/ProjectValidations";
import {ProjectAsProps} from "@/types/Project";
import OpeningBlock from "@/components/Forms/OpeningBlock";
import Button from "@/components/Forms/Button";
import React, {useEffect, useState} from "react";
import OpeningLeftBlock from "@/components/Forms/OpeningLeftBlock";
import {Status} from "@/types/global";
import FormСontainer from "@/components/Forms/FormСontainer";
import Checkbox from "@/components/Forms/Checkbox";
import ReadOnlyInput from "@/components/Forms/ReadOnlyInput";
import {tracker} from "@/hooks/tracker";
import {CloseDTO, InitTracker, Tracker} from "@/types/Tracker";

const CloseTracker: React.FC<ProjectAsProps> = ({project}) => {
    const {get_trackers_with_closed, get_tracker_with_closed, close_tracker} = tracker(project)
    const [statusTracker, setStatusTracker] = useState<Status>('load')
    const [trackers, setTrackers] = useState<Tracker[]>([])
    const [statusContent, setStatusContent] = useState<Status>('empty')
    const [err_get_content, setErr_get_content] = useState<string | null>(null)
    const [initialValues, setInitialValues] = useState<object>({})
    const [statusUpdate, setStatusUpdate] = useState<Status>('empty')
    const [isUpdate, setIsUpdate] = useState<null | true | false>(null)
    const [infoTracker, setInfoTracker] = useState<Tracker | InitTracker>({id: null, name: null, project_id: project.id, is_closed: false})
    const submitForm = async (
        values: CloseDTO,
        {setErrors}: FormikHelpers<CloseDTO>,
    ): Promise<any> => {
        setStatusUpdate('load');
        try {
            await close_tracker(values)
            all_projects()
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
            const data = await get_tracker_with_closed(id)
            setInitialValues({
                id: data.data[0].id,
                is_closed: data.data[0].is_closed,
                agreement: false
            })
            setInfoTracker(data.data[0])
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
    const all_projects = async () => {
        try {
            setStatusTracker('load')
            const data = await get_trackers_with_closed()
            setTrackers(data.data.trackers)
        } catch (error) {
            setStatusTracker('err')
        } finally {
            if (statusTracker !== 'err') {
                if (trackers.length === 0) {
                    setStatusTracker('empty')
                } else {
                    setStatusTracker('ok')
                }
            }
        }
    };

    const create_list_el = (tracker: Tracker) => {
        return (
            <div className="flex items-center justify-between">
                <div className="text-left">
                    <div className="mb-2 text-silver_mist">{tracker.name}</div>
                </div>
                <div className={`${tracker.is_closed ? 'bg-hot_crimson' : 'bg-fresh_lime'} w-4 h-4 rounded-lg`}></div>
            </div>

        );
    }
    return (
        <OpeningBlock
            title="Закрыть трекер"
            className='mb-0 flex w-full'
            callback={() => {
                setStatusContent('empty')
                all_projects()
            }}
        >
            <OpeningLeftBlock
                list={trackers}
                get_list={() => all_projects()}
                placeholder_list="# Создайте трекер"
                err_list="# Не удалось загрузить трекеры"
                status_list={statusTracker}
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
                        <ReadOnlyInput label="Название" value={infoTracker.name}/>
                        <Checkbox name="is_closed" id="is_closed" label="Закрыть/открыть проект"/>
                        <Checkbox name="agreement" id="agreement" label="Соглашение: в случае закрытия все элементы, связанные с этим проектом тоже будут закрыты"/>
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
                            className="p-2 text-l-deep_onyx">{'<- Выберите проек, который собираетесь удалить'}</div>
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
export default CloseTracker