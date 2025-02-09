import { getModuleLevels } from "../config/modules"
import Link from "next/link"
import { Sparkles, BookOpen } from "lucide-react"

export function NavBar({ moduleId, levelId, levelData }) {
  if (!moduleId || !levelId) return null;

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
      <div className="container mx-auto py-3">
        <div className="flex items-center justify-between">
          {/* Left: Brand */}
          <Link 
            href="/"
            className="flex items-center gap-2.5 group"
          >
            <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-2 rounded-xl shadow-md group-hover:shadow-lg transition-all">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-violet-700 to-fuchsia-700 bg-clip-text text-transparent">
              SQLWizard
            </span>
          </Link>

          {/* Right: Module & Level Info */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-violet-700">
              <BookOpen className="h-4 w-4" />
              <span className="font-medium">Module {moduleId}</span>
            </div>
            <div className="px-4 py-1.5 bg-violet-50 rounded-full">
              <span className="font-medium text-violet-700">
                Level {levelId}: {levelData?.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 