'use client'

import {useAuth} from '@/hooks/auth'
import LoginLinks from "@/app/LoginLinks";
import Profile from "@/components/Icons/Profile";
import CreateTask from "@/components/Icons/CreateTask";
import Wiki from "@/components/Icons/Wiki";
import Settings from "@/components/Icons/Settings";
import MainTasks from "@/components/Icons/MainTasks";
import IconLink from "@/components/IconLink";


export default function Home() {
    const {user} = useAuth({middleware: 'guest'})
    return (
        <>
            sdfg
        </>
    )
}
