export interface CreateDTO {
    name: string
    description: string
}
export interface UpdateDTO extends Project {}
export interface Project {
    id: number
    name: string
    description: string
}

export interface ProjectInitUpdate {
    id: null
    name: null
    description: null
}
export interface ElList {
    name: string
    description: string
}