export interface Role {
    id: number,
    name: string,
    project_id: string
    is_closed: boolean
}
export interface InitRole {
    id: null,
    name: null,
    project_id: number
    is_closed: boolean
}
export interface Roles {
    data: Role[]
}

export interface CloseDTO {
    id: number,
    is_closed: boolean | null
}