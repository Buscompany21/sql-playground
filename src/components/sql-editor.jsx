"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Progress } from "./ui/progress"
import CodeMirror from '@uiw/react-codemirror'
import { sql } from '@codemirror/lang-sql'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { ScrollArea } from "./ui/scroll-area"
import {
  Wand2,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import confetti from 'canvas-confetti'
import Link from 'next/link'
import { getModuleLevels } from '../config/modules'
import { ModuleHomeButton } from './ModuleHomeButton'
import { NavBar } from './NavBar'

export function SqlEditor({ moduleId, levelId }) {
  // Convert moduleId and levelId to numbers
  const moduleIdNum = parseInt(moduleId)
  const levelIdNum = parseInt(levelId)

  // State variables
  const [sqlCode, setSqlCode] = useState('')
  const [queryResults, setQueryResults] = useState([])
  const [sqlError, setSqlError] = useState(null)
  const [taskMessage, setTaskMessage] = useState('')
  const [isMessageExpanded, setIsMessageExpanded] = useState(true)
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false)
  const messageRef = useRef(null)

  // Fetch level data based on moduleId and levelId
  const [levelData, setLevelData] = useState(null)
  const sqlSpellApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/sqlspell`
  const levelsApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/leveldata`

  useEffect(() => {
    const fetchLevelData = async () => {
      const moduleLevelID = `${moduleIdNum}${levelIdNum}`
  
      try {
        const response = await fetch(levelsApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ moduleLevelID }),
        })
  
        const data = await response.json()
  
        if (response.ok) {
          setLevelData(data)
          setSqlCode(data.initialCode)
          setTaskMessage(`Welcome to ${data.title}! ${data.task}`)
        } else {
          setTaskMessage(`Error: ${data.error || 'Failed to fetch level data.'}`)
        }
      } catch (error) {
        console.error('Error fetching level data:', error)
        setTaskMessage(`Error fetching level data: ${error.message}`)
      }
    }
  
    fetchLevelData()
  }, [moduleIdNum, levelIdNum, levelsApiUrl])

  const handleExecute = async () => {
    setSqlError(null)  // Clear any previous errors
  
    try {
      const payload = {
        moduleId: moduleIdNum,
        levelId: levelIdNum,
        sqlCode,
      }
  
      const response = await fetch(sqlSpellApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
  
      const responseData = await response.json()
      const result = responseData.body ? JSON.parse(responseData.body) : responseData
  
      if (result.error) {
        // SQL error occurred
        setSqlError(result.error)
        setQueryResults([])
      } else {
        // Successful query
        const { output, passed, message } = result
        setQueryResults(output)
        
        if (passed) {
          // Only update the task message if the query is correct
          setTaskMessage(message || 'You passed the level! 🎉')
          setIsCelebrationOpen(true)
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })
        }
        // If not passed, keep showing the original task message
      }
    } catch (error) {
      console.error('Error executing query:', error)
      setSqlError(`Error executing query: ${error.message}`)
      setQueryResults([])
    }
  }

  const handleNavigation = (direction) => {
    if (direction === 'back') {
      const prevLevelId = levelIdNum - 1
      if (prevLevelId > 0) {
        window.location.href = `/module/${moduleIdNum}/${prevLevelId}`
      }
    } else if (direction === 'next') {
      const nextLevelId = levelIdNum + 1
      window.location.href = `/module/${moduleIdNum}/${nextLevelId}`
    }
  }

  const toggleMessageBox = () => {
    setIsMessageExpanded(prev => !prev)
  }

  const QueryResultsTable = ({ results, error }) => {
    if (error) {
      return (
        <div className="flex items-center justify-center h-32 text-center p-4">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded w-full">
            <p className="font-medium">SQL Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      )
    }

    if (!results || results.length === 0) {
      return (
        <div className="text-center p-4 text-purple-600">
          No results to display yet. Cast your SQL spell! ✨
        </div>
      )
    }

    const columns = Object.keys(results[0])

    return (
      <ScrollArea className="h-[calc(100vh-400px)] rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-purple-100 hover:bg-purple-100">
              {columns.map((column) => (
                <TableHead 
                  key={column}
                  className="text-purple-900 font-semibold"
                >
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((row, rowIndex) => (
              <TableRow 
                key={rowIndex}
                className="hover:bg-pink-100 transition-colors"
              >
                {columns.map((column) => (
                  <TableCell 
                    key={`${rowIndex}-${column}`}
                    className="text-purple-800"
                  >
                    {row[column]?.toString() ?? 'NULL'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-2 p-2 text-sm text-purple-600">
          {results.length} {results.length === 1 ? 'row' : 'rows'} returned
        </div>
      </ScrollArea>
    )
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      {/* Top Navigation - Slim and Elegant */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-md">
        <div className="container mx-auto py-2 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <ModuleHomeButton />
              <div className="px-3 py-1 bg-purple-100/80 rounded-full">
                <span className="text-sm font-bold text-purple-700">
                  Module {moduleIdNum} • Level {levelIdNum}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 w-1/3">
              <Progress
                value={((levelIdNum - 1) / (getModuleLevels(moduleIdNum.toString()) - 1)) * 100}
                className="h-1.5 bg-pink-200/50"
                indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Maximized Space */}
      <main className="flex-1 container mx-auto p-4 flex flex-col overflow-hidden">
        <Card className="flex-1 border-2 border-white/20 shadow-xl overflow-hidden bg-white/90 backdrop-blur-sm">
          <CardContent className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold text-purple-600 flex items-center">
                <Sparkles className="mr-2 text-pink-500 h-5 w-5" />
                Magical SQL Spellbook
              </h2>
              <span className="text-sm font-semibold text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full">
                {levelData?.title || 'Loading...'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
              <div className="flex flex-col gap-3">
                <div className="flex-1 overflow-hidden rounded-lg shadow-inner bg-gray-900 min-h-0">
                  <CodeMirror
                    value={sqlCode}
                    height="100%"
                    theme={vscodeDark}
                    extensions={[sql()]}
                    onChange={(value) => setSqlCode(value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  {isMessageExpanded ? (
                    <div 
                      className="bg-purple-50 rounded-xl p-3 shadow-inner border border-purple-100 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-purple-500" />
                          <span className="font-medium text-purple-700">Enchanted Message</span>
                        </div>
                        <button 
                          onClick={toggleMessageBox}
                          className="text-purple-500 hover:text-purple-700 transition-colors"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-purple-600 text-sm">
                        {taskMessage}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={toggleMessageBox}
                      className="flex items-center gap-2 text-purple-500 hover:text-purple-700 transition-colors text-sm font-medium px-2"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Show Instructions
                    </button>
                  )}
                  <Button
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-2 px-6 rounded-full shadow-lg transition duration-200 flex-shrink-0 w-full"
                    onClick={handleExecute}
                  >
                    Cast Your Spell! 🧙‍♀️✨
                  </Button>
                </div>
              </div>
              <QueryResultsTable results={queryResults} error={sqlError} />
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation - Floating Style */}
      <div className="container mx-auto px-4 pb-4">
        <div className="flex justify-between">
          {levelIdNum > 1 ? (
            <Link 
              href={`/module/${moduleIdNum}/${levelIdNum - 1}`}
              className="bg-white/90 hover:bg-white/95 text-purple-600 font-medium py-2 px-4 rounded-full shadow-lg transition duration-200 text-sm flex items-center backdrop-blur-sm"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Previous
            </Link>
          ) : moduleIdNum > 1 ? (
            <Link 
              href={`/module/${moduleIdNum - 1}/1`}
              className="bg-white/90 hover:bg-white/95 text-purple-600 font-medium py-2 px-4 rounded-full shadow-lg transition duration-200 text-sm flex items-center backdrop-blur-sm"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Previous Module
            </Link>
          ) : <div />}
          
          {levelIdNum < getModuleLevels(moduleIdNum.toString()) ? (
            <Link 
              href={`/module/${moduleIdNum}/${levelIdNum + 1}`}
              className="bg-white/90 hover:bg-white/95 text-purple-600 font-medium py-2 px-4 rounded-full shadow-lg transition duration-200 text-sm flex items-center backdrop-blur-sm"
            >
              Next
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          ) : moduleIdNum < 10 ? (
            <Link 
              href={`/module/${moduleIdNum + 1}/1`}
              className="bg-white/90 hover:bg-white/95 text-purple-600 font-medium py-2 px-4 rounded-full shadow-lg transition duration-200 text-sm flex items-center backdrop-blur-sm"
            >
              Next Module
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          ) : <div />}
        </div>
      </div>
      <Dialog open={isCelebrationOpen} onOpenChange={setIsCelebrationOpen}>
        <DialogContent className="bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 border-4 border-purple-300">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-purple-700">
              Magical Success! 🎉✨
            </DialogTitle>
            <DialogDescription className="text-lg text-purple-600">
              You&apos;ve cast the perfect SQL spell! Your magical coding skills are truly enchanting!
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 text-center">
            <p className="text-purple-700 mb-4">Ready to tackle the next magical challenge?</p>
            <Button
              onClick={() => setIsCelebrationOpen(false)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-200">
              Continue Spellcasting
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}