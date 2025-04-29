export interface Status {
    id: number,
    name: string,
    project_id: string
    is_closed: boolean
}
export interface InitStatus {
    id: null,
    name: null,
    project_id: number
    is_closed: boolean
}
export interface Statuses {
    data: Status[]
}

export interface CloseDTO {
    id: number,
    is_closed: boolean | null
}