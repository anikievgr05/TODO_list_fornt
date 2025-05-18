'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import Dropdown from "@/components/Dropdown";
import {useState} from "react";
import {Project} from "@/types/Project";
import {Status} from "@/types/global";
import {project} from "@/hooks/project";
import {useProjectContext} from "@/app/context/ProjectContext";

const LoginLinks = () => {
    const { user } = useAuth({ middleware: 'guest' })
    const {get_projects_for_me} = project()
    const [projectUse, setProject] = useState<Project | null>(null)
    const [statusProject, serStatusProject] = useState<Status>('empty')
    const [isGetProject, setGetProject] = useState(false)
    const [projects, setProjects] = useState<any[]>([])
    const { projectContext, setProjectContext } = useProjectContext();

    const handleOpenChange = (isOpen: boolean) => {
        setGetProject(!isOpen)
    };
    const load_projects = async () => {
        if (isGetProject) {
            try {
                serStatusProject('load')
                const data = await get_projects_for_me()
                setProjects(data.data.projects)
                setProject(data.data.projects)
                setProjectContext(data.data.projects);
                serStatusProject('ok')
            } catch (error) {
                serStatusProject('err')
            } finally {
            }
        }
    }
    return (
        <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
            {user ? (
                <div className='flex items-center'>
                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <Dropdown
                            align="right"
                            width={48}
                            trigger={
                                <button
                                    className="flex items-center text-sm bg-white h-[35px] px-1 rounded-lg text-dark_charcoal  focus:outline-none transition duration-150 ease-in-out"
                                    onClick={load_projects}
                                >
                                    <div>Проект:</div>
                                    <div className="pl-2">{projectUse ? projectUse.name : '#'}</div>
                                    <div className="ml-1">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </button>
                            }
                            onOpenChange={handleOpenChange}
                        >
                            {statusProject === 'empty' || statusProject === 'err' && (
                                <div className='w-32 text-left block px-4 py-2 text-sm leading-5 text-stormy_gray'>Проекты не найдены</div>
                            )}
                            {statusProject === 'load' && (
                                <div className="w-32 px-1">
                                    <div className='w-full h-5 bg-stormy_gray block px-4 py-2 text-sm leading-5 rounded-lg animate-pulse opacity-10'></div>
                                </div>
                            )}
                            {statusProject === 'ok' && (
                                <div className='w-32 px-1'>
                                    <div className='bg-dark_charcoal rounded-lg p-1'>
                                        {projects.map((project, index) => (
                                            <Link href={`/${project.name}`} className='inline-block w-full text-silver_mist hover:bg-transparent hover:text-vivid_violet h-5 mb-2' onClick={() => setProject(project)}>{project.name}</Link>
                                        ))}
                                    </div>

                                </div>
                            )}
                        </Dropdown>
                    </div>
                    <Link
                        href="/dashboard"
                        className="ml-4 text-sm text-silver_mist underline"
                    >
                        Dashboard
                    </Link>
                </div>
            ) : (
               <>
                    <Link
                        href="/login"
                        className="text-sm text-silver_mist underline"
                    >
                        Login
                    </Link>

                    <Link
                        href="/register"
                        className="ml-4 text-sm text-silver_mist underline"
                    >
                        Register
                    </Link>
                </>
            )}
        </div>
    )
}

export default LoginLinks
