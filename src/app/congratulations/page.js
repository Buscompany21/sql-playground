import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { AppLayout } from '../../components/AppLayout'
import { Button } from '../../components/ui/button'

export default function CongratulationsPage() {
  return (
    <AppLayout>
      <div className="w-full max-w-6xl mx-auto pt-8 pb-12 px-4">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
          <div className="relative w-full aspect-[4/3] max-h-[min(56vh,520px)] bg-[#E6F2F2]">
            <Image
              src="/images/storyline/Congratulations.png"
              alt="Celebration illustration for completing the SQL curriculum"
              fill
              className="object-contain object-center p-4 sm:p-6"
              priority
              sizes="(max-width: 768px) 100vw, 1152px"
            />
          </div>

          <div className="px-6 sm:px-10 py-8 sm:py-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2A6B70] mb-2">
              Stellar Sound Records
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2E3A45] mb-3">
              Congratulations — you are a data superstar
            </h1>
            <p className="text-[#4E5964] leading-relaxed mb-4">
            You did it — you’ve officially become a Stellar Sound Data Superstar! Along the way, 
            you learned how to explore data, filter songs, sort results, group information, connect 
            tables with JOINs, and build smart categories with CASE statements. Those are real SQL 
            skills used by analysts, engineers, and data teams every day to answer questions and make 
            decisions.
            </p>
            <p className="text-[#4E5964] leading-relaxed mb-8">
            Over these modules, you worked with music charts, artist reports, playlists, labels, and 
            streaming data just like a real data analyst would. What started with simple SELECT statements 
            turned into building full reports and solving multi-step problems. Every query you wrote helped 
            strengthen the same problem-solving skills professionals use with real company data.
            </p>

            <div className="rounded-xl border border-[#68A4A1]/40 bg-[#F8FAFA] p-5 sm:p-6 text-left mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-[#2A6B70] shrink-0" aria-hidden />
                <h2 className="text-lg font-semibold text-[#2E3A45]">
                  Introducing the AI Music Trend Challenge
                </h2>
              </div>
              <p className="text-sm text-[#4E5964] leading-relaxed">
              Now it’s time for the AI Challenge! In this next activity, you’ll use AI as your teammate 
              to explore the data, ask your own questions, and build custom SQL queries. There won’t always 
              be one “correct” answer — this is your chance to experiment, get creative, and think like a 
              real analyst.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
              <Button size="lg" className="bg-[#2A6B70] hover:bg-[#235458] text-white" asChild>
                <Link href="/ai-music-trend-challenge/">
                  Start the AI challenge
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-300" asChild>
                <Link href="/">Back to home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
