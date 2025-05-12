'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { moduleConfig } from '../../../config/moduleConfig'
import { ModuleStoryline } from '../../../components/ModuleStoryline'
import { AppLayout } from '../../../components/AppLayout'
import { Loader2, AlertCircle, BookOpen } from 'lucide-react'

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
        <div className="w-full max-w-5xl mx-auto pt-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
            <div className="bg-white px-6 py-5 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="bg-[#FCE7E7] p-2 rounded-full">
                  <AlertCircle className="h-5 w-5 text-[#D56262]" />
                </div>
                <h1 className="text-xl font-bold text-[#2E3A45]">Module Not Found</h1>
              </div>
            </div>
            <div className="p-8 text-center">
              <p className="text-[#4E5964] mb-6">The requested module does not exist or has been removed.</p>
              <button
                onClick={() => router.push('/')}
                className="bg-[#2A6B70] hover:bg-[#235458] text-white px-4 py-2 rounded-md transition-colors"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (!showStoryline) {
    return (
      <AppLayout>
        <div className="w-full max-w-5xl mx-auto pt-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
            <div className="bg-white px-6 py-5 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="bg-[#E6F2F2] p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-[#2A6B70]" />
                </div>
                <h1 className="text-xl font-bold text-[#2E3A45]">{moduleData.title}</h1>
              </div>
            </div>
            <div className="p-12 text-center">
              <Loader2 className="h-10 w-10 text-[#2A6B70] animate-spin mb-4 mx-auto" />
              <h2 className="text-2xl font-bold mb-2 text-[#2E3A45]">Loading Module</h2>
              <p className="text-[#4E5964]">Redirecting to the first lesson...</p>
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="py-4">
        <ModuleStoryline moduleId={moduleId} onContinue={handleContinue} />
      </div>
    </AppLayout>
  )
} 