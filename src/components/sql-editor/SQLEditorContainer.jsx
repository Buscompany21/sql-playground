"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence } from 'framer-motion'
import { getModuleLevels } from '../../config/moduleConfig'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { GripVertical } from 'lucide-react'

// Import components
import { Sidebar } from './Sidebar'
import { EditorHeader } from './EditorHeader'
import { InstructionsPanel } from './InstructionsPanel'
import { SQLEditorPanel } from './SQLEditorPanel'
import { ResultsPanel } from './ResultsPanel'
import { FooterNavigation } from './FooterNavigation'
import { SuccessNotification } from './SuccessNotification'

export function SQLEditorContainer({ moduleId, levelId, lesson, onComplete, hasNextLesson }) {
  // Convert moduleId and levelId to numbers if they're strings
  const moduleIdNum = typeof moduleId === 'string' ? parseInt(moduleId) : moduleId;
  const levelIdNum = typeof levelId === 'string' ? parseInt(levelId) : levelId;
  
  // Get module data
  const maxLevels = getModuleLevels(moduleIdNum.toString());

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
  
  // Fullscreen specific state variables
  const [fsInstructionsVisible, setFsInstructionsVisible] = useState(false);
  const [fsResultsVisible, setFsResultsVisible] = useState(false);
  const [editorWidth, setEditorWidth] = useState('65%');
  const [resultsWidth, setResultsWidth] = useState('35%');
  const [isResizing, setIsResizing] = useState(false);
  const [initialX, setInitialX] = useState(0);

  // Refs for editor and resizing
  const fullScreenContainerRef = useRef(null);
  const editorContainerRef = useRef(null);
  const resizableDividerRef = useRef(null);
  
  // State for managing fullscreen persistence
  const [fullscreenState, setFullscreenState] = useLocalStorage('sqlEditorFullscreen', null);

  // API URLs
  const sqlSpellApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/sqlspell`;
  const levelsApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/leveldata`;

  // Toggle fullscreen
  const toggleFullScreen = () => {
    const isEntering = !isFullScreen;
    setIsFullScreen(isEntering);
    
    // Reset panel states when entering fullscreen
    if (isEntering) {
      setFsInstructionsVisible(false);
      setFsResultsVisible(false);
      setEditorWidth('65%');
      setResultsWidth('35%');
    }
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
  
  // Handle resizing in fullscreen mode
  useEffect(() => {
    if (!isFullScreen || !fsResultsVisible) return;
    
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      
      const containerWidth = fullScreenContainerRef.current?.clientWidth || 0;
      const newX = e.clientX;
      
      // Calculate percentages based on container width
      const editorWidthPercent = (newX / containerWidth) * 100;
      const resultsWidthPercent = 100 - editorWidthPercent;
      
      // Enforce minimum widths (20% for each pane)
      if (editorWidthPercent < 20 || resultsWidthPercent < 20) return;
      
      // Set the new widths
      setEditorWidth(`${editorWidthPercent}%`);
      setResultsWidth(`${resultsWidthPercent}%`);
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = 'default';
    };
    
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, initialX, isFullScreen, fsResultsVisible]);
  
  // Handle resizer mousedown
  const handleResizerMouseDown = (e) => {
    if (!isFullScreen || !fsResultsVisible) return;
    
    setIsResizing(true);
    setInitialX(e.clientX);
    document.body.style.cursor = 'col-resize';
    e.preventDefault(); // Prevent text selection during resize
  };

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
  
  // Effect to persist fullscreen state
  useEffect(() => {
    // Check if we need to restore fullscreen state
    if (fullscreenState && fullscreenState.moduleId === moduleIdNum && fullscreenState.levelId === levelIdNum) {
      setIsFullScreen(true);
    }
  }, [fullscreenState, moduleIdNum, levelIdNum]);

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
  
      // In fullscreen mode, always show results panel regardless of success or error
      if (isFullScreen) {
        setFsResultsVisible(true);
      }
  
      if (result.error) {
        setSqlError(result.error);
        setQueryResults([]);
      } else {
        const { output, passed, message } = result;
        setQueryResults(output);
        
        if (passed) {
          setTaskMessage(message || 'You passed the level! 🎉');
          handleSuccess();
        }
      }
    } catch (error) {
      console.error('Error executing query:', error);
      setSqlError(`Error executing query: ${error.message}`);
      setQueryResults([]);
      
      // Also show results panel for caught errors in fullscreen mode
      if (isFullScreen) {
        setFsResultsVisible(true);
      }
    } finally {
      setIsExecuting(false);
    }
  };

  // Toggle elements
  const toggleMessageBox = () => setIsMessageExpanded(prev => !prev);
  const toggleHint = () => setShowHint(prev => !prev);
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  // Navigate between levels
  const handleNavigation = (direction) => {
    // Save fullscreen state before navigation
    if (isFullScreen) {
      setFullscreenState({
        moduleId: moduleIdNum,
        levelId: direction === 'next' ? levelIdNum + 1 : levelIdNum - 1
      });
    }
    
    if (direction === 'back' && levelIdNum > 1) {
      window.location.href = `/module/${moduleIdNum}/${levelIdNum - 1}/`;
    } else if (direction === 'next' && levelIdNum < maxLevels) {
      window.location.href = `/module/${moduleIdNum}/${levelIdNum + 1}/`;
    }
  };

  // Navigate to specific level
  const handleLevelClick = (level) => {
    if (level !== levelIdNum) {
      // Save fullscreen state before navigation
      if (isFullScreen) {
        setFullscreenState({
          moduleId: moduleIdNum,
          levelId: level
        });
      }
      window.location.href = `/module/${moduleIdNum}/${level}/`;
    }
  };

  // Success handling
  const handleSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  
  // Panel visibility toggles
  const toggleInstructionsPanel = () => {
    setFsInstructionsVisible(prev => !prev);
    if (editorContainerRef.current) {
      editorContainerRef.current.style.transition = 'width 0.1s ease-out';
    }
  };
  
  const toggleResultsPanel = () => {
    setFsResultsVisible(prev => !prev);
    if (editorContainerRef.current) {
      editorContainerRef.current.style.transition = 'width 0.1s ease-out';
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Module Navigation Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={toggleSidebar} 
            activeModuleId={moduleIdNum.toString()}
            activeLevelId={levelIdNum}
          />
        )}
      </AnimatePresence>

      {/* Fullscreen Editor Container */}
      {isFullScreen ? (
        <div 
          ref={fullScreenContainerRef}
          className="fixed inset-0 z-[900] bg-white flex flex-col overflow-hidden"
        >
          <EditorHeader 
            isFullScreen={true}
            moduleId={moduleIdNum}
            levelId={levelIdNum}
            levelData={levelData}
            toggleSidebar={toggleSidebar}
            toggleFullScreen={toggleFullScreen}
          />
          
          <div className="flex flex-1 overflow-hidden">
            {/* Instructions Panel */}
            {fsInstructionsVisible && (
              <InstructionsPanel
                taskMessage={taskMessage}
                levelData={levelData}
                showHint={showHint}
                toggleHint={toggleHint}
                isFullScreen={true}
                width="300px"
              />
            )}
            
            {/* SQL Editor Panel */}
            <SQLEditorPanel
              sqlCode={sqlCode}
              onChange={setSqlCode}
              isFullScreen={true}
              width={fsResultsVisible ? editorWidth : '100%'}
              editorRef={editorContainerRef}
            />
            
            {/* Resizable divider */}
            {fsResultsVisible && (
              <div 
                className="h-full w-[6px] bg-slate-200 hover:bg-[#2A6B70] cursor-col-resize flex items-center justify-center z-10"
                onMouseDown={handleResizerMouseDown}
                ref={resizableDividerRef}
              >
                <GripVertical className="h-6 w-6 text-slate-400" />
              </div>
            )}
            
            {/* Results Panel */}
            {fsResultsVisible && (
              <ResultsPanel
                results={queryResults}
                error={sqlError}
                isFullScreen={true}
                width={resultsWidth}
              />
            )}
          </div>
          
          <FooterNavigation
            isFullScreen={true}
            moduleId={moduleIdNum}
            levelId={levelIdNum}
            maxLevels={maxLevels}
            isExecuting={isExecuting}
            handleExecute={handleExecute}
            handleNavigation={handleNavigation}
            handleLevelClick={handleLevelClick}
            toggleInstructionsPanel={toggleInstructionsPanel}
            toggleResultsPanel={toggleResultsPanel}
            fsInstructionsVisible={fsInstructionsVisible}
            fsResultsVisible={fsResultsVisible}
          />
        </div>
      ) : (
        <div className="relative flex-1 flex flex-col overflow-hidden bg-[#F8FAFA]">
          <EditorHeader 
            isFullScreen={false}
            moduleId={moduleIdNum}
            levelId={levelIdNum}
            levelData={levelData}
            toggleSidebar={toggleSidebar}
            toggleFullScreen={toggleFullScreen}
          />
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 md:gap-4 overflow-hidden p-4">
            {/* Left Column - Instructions & Editor */}
            <div className="flex flex-col h-full overflow-hidden min-h-0">
              <InstructionsPanel
                taskMessage={taskMessage}
                levelData={levelData}
                showHint={showHint}
                toggleHint={toggleHint}
                isMessageExpanded={isMessageExpanded}
                toggleMessageBox={toggleMessageBox}
                isFullScreen={false}
              />
              
              <SQLEditorPanel
                sqlCode={sqlCode}
                onChange={setSqlCode}
                isFullScreen={false}
                isExecuting={isExecuting}
                handleExecute={handleExecute}
              />
            </div>

            {/* Right Column - Results */}
            <ResultsPanel
              results={queryResults}
              error={sqlError}
              isFullScreen={false}
            />
          </div>
          
          <FooterNavigation
            isFullScreen={false}
            moduleId={moduleIdNum}
            levelId={levelIdNum}
            maxLevels={maxLevels}
            handleNavigation={handleNavigation}
            handleLevelClick={handleLevelClick}
          />
        </div>
      )}
      
      {/* Success Notification */}
      <SuccessNotification isVisible={showSuccess} />
    </div>
  );
} 