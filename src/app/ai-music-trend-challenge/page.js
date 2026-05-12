'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Download,
  MessageCircle,
  Palette,
  Sparkles,
  Telescope,
} from 'lucide-react'
import { AppLayout } from '../../components/AppLayout'
import { Button } from '../../components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'

const CSV_PATH = '/data/tiktok_music_trends_2026_synthetic.csv'

const promptTips = [
  'Give context — explain where the data came from and what you are trying to figure out',
  'Be specific — mention exact column names, rows, dates, or categories you want analyzed',
  'Explain how you want the answer shown — bullets, charts, summaries, tables, or step-by-step explanations',
  'Add details — tell AI exactly which columns, comparisons, filters, or trends to analyze',
  'Ask follow up questions — ask AI to explain the results in more detail or find specific examples',
]

const promptExamples = [
  {
    topic: 'Cooking',
    fuzzy: 'Make a recipe.',
    clearer:
      'Make a 30-minute dinner recipe for 2 people using the chicken, rice, and broccoli I have in my fridge. Keep it kid-friendly and list ingredients with measurements.',
  },
  {
    topic: 'Travel',
    fuzzy: 'Plan a trip.',
    clearer:
      'Plan a 3-day weekend trip to Chicago in October for two adults who love food and museums. Budget is $600 total, and we want to walk or take transit.',
  },
  {
    topic: 'Writing',
    fuzzy: 'Write an email.',
    clearer:
      'Write a short, polite email to my landlord asking when the broken dishwasher will be fixed. Keep it under 5 sentences and ask for a specific date.',
  },
]

const missions = [
  {
    n: 1,
    title: 'Get to know the data',
    body: 'Open the CSV and ask AI to explain what is inside. Some of the column names may look confusing at first, and that is okay. AI can describe each one in simple words so you know what you are looking at.',
    icon: Telescope,
  },
  {
    n: 2,
    title: 'Look for patterns',
    body: 'Now that you know what each column means, ask AI to find patterns across the file — for example: Which genres get the most views? Which moods appear most often? Which regions perform best? Ask for small subsets of data or a few examples so the results are easy to read.',
    icon: Sparkles,
  },
  {
    n: 3,
    title: 'Explore two patterns',
    body: 'From the patterns you just found, pick the two that interest you the most. Ask AI a few follow-up questions about each one — for example: How strong is this pattern? Are there songs that do not fit? What might explain it? Keep asking until you can describe each pattern in your own words.',
    icon: MessageCircle,
  },
  {
    n: 4,
    title: 'Build one chart',
    body: 'From the two patterns you just explored, pick the one you find most interesting. Ask AI to create a chart or data visualization that shows the pattern. Have it include titles, labels, and a short caption that explains the chart in one sentence.',
    icon: BarChart3,
  },
]

function StepBadge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#E6F2F2] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2A6B70]">
      {children}
    </span>
  )
}

