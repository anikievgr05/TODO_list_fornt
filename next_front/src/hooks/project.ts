import axios from "@/lib/axios";
import {useAuth} from "@/hooks/auth";
import { AxiosResponse } from 'axios'

export const project = () => {
    const { csrf } = useAuth({ middleware: 'auth' })

    const create_project = async (data: {
        name: string
        description: string
    }) => {
        try {
            await csrf()
            return await axios.post('api/project', data)
        } catch (error) {
            throw error
        }
    }

    const get_project = async (id: number) => {
        try {
            await csrf();
            return await axios.get(`api/project/${id}`);
        } catch (error) {
            throw error;
        }
    }
    const get_project_by_name = async (name: string) => {
        try {
            await csrf();
            return await axios.get(`api/project/get_by_name/${name}`);
        } catch (error) {
            throw error;
        }
    }

    const get_project_with_closed = async (id: number) => {
        try {
            await csrf();
            return await axios.get(`api/project/closed/${id}`);
        } catch (error) {
            throw error;
        }
    }

    const update_project = async (data: {
        id: number
        name: string
        description: string
    }) => {
        try {
            await csrf();
            return await axios.put(`api/project/${data.id}`, data);
        } catch (error) {
            throw error;
        }
    }

    const get_projects = async () => {
        try {
            await csrf();
            return await axios.get('api/project');
        } catch (error) {
            throw error;
        }
    }

    const get_projects_for_me = async () => {
        try {
            await csrf();
            return await axios.get('api/user_project/get_projects_for_me');
        } catch (error) {
            throw error;
        }
    }

    const get_projects_with_closed = async () => {
        try {
            await csrf();
            return await axios.get(`api/project?with_closed=1`);
        } catch (error) {
            throw error;
        }
    }

    const close_project = async (data: {
        id: number
        agreement: boolean | null
    }) => {
        try {
            await csrf();
            return await axios.put(`api/project/closed/${data.id}`, data);
        } catch (error) {
            throw error;
        }
    }
    return {
        create_project,
        get_project,
        update_project,
        get_project_with_closed,
        get_projects_with_closed,
        get_project_by_name,
        get_projects,
        close_project,
        get_projects_for_me
    }
}