'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, Book, User } from 'lucide-react'
import { cn } from '../lib/utils'

export function IntegratedHeader() {
  const pathname = usePathname()
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

  // Helper to determine if a path is active
  const isActive = (path) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
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
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-5 lg:gap-6" aria-label="Main navigation">
            <Link 
              href="/" 
              className={cn(
                "text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2A6B70] rounded-sm px-2 py-1",
                isActive('/') ? "text-white" : "text-white/80 hover:text-white"
              )}
            >
              <span className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </span>
            </Link>
            <Link 
              href="/modules" 
              className={cn(
                "text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2A6B70] rounded-sm px-2 py-1",
                isActive('/modules') ? "text-white" : "text-white/80 hover:text-white"
              )}
            >
              <span className="flex items-center gap-1">
                <Book className="h-4 w-4" />
                <span>Modules</span>
              </span>
            </Link>
            <Link 
              href="/progress" 
              className={cn(
                "text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2A6B70] rounded-sm px-2 py-1",
                isActive('/progress') ? "text-white" : "text-white/80 hover:text-white"
              )}
            >
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>My Progress</span>
              </span>
            </Link>
          </nav>
          
          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white/90 hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#2A6B70]"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        id="mobile-menu"
        className={`md:hidden bg-[#2A6B70] border-t border-white/10 transition-all duration-300 ${
          mobileMenuOpen ? 'animate-in max-h-screen opacity-100' : 'max-h-0 overflow-hidden opacity-0'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="flex flex-col container py-3" aria-label="Mobile navigation">
          <Link 
            href="/" 
            className="text-white py-3 border-b border-white/10 text-sm font-medium transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:bg-white/10 focus-visible:font-semibold flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link 
            href="/modules" 
            className="text-white py-3 border-b border-white/10 text-sm font-medium transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:bg-white/10 focus-visible:font-semibold flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Book className="h-4 w-4" />
            <span>Modules</span>
          </Link>
          <Link 
            href="/progress" 
            className="text-white py-3 border-b border-white/10 text-sm font-medium transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:bg-white/10 focus-visible:font-semibold flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <User className="h-4 w-4" />
            <span>My Progress</span>
          </Link>
        </nav>
      </div>
    </header>
  )
} 