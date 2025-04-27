'use client'

import React from 'react'
import CreateProject from "@/components/Forms/Project/CreateProject";
import OpeningBlock from "@/components/Forms/OpeningBlock";
import UpdateProject from "@/components/Forms/Project/UpdateProject";
import CloseProject from "@/components/Forms/Project/CloseProject";
import {useProjectContext} from "@/app/context/ProjectContext";
import CreateTracker from "@/components/Forms/Tracker/CreateTracker";
import UpdateTracker from "@/components/Forms/Tracker/UpdateTracker";
import CloseTracker from "@/components/Forms/Tracker/CloseTracker";

const SettingsPage = () => {
    const { projectContext, setProjectContext } = useProjectContext();

    return (
        <div className="py-12">
            <div className="w-full sm:px-6lg:px-8">
                <OpeningBlock
                    title="Настройка проектов"
                    className={'mb-4'}
                >
                    <CreateProject/>
                    <UpdateProject/>
                    <CloseProject/>
                </OpeningBlock>

                {projectContext && (
                    <OpeningBlock
                        title="Настройка трекеров"
                    >
                        <CreateTracker
                            project={projectContext}
                        />
                        <UpdateTracker/>
                        <CloseTracker/>
                    </OpeningBlock>
                )}

            </div>
        </div>
    )
}

export default SettingsPage
