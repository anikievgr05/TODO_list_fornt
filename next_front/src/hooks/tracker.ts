import axios from "@/lib/axios";
import {useAuth} from "@/hooks/auth";
import { AxiosResponse } from 'axios'
import {Tracker} from "@/types/Tracker";

export const tracker = () => {
    const { csrf } = useAuth({ middleware: 'auth' })

    const create_tracker = async (data: Tracker) => {
        try {
            await csrf()
            return await axios.post('api/tracker', data)
        } catch (error) {
            throw error
        }
    }

    const get_tracker = async (id: number) => {
        try {
            await csrf();
            return await axios.get(`api/tracker/${id}`);
        } catch (error) {
            throw error;
        }
    }

    const get_tracker_by_name = async (name: string) => {
        try {
            await csrf();
            return await axios.get(`api/tracker/get_by_name/${name}`);
        } catch (error) {
            throw error;
        }
    }

    const get_tracker_with_closed = async (id: number) => {
        try {
            await csrf();
            return await axios.get(`api/tracker/${id}?with_closed=1`);
        } catch (error) {
            throw error;
        }
    }

    const update_tracker = async (data: Tracker) => {
        try {
            await csrf();
            return await axios.put(`api/tracker/${data.id}`, data);
        } catch (error) {
            throw error;
        }
    }

    const get_trackers = async () => {
        try {
            await csrf();
            return await axios.get('api/tracker');
        } catch (error) {
            throw error;
        }
    }

    const get_trackers_with_closed = async () => {
        try {
            await csrf();
            return await axios.get(`api/tracker?with_closed=1`);
        } catch (error) {
            throw error;
        }
    }

    const close_tracker = async (data: {
        id: number
        agreement: boolean | null
    }) => {
        try {
            await csrf();
            return await axios.put(`api/tracker/closed/${data.id}`, data);
        } catch (error) {
            throw error;
        }
    }
    return {
        create_tracker,
        get_tracker,
        update_tracker,
        get_tracker_with_closed,
        get_trackers_with_closed,
        get_tracker_by_name,
        get_trackers,
        close_tracker
    }
}