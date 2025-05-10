'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '../lib/utils'

export function IntegratedHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Set initial scroll position
    setPrevScrollPos(window.scrollY)
    
    // Function to handle scroll events
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const scrollingUp = prevScrollPos > currentScrollPos
      
      // Make the header visible when scrolling up or at the top of the page
      // or when the mobile menu is open
      setVisible(scrollingUp || currentScrollPos < 10 || mobileMenuOpen)
      
      // Update previous scroll position only if we're not at the top
      if (currentScrollPos > 0) {
        setPrevScrollPos(currentScrollPos)
      }
    }
    
    // Add scroll event listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos, mobileMenuOpen])

  // Close mobile menu when escape key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    
    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [mobileMenuOpen])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    // Ensure header is visible when menu is opened
    if (!mobileMenuOpen) setVisible(true)
  }

  return (
    <header 
      className={cn(
        "fixed top-0 w-full border-b border-slate-800/10 bg-[#2A6B70] backdrop-blur supports-[backdrop-filter]:bg-[#2A6B70]/95 transition-transform duration-300 z-50",
        visible ? "translate-y-0" : "-translate-y-full"
      )} 
      role="banner"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
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
          
          {/* Empty space instead of desktop navigation */}
          <div></div>
        </div>
      </div>
    </header>
  )
} 