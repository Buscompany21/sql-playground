import Link from 'next/link'
import { AppLayout } from '../../../../components/AppLayout'
import { CheckCircle, BookOpen, ArrowRight } from 'lucide-react'
import { moduleConfig } from '../../../../config/moduleConfig'

export default function ModuleComplete({ params }) {
  const { moduleId } = params
  const moduleData = moduleConfig[moduleId] || {
    title: 'Unknown Module',
    description: 'This module could not be found.'
  }
  
  const nextModuleId = Object.keys(moduleConfig).find(id => 
    parseInt(id) > parseInt(moduleId)
  )
  
  return (
    <AppLayout>
      <div className="w-full max-w-5xl mx-auto pt-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="bg-white px-6 py-5 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="bg-[#E6F2F2] p-2 rounded-full">
                <BookOpen className="h-5 w-5 text-[#2A6B70]" />
              </div>
              <h1 className="text-xl font-bold text-[#2E3A45]">Module {moduleId} Complete</h1>
            </div>
            <div className="mt-2 text-sm text-[#5B8A9D] font-medium">
              {moduleData.title}
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8 text-center">
            <div className="h-20 w-20 bg-[#E6F2F2] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-[#3D9D7C]" />
            </div>
            
            <h2 className="text-2xl font-bold text-[#2E3A45] mb-4">
              Congratulations!
            </h2>
            
            <p className="text-[#4E5964] mb-8 max-w-md mx-auto">
              You've successfully completed all lessons in this module and mastered the SQL concepts it covers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link 
                href="/" 
                className="px-5 py-2.5 rounded-md border border-slate-200 text-[#5B8A9D] hover:bg-[#E9F1F5] transition-colors"
              >
                Return to Home
              </Link>
              
              {nextModuleId && (
                <Link 
                  href={`/module/${nextModuleId}`} 
                  className="px-5 py-2.5 rounded-md bg-[#2A6B70] hover:bg-[#235458] text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Next Module</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
} 