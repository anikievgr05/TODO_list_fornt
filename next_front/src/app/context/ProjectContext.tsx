import {createContext, useContext, useState} from "react";
import {Project} from "@/types/Project";

const ProjectContext = createContext<{
    projectContext: Project | null;
    setProjectContext: (project: Project | null) => void;
} | null>(null);

export const useProjectContext = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("err");
    }
    return context;
};

// Провайдер для контекста
export const ProjectProvider = ({
    initialProject = null,
    children,
}: {
    initialProject?: Project | null;
    children: React.ReactNode;
}) => {
    const [projectContext, setProjectContext] = useState<Project | null>(initialProject);

    return (
        <ProjectContext.Provider value={{projectContext, setProjectContext}}>
            {children}
        </ProjectContext.Provider>
    );
};