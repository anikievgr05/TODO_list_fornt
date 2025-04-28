export interface Tracker {
    id: number,
    name: string,
    project_id: string
    is_closed: boolean
}
export interface InitTracker {
    id: null,
    name: null,
    project_id: number
    is_closed: boolean
}
export interface Trackers {
    data: Tracker[]
}

export interface CloseDTO {
    id: number,
    is_closed: boolean | null
}