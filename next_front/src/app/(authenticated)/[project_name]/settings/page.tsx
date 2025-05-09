'use client'

import React, {useEffect} from 'react'
import CreateProject from "@/components/Forms/Project/CreateProject";
import OpeningBlock from "@/components/Forms/OpeningBlock";
import UpdateProject from "@/components/Forms/Project/UpdateProject";
import {useProjectContext} from "@/app/context/ProjectContext";
import CreateTracker from "@/components/Forms/Tracker/CreateTracker";
import UpdateTracker from "@/components/Forms/Tracker/UpdateTracker";
import CloseTracker from "@/components/Forms/Tracker/CloseTracker";
import CreateRole from "@/components/Forms/Role/CreateRole";
import CloseProject from "@/components/Forms/Project/CloseProject";
import UpdateRole from "@/components/Forms/Role/UpdateRole";
import CloseRole from "@/components/Forms/Role/CloseRole";
import CreateStatus from "@/components/Forms/Status/CreateStatus";
import UpdateStatus from "@/components/Forms/Status/UpdateStatus";
import CloseStatus from "@/components/Forms/Status/CloseStatus";
import ChangeOrdeStatus from "@/components/Forms/Status/ChangeOrdeStatus";
import CreateUser from "@/components/Forms/User/CreateUser";
import UpdateUser from "@/components/Forms/User/UpdateUser";
import UpdateRoleUser from "@/components/Forms/User/UpdateRoleUser";
import CreatePriority from "@/components/Forms/Priority/CreatePriority";
import UpdatePriority from "@/components/Forms/Priority/UpdatePriority";
import ChangeOrdePriority from "@/components/Forms/Priority/ChangeOrdePriority";
import ClosePriority from "@/components/Forms/Priority/ClosePriority";

const SettingsPage = () => {
    const { projectContext, setProjectContext } = useProjectContext();
    return (
        <div className="py-12">
            <div className="w-full sm:px-6 lg:px-8">
                <OpeningBlock
                    title="Настройка проектов"
                    className={'mb-4'}
                >
                    <CreateProject/>
                    <UpdateProject/>
                    <CloseProject/>
                </OpeningBlock>

                <OpeningBlock
                    title="Настройка пользователей"
                    className={'mb-4'}
                >
                    <CreateUser/>
                    <UpdateUser/>
                    {projectContext && (
                        <>
                            <UpdateRoleUser project={projectContext}/>
                        </>
                    )}
                </OpeningBlock>
                {projectContext && (
                    <>
                        <OpeningBlock
                            title="Настройка трекеров"
                            className={'mb-4'}
                        >
                            <CreateTracker
                                project={projectContext}
                            />
                            <UpdateTracker project={projectContext}/>
                            <CloseTracker project={projectContext}/>
                        </OpeningBlock>
                        <OpeningBlock
                            title="Настройка ролей"
                            className={'mb-4'}
                        >
                            <CreateRole
                                project={projectContext}
                            />
                            <UpdateRole project={projectContext}/>
                            <CloseRole project={projectContext}/>
                        </OpeningBlock>
                        <OpeningBlock
                            title="Настройка статусов"
                            className={'mb-4'}
                        >
                            <CreateStatus
                                project={projectContext}
                            />
                            <UpdateStatus project={projectContext}/>
                            <CloseStatus project={projectContext}/>
                            <ChangeOrdeStatus project={projectContext}/>
                        </OpeningBlock>
                        <OpeningBlock
                            title="Настройка приоритетов"
                            className={'mb-4'}
                        >
                            <CreatePriority
                                project={projectContext}
                            />
                            <UpdatePriority project={projectContext}/>
                            <ClosePriority project={projectContext}/>
                            <ChangeOrdePriority project={projectContext}/>
                        </OpeningBlock>
                    </>
                )}

            </div>
        </div>
    )
}

export default SettingsPage
