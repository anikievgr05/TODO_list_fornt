import React, { ReactNode } from 'react'

type Props = {
  logo: ReactNode
  children: ReactNode
}

const AuthCard = ({ logo, children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-dark_charcoal">
      <div>{logo}</div>

      <div className="w-full sm:max-w-md mt-6 px-6 py-4 overflow-hidden sm:rounded-lg">
        {children}
      </div>
    </div>
  )
}

export default AuthCard
