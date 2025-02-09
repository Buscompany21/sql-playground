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
    <div className="flex flex-col h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-4 space-y-4">
      <Card className="flex-1 border-4 border-pink-200 shadow-lg overflow-hidden bg-white bg-opacity-80 backdrop-blur-sm">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-purple-600 flex items-center">
              <Sparkles className="mr-2 text-pink-500" />
              Magical SQL Spellbook
            </h2>
            <span className="text-lg font-semibold text-indigo-600">
              {levelData?.title || 'Loading...'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
            <div className="flex flex-col">
              <div className="flex-grow overflow-hidden rounded-lg shadow-inner">
                <CodeMirror
                  value={sqlCode}
                  height="100%"
                  theme={vscodeDark}
                  extensions={[sql()]}
                  onChange={(value) => setSqlCode(value)}
                  className="h-full overflow-auto rounded-lg"
                />
              </div>
              <Button
                className="mt-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-200 w-full overflow-hidden hover:shadow-xl"
                onClick={handleExecute}>
                Cast Your Spell! 🧙‍♀️✨
              </Button>
              <div
                className={`mt-2 bg-purple-100 rounded-lg border-2 border-purple-200 overflow-hidden transition-all duration-300 ease-in-out ${
                  isMessageExpanded ? 'max-h-[300px]' : 'max-h-12'
                }`}>
                <div className="p-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2 text-purple-600" />
                      <span className="font-semibold text-purple-600">Enchanted Message:</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleMessageBox}
                      className="p-1 hover:bg-purple-200 text-purple-600"
                      aria-label={isMessageExpanded ? "Collapse message" : "Expand message"}>
                      {isMessageExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                  <div
                    ref={messageRef}
                    className={`overflow-auto transition-all duration-300 ease-in-out ${isMessageExpanded ? 'max-h-[250px]' : 'max-h-0'}`}>
                    <p className="text-sm text-purple-800 whitespace-pre-line">{taskMessage}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-pink-50 rounded-lg p-4 overflow-auto border-2 border-pink-200 shadow-inner">
              <h3 className="text-lg font-semibold text-purple-600 mb-2 flex items-center">
                <Wand2 className="mr-2 text-pink-500" />
                Magical Results ✨
              </h3>
              <QueryResultsTable results={queryResults} error={sqlError} />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full p-4 bg-white bg-opacity-80 backdrop-blur-sm border-4 border-indigo-200 shadow-lg">
        <div className="flex justify-between items-center">
          {levelIdNum > 1 ? (
            <Link 
              href={`/module/${moduleIdNum}/${levelIdNum - 1}`}
              className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition duration-200 hover:scale-105 text-sm flex items-center"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Previous
            </Link>
          ) : (
            <div className="w-24"></div>
          )}
          
          <Progress
            value={((levelIdNum - 1) / 9) * 100}
            className="w-1/3 h-2 bg-pink-200"
            indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500"
          />
          
          {levelIdNum < 9 ? (
            <Link 
              href={`/module/${moduleIdNum}/${levelIdNum + 1}`}
              className="bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition duration-200 hover:scale-105 text-sm flex items-center"
            >
              Next
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          ) : (
            <div className="w-24"></div>
          )}
        </div>
      </Card>
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