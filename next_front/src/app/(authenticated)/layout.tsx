'use client'
import { ReactNode } from 'react'
import { useAuth } from '@/hooks/auth'
import Navigation from '@/components/Layouts/Navigation'
import { useRouter } from 'next/navigation'
import Loading from "@/components/Loading";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()

    if (!user) {
        const redirect = encodeURIComponent(window.location.pathname)
        router.push(`/login?redirect=${redirect}`)
        return <Loading />
    }
  return (
    <div className="min-h-screen bg-dark_charcoal">
      <Navigation user={user} />

      {/* Page Content */}
      <main>{children}</main>
    </div>
  )
}

export default AppLayout
