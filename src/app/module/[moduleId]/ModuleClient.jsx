'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { moduleConfig } from '../../../config/moduleConfig'

export default function ModuleClient({ params }) {
  const router = useRouter()
  const { moduleId } = params
  const moduleData = moduleConfig[moduleId]

  useEffect(() => {
    window.location.href = `/module/${moduleId}/1/`
  }, [moduleId])

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <div className="text-white text-center">
        <h1 className="text-2xl font-bold mb-2">Loading {moduleData.title}</h1>
        <p>Redirecting to the first level...</p>
      </div>
    </div>
  )
} 