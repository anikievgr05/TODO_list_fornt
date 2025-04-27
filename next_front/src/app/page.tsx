'use client'

import { useAuth } from '@/hooks/auth'
import LoginLinks from "@/app/LoginLinks";
import Profile from "@/components/Icons/Profile";
import CreateTask from "@/components/Icons/CreateTask";
import Wiki from "@/components/Icons/Wiki";
import Settings from "@/components/Icons/Settings";
import MainTasks from "@/components/Icons/MainTasks";
import IconLink from "@/components/IconLink";
import {useProjectContext} from "@/app/context/ProjectContext";


export default function Home() {
  const { user } = useAuth({ middleware: 'guest' })
  return (
    <>
      <div className="relative flex items-top justify-center min-h-screen bg-dark_charcoal dark:bg-dark_charcoal sm:items-center sm:pt-0">
        <LoginLinks />
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <IconLink
              href="/profile"
              className="flex items-center mb-3"
          >
            <Profile
                classContainer="border-2 p-1 inline-block border-silver_mist rounded-md mr-2"
                fill='#B2B1B6'
                width="15px"
                height="15px"
            />
            профиль
          </IconLink>
          <IconLink
              href="/settings"
              className="flex items-center mb-3"
          >
            <Settings
                classContainer="border-2 p-1 inline-block border-silver_mist rounded-md mr-2"
                fill='#B2B1B6'
                width="15px"
                height="15px"
            />
            настройки
          </IconLink>
        </div>
      </div>
    </>
  )
}
