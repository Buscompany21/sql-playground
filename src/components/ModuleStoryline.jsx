'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "./ui/button"
import { ArrowRight, ChevronRight, BookOpen } from 'lucide-react'
import { moduleConfig, curriculumStoryline } from '../config/moduleConfig'

export function ModuleStoryline({ moduleId, onContinue }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const module = moduleConfig[moduleId]
  
  if (!module || !module.storyline) {
    return null
  }

  return (
    <div className="w-full max-w-5xl mx-auto pt-8">
      <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Module Title Bar - Redesigned with white background */}
        <div className="bg-white px-6 py-5 border-b border-slate-200">
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="bg-[#E6F2F2] p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-[#2A6B70]" />
                </div>
                <h1 className="text-xl font-bold text-[#2E3A45]">{curriculumStoryline.title}</h1>
              </div>
              <div className="flex items-center text-[#5B8A9D] mt-2 text-sm">
                <span className="font-medium">Module {moduleId}</span>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="font-medium">{module.title}</span>
              </div>
            </div>
            <div className="hidden md:flex items-center mt-2 md:mt-0">
              <div className="bg-[#E6F2F2] text-[#2A6B70] text-xs font-medium px-3 py-1.5 rounded-full">
                {module.levels} Lessons
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-0">
          {/* Module Content */}
          <div className="md:flex">
            {/* Left column - Image with improved aspect ratio handling */}
            <div className="md:w-2/5 relative">
              <div className="relative aspect-square">
                {/* Loading placeholder */}
                <div className={`absolute inset-0 bg-[#E6F2F2] animate-pulse ${isImageLoaded ? 'hidden' : 'block'}`} />
                
                {/* Image container with proper padding for square images */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#f8fafa] p-4">
                  <div className="relative w-full h-full">
                    <Image
                      src={module.storyline.image}
                      alt={`Module ${moduleId} storyline illustration`}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className={`object-contain transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      onLoadingComplete={() => setIsImageLoaded(true)}
                    />
                  </div>
                </div>
                
                {/* Very subtle gradient overlay that won't hide image details */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#2A6B70]/10 to-transparent opacity-50 md:hidden pointer-events-none" />
              </div>
            </div>
            
            {/* Right column - Storyline content */}
            <div className="md:w-3/5 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#2E3A45] mb-4">
                Your Adventure Begins
              </h2>
              
              <p className="text-[#4E5964] leading-relaxed mb-6">
                {module.storyline.text}
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <Link href="/#modules-section" className="text-[#5B8A9D] hover:text-[#3A5E69] text-sm font-medium transition-colors">
                  ← Back to modules
                </Link>
                
                <Button 
                  onClick={onContinue}
                  className="bg-[#2A6B70] hover:bg-[#235458] text-white py-2 px-6 rounded-md flex items-center gap-2 transition-colors"
                >
                  Begin Module
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function ModuleStorylinePreview({ moduleId }) {
  const module = moduleConfig[moduleId]
  
  if (!module || !module.storyline) {
    return null
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all h-full flex flex-col">
      {/* Module header with improved design */}
      <div className="bg-gradient-to-r from-[#235458] to-[#2A6B70] px-5 py-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-white/80 text-xs font-medium uppercase tracking-wider">Module {moduleId}</span>
          <h3 className="font-bold text-white text-lg mt-1">{module.title}</h3>
        </div>
        <div className="bg-white/20 px-3 py-1 rounded-full">
          <span className="text-white text-xs font-medium">
            {module.levels} {module.levels === 1 ? 'Lesson' : 'Lessons'}
          </span>
        </div>
      </div>
      
      {/* Content area */}
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-sm text-[#4E5964] line-clamp-4 flex-grow">
          {module.storyline.text}
        </p>
        
        <div className="mt-5 flex justify-end">
          <Link href={`/module/${moduleId}`} className="group-hover:translate-x-0.5 transition-transform">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm border-[#D1D5DB] text-[#2A6B70] hover:bg-[#E6F2F2] hover:text-[#235458] hover:border-[#68A4A1]"
            >
              <span>Begin Module</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 