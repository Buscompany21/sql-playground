import Link from 'next/link';
import { moduleConfig } from '../config/moduleConfig';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf8ff]">
      <main className="container mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-3 mb-20">
            <h1 className="text-4xl font-bold text-[#2d1576]">
              SQL Learning Path
            </h1>
            <p className="text-lg text-[#7c3aed]">
              Master database queries through guided exercises
            </p>
          </div>

          <div className="space-y-4">
            {Object.entries(moduleConfig).map(([id, module]) => (
              <Link 
                key={id}
                href={`/module/${id}/1`}
                className="block group"
              >
                <div className="p-8 rounded-2xl bg-white/50 hover:bg-white/80 border border-purple-100 
                              transition-all duration-300 hover:border-purple-200 
                              hover:shadow-[0_0_50px_rgba(124,58,237,0.1)] 
                              hover:-translate-y-0.5">
                  <div className="flex items-start justify-between gap-8">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3 text-[#7c3aed]">
                        <span className="font-medium">Module {id}</span>
                        <span>·</span>
                        <span>{module.levels} Levels</span>
                      </div>
                      
                      <div>
                        <h2 className="text-2xl font-semibold text-[#2d1576] mb-2 
                                     group-hover:text-[#3a1b8c] transition-colors">
                          {module.title}
                        </h2>
                        <p className="text-[#7c3aed] leading-relaxed">
                          {module.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-[#7c3aed] opacity-60 group-hover:opacity-100 
                                  group-hover:translate-x-1 transition-all pt-1">
                      →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center text-[#7c3aed]">
            {Object.values(moduleConfig).reduce((acc, module) => acc + module.levels, 0)} total lessons
          </div>
        </div>
      </main>
    </div>
  );
}
