import {date} from "yup";

export interface CreateDTO {
    brief_description: string,
    project_id: number
    tracker_id: number
    priority_id: number
    responsible_id: number | null
    reviewer_id: number | null
    date_end: string | null
    tz: File[]
}
export interface CreateInitDTO {
    brief_description: '',
    project_id: number | null
    tracker_id: null
    priority_id: null
    responsible_id: null
    reviewer_id: null
    date_end: null
    tz: []
}
export interface InitPriority {
    id: null,
    name: null,
    project_id: number
    is_closed: boolean
}
export interface Priorities {
    data: Priority[]
}

export interface CloseDTO {
    id: number,
    is_closed: boolean | null
}