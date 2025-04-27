'use client'
import {ReactNode, useEffect, useState} from 'react'
import {useAuth} from '@/hooks/auth'
import Navigation from '@/components/Layouts/Navigation'
import {useParams, useRouter} from 'next/navigation'
import Loading from "@/components/Loading";
import {project} from "@/hooks/project";
import {useProjectContext} from "@/app/context/ProjectContext";

const AppLayout = ({children}: { children: ReactNode }) => {
    const {user} = useAuth({middleware: 'auth'})
    const [isGetProject, setGetProject] = useState(false)
    const { get_project_by_name } = project()
    const { projectContext, setProjectContext } = useProjectContext();
    const router = useRouter()
    const params = useParams()

    useEffect(() => {
        console.log(projectContext)
        if (isGetProject !== null && typeof params.project_name === "string" && user) {
            load_project(params.project_name)
        }
    }, [])

    if (!user) {
        const redirect = encodeURIComponent(window.location.pathname)
        router.push(`/login?redirect=${redirect}`)
        return <Loading/>
    }

    const load_project = async (name: string) => {
        try {
            const data = await get_project_by_name(name)
            console.log(data)
            setGetProject(data.data.project)
            setProjectContext(data.data.project)
        } catch (error) {
        } finally {
        }
    }
    return (
        <div>
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
