import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Maximize2, Minimize2, ChevronRight } from 'lucide-react'

export function EditorHeader({ 
  isFullScreen, 
  moduleId, 
  levelId, 
  levelData, 
  toggleSidebar, 
  toggleFullScreen 
}) {
  return (
    <header className={`
      bg-[#2A6B70] 
      text-white 
      border-b 
      ${isFullScreen ? 'z-[950]' : 'z-10'} 
      h-14 sm:h-16
    `}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-full">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center h-10">
            <div className="relative w-32 h-8 sm:h-10">
              <Image
                src="/images/code-adventure-logo.png"
                alt="SQL Adventure Logo"
                fill
                priority
                sizes="(max-width: 768px) 128px, 150px"
                className="object-contain"
              />
            </div>
          </Link>
          <div className="flex items-center gap-1">
            <span
              onClick={toggleSidebar}
              className="text-white hover:text-white/80 font-medium cursor-pointer"
            >
              Module {moduleId}
            </span>
            <ChevronRight className="h-4 w-4 text-white/60" />
            <span
              onClick={toggleSidebar}
              className="font-medium text-white max-w-[400px] truncate inline-block cursor-pointer hover:text-white/80"
            >
              {levelData?.title || `Level ${levelId}`}
            </span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleFullScreen}
          className="relative h-8 group flex items-center gap-1.5 bg-transparent text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
          aria-label={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullScreen ? (
            <Minimize2 className="h-4.5 w-4.5" />
          ) : (
            <Maximize2 className="h-4.5 w-4.5" />
          )}
          <span className="hidden sm:inline text-sm font-medium opacity-0 group-hover:opacity-100 -ml-1 transition-opacity duration-200">
            {isFullScreen ? "Exit" : "Expand"}
          </span>
        </Button>
      </div>
    </header>
  );
} 