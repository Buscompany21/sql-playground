import Link from 'next/link'
import { BookOpen, Sparkles } from 'lucide-react'
import { cn } from '../lib/utils'

export function HeaderNavLinks({ className }) {
  return (
    <nav className={cn('flex items-center gap-2 sm:gap-3 shrink-0', className)} aria-label="Primary">
      <Link
        href="/#modules-section"
        className="inline-flex items-center gap-1.5 rounded-md border border-white/25 bg-white/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-white/20 hover:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <BookOpen className="h-4 w-4" aria-hidden />
        <span>SQL Lessons</span>
      </Link>
      <Link
        href="/ai-music-trend-challenge"
        className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs sm:text-sm font-semibold text-[#235458] shadow-sm transition-colors hover:bg-[#e6f1f2] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <Sparkles className="h-4 w-4" aria-hidden />
        <span>AI Challenge</span>
      </Link>
    </nav>
  )
}
