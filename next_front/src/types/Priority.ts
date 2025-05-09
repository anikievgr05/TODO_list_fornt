export interface Priority {
    id: number,
    name: string,
    project_id: string
    is_closed: boolean
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