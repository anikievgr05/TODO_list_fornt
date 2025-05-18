import {date} from "yup";
import {PriorityDTO} from "@/types/Priority";
import {StatusDTO} from "@/types/Status";
import {TrackerDTO} from "@/types/Tracker";
import {UserDTO} from "@/types/User";
import {FileDTO} from "@/types/File";

export interface CreateDTO {
    brief_description: string,
    project_id: number
    tracker_id: number
    priority_id: number
    responsible_id: number | null | undefined
    reviewer_id: number | null | undefined
    date_end: string | null | undefined
    tz: File[]
}
export interface UpdateDTO {
    brief_description: string,
    project_id: number
    tracker_id: number
    priority_id: number
    responsible_id: number | null | undefined
    reviewer_id: number | null | undefined
    date_end: string | null | undefined
    status_id: number
    tz: File[]
}
export interface UpdateInitDTO {
    brief_description: '',
    project_id: number | null
    tracker_id: null
    priority_id: null
    responsible_id: null
    reviewer_id: null
    date_end: null
    status_id: null
    tz: []
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
export interface TaskDTO {
    id: number;
    brief_description: string
    date_end: string | null
    priority: PriorityDTO
    status: StatusDTO
    tracker: TrackerDTO
    responsible: UserDTO | null
    reviewer: UserDTO | null
    author: UserDTO
    files: FileDTO[]
    status_id: number
}
export interface TasksDTO {
    tasks: TaskDTO[]
    currentPage: number
    lastPage: number
}

export interface FiltersDTO {
    page: number
    order_by_field: string | null
    order_by_method: 'asc' | 'desc' | null
}