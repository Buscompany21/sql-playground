import Link from 'next/link'
import { AppLayout } from '../components/AppLayout'

export default function NotFound() {
  return (
    <AppLayout>
      <div className="flex items-center justify-center h-[70vh] bg-white rounded-lg shadow-sm p-8 mt-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-[#2E3A45]">404</h1>
          <h2 className="text-2xl font-medium mb-4 text-[#2E3A45]">Page Not Found</h2>
          <p className="text-[#4E5964] mb-6">The page you are looking for doesn't exist or has been moved.</p>
          <Link
            href="/"
            className="bg-[#2A6B70] hover:bg-[#235458] text-white px-6 py-3 rounded-md transition-colors inline-block"
          >
            Return Home
          </Link>
        </div>
      </div>
    </AppLayout>
  )
} 