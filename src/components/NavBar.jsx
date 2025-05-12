import { getModuleLevels, moduleConfig } from "../config/moduleConfig"
import Link from "next/link"
import { 
  HomeIcon, 
  BookOpen, 
  ChevronDown,
  ArrowLeft
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { cn } from '../lib/utils'

export function NavBar({ moduleId, levelId, levelData }) {
  if (!moduleId || !levelId) return null;
  
  const totalModules = Object.keys(moduleConfig).length;
  const levels = getModuleLevels(moduleId.toString());

  return (
    <nav className="bg-[#2A6B70]/95 backdrop-blur-sm border-b border-slate-800/10 sticky top-0 z-50">
      <div className="container mx-auto py-3">
        <div className="flex items-center justify-between">
          {/* Left: Brand */}
          <Link 
            href="/"
            className="flex items-center gap-2 group"
          >
            <ArrowLeft className="h-5 w-5 text-white/90 group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-white/90 group-hover:text-white">
              Back to Home
            </span>
          </Link>

          {/* Right: Module & Level Navigation */}
          <div className="flex items-center gap-6 text-sm">
            {/* Module Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 text-white/90 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2A6B70] rounded-sm px-2 py-1">
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">Module {moduleId}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 border-slate-200">
                {[...Array(totalModules)].map((_, i) => (
                  <DropdownMenuItem key={i + 1} asChild>
                    <Link
                      href={`/module/${i + 1}/1/`}
                      className={cn(
                        "w-full cursor-pointer",
                        parseInt(moduleId) === i + 1 && "bg-[#E6F2F2] text-[#2A6B70] font-medium"
                      )}
                    >
                      Module {i + 1}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Level Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2A6B70]">
                <span className="flex items-center gap-2 font-medium">
                  <span>Level {levelId}: {levelData?.title}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-slate-200">
                {[...Array(levels)].map((_, i) => (
                  <DropdownMenuItem key={i + 1} asChild>
                    <Link
                      href={`/module/${moduleId}/${i + 1}/`}
                      className={cn(
                        "w-full cursor-pointer",
                        parseInt(levelId) === i + 1 && "bg-[#E6F2F2] text-[#2A6B70] font-medium"
                      )}
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