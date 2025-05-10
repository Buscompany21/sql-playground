import Link from 'next/link';
import { moduleConfig, curriculumStoryline } from '../config/moduleConfig';
import { ModuleStorylinePreview } from '../components/ModuleStoryline';
import { AppLayout } from '../components/AppLayout';
import { Button } from '../components/ui/button';
import { ArrowRight, Code, Database, Star } from 'lucide-react';

export default function Home() {
  return (
    <AppLayout fullWidth={true}>
      {/* Hero Section */}
      <section className="bg-[#2A6B70] text-white">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
              {curriculumStoryline.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Master SQL through a compelling storyline at Stellar Sound Records. Learn database skills while helping a music label make data-driven decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-[#5B8A9D] hover:bg-[#4A7688] text-white px-8"
                asChild
              >
                <Link href="/modules/1">Start Learning</Link>
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Introduction Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#E9F1F5] border border-[#D1D5DB] rounded-lg p-6 md:p-8 mb-12">
              <h2 className="text-2xl font-bold text-[#2E3A45] mb-4">Your SQL Journey Begins</h2>
              <p className="text-[#4E5964] leading-relaxed">
                {curriculumStoryline.introduction}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white rounded-lg border border-[#D1D5DB] p-6 text-center">
                <div className="w-12 h-12 bg-[#E6F2F2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="h-6 w-6 text-[#2A6B70]" />
                </div>
                <h3 className="text-lg font-semibold text-[#2E3A45] mb-2">Learn SQL</h3>
                <p className="text-[#4E5964] text-sm">Master database queries through hands-on exercises</p>
              </div>
              
              <div className="bg-white rounded-lg border border-[#D1D5DB] p-6 text-center">
                <div className="w-12 h-12 bg-[#E6F2F2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="h-6 w-6 text-[#2A6B70]" />
                </div>
                <h3 className="text-lg font-semibold text-[#2E3A45] mb-2">Analyze Data</h3>
                <p className="text-[#4E5964] text-sm">Extract valuable insights from music industry data</p>
              </div>
              
              <div className="bg-white rounded-lg border border-[#D1D5DB] p-6 text-center">
                <div className="w-12 h-12 bg-[#E6F2F2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-[#2A6B70]" />
                </div>
                <h3 className="text-lg font-semibold text-[#2E3A45] mb-2">Build Skills</h3>
                <p className="text-[#4E5964] text-sm">Develop real-world database expertise through a story</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Modules Section */}
      <section className="bg-[#f8fafa] py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#2E3A45] mb-4">Your Learning Journey</h2>
              <p className="text-[#4E5964] max-w-2xl mx-auto">
                Follow a structured path to master SQL, from basic queries to complex data analysis
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {Object.entries(moduleConfig).map(([id, module]) => (
                <div key={id} className="flex flex-col h-full">
                  <ModuleStorylinePreview moduleId={id} />
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <div className="inline-flex items-center bg-[#E9F1F5] px-5 py-2 rounded-full text-[#5B8A9D] font-medium">
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
