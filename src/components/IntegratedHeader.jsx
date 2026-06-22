'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '../lib/utils'
import { HeaderNavLinks } from './HeaderNavLinks'

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
          <HeaderNavLinks />
        </div>
      </div>
    </header>
  )
}
