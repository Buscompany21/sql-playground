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
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Loader2,
  ArrowLeft,
  ArrowRight,
  Menu,
  BookOpen,
  PlayCircle,
  Monitor,
  Database,
  FileText,
  CheckCircle2,
  ChevronRight,
  ArrowLeftToLine,
  Home,
  HelpCircle,
  X,
  Circle,
  CircleDot,
} from 'lucide-react'
import Link from 'next/link'
import { getModuleLevels } from '../config/moduleConfig'
import { motion, AnimatePresence } from 'framer-motion'
import { moduleConfig } from '../config/moduleConfig'
import { cn } from '../lib/utils'

// Module navigation sidebar
const ModuleSidebar = ({ 
  isOpen, 
  onClose, 
  activeModuleId, 
  activeLevelId
}) => {
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-y-0 left-0 z-50 w-96 bg-white shadow-lg flex flex-col overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <Link href="/" className="flex items-center gap-2 text-[#2A6B70] font-medium">
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0 rounded-full hover:bg-[#E6F2F2]"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close Menu</span>
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium text-[#4E5964] mb-3">Select Module</h3>
          <div className="space-y-2.5">
            {Object.entries(moduleConfig).map(([id, module]) => (
              <ModuleNavigationItem
                key={id}
                moduleId={id}
                moduleData={module}
                activeModuleId={activeModuleId}
                activeLevelId={activeLevelId}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Individual module navigation item with expandable levels
const ModuleNavigationItem = ({ moduleId, moduleData, activeModuleId, activeLevelId }) => {
  const [isExpanded, setIsExpanded] = useState(moduleId === activeModuleId);
  const maxLevels = moduleData.levels || 0;
  const isActive = moduleId === activeModuleId;
  
  return (
    <div className="border rounded-md overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full px-3 py-2.5 flex items-center justify-between text-left transition-colors",
          isActive 
            ? "bg-[#E6F2F2] text-[#2A6B70]" 
            : "hover:bg-slate-50"
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-[#E6F2F2] text-[#2A6B70] text-xs font-medium">
            {moduleId}
          </div>
          <span className="font-medium text-sm truncate max-w-[200px]">
            {moduleData.title}
          </span>
        </div>
        <ChevronDown 
          className={cn(
            "h-4 w-4 flex-shrink-0 ml-2 transition-transform", 
            isExpanded ? "rotate-180" : ""
          )} 
        />
      </button>
      
      {isExpanded && (
        <div className="bg-slate-50 px-3 py-3 border-t">
          <div className="grid grid-cols-4 gap-2 mb-3">
            {[...Array(maxLevels)].map((_, index) => {
              const levelNumber = index + 1;
              const isActiveLvl = isActive && activeLevelId === levelNumber;
              
              return (
                <Link
                  key={index}
                  href={`/module/${moduleId}/${levelNumber}`}
                  className={cn(
                    "flex items-center justify-center h-8 w-full rounded text-sm font-medium transition-colors",
                    isActiveLvl
                      ? "bg-[#2A6B70] text-white"
                      : "bg-white text-[#4E5964] border border-slate-200 hover:bg-[#E6F2F2] hover:text-[#2A6B70]"
                  )}
                >
                  {levelNumber}
                </Link>
              );
            })}
          </div>
          
          <div className="flex justify-between items-center">
            <Link
              href={`/module/${moduleId}`}
              className="text-xs text-[#5B8A9D] hover:text-[#4A7688] flex items-center gap-1"
            >
              <FileText className="h-3 w-3" />
              <span>Overview</span>
            </Link>
            
            {parseInt(moduleId) < Object.keys(moduleConfig).length && (
              <Link
                href={`/module/${parseInt(moduleId) + 1}`}
                className="text-xs text-[#5B8A9D] hover:text-[#4A7688] flex items-center gap-1"
              >
                <span>Next Module</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Results table for SQL queries
const QueryResultsTable = ({ results, error }) => {
  if (error) {
    return (
      <div className="flex items-center justify-center h-32 text-center p-4">
        <div className="bg-red-50 border-l-4 border-[#D56262] text-[#D56262] p-4 rounded w-full">
          <p className="font-medium">SQL Error</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    )
  }

  if (!results || results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <Database className="h-12 w-12 text-[#E6F2F2] mb-3" />
        <p className="text-[#5B8A9D] font-medium">No Results Yet</p>
        <p className="text-sm text-[#4E5964] mt-1">Execute a query to see results here</p>
      </div>
    )
  }

  const columns = Object.keys(results[0])

  return (
    <div className="absolute inset-0">
      <ScrollArea className="h-full">
        <div className="min-w-max">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-[#E6F2F2]">
              <TableRow className="hover:bg-[#E6F2F2]">
                {columns.map((column) => (
                  <TableHead 
                    key={column}
                    className="text-[#2A6B70] font-semibold whitespace-nowrap"
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
                  className="hover:bg-[#F5FAFA] transition-colors"
                >
                  {columns.map((column) => (
                    <TableCell 
                      key={`${rowIndex}-${column}`}
                      className="text-[#2E3A45] whitespace-nowrap"
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
      </ScrollArea>
    </div>
  )
}

// Level progress indicator
const LevelProgressIndicator = ({ currentLevel, maxLevels, onLevelClick }) => {
  return (
    <div className="flex items-center justify-center space-x-2 py-2 bg-[#E6F2F2] rounded-md px-2">
      {[...Array(maxLevels)].map((_, index) => {
        const levelNumber = index + 1;
        const isCurrentLevel = levelNumber === currentLevel;
        const isPreviousLevel = levelNumber < currentLevel;
        
        return (
          <button
            key={index}
            onClick={() => onLevelClick(levelNumber)}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-md transition-colors",
              isCurrentLevel 
                ? "bg-[#2A6B70] text-white" 
                : isPreviousLevel 
                  ? "bg-[#68A4A1] text-white" 
                  : "bg-white text-slate-600 border border-slate-200"
            )}
          >
            {levelNumber}
          </button>
        );
      })}
    </div>
  );
};

// Success notification when query passes
const SuccessNotification = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 border border-[#68A4A1]/30"
      >
        <div className="h-8 w-8 bg-[#E6F2F2] rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-5 w-5 text-[#3D9D7C]" />
        </div>
        <div>
          <p className="font-medium text-[#2E3A45]">Success!</p>
          <p className="text-xs text-[#4E5964]">Ready to proceed to next level</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main SQL Editor component
export function SQLEditor({ moduleId, levelId, lesson, onComplete, hasNextLesson }) {
  // Convert moduleId and levelId to numbers if they're strings
  const moduleIdNum = typeof moduleId === 'string' ? parseInt(moduleId) : moduleId;
  const levelIdNum = typeof levelId === 'string' ? parseInt(levelId) : levelId;
  
  // Get module data
  const maxLevels = getModuleLevels(moduleIdNum.toString());
  const moduleData = moduleConfig[moduleIdNum.toString()];

  // State variables
  const [sqlCode, setSqlCode] = useState('');
  const [queryResults, setQueryResults] = useState([]);
  const [sqlError, setSqlError] = useState(null);
  const [taskMessage, setTaskMessage] = useState('Loading...');
  const [isMessageExpanded, setIsMessageExpanded] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [levelData, setLevelData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Refs for editor
  const editorRef = useRef(null);
  const fullScreenContainerRef = useRef(null);

  // API URLs
  const sqlSpellApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/sqlspell`;
  const levelsApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/leveldata`;

  // Toggle fullscreen
  const toggleFullScreen = () => {
    setIsFullScreen(prev => !prev);
  };

  // Handle fullscreen effect
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && isFullScreen) {
        setIsFullScreen(false);
      }
    };

    if (isFullScreen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [isFullScreen]);

  // Fetch level data
  useEffect(() => {
    const fetchLevelData = async () => {
      const moduleLevelID = `${moduleIdNum}${levelIdNum}`;
  
      try {
        const response = await fetch(levelsApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ moduleLevelID }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setLevelData(data);
          setSqlCode(data.initialCode || '');
          setTaskMessage(data.task);
        } else {
          setTaskMessage(`Error: ${data.error || 'Failed to fetch level data.'}`);
        }
      } catch (error) {
        console.error('Error fetching level data:', error);
        setTaskMessage(`Error fetching level data: ${error.message}`);
      }
    };
  
    fetchLevelData();
  }, [moduleIdNum, levelIdNum, levelsApiUrl]);

  // Execute SQL query
  const handleExecute = async () => {
    setIsExecuting(true);
    setSqlError(null);
  
    try {
      const payload = {
        moduleId: moduleIdNum,
        levelId: levelIdNum,
        sqlCode,
      };
  
      const response = await fetch(sqlSpellApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const responseData = await response.json();
      const result = responseData.body ? JSON.parse(responseData.body) : responseData;
  
      if (result.error) {
        setSqlError(result.error);
        setQueryResults([]);
      } else {
        const { output, passed, message } = result;
        setQueryResults(output);
        
        if (passed) {
          setTaskMessage(message || 'You passed the level! 🎉');
          handleSuccess();
          
          // Note: Removed auto-progression
        }
      }
    } catch (error) {
      console.error('Error executing query:', error);
      setSqlError(`Error executing query: ${error.message}`);
      setQueryResults([]);
    } finally {
      setIsExecuting(false);
    }
  };

  // Navigate between levels
  const handleNavigation = (direction) => {
    if (direction === 'back' && levelIdNum > 1) {
      window.location.href = `/module/${moduleIdNum}/${levelIdNum - 1}/`;
    } else if (direction === 'next' && levelIdNum < maxLevels) {
      window.location.href = `/module/${moduleIdNum}/${levelIdNum + 1}/`;
    }
  };

  // Navigate to specific level
  const handleLevelClick = (level) => {
    if (level !== levelIdNum) {
      window.location.href = `/module/${moduleIdNum}/${level}/`;
    }
  };

  // Toggle elements
  const toggleMessageBox = () => setIsMessageExpanded(prev => !prev);
  const toggleHint = () => setShowHint(prev => !prev);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  // Success handling
  const handleSuccess = () => {
    setShowSuccess(true);
    // Auto-dismiss after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Module Navigation Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <ModuleSidebar 
            isOpen={isSidebarOpen} 
            onClose={toggleSidebar} 
            activeModuleId={moduleIdNum.toString()}
            activeLevelId={levelIdNum}
          />
        )}
      </AnimatePresence>

      {/* Fullscreen Editor Container */}
      {isFullScreen && (
        <div 
          className="fixed inset-0 z-50 flex flex-col bg-white"
          ref={fullScreenContainerRef}
        >
          {/* Fullscreen Top Bar */}
          <div className="bg-[#2A6B70] text-white py-2 px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Link href="/" className="p-1.5 rounded-md hover:bg-[#235458] transition-colors">
                  <Home className="h-4 w-4 text-white" />
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="h-8 w-8 p-0 text-white hover:bg-[#235458]"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div className="h-4 w-px bg-white/20 mx-2"></div>
                <div className="text-sm">
                  <Link 
                    href={`/module/${moduleIdNum}`}
                    className="text-white hover:text-white/80 font-medium"
                  >
                    Module {moduleIdNum}
                  </Link>
                  <span className="text-white/60 mx-1">·</span>
                  <span className="font-medium">
                    Level {levelIdNum}
                  </span>
                  <span className="text-white/60 mx-1">·</span>
                  <span className="text-white/80 font-normal max-w-[300px] truncate inline-block">
                    {levelData?.title || 'SQL Query'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFullScreen}
                className="h-8 flex items-center gap-1 bg-transparent text-white border-white/20 hover:bg-[#235458] hover:text-white"
              >
                <Minimize2 className="h-3.5 w-3.5" />
                <span>Exit Fullscreen</span>
              </Button>
            </div>
          </div>
          
          {/* Fullscreen Main Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Panel - Instructions */}
            <div className="w-[300px] border-r border-slate-200 flex flex-col bg-white overflow-hidden">
              <div className="p-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#5B8A9D]" />
                  <h3 className="font-medium text-sm text-[#2E3A45]">Instructions</h3>
                </div>
                {levelData?.hintMessage && (
                  <button
                    onClick={toggleHint}
                    className="text-xs flex items-center gap-1 px-2 py-1 rounded hover:bg-[#E6F2F2] transition-colors text-[#5B8A9D]"
                  >
                    <HelpCircle className="h-3 w-3" />
                    <span>{showHint ? "Hide hint" : "Show hint"}</span>
                  </button>
                )}
              </div>
              
              <div className="p-4 overflow-y-auto flex-1 text-sm">
                <p className="text-[#2E3A45]">{taskMessage}</p>
                
                {levelData?.hintMessage && showHint && (
                  <div className="mt-4 p-3 rounded bg-[#E9F1F5] border border-[#5B8A9D]/20 text-[#5B8A9D]">
                    <div className="flex items-center gap-2 mb-1 text-[#5B8A9D] text-xs font-medium">
                      <MessageSquare className="h-3 w-3" />
                      <span>Hint</span>
                    </div>
                    <p>{levelData.hintMessage}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Middle Panel - SQL Editor */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-hidden bg-[#0F172A]">
                <CodeMirror
                  value={sqlCode}
                  theme={vscodeDark}
                  extensions={[sql()]}
                  onChange={(value) => setSqlCode(value)}
                  height="100%"
                  className="h-full"
                  basicSetup={{
                    lineNumbers: true,
                    foldGutter: true,
                    highlightActiveLine: true,
                    highlightSelectionMatches: true,
                  }}
                />
              </div>
              
              <div className="p-3 bg-slate-800 border-t border-slate-700">
                <Button 
                  onClick={handleExecute}
                  disabled={isExecuting}
                  className={cn(
                    "w-full py-2 text-white flex items-center justify-center gap-2",
                    isExecuting 
                      ? "bg-[#68A4A1]/70 cursor-not-allowed" 
                      : "bg-[#2A6B70] hover:bg-[#235458]"
                  )}
                >
                  {isExecuting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Executing...</span>
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4" />
                      <span>Execute Query</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Right Panel - Results */}
            <div className="w-[400px] border-l border-slate-200 bg-white flex flex-col overflow-hidden">
              <div className="p-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-[#5B8A9D]" />
                  <h3 className="font-medium text-sm text-[#2E3A45]">Query Results</h3>
                </div>
                {queryResults?.length > 0 && (
                  <span className="text-xs px-1.5 py-0.5 bg-[#E6F2F2] text-[#2A6B70] rounded">
                    {queryResults.length} {queryResults.length === 1 ? 'row' : 'rows'}
                  </span>
                )}
              </div>
              
              <div className="flex-1 relative overflow-hidden">
                <QueryResultsTable results={queryResults} error={sqlError} />
              </div>
            </div>
          </div>
          
          {/* Fullscreen Bottom Navigation */}
          <div className="border-t border-slate-200 py-3 px-6 bg-white flex items-center justify-between">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleNavigation('back')}
              disabled={levelIdNum <= 1}
              className="h-8 gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous Level</span>
            </Button>
            
            <LevelProgressIndicator
              currentLevel={levelIdNum}
              maxLevels={maxLevels}
              onLevelClick={handleLevelClick}
            />
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleNavigation('next')}
              disabled={levelIdNum >= maxLevels}
              className="h-8 gap-1"
            >
              <span>Next Level</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Regular Mode Layout */}
      {!isFullScreen && (
        <div className="relative flex-1 flex flex-col overflow-hidden bg-[#F8FAFA]">
          {/* Top Header Bar */}
          <header className="bg-[#2A6B70] text-white border-b z-10 px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link href="/">
                  <Button variant="ghost" size="sm" className="h-8 mr-1 text-white hover:bg-[#235458]">
                    <Home className="h-4 w-4" />
                    <span className="sr-only">Home</span>
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="h-8 w-8 p-0 text-white hover:bg-[#235458]"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
                
                <div className="flex items-center gap-1">
                  <Link 
                    href={`/module/${moduleIdNum}`}
                    className="text-white hover:text-white/80 font-medium"
                  >
                    Module {moduleIdNum}
                  </Link>
                  <ChevronRight className="h-4 w-4 text-white/60" />
                  <span className="font-medium text-white max-w-[400px] truncate inline-block">
                    {levelData?.title || `Level ${levelIdNum}`}
                  </span>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFullScreen}
                className="h-8 flex items-center gap-1 bg-transparent text-white border-white/20 hover:bg-[#235458]"
              >
                <span className="hidden sm:inline">Fullscreen</span>
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </header>
          
          {/* Main Editor Content */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 md:gap-4 overflow-hidden p-4">
            {/* Left Column - Instructions & Editor */}
            <div className="flex flex-col h-full overflow-hidden min-h-0">
              {/* Task Instructions Card */}
              <Card className="bg-white shadow-sm border-slate-200 mb-4 overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-[#2A6B70]" />
                      <h3 className="font-semibold text-[#2E3A45]">Task</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      {levelData?.hintMessage && (
                        <button
                          onClick={toggleHint}
                          className="p-1.5 rounded-full hover:bg-[#E6F2F2] transition-colors text-[#5B8A9D]"
                          aria-label={showHint ? "Hide hint" : "Show hint"}
                        >
                          <HelpCircle className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={toggleMessageBox}
                        className="p-1.5 rounded-full hover:bg-[#E6F2F2] transition-colors text-[#5B8A9D]"
                      >
                        {isMessageExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  {isMessageExpanded && (
                    <div className="mt-3 text-[#4E5964] overflow-y-auto max-h-[200px]">
                      <p>{taskMessage}</p>
                      
                      {levelData?.hintMessage && showHint && (
                        <div className="mt-3 p-3 text-sm bg-[#E9F1F5] rounded-md border border-[#5B8A9D]/20">
                          <div className="flex items-center gap-2 mb-1 text-[#5B8A9D] font-medium">
                            <MessageSquare className="h-4 w-4" />
                            <span>Hint</span>
                          </div>
                          <p className="text-[#5B8A9D]">{levelData.hintMessage}</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* SQL Editor Card */}
              <Card className="flex-1 flex flex-col border-slate-200 overflow-hidden bg-slate-900 min-h-0">
                <div className="flex items-center justify-between p-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">SQL Editor</span>
                  </div>
                  <button
                    onClick={toggleFullScreen}
                    className="p-1 rounded hover:bg-slate-800 transition-colors text-slate-400"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-hidden min-h-0" ref={editorRef}>
                  <CodeMirror
                    value={sqlCode}
                    theme={vscodeDark}
                    extensions={[sql()]}
                    onChange={(value) => setSqlCode(value)}
                    height="100%"
                    className="h-full"
                    basicSetup={{
                      lineNumbers: true,
                      foldGutter: true,
                    }}
                  />
                </div>
                
                <div className="p-3 bg-slate-800 border-t border-slate-700">
                  <Button 
                    onClick={handleExecute}
                    disabled={isExecuting}
                    className={cn(
                      "w-full py-2 text-white flex items-center justify-center gap-2",
                      isExecuting 
                        ? "bg-[#68A4A1]/70 cursor-not-allowed" 
                        : "bg-[#2A6B70] hover:bg-[#235458]"
                    )}
                  >
                    {isExecuting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Executing...</span>
                      </>
                    ) : (
                      <>
                        <PlayCircle className="h-4 w-4" />
                        <span>Execute Query</span>
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </div>

            {/* Right Column - Results */}
            <div className="h-full overflow-hidden flex flex-col min-h-0">
              <Card className="h-full bg-white shadow-sm border-slate-200 flex flex-col overflow-hidden min-h-0">
                <CardContent className="p-4 flex flex-col flex-1 overflow-hidden min-h-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-[#2E3A45] flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-[#5B8A9D]" />
                      <span>Query Results</span>
                    </h3>
                    {queryResults?.length > 0 && (
                      <span className="text-xs px-2 py-1 bg-[#E6F2F2] text-[#2A6B70] rounded-full">
                        {queryResults.length} {queryResults.length === 1 ? 'row' : 'rows'}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 relative overflow-hidden min-h-0">
                    <QueryResultsTable results={queryResults} error={sqlError} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Bottom Navigation Bar */}
          <div className="border-t py-3 px-6 bg-white flex items-center justify-between">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleNavigation('back')}
              disabled={levelIdNum <= 1}
              className="h-8 gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>
            
            <LevelProgressIndicator
              currentLevel={levelIdNum}
              maxLevels={maxLevels}
              onLevelClick={handleLevelClick}
            />
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleNavigation('next')}
              disabled={levelIdNum >= maxLevels}
              className="h-8 gap-1"
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Success Notification */}
      <SuccessNotification isVisible={showSuccess} />
    </div>
  );
}