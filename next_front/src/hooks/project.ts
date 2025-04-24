import axios from "@/lib/axios";
import {useAuth} from "@/hooks/auth";
import { AxiosResponse } from 'axios'

export const project = () => {
    const { csrf } = useAuth({})

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

    return {
        create_project
    }
}