'use client'

import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import {ProjectProvider} from "@/app/context/ProjectContext";

const JBMono = JetBrains_Mono({subsets: ['latin']})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="ru">
      <body className={`${JBMono.className} text-silver_mist antialiased bg-dark_charcoal`}>
          <ProjectProvider>
            {children}
          </ProjectProvider>
      </body>
    </html>
  )
}
