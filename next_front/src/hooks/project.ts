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

    return {
        create_project,
        get_project,
        update_project,
        get_projects
    }
}