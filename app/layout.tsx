import React from 'react'
import '@styles/global.css'
import type { Metadata } from 'next'
import { Nav } from '@components'

export const metadata: Metadata = {
    title: "Promptopia",
    description: "Discover share AI Prompts"
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <div className="main">
                    <div className="gradient"></div>
                </div>
                <main className="app">
                    <Nav/>
                    {children}
                </main>
            </body>
        </html>
    )
}

export default RootLayout