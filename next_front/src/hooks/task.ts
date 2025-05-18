import {Tracker} from "@/types/Tracker";
import axios from "@/lib/axios";
import {CreateDTO, FiltersDTO} from "@/types/Task";
import {Project} from "@/types/Project";
import {useAuth} from "@/hooks/auth";
import {Status} from "@/types/Status";

export const task = (project: Project) => {
    const { csrf } = useAuth({ middleware: 'auth' })

    const create_task = async (data) => {
        try {
            await csrf()
            return await axios.post(`api/${project.id}/task`, data)
        } catch (error) {
            throw error
        }
    }
    const get_task = async (id: number) => {
        try {
            await csrf()
            return await axios.get(`api/${project.id}/task/${id}`)
        } catch (error) {
            throw error
        }
    }
    const get_tasks = async (data: FiltersDTO) => {
        try {
            await csrf()
            return await axios.get(`api/${project.id}/task`, {
                params: data
            })
        } catch (error) {
            throw error
        }
    }
    const change_the_status_task = async (id: number) => {
        try {
            await csrf()
            return await axios.put(`api/${project.id}/task/${id}/change_status`)
        } catch (error) {
            throw error
        }
    }

    const update_task = async (id: number, data: any) => {
        try {
            await csrf();
            return await axios.post(`api/${project.id}/task/${id}`, data);
        } catch (error) {
            throw error;
        }
    }

    const delete_file = async (id: number) => {
        try {
            await csrf()
            return await axios.delete(`api/${project.id}/task/delete_file/${id}`)
        } catch (error) {
            throw error
        }
    }
    return {
        create_task,
        get_tasks,
        get_task,
        change_the_status_task,
        update_task,
        delete_file
    }
}