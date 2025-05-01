// components/UnauthorizedRedirect.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FiLock, FiArrowRight } from 'react-icons/fi'

export default function UnauthorizedRedirect() {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push(`/`)
        }, 3000) // Redirect after 3 seconds

        return () => clearTimeout(timer)
    }, [router])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-xl shadow-lg text-center transition-all duration-300 hover:shadow-xl">
                <div className="flex justify-center">
                    <div className="p-4 bg-red-50 rounded-full">
                        <FiLock className="w-10 h-10 text-red-500" />
                    </div>
                </div>
                
                <div className="space-y-3">
                    <h1 className="text-3xl font-bold text-gray-800">Access Restricted</h1>
                    <p className="text-gray-600 text-lg">
                        You dont have permission to view this page
                    </p>
                </div>

                <div className="pt-2">
                    <div className="inline-flex items-center space-x-2 text-blue-600 animate-pulse">
                        <span>Redirecting to homepage</span>
                        <FiArrowRight className="animate-bounce-horizontal" />
                    </div>
                </div>

                <div className="pt-6">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full animate-progress-bar" />
                    </div>
                </div>
            </div>
        </div>
    )
}