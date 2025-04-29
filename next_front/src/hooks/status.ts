import axios from "@/lib/axios";
import {useAuth} from "@/hooks/auth";
import {Status} from "@/types/Status";
import {Project} from "@/types/Project";

export const status = (project: Project) => {
    const { csrf } = useAuth({ middleware: 'auth' })

    const get_statuses = async () => {
        try {
            await csrf();
            return await axios.get(`api/${project.id}/status`);
        } catch (error) {
            throw error;
        }
    }

    const get_statuses_with_closed = async () => {
        try {
            await csrf();
            return await axios.get(`api/${project.id}/status?with_closed=1`);
        } catch (error) {
            throw error;
        }
    }

    const get_status = async (id: number) => {
        try {
            await csrf();
            return await axios.get(`api/${project.id}/status/${id}`);
        } catch (error) {
            throw error;
        }
    }

    const get_status_with_closed = async (id: number) => {
        try {
            await csrf();
            return await axios.get(`api/${project.id}/status/${id}?with_closed=1`);
        } catch (error) {
            throw error;
        }
    }

    const create_status = async (data: Status) => {
        try {
            await csrf()
            return await axios.post(`api/${project.id}/status`, data)
        } catch (error) {
            throw error
        }
    }

    const update_status = async (data: Status) => {
        try {
            await csrf();
            return await axios.put(`api/${project.id}/status/${data.id}`, data);
        } catch (error) {
            throw error;
        }
    }

    const change_order = async (id: number, order: 'up' | 'down') => {
        try {
            await csrf();
            return await axios.put(`api/${project.id}/status/change_order/${id}/${order}`);
        } catch (error) {
            throw error;
        }
    }

    const close_status = async (data: {
        id: number
        agreement: boolean | null
    }) => {
        try {
            await csrf();
            return await axios.put(`api/${project.id}/status/closed/${data.id}`, data);
        } catch (error) {
            throw error;
        }
    }
    return {
        get_status,
        get_status_with_closed,
        get_statuses,
        get_statuses_with_closed,
        change_order,
        create_status,
        update_status,
        close_status
    }
}