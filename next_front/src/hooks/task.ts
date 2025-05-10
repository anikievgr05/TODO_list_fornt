import {Tracker} from "@/types/Tracker";
import axios from "@/lib/axios";
import {CreateDTO} from "@/types/Task";
import {Project} from "@/types/Project";
import {useAuth} from "@/hooks/auth";

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

    return {
        create_task
    }
}