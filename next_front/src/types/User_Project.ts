export interface CreateUserProject {
    id: number,
    name: string,
    password: string
    password_confirmation: boolean
}
export interface UpdateUserProject extends CreateUserProject {}
export interface InitUser {
    id: null,
    name: null,
    email: null
}
export interface User {
    id: number
    name: string
    email: string
    is_fired: boolean | null
    roles: number | null
}
export interface Users {
    data: User[]
}

export interface FireDTO {
    id: number,
    is_fire: boolean | false
}