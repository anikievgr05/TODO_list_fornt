import Link from 'next/link'
import {useParams, usePathname} from 'next/navigation'
import Dropdown from '@/components/Dropdown'
import {DropdownButton} from '@/components/DropdownLink'
import ApplicationLogo from '@/components/ApplicationLogo'

import {UserType} from '@/types/User'
import {useAuth} from '@/hooks/auth'
import MenuButton from "@/components/Menu/MenuButton";
import CreateTask from "@/components/Icons/CreateTask";
import Settings from "@/components/Icons/Settings";
import Profile from "@/components/Icons/Profile";
import MainTasks from "@/components/Icons/MainTasks";
import {project} from "@/hooks/project";
import {useEffect, useState} from "react";
import {Status} from "@/types/global";
import {Project} from "@/types/Project";
import {useProjectContext} from "@/app/context/ProjectContext";
import NavLink from "@/components/NavLink";

const Navigation = ({user}: { user: UserType }) => {
    const {get_projects} = project()
    const [statusProject, serStatusProject] = useState<Status>('empty')
    const [projects, setProjects] = useState<any[]>([])
    const [projectUse, setProject] = useState<Project | null>(null)
    const [isGetProject, setGetProject] = useState(false)
    const {logout} = useAuth({})
    const { projectContext, setProjectContext } = useProjectContext();
    const params = useParams()

    useEffect(() => {
        if(projectContext !== null) {
            setProject(projectContext[0])
        }
    }, [])

    useEffect(() => {
        console.log(123,projectContext)
        if (projectContext !== null){
            setProject(projectContext)
        }
    }, [projectContext]);

    const handleOpenChange = (isOpen: boolean) => {
        setGetProject(!isOpen)
    };
    const load_projects = async () => {
        if (isGetProject) {
            try {
                serStatusProject('load')
                const data = await get_projects()
                setProjects(data.data.projects)
                serStatusProject('ok')
            } catch (error) {
                serStatusProject('err')
            } finally {
            }
        }
    }
    return (
        <nav className="bg-dark_charcoal">
            {/* Primary Navigation Menu */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/dashboard">
                                <ApplicationLogo className="block h-10 w-auto fill-current text-gray-600"/>
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="w-full flex justify-center">
                            <MenuButton
                                IconComponent={MainTasks}
                                text="Мои задачи"
                                href="/tasks"
                                active={usePathname() === '/tasks'}
                            />
                            <MenuButton
                                IconComponent={Profile}
                                text="Профиль"
                                href="/profile"
                                active={usePathname() === '/profile'}
                            />
                            <MenuButton
                                IconComponent={CreateTask}
                                text="Создать задачу"
                                href="/tasks/create"
                                active={usePathname() === '/tasks/create'}
                            />
                            <MenuButton
                                IconComponent={Settings}
                                text="Настройки"
                                href="/settings"
                                active={usePathname() === '/settings'}
                            />
                        </div>
                    </div>
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
                                                <Link href={`/${project.name}`} className={`inline-block w-full ${project.name === projectUse.name ? 'text-vivid_violet' : 'text-silver_mist hover:bg-transparent'}  hover:text-vivid_violet h-5 mb-2`} onClick={() => setProject(project)}>{project.name}</Link>
                                            ))}
                                        </div>

                                    </div>
                                )}
                            </Dropdown>
                        </div>
                        {/* Settings Dropdown */}
                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <Dropdown
                                align="right"
                                width={48}
                                trigger={
                                    <button
                                        className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                        <div>{user?.name}</div>

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
                                }>
                                {/* Authentication */}
                                <DropdownButton onClick={logout}>Logout</DropdownButton>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            {/* Responsive Navigation Menu */}
        </nav>
    )
}

export default Navigation