export default function AiMusicTrendChallengePage() {
  return (
    <AppLayout fullWidth>
      <div className="pt-16 sm:pt-[4.5rem]">
        {/* Hero — Stellar Sound storyline */}
        <section className="bg-gradient-to-b from-[#235458] to-[#2A6B70] text-white">
          <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/#ai-music-challenge"
                className="inline-flex items-center gap-2 text-sm text-white/85 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/90 border border-white/20">
                    <Sparkles className="h-3.5 w-3.5" />
                    Stellar Sound Records
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-sm mb-4">
                  AI Music Trend Challenge
                </h1>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
                Stellar Sound Records is launching a brand-new TikTok music channel. Your job is to act like a music data analyst and figure out which songs should be featured in the first 3 viral videos.
                <br></br>
                You found a CSV file filled with music trend data. Use AI to analyze the data, discover patterns, and help the team pick the best tracks. 
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    className="bg-[#5B8A9D] hover:bg-[#4A7688] text-white shadow-lg"
                    asChild
                  >
                    <a href={CSV_PATH} download>
                      <Download className="h-5 w-5" />
                      Download CSV
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                    asChild
                  >
                    <a href="#step-1">
                      See steps
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Step 1 — Download (same idea as before, simpler copy) */}
        <section id="step-1" className="bg-[#f8fafa] py-12 md:py-14 scroll-mt-24 border-b border-slate-200/80">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <StepBadge>Step 1</StepBadge>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2E3A45] mt-3 mb-3">
                Download the data
              </h2>
              <p className="text-[#4E5964] leading-relaxed mb-6">
                Download the CSV and upload it to an AI tool like ChatGPT, Claude, or Gemini.
              </p>
              <Button size="lg" asChild>
                <a href={CSV_PATH} download>
                  <Download className="h-5 w-5" />
                  Download CSV
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Step 2 — How to write good prompts */}
        <section id="step-2" className="bg-white py-12 md:py-14 border-b border-slate-200/80 scroll-mt-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <StepBadge>Step 2</StepBadge>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2E3A45] mt-3 mb-3">
                Good prompts
              </h2>
              <p className="text-[#4E5964] leading-relaxed mb-6">
                Aim for AI to do about 90% of the work. Small, clear prompts work better than one
                huge vague ask. Use the checklist below to write good prompts.
              </p>
              <Card className="border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-[#2E3A45]">Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-[#4E5964] leading-relaxed">
                    {promptTips.map((tip) => (
                      <li key={tip} className="flex gap-3">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2A6B70]"
                          aria-hidden
                        />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="mt-8">
                <h3 className="text-lg md:text-xl font-semibold text-[#2E3A45] mb-2">
                  Examples
                </h3>
                <p className="text-sm text-[#4E5964] mb-4">
                  Compare a vague prompt to a clearer one. The clearer version gives AI context,
                  details, and a format to follow.
                </p>
                <div className="space-y-4">
                  {promptExamples.map((ex) => (
                    <div
                      key={ex.topic}
                      className="rounded-lg border border-slate-200 bg-white p-4 md:p-5"
                    >
                      <p className="text-xs font-bold uppercase tracking-wide text-[#2A6B70] mb-3">
                        {ex.topic}
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-md border border-amber-200/90 bg-amber-50/90 p-3 text-sm">
                          <p className="text-xs font-bold uppercase tracking-wide text-amber-800 mb-2">
                            Avoid (too vague)
                          </p>
                          <p className="text-[#4E5964]">{ex.fuzzy}</p>
                        </div>
                        <div className="rounded-md border border-[#68A4A1]/50 bg-[#E6F2F2]/70 p-3 text-sm">
                          <p className="text-xs font-bold uppercase tracking-wide text-[#235458] mb-2">
                            Try (clearer)
                          </p>
                          <p className="text-[#4E5964]">{ex.clearer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 3 — Four missions */}
        <section id="step-3" className="bg-[#f8fafa] py-12 md:py-14 scroll-mt-24 border-b border-slate-200/80">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <StepBadge>Step 3</StepBadge>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2E3A45] mt-3 mb-3">
                Find and explore patterns
              </h2>
              <p className="text-[#4E5964] leading-relaxed mb-8">
                Now it is time to use what you learned about good prompts on real Stellar Sound
                data. Work through these four steps in order. AI will do most of the analysis, and
                you guide it with clear questions. By the end, you will have explored the file,
                found patterns that stand out, and built one chart to share with the team.
              </p>
              <div className="space-y-4">
                {missions.map((m, idx) => {
                  const Icon = m.icon
                  return (
                    <motion.div
                      key={m.n}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-24px' }}
                      transition={{ duration: 0.22, delay: idx * 0.05 }}
                    >
                      <Card className="border-slate-200 shadow-sm overflow-hidden">
                        <div className="flex flex-row items-start gap-4 p-5 md:p-6">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2A6B70] text-white font-bold text-lg">
                            {m.n}
                          </div>
                          <div className="min-w-0 flex-1 pt-0.5">
                            <div className="flex items-center gap-2 mb-2">
                              <Icon className="h-5 w-5 text-[#2A6B70] shrink-0" aria-hidden />
                              <h3 className="text-lg md:text-xl font-semibold text-[#2E3A45] leading-snug">
                                {m.title}
                              </h3>
                            </div>
                            <p className="text-sm text-[#4E5964] leading-relaxed">{m.body}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Step 4 — Final deliverable */}
        <section id="step-4" className="bg-gradient-to-br from-[#235458]/95 to-[#2A6B70] text-white py-12 md:py-16 scroll-mt-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white border border-white/25">
                Step 4
              </span>
              <div className="flex items-start gap-3 mt-4 mb-6">
                <div className="bg-white/15 p-2 rounded-full border border-white/20 shrink-0">
                  <Palette className="h-6 w-6 text-white" aria-hidden />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Build the launch poster
                  </h2>
                  <p className="text-white/88 mt-2 leading-relaxed">
                    Create the final campaign pitch the Stellar Sound executives will review before launch. You will do this with two prompts: first
                    ask AI to recommend the songs, then ask AI to design the poster.
                  </p>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="rounded-lg border border-white/20 bg-white/10 p-4 md:p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-white/85 mb-2">
                    Prompt 1 — Recommend the songs
                  </p>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed">
                    Ask AI to look back at the patterns and trends from your earlier conversations
                    and recommend 3 songs for the first week of videos. Have it explain in one
                    short sentence why each song fits the patterns you found.
                  </p>
                </div>
                <div className="rounded-lg border border-white/20 bg-white/10 p-4 md:p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-white/85 mb-2">
                    Prompt 2 — Design the poster
                  </p>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed mb-3">
                    Ask AI to create a poster that features those 3 songs. Be clear about both
                    what it should include and how it should look.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-white/85 marker:text-white/50 text-sm md:text-base">
                    <li>
                      <span className="font-semibold text-white">Include:</span> a clear title, the
                      channel name, and a short line of context for each song
                    </li>
                    <li>
                      <span className="font-semibold text-white">Design:</span> tell AI the mood,
                      color palette, fonts, and layout style you want
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-white/90 text-sm md:text-base mb-10">
                <span className="font-semibold text-white">Your final output:</span> one finished
                launch poster you can share with the Stellar Sound team.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-white text-[#235458] hover:bg-white/90" asChild>
                  <Link href="/module/1">
                    SQL lessons
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/50 bg-transparent text-white hover:bg-white/15 hover:text-white"
                  asChild
                >
                  <Link href="/">Home</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
