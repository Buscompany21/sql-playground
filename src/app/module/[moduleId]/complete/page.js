import Link from 'next/link'
import { AppLayout } from '../../../../components/AppLayout'
import { CheckCircle } from 'lucide-react'
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
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-20 w-20 text-[#68A4A1]" />
          </div>
          
          <h1 className="text-3xl font-bold text-[#2E3A45] mb-4">
            Module Complete!
          </h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#2E3A45] mb-2">
              {moduleData.title}
            </h2>
            <p className="text-[#4E5964]">
              Congratulations! You've successfully completed this module.
            </p>
          </div>
          
          <div className="grid gap-4 max-w-md mx-auto">
            {nextModuleId ? (
              <Link
                href={`/module/${nextModuleId}`}
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#2A6B70] hover:bg-[#235458] shadow-sm transition-colors"
              >
                Continue to Next Module
              </Link>
            ) : null}
            
            <Link
              href="/"
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#2E3A45] bg-white hover:bg-gray-50 border-gray-200 shadow-sm transition-colors"
            >
              Return to Dashboard
            </Link>
            
            <Link
              href={`/module/${moduleId}`}
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#5B8A9D] hover:bg-[#4A7688] shadow-sm transition-colors"
            >
              Restart This Module
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  )
} 