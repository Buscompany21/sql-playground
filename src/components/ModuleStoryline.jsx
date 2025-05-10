'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "./ui/button"
import { ArrowRight, ChevronRight } from 'lucide-react'
import { moduleConfig, curriculumStoryline } from '../config/moduleConfig'

export function ModuleStoryline({ moduleId, onContinue }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const module = moduleConfig[moduleId]
  
  if (!module || !module.storyline) {
    return null
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Module Title Bar */}
        <div className="bg-[#2A6B70] px-6 py-4">
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">{curriculumStoryline.title}</h1>
              <div className="flex items-center text-white/80 mt-1 text-sm">
                <span>Module {moduleId}</span>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span>{module.title}</span>
              </div>
            </div>
            <div className="hidden md:flex items-center mt-2 md:mt-0">
              <div className="bg-[#68A4A1] text-white text-xs font-medium px-2.5 py-1 rounded">
                {module.levels} Lessons
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-0">
          {/* Module Content */}
          <div className="md:flex">
            {/* Left column - Image */}
            <div className="md:w-2/5 relative">
              <div className="relative aspect-video md:aspect-auto md:h-full">
                <div className={`absolute inset-0 bg-[#E6F2F2] animate-pulse ${isImageLoaded ? 'hidden' : 'block'}`} />
                <Image
                  src={module.storyline.image}
                  alt={`Module ${moduleId} storyline illustration`}
                  fill
                  className={`object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoadingComplete={() => setIsImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2A6B70]/40 to-transparent opacity-50 md:hidden" />
              </div>
            </div>
            
            {/* Right column - Storyline content */}
            <div className="md:w-3/5 p-6 md:p-8">
              {moduleId === '1' && (
                <div className="mb-6 p-4 bg-[#E9F1F5] rounded-lg border border-[#D1D5DB]">
                  <p className="text-[#2E3A45] text-sm">
                    {curriculumStoryline.introduction}
                  </p>
                </div>
              )}
              
              <h2 className="text-2xl font-bold text-[#2E3A45] mb-4">
                Your Adventure Begins
              </h2>
              
              <p className="text-[#4E5964] leading-relaxed mb-6">
                {module.storyline.text}
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <Link href="/" className="text-[#5B8A9D] hover:text-[#3A5E69] text-sm font-medium transition-colors">
                  ← Back to modules
                </Link>
                
                <Button 
                  onClick={onContinue}
                  className="bg-[#5B8A9D] hover:bg-[#4A7688] text-white py-2 px-6 rounded-md flex items-center gap-2 transition-colors"
                >
                  Start Learning
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
    <div className="group relative overflow-hidden rounded-lg border border-[#D1D5DB] bg-white shadow-sm hover:shadow-md transition-all h-full">
      <div className="relative h-32 w-full overflow-hidden">
        <Image
          src={module.storyline.image}
          alt={`Module ${moduleId} storyline preview`}
          fill
          className="object-cover transition-transform group-hover:scale-105 duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A6B70]/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-3">
          <div className="bg-[#68A4A1] text-white text-xs font-medium px-2 py-0.5 rounded">
            Module {moduleId}
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-[#2E3A45] text-lg mb-2">{module.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-[#4E5964]">
          {module.storyline.text}
        </p>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-xs font-medium text-[#6E7780]">
            {module.levels} Lessons
          </div>
          
          <Link href={`/module/${moduleId}`} className="group-hover:translate-x-0.5 transition-transform">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs border-[#D1D5DB] text-[#5B8A9D] hover:bg-[#E9F1F5] hover:text-[#3A5E69] hover:border-[#5B8A9D]"
            >
              Begin Module
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 