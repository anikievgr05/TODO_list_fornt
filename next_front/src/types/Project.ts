export interface CreateDTO {
    name: string
    description: string
}
export interface UpdateDTO extends Project {}
export interface CloseDTO {
    id: number,
    is_closed: boolean | null
}
export interface Project {
    id: number
    name: string
    description: string
    agreement: boolean
}
export interface ProjectInitUpdate {
    id: null
    name: null
    description: null
    agreement: boolean
}
export interface ElList {
    name: string
    description: string
}