'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { moduleConfig } from '../../../config/moduleConfig'
import { ModuleStoryline } from '../../../components/ModuleStoryline'
import { AppLayout } from '../../../components/AppLayout'
import { Loader2 } from 'lucide-react'

export default function ModuleClient({ params }) {
  const router = useRouter()
  const { moduleId } = params
  const moduleData = moduleConfig[moduleId]
  const [showStoryline, setShowStoryline] = useState(true)

  const handleContinue = () => {
    setShowStoryline(false)
    router.push(`/module/${moduleId}/1/`)
  }

  if (!moduleData) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[70vh] bg-white rounded-lg shadow-sm p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-[#2E3A45]">Module not found</h1>
            <p className="text-[#4E5964] mb-6">The requested module does not exist.</p>
            <button
              onClick={() => router.push('/')}
              className="bg-[#2A6B70] hover:bg-[#235458] text-white px-4 py-2 rounded-md transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (!showStoryline) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-[70vh] bg-white rounded-lg shadow-sm p-8">
          <Loader2 className="h-8 w-8 text-[#2A6B70] animate-spin mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-[#2E3A45]">Loading {moduleData.title}</h1>
          <p className="text-[#4E5964]">Redirecting to the first lesson...</p>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="py-6">
        <ModuleStoryline moduleId={moduleId} onContinue={handleContinue} />
      </div>
    </AppLayout>
  )
} 