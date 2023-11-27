import React from 'react'
import '@styles/global.css'
import type { Metadata } from 'next'
import { Nav, Provider } from '@components'
import { AppProps } from 'next/app'

export const metadata: Metadata = {
    title: "Promptopia",
    description: "Discover share AI Prompts"
}

const RootLayout = ({ children,pageProps }: { children: React.ReactNode,pageProps:AppProps }) => {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient"></div>
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout