'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Sparkles } from 'lucide-react'
import { cn } from '../lib/utils'

export function IntegratedHeader() {
  const [visible, setVisible] = useState(true)
  const prevScrollY = useRef(0)

  useEffect(() => {
    prevScrollY.current = window.scrollY

    const handleScroll = () => {
      const y = window.scrollY
      const scrollingUp = prevScrollY.current > y
      setVisible(scrollingUp || y < 10)
      if (y > 0) prevScrollY.current = y
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 w-full border-b border-slate-800/10 bg-[#2A6B70] backdrop-blur supports-[backdrop-filter]:bg-[#2A6B70]/95 transition-transform duration-300 z-50',
        visible ? 'translate-y-0' : '-translate-y-full'
      )}
      role="banner"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="SQL Adventure - Home">
            <div className="relative w-32 h-10">
              <Image
                src="/images/code-adventure-logo.png"
                alt="SQL Adventure Logo"
                fill
                priority
                sizes="(max-width: 768px) 120px, 150px"
                className="object-contain"
              />
            </div>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-3" aria-label="Primary">
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
        </div>
      </div>
    </header>
  )
}
