import React from 'react'
import CreateProject from "@/components/Forms/Project/CreateProject";
import OpeningBlock from "@/components/Forms/OpeningBlock";
import UpdateProject from "@/components/Forms/Project/UpdateProject";
import CloseProject from "@/components/Forms/Project/CloseProject";
import CreateUser from "@/components/Forms/User/CreateUser";
import UpdateUser from "@/components/Forms/User/UpdateUser";
import FireUser from "@/components/Forms/User/FireUser";

const SettingsPage = () => {
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
                </OpeningBlock>
            </div>
        </div>
    )
}

export default SettingsPage
