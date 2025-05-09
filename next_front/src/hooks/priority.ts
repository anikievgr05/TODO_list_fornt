import axios from "@/lib/axios";
import {useAuth} from "@/hooks/auth";
import {Status} from "@/types/Status";
import {Project} from "@/types/Project";

export const priority = (project: Project) => {
    const { csrf } = useAuth({ middleware: 'auth' })

    const get_priorities = async () => {
        try {
            await csrf();
            return await axios.get(`api/${project.id}/priority`);
        } catch (error) {
            throw error;
        }
    }

    const get_priorities_with_closed = async () => {
        try {
            await csrf();
            return await axios.get(`api/${project.id}/priority?with_closed=1`);
        } catch (error) {
            throw error;
        }
    }

    const get_priority = async (id: number) => {
        try {
            await csrf();
            return await axios.get(`api/${project.id}/priority/${id}`);
        } catch (error) {
            throw error;
        }
    }

    const get_priority_with_closed = async (id: number) => {
        try {
            await csrf();
            return await axios.get(`api/${project.id}/priority/${id}?with_closed=1`);
        } catch (error) {
            throw error;
        }
    }

    const create_priority = async (data: Status) => {
        try {
            await csrf()
            return await axios.post(`api/${project.id}/priority`, data)
        } catch (error) {
            throw error
        }
    }

    const update_priority = async (data: Status) => {
        try {
            await csrf();
            return await axios.put(`api/${project.id}/priority/${data.id}`, data);
        } catch (error) {
            throw error;
        }
    }

    const change_order = async (id: number, order: 'up' | 'down') => {
        try {
            await csrf();
            return await axios.put(`api/${project.id}/priority/change_order/${id}/${order}`);
        } catch (error) {
            throw error;
        }
    }

    const close_priority = async (data: {
        id: number
        agreement: boolean | null
    }) => {
        try {
            await csrf();
            return await axios.put(`api/${project.id}/priority/closed/${data.id}`, data);
        } catch (error) {
            throw error;
        }
    }
    return {
        get_priority,
        get_priority_with_closed,
        get_priorities,
        get_priorities_with_closed,
        change_order,
        create_priority,
        update_priority,
        close_priority
    }
}