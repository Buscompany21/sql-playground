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
          setTaskMessage(data.task)
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

  const maxLevels = getModuleLevels(moduleId.toString())

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      <NavBar moduleId={moduleId} levelId={levelId} levelData={levelData} />
      
      <main className="flex-1 container mx-auto px-6 py-4 flex flex-col overflow-hidden max-w-7xl">
        {/* Main Content Area */}
        <div className="flex-1 grid grid-cols-2 gap-6 overflow-hidden">
          {/* Left Column */}
          <div className="flex flex-col gap-4 overflow-hidden">
            {/* Task Card - Fixed Height */}
            <Card className="bg-white/70 shadow-sm border-purple-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={toggleMessageBox}>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-purple-500" />
                    <h3 className="font-semibold text-purple-900">Instructions</h3>
                  </div>
                  {isMessageExpanded ? <ChevronUp className="h-5 w-5 text-purple-500" /> : <ChevronDown className="h-5 w-5 text-purple-500" />}
                </div>
                <div className={`mt-3 text-purple-700 ${isMessageExpanded ? 'block' : 'hidden'}`}>
                  {taskMessage}
                </div>
              </CardContent>
            </Card>

            {/* Editor Area - Fills Remaining Space */}
            <div className="flex-1 flex flex-col min-h-0">
              <Card className="flex-1 border-purple-100 bg-[#1E1E1E] overflow-hidden">
                <div className="px-4 py-2 text-xs text-purple-300 border-b border-purple-800/20 bg-[#2D2D2D]">
                  Write your SQL spell here ✨
                </div>
                <div className="h-[calc(100%-2.5rem)] overflow-auto">
                  <CodeMirror
                    value={sqlCode}
                    theme={vscodeDark}
                    extensions={[sql()]}
                    onChange={(value) => setSqlCode(value)}
                    height="100%"
                    basicSetup={{
                      lineNumbers: true,
                      foldGutter: true,
                    }}
                  />
                </div>
              </Card>
              
              <Button 
                onClick={handleExecute}
                className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 text-lg shadow-md"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Cast Your Spell!
              </Button>
            </div>
          </div>

          {/* Right Column - Results */}
          <Card className="bg-white/70 shadow-sm border-purple-100 flex flex-col">
            <CardContent className="p-4 flex-1 flex flex-col min-h-0">
              <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                Magical Results
              </h3>
              <div className="flex-1 min-h-0">
                <QueryResultsTable results={queryResults} error={sqlError} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-4 pb-2">
          <Button
            variant="outline"
            onClick={() => handleNavigation('back')}
            disabled={levelIdNum <= 1}
            className="text-purple-600 border-purple-200 hover:bg-purple-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous Level
          </Button>
          
          <div className="w-96">
            <Progress
              value={((levelIdNum - 1) / (maxLevels - 1)) * 100}
              className="h-2 bg-violet-100"
              indicatorClassName="bg-gradient-to-r from-violet-500 to-fuchsia-500"
            />
          </div>

          <Button
            variant="outline"
            onClick={() => handleNavigation('next')}
            disabled={levelIdNum >= maxLevels}
            className="text-purple-600 border-purple-200 hover:bg-purple-50"
          >
            Next Level
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>
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