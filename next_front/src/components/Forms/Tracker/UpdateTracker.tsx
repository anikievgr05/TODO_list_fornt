'use client'

import {Field, FormikHelpers} from "formik";
import axios, {AxiosError} from "axios";
import OpeningBlock from "@/components/Forms/OpeningBlock";
import Input from "@/components/Forms/Input";
import Button from "@/components/Forms/Button";
import Textarea from "@/components/Forms/Textarea";
import React, {useEffect, useState} from "react";
import OpeningLeftBlock from "@/components/Forms/OpeningLeftBlock";
import {Status} from "@/types/global";
import FormСontainer from "@/components/Forms/FormСontainer";
import {tracker} from "@/hooks/tracker";
import {InitTracker, Tracker, Trackers} from "@/types/Tracker";
import {ProjectAsProps} from "@/types/Project";
import ReadOnlyInput from "@/components/Forms/ReadOnlyInput";
import {Update} from "@/validations/TrackerValidations";

const UpdateTracker: React.FC<ProjectAsProps> = ({project}) => {
    const {get_trackers, get_tracker, update_tracker} = tracker()
    const [statusTracker, setStatusTracker] = useState<Status>('load')
    const [trackers, setTrackers] = useState<Tracker[]>([])
    const [statusContent, setStatusContent] = useState<Status>('empty')
    const [err_get_content, setErr_get_content] = useState<string | null>(null)
    const [initialValues, setInitialValues] = useState<Tracker | InitTracker>({id: null, name: null, project_id: project.id})
    const [statusUpdate, setStatusUpdate] = useState<Status>('empty')
    const [isUpdate, setIsUpdate] = useState<null | true | false>(null)
    const submitForm = async (
        values: Tracker,
        {setErrors}: FormikHelpers<Tracker>,
    ): Promise<any> => {
        setStatusUpdate('load');
        try {
            await update_tracker(values)
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
            all_trackers()
        }
    }


    const load_content = async (id: number) => {
        try {
            setStatusContent('load')
            const data = await get_tracker(id)
            setInitialValues(data.data[0])
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ errors?: Record<string, string[]>; message?: string }>
                if (axiosError.response?.status === 422) {
                    setErr_get_content(axiosError.response.data.tracker.join(', '))
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
    const all_trackers = async () => {
        try {
            setStatusTracker('load')
            const data = await get_trackers()
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
            <div className="text-left">
                <div className="mb-2 text-silver_mist">{tracker.name}</div>
            </div>
        );
    }
    return (
        <OpeningBlock
            title="Редактировать трекеры"
            className='mb-0 flex w-full'
            callback={() => {
                setStatusContent('empty')
                all_trackers()
            }}
        >
            <OpeningLeftBlock
                list={trackers}
                get_list={() => all_trackers()}
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
                        validation={Update}
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
                        <Input name="name" label="Название" disabled={statusUpdate === 'load'}/>
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
                                {err_get_content}
                            </div>
                        )
                    )
                )}
            </OpeningLeftBlock>
        </OpeningBlock>
    )
}
export default UpdateTracker