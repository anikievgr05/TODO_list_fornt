import axios from "@/lib/axios";
import {useAuth} from "@/hooks/auth";
import { AxiosResponse } from 'axios'
import {Role} from "@/types/Role";
import {Project} from "@/types/Project";
import {CreateUserProject, UpdateUserProject, User} from "@/types/User_Project";
import input from "@/components/Forms/Input";
import * as buffer from "node:buffer";

export const user_project = () => {
    const { csrf } = useAuth({ middleware: 'auth' })

    const create_user = async (data: CreateUserProject) => {
        try {
            await csrf()
            return await axios.post(`api/user_project`, data)
        } catch (error) {
            throw error
        }
    }

    const get_users = async () => {
        try {
            await csrf();
            return await axios.get(`api/user_project`);
        } catch (error) {
            throw error;
        }
    }

    const get_roles_with_closed = async (project_id: number) => {
        try {
            await csrf();
            return await axios.get(`api/user_project?project_id=${project_id}`);
        } catch (error) {
            throw error;
        }
    }

    const update_role = async (data: object) => {
        try {
            await csrf();
            console.log(data)
            return await axios.put(`api/user_project/update_role/${data.id}/?role=${data.role}&project_id=${data.project_id}`);
        } catch (error) {
            throw error;
        }
    }

    const get_user = async (id: number) => {
        try {
            await csrf();
            return await axios.get(`api/user_project/${id}`);
        } catch (error) {
            throw error;
        }
    }

    const get_user_by_project = async (id: number, project_id: number) => {
        try {
            await csrf();
            return await axios.get(`api/user_project/${id}`);
        } catch (error) {
            throw error;
        }
    }

    const get_role_with_closed = async (id: number) => {
        try {
            await csrf();
            return await axios.get(`api/user_project/${id}?with_closed=1`);
        } catch (error) {
            throw error;
        }
    }

    const update_user_global = async (data: UpdateUserProject) => {
        try {
            await csrf();
            return await axios.put(`api/user_project/global/${data.id}`, data);
        } catch (error) {
            throw error;
        }
    }

    const close_role = async (data: {
        id: number
        agreement: boolean | null
    }) => {
        try {
            await csrf();
            return await axios.put(`api/user_project/closed/${data.id}`, data);
        } catch (error) {
            throw error;
        }
    }

    const firer_all_user = async (id: number, is_fire: boolean) => {
        try {
            await csrf();
            return await axios.put(`api/user_project/fire_all/${id}&is_fire=${is_fire}`);
        } catch (error) {
            throw error;
        }
    }
    return {
        create_user,
        get_user,
        get_role_with_closed,
        get_users,
        get_roles_with_closed,
        update_user_global,
        firer_all_user,
        close_role,
        get_user_by_project,
        update_role,
    }
}