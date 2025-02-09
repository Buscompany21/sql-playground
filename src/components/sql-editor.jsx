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
import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import {
  Wand2,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Maximize2,
  Minimize2,
  Loader2,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import Link from 'next/link'
import { getModuleLevels } from '../config/moduleConfig'
import { NavBar } from './NavBar'
import { motion, AnimatePresence } from 'framer-motion'

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
    <div className="absolute inset-0">
      <ScrollArea className="h-full rounded-md">
        <div className="min-w-max">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-purple-100">
              <TableRow className="hover:bg-purple-100">
                {columns.map((column) => (
                  <TableHead 
                    key={column}
                    className="text-purple-900 font-semibold whitespace-nowrap"
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
                      className="text-purple-800 whitespace-nowrap"
                    >
                      {row[column]?.toString() ?? 'NULL'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  )
}

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

export function SqlEditor({ moduleId, levelId }) {
  // Convert moduleId and levelId to numbers
  const moduleIdNum = parseInt(moduleId)
  const levelIdNum = parseInt(levelId)

  // Log to verify values
  console.log('moduleId:', moduleId)
  console.log('maxLevels:', getModuleLevels(moduleId.toString()))
  
  const maxLevels = getModuleLevels(moduleId.toString())

  // State variables
  const [sqlCode, setSqlCode] = useState('')
  const [queryResults, setQueryResults] = useState([])
  const [sqlError, setSqlError] = useState(null)
  const [taskMessage, setTaskMessage] = useState('Loading...')
  const [isMessageExpanded, setIsMessageExpanded] = useState(true)
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false)
  const messageRef = useRef(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isEditorExpanded, setIsEditorExpanded] = useState(false)
  const [instructionsHeight, setInstructionsHeight] = useState(() => {
    // Default height that matches our loading state layout
    return 56 + 16 + 24 // header + padding + min-height of content
  })
  const instructionsRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isExecuting, setIsExecuting] = useState(false)
  const [showHint, setShowHint] = useState(false)

  // Fetch level data based on moduleId and levelId
  const [levelData, setLevelData] = useState(null)
  const sqlSpellApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/sqlspell`
  const levelsApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/leveldata`

  // Calculate initial height after mount
  useEffect(() => {
    if (instructionsRef.current) {
      const newHeight = Math.max(instructionsRef.current.offsetHeight, 56)
      setInstructionsHeight(newHeight)
    }
  }, []) // Run once on mount

  // Update height when content or hint changes
  useEffect(() => {
    if (instructionsRef.current) {
      const newHeight = Math.max(instructionsRef.current.offsetHeight, 56)
      setInstructionsHeight(newHeight)
    }
  }, [isMessageExpanded, taskMessage, isLoading, showHint])

  // Fetch level data without affecting layout
  useEffect(() => {
    setIsLoading(true)
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
          setSqlCode(data.initialCode || '')
          setTaskMessage(data.task)
        } else {
          setTaskMessage(`Error: ${data.error || 'Failed to fetch level data.'}`)
        }
      } catch (error) {
        console.error('Error fetching level data:', error)
        setTaskMessage(`Error fetching level data: ${error.message}`)
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchLevelData()
  }, [moduleIdNum, levelIdNum, levelsApiUrl])

  const handleExecute = async () => {
    setIsExecuting(true)
    setIsEditorExpanded(false)
    setSqlError(null)
  
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
        setSqlError(result.error)
        setQueryResults([])
      } else {
        const { output, passed, message } = result
        setQueryResults(output)
        
        if (passed) {
          setTaskMessage(message || 'You passed the level! 🎉')
          setIsCelebrationOpen(true)
          handleSuccess()
        }
      }
    } catch (error) {
      console.error('Error executing query:', error)
      setSqlError(`Error executing query: ${error.message}`)
      setQueryResults([])
    } finally {
      setIsExecuting(false)
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

  const toggleEditor = () => setIsEditorExpanded(prev => !prev)

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
          <div className="flex-1 grid grid-cols-2 gap-6 relative">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              {/* Instructions */}
              <div ref={instructionsRef}>
                <Card className="bg-white/70 shadow-sm border-purple-100">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between cursor-pointer" onClick={toggleMessageBox}>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-purple-500" />
                        <h3 className="font-semibold text-purple-900">Instructions</h3>
                      </div>
                      {isMessageExpanded ? <ChevronUp className="h-5 w-5 text-purple-500" /> : <ChevronDown className="h-5 w-5 text-purple-500" />}
                    </div>
                    <div className={`mt-3 space-y-3 ${isMessageExpanded ? 'block' : 'hidden'}`}>
                      <p className="text-purple-700">{taskMessage}</p>
                      {!isLoading && levelData?.hintMessage && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowHint(!showHint);
                            }}
                            className="text-xs text-purple-400 hover:text-purple-500 transition-colors"
                          >
                            {showHint ? 'Hide hint' : 'Need a hint?'}
                          </button>
                          {showHint && (
                            <p className="text-sm text-purple-400 italic">
                              {levelData.hintMessage}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className={`${isEditorExpanded ? 'invisible' : 'visible'} z-0`}>
              <Card className="bg-white/70 shadow-sm border-purple-100 flex flex-col overflow-hidden h-full">
                <CardContent className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-purple-900">
                      Query Results
                    </h3>
                    {queryResults && queryResults.length > 0 && (
                      <span className="text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                        {queryResults.length} {queryResults.length === 1 ? 'row' : 'rows'} returned
                      </span>
                    )}
                  </div>
                  <div className="flex-1 relative">
                    <QueryResultsTable results={queryResults} error={sqlError} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Editor */}
            <motion.div 
              layout
              initial={false}
              className="absolute left-0 z-20"
              style={{
                width: isEditorExpanded ? '100%' : 'calc(50% - 12px)',
                height: `calc(100% - ${instructionsHeight + 16}px)`,
                top: instructionsHeight + 16,
              }}
              animate={{
                width: isEditorExpanded ? '100%' : 'calc(50% - 12px)',
                height: isEditorExpanded ? '100%' : `calc(100% - ${instructionsHeight + 16}px)`,
                top: isEditorExpanded ? 0 : instructionsHeight + 16,
                left: 0,
                scale: 1,
                transformOrigin: 'top left',
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
              }}
            >
              <motion.div 
                className="h-full flex flex-col"
                layout
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 1,
                }}
              >
                <Card className="flex-1 border-purple-100 bg-[#1E1E1E] overflow-hidden flex flex-col">
                  <div className="px-4 py-2 text-xs text-purple-300 border-b border-purple-800/20 bg-[#2D2D2D] flex justify-between items-center shrink-0">
                    <span>SQL Editor</span>
                    <button
                      onClick={toggleEditor}
                      className="p-1 hover:bg-purple-800/20 rounded transition-colors"
                    >
                      {isEditorExpanded ? (
                        <Minimize2 className="h-4 w-4 text-purple-300" />
                      ) : (
                        <Maximize2 className="h-4 w-4 text-purple-300" />
                      )}
                    </button>
                  </div>
                  <div className="flex-1 overflow-auto">
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
                  disabled={isExecuting}
                  className={`mt-4 w-full py-4 text-lg shadow-sm transition-all ${
                    isExecuting 
                      ? 'bg-violet-400 cursor-not-allowed' 
                      : 'bg-violet-600 hover:bg-violet-700'
                  } text-white`}
                >
                  {isExecuting ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Executing...
                    </div>
                  ) : (
                    'Execute Query'
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Navigation - Exact match to original */}
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
      </div>
      <SuccessToast isVisible={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  );
}