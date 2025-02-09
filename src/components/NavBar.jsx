import { getModuleLevels, moduleConfig } from "../config/moduleConfig"
import Link from "next/link"
import { 
  HomeIcon, 
  BookOpen, 
  ChevronDown 
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function NavBar({ moduleId, levelId, levelData }) {
  if (!moduleId || !levelId) return null;
  
  const totalModules = Object.keys(moduleConfig).length;
  const levels = getModuleLevels(moduleId.toString());

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
      <div className="container mx-auto py-3">
        <div className="flex items-center justify-between">
          {/* Left: Brand */}
          <Link 
            href="/"
            className="flex items-center gap-2 group"
          >
            <HomeIcon className="h-6 w-6 text-violet-600 group-hover:text-violet-700 transition-colors" />
            <span className="text-lg font-semibold text-violet-700 group-hover:text-violet-800">
              SQL Home
            </span>
          </Link>

          {/* Right: Module & Level Navigation */}
          <div className="flex items-center gap-6 text-sm">
            {/* Module Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 text-violet-700 hover:text-violet-800 transition-colors">
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">Module {moduleId}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {[...Array(totalModules)].map((_, i) => (
                  <DropdownMenuItem key={i + 1} asChild>
                    <Link
                      href={`/module/${i + 1}/1/`}
                      className="w-full cursor-pointer"
                    >
                      Module {i + 1}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Level Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-1.5 bg-violet-50 rounded-full hover:bg-violet-100 transition-colors">
                <span className="flex items-center gap-2 font-medium text-violet-700">
                  <span>Level {levelId}: {levelData?.title}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {[...Array(levels)].map((_, i) => (
                  <DropdownMenuItem key={i + 1} asChild>
                    <Link
                      href={`/module/${moduleId}/${i + 1}/`}
                      className="w-full cursor-pointer"
                    >
                      Level {i + 1}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
} 