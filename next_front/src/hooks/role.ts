import axios from "@/lib/axios";
import {useAuth} from "@/hooks/auth";
import { AxiosResponse } from 'axios'
import {Role} from "@/types/Role";
import {Project} from "@/types/Project";

export const role = (project: Project) => {
    const { csrf } = useAuth({ middleware: 'auth' })

    const get_roles = async () => {
        try {
            await csrf();
            return await axios.get(`api/${project.id}/role`);
        } catch (error) {
            throw error;
        }
    }

    const get_roles_with_closed = async () => {
        try {
            await csrf();
            return await axios.get(`api/${project.id}/role?with_closed=1`);
        } catch (error) {
            throw error;
        }
    }

    const get_role = async (id: number) => {
        try {
            await csrf();
            return await axios.get(`api/${project.id}/role/${id}`);
        } catch (error) {
            throw error;
        }
    }

    const get_role_with_closed = async (id: number) => {
        try {
            await csrf();
            return await axios.get(`api/${project.id}/role/${id}?with_closed=1`);
        } catch (error) {
            throw error;
        }
    }

    const create_role = async (data: Role) => {
        try {
            await csrf()
            return await axios.post(`api/${project.id}/role`, data)
        } catch (error) {
            throw error
        }
    }

    const update_role = async (data: Role) => {
        try {
            await csrf();
            return await axios.put(`api/${project.id}/role/${data.id}`, data);
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
            return await axios.put(`api/${project.id}/role/closed/${data.id}`, data);
        } catch (error) {
            throw error;
        }
    }
    return {
        get_role,
        get_role_with_closed,
        get_roles,
        get_roles_with_closed,
        create_role,
        update_role,
        close_role
    }
}