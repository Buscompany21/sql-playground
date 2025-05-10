'use client'

import { IntegratedHeader } from './IntegratedHeader'

export function AppLayout({ children, fullWidth = false }) {
  return (
    <div className="h-full flex flex-col">
      <IntegratedHeader />
      
      <main className={`flex-grow ${fullWidth ? '' : 'container mx-auto px-4 md:px-6 py-8'}`}>
        {children}
      </main>
    </div>
  )
} 