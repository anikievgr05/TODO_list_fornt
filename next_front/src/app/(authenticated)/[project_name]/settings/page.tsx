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
import UpdateRole from "@/components/Forms/Role/UpdateTracker";
import CloseRole from "@/components/Forms/Role/CloseRole";

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
                        >
                            <CreateRole
                                project={projectContext}
                            />
                            <UpdateRole project={projectContext}/>
                            <CloseRole project={projectContext}/>
                        </OpeningBlock>
                    </>
                )}

            </div>
        </div>
    )
}

export default SettingsPage
