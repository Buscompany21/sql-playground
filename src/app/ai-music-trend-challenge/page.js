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
  'Include lots of detail — clearly describe exactly what you want the AI to look for or compare',
]

const missions = [
  {
    n: 1,
    title: 'What is in the file?',
    body: 'Use AI to read the CSV and explain each column. Ask again if you need simpler words. You only check that the list matches the file header.',
    icon: Telescope,
    example: {
      tipHeading: 'Prompt tip: ask AI to map the columns',
      fuzzy: 'Deal with this.',
      clearer:
        'You work at Stellar Sound on a TikTok music launch. With the uploaded music trends CSV, list every column name. Under each name, add one short line: what it measures.',
    },
  },
  {
    n: 2,
    title: 'Find patterns',
    body: 'Ask AI to scan the sheet for patterns (genre, mood_tag, region_top, peak_views_millions, etc.). Ask for tables or top lists. You only spot-check a few rows if you want.',
    icon: Sparkles,
    example: {
      tipHeading: 'Prompt tip: tell AI which columns to use',
      fuzzy: 'What is trending?',
      clearer:
        'Using only the music trends CSV, look at genre and mood_tag. Which pair appears most? Give two sound_id values and list the columns you used.',
    },
  },
  {
    n: 3,
    title: 'Compare and explain',
    body: 'Ask AI to pick two tracks and compare two metrics (example: peak_views_millions and avg_watch_pct). Ask follow-ups until the story is clear. You mainly fix prompts, not rows.',
    icon: MessageCircle,
    example: {
      tipHeading: 'Prompt tip: ask AI to compare two tracks',
      fuzzy: 'Which songs are the best?',
      clearer:
        'Using only the music trends CSV, pick two tracks with different peak_views_millions. Compare them using avg_watch_pct. Summarize one idea the numbers support. Use only the file.',
    },
  },
  {
    n: 4,
    title: 'Make a chart',
    body: 'Ask AI to plan or build one chart from your idea (axes, filters, labels). If the tool can draw it, use that. Add one or two sentences the AI can draft: what the chart shows for the TikTok channel.',
    icon: BarChart3,
    example: {
      tipHeading: 'Prompt tip: ask AI to plan the chart first',
      fuzzy: 'Make a graph.',
      clearer:
        'With the music trends CSV, suggest one chart for a Stellar Sound TikTok report: name each axis with real column names, one filter (example: genre or region_top), and one sentence about what we should learn.',
    },
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
                  Stellar Sound Records is creating a TikTok channel and you are in charge of finding the best songs for the first 3 videos. You found a CSV file that contains the data you need to find the best songs.
                  Use AI to analyze the data and find the best songs. 
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
                Download the CSV and upload it to an AI tool. You will use this dataset for every step.
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
            </div>
          </div>
        </section>

        {/* Step 3 — Four missions */}
        <section id="step-3" className="bg-[#f8fafa] py-12 md:py-14 scroll-mt-24 border-b border-slate-200/80">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <StepBadge>Step 3</StepBadge>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2E3A45] mt-3 mb-3">
                Four steps
              </h2>
              <p className="text-[#4E5964] leading-relaxed mb-8">
                Do these four steps in order. For each step, let AI do the heavy work; you write
                prompts, read the output, and ask again if needed. Keep answers you like for your
                launch graphic. Each card ends with example prompts about the same music trends CSV.
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
                        <div className="flex flex-row items-start gap-4 p-5 md:p-6 pb-4">
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
                        {m.example ? (
                          <div className="border-t border-slate-200 bg-[#f8fafa] px-5 py-4 md:px-6 md:py-5">
                            <p className="text-sm font-semibold text-[#2E3A45] mb-1">
                              {m.example.tipHeading}
                            </p>
                            <p className="text-xs text-[#4E5964] mb-3">
                              Same Stellar Sound TikTok music trends file as your challenge—rewrite
                              for your own next prompt.
                            </p>
                            <div className="grid gap-3 sm:grid-cols-2">
                              <div className="rounded-md border border-amber-200/90 bg-amber-50/90 p-3 text-sm">
                                <p className="text-xs font-bold uppercase tracking-wide text-amber-800 mb-2">
                                  Avoid (too vague)
                                </p>
                                <p className="text-[#4E5964]">{m.example.fuzzy}</p>
                              </div>
                              <div className="rounded-md border border-[#68A4A1]/50 bg-[#E6F2F2]/70 p-3 text-sm">
                                <p className="text-xs font-bold uppercase tracking-wide text-[#235458] mb-2">
                                  Try (clearer)
                                </p>
                                <p className="text-[#4E5964]">{m.example.clearer}</p>
                              </div>
                            </div>
                          </div>
                        ) : null}
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
              <div className="flex items-start gap-3 mt-4 mb-4">
                <div className="bg-white/15 p-2 rounded-full border border-white/20 shrink-0">
                  <Palette className="h-6 w-6 text-white" aria-hidden />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Launch graphic
                  </h2>
                  <p className="text-white/88 mt-2 leading-relaxed">
                    Make one image (poster or social post) for the new Stellar Sound TikTok channel.
                    You can ask AI to draft short lines, layout ideas, or color notes—then you build
                    the final graphic. Show your{' '}
                    <span className="font-semibold text-white">three songs</span> from the CSV with
                    the channel name and one line per song (from your AI-assisted analysis).
                  </p>
                </div>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-white/90 marker:text-white/50 text-sm md:text-base mb-10">
                <li>Channel name + one sentence: what is this channel?</li>
                <li>Three songs from the file + one reason each (from your data work)</li>
                <li>Colors and style that fit the mood you chose</li>
              </ul>
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
