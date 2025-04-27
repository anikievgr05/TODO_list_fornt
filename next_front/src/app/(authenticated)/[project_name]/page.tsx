'use client'

import {useAuth} from '@/hooks/auth'
import React from "react";
import {useProjectContext} from "@/app/context/ProjectContext";


export default function Home() {
    const {user} = useAuth({middleware: 'guest'})
    const { projectContext, setProjectContext } = useProjectContext();

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200 text-dark_charcoal">
                        Вы на проекте: {projectContext?.name}
                    </div>
                </div>
            </div>
        </div>
    )
}
