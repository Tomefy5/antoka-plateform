import type { ReactNode } from 'react'
import Navbar from './Navbar'

interface LayoutProps {
    children: ReactNode
    isAuthenticated?: boolean
    showNavbar?: boolean
    userName?: string
    userEmail?: string
}

export default function Layout({
    children,
    isAuthenticated = false,
    showNavbar = true,
    userName,
    userEmail
}: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            {showNavbar && (
                <Navbar
                    isAuthenticated={isAuthenticated}
                    userName={userName}
                    userEmail={userEmail}
                />
            )}
            <main className="flex-1">
                {children}
            </main>
        </div>
    )
}
