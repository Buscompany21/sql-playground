import Link from 'next/link'
import { Home } from 'lucide-react'

export function ModuleHomeButton() {
  return (
    <Link 
      href="/"
      className="bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition duration-200 hover:scale-105 text-sm flex items-center"
    >
      <Home className="mr-1 h-4 w-4" />
      Home
    </Link>
  )
} 