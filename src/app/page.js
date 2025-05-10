'use client'

import Link from 'next/link';
import { moduleConfig, curriculumStoryline } from '../config/moduleConfig';
import { ModuleStorylinePreview } from '../components/ModuleStoryline';
import { AppLayout } from '../components/AppLayout';
import { Button } from '../components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function Home() {
  // Function to handle smooth scrolling to modules section
  const scrollToModules = () => {
    document.getElementById('modules-section').scrollIntoView({ behavior: 'smooth' });
  };

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
            <div className="bg-white/10 backdrop-blur-sm p-5 md:p-6 rounded-lg border border-white/20 shadow-lg mb-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-3">
                <h2 className="text-lg md:text-xl font-medium text-white">Your Story Begins</h2>
              </div>
              
              <div className="space-y-3 text-left">
                <p className="text-white/90 leading-relaxed">
                  <span className="font-bold text-white">You dream of becoming a famous singer</span>, and to get your foot in the door, you've landed an internship at one of the world's top music labels: <span className="italic">Stellar Sound Records</span>.
                </p>
                
                <p className="text-white/90 leading-relaxed">
                  As a junior data analyst, you'll use SQL to explore hit songs, uncover trends, and help the label make decisions—all while secretly hoping your name ends up on this list one day.
                </p>
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
            
            <div className="flex justify-center">
              <div className="inline-flex items-center bg-[#E9F1F5] px-6 py-3 rounded-full text-[#5B8A9D] font-medium shadow-sm">
                <span className="mr-2">{Object.values(moduleConfig).reduce((acc, module) => acc + module.levels, 0)} total lessons</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
