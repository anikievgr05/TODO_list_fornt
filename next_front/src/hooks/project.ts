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

    const get_projects = async () => {
        try {
            await csrf(); // Предполагается, что эта функция также асинхронная
            return await axios.get('api/project');
        } catch (error) {
            throw error; // Передача ошибки выше
        }
    }

    return {
        create_project,
        get_projects
    }
}