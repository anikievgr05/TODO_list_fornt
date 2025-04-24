import React from 'react'
import CreateProject from "@/components/Forms/Project/CreateProject";
import OpeningBlock from "@/components/Forms/OpeningBlock";
import UpdateProject from "@/components/Forms/Project/UpdateProject";

const SettingsPage = () => {
    return (
        <div className="py-12">
            <div className="w-full sm:px-6 lg:px-8">
                <OpeningBlock
                    title="Настройка проектов"
                >
                    <CreateProject/>
                    <UpdateProject/>
                </OpeningBlock>
            </div>
        </div>
    )
}

export default SettingsPage
