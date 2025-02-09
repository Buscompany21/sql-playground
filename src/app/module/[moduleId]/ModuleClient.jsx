'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ModuleClient({ params }) {
  const router = useRouter()
  const { moduleId } = params

  useEffect(() => {
    router.push(`/module/${moduleId}/1`)
  }, [moduleId, router])

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <div className="text-white text-center">
        <h1 className="text-2xl font-bold mb-2">Loading Module {moduleId}</h1>
        <p>Redirecting to the first level...</p>
      </div>
    </div>
  )
} 