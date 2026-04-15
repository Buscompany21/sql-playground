'use client'

import Link from 'next/link';
import Image from 'next/image';
import { moduleConfig, curriculumStoryline } from '../config/moduleConfig';
import { ModuleStorylinePreview } from '../components/ModuleStoryline';
import { AppLayout } from '../components/AppLayout';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <AppLayout fullWidth={true}>
      {/* Hero Section with improved colors */}
      <section className="bg-gradient-to-b from-[#235458] to-[#2A6B70] text-white">
        <div className="container mx-auto px-4 md:px-6 py-14 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-5 text-white drop-shadow-sm">
              {curriculumStoryline.title}
            </h1>
            
            {/* Storyline Container */}
            <div className="bg-white/10 backdrop-blur-sm p-5 md:p-6 rounded-lg border border-white/20 shadow-lg mb-8 max-w-2xl md:max-w-4xl mx-auto">
              <div className="grid gap-5 md:gap-6 md:grid-cols-[1fr_minmax(0,42%)] md:items-stretch">
                <div className="min-w-0 flex flex-col text-left">
                  <h2 className="text-lg md:text-xl font-medium text-white mb-3 text-center md:text-left">
                    Your Story Begins
                  </h2>
                  <div className="space-y-3">
                    <p className="text-white/90 leading-relaxed">
                      <span className="font-bold text-white">You dream of becoming a famous singer</span>, and to get your foot in the door, you&apos;ve landed an internship at one of the world&apos;s top music labels: <span className="italic">Stellar Sound Records</span>.
                    </p>
                    <p className="text-white/90 leading-relaxed">
                      As a junior data analyst, you&apos;ll use SQL to explore hit songs, uncover trends, and help the label make decisions—all while secretly hoping your name ends up on this list one day.
                    </p>
                  </div>
                </div>
                <div className="relative mx-auto w-full max-w-[280px] aspect-[3/4] rounded-lg overflow-hidden border border-white/20 shadow-md md:mx-0 md:max-w-none md:aspect-auto md:min-h-0 md:min-w-0">
                  <Image
                    src="/images/storyline/Module1.png"
                    alt="Illustration for your journey at Stellar Sound Records"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 280px, 40vw"
                    priority
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button 
                size="lg"
                className="bg-[#5B8A9D] hover:bg-[#4A7688] text-white px-8 py-5 shadow-lg transition-all duration-200"
                asChild
              >
                <Link href="/module/1">
                  <span className="flex items-center gap-2">
                    Start Learning
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Modules Section with improved colors */}
      <section id="modules-section" className="bg-[#f8fafa] py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#2E3A45] mb-4">Your Learning Journey</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {Object.entries(moduleConfig).map(([id, module]) => (
                <div key={id} className="flex flex-col h-full">
                  <ModuleStorylinePreview moduleId={id} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
