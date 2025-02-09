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
import Link from 'next/link'
import { getModuleLevels } from '../config/moduleConfig'
import { NavBar } from './NavBar'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [showSuccess, setShowSuccess] = useState(false)

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
          handleSuccess()
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
        window.location.href = `/module/${moduleIdNum}/${prevLevelId}/`
      }
    } else if (direction === 'next') {
      const nextLevelId = levelIdNum + 1
      window.location.href = `/module/${moduleIdNum}/${nextLevelId}/`
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
          No results to display. Execute a query to see results.
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

  const SuccessToast = ({ isVisible, onClose }) => {
    if (!isVisible) return null;
    
    return (
      <AnimatePresence>
        <div className="fixed inset-0 pointer-events-none z-50 flex items-start justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="mt-20 mx-4 pointer-events-auto"
          >
            <div 
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-violet-100 flex items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                >
                  <svg 
                    className="w-5 h-5 text-violet-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              </div>

              <div className="text-left">
                <h3 className="text-lg font-semibold text-violet-900">
                  Query Successful!
                </h3>
                <p className="text-sm text-violet-600">
                  Perfect execution!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  };

  const handleSuccess = () => {
    setShowSuccess(true);
  };

  useEffect(() => {
    if (showSuccess) {
      // Add click listener to document
      const handleClick = () => setShowSuccess(false);
      document.addEventListener('click', handleClick);
      
      // Auto-dismiss after 3 seconds
      const timer = setTimeout(() => setShowSuccess(false), 3000);

      // Cleanup
      return () => {
        document.removeEventListener('click', handleClick);
        clearTimeout(timer);
      };
    }
  }, [showSuccess]);

  return (
    <div className="relative">
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
                    SQL Editor
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
                  className="mt-4 w-full bg-violet-600 hover:bg-violet-700 text-white py-4 text-lg shadow-sm"
                >
                  Execute Query
                </Button>
              </div>
            </div>

            {/* Right Column - Results */}
            <Card className="bg-white/70 shadow-sm border-purple-100 flex flex-col">
              <CardContent className="p-4 flex-1 flex flex-col min-h-0">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">
                  Query Results
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
              variant="ghost"
              onClick={() => handleNavigation('back')}
              disabled={levelIdNum <= 1}
              className="text-violet-600 hover:bg-violet-50 hover:text-violet-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            <div className="w-64 flex items-center gap-1.5">
              {[...Array(maxLevels)].map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    index < levelIdNum 
                      ? 'bg-violet-600' 
                      : 'bg-violet-200 border border-violet-300'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              onClick={() => handleNavigation('next')}
              disabled={levelIdNum >= maxLevels}
              className="text-violet-600 hover:bg-violet-50 hover:text-violet-700"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </main>
        <SuccessToast 
          isVisible={showSuccess}
          onClose={() => setShowSuccess(false)}
        />
      </div>
    </div>
  )
}