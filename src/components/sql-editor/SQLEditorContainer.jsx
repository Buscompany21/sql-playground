"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence } from 'framer-motion'
import {
  CURRICULUM_COMPLETION_PATH,
  getModuleLevels,
  getNextModuleId,
  isFinalCurriculumLevel,
} from '../../config/moduleConfig'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { GripVertical } from 'lucide-react'
import { fetchLevelDefinition, getPreviewTableName, stripLevelForClient } from '../../lib/curriculum/fetchLevel'
import { loadSchemaSql } from '../../lib/curriculum/schemaCache'
import { executeUserSql, executePreviewQuery } from '../../lib/curriculum/executeUserSql'

// Import components
import { Sidebar } from './Sidebar'
import { EditorHeader } from './EditorHeader'
import { InstructionsPanel } from './InstructionsPanel'
import { SQLEditorPanel } from './SQLEditorPanel'
import { ResultsPanel } from './ResultsPanel'
import { FooterNavigation } from './FooterNavigation'
import { SuccessNotification } from './SuccessNotification'
import { FailureNotification } from './FailureNotification'

export function SQLEditorContainer({ moduleId, levelId }) {
  // Convert moduleId and levelId to numbers if they're strings
  const moduleIdNum = typeof moduleId === 'string' ? parseInt(moduleId) : moduleId;
  const levelIdNum = typeof levelId === 'string' ? parseInt(levelId) : levelId;
  
  // Get module data
  const maxLevels = getModuleLevels(moduleIdNum.toString());
  const nextModuleId = getNextModuleId(moduleIdNum.toString());
  const onFinalSqlLevel = isFinalCurriculumLevel(moduleIdNum, levelIdNum, maxLevels);
  const canGoNext =
    levelIdNum < maxLevels || nextModuleId != null || onFinalSqlLevel;

  const levelDefinitionRef = useRef(null);

  // State variables
  const [sqlCode, setSqlCode] = useState('');
  const [queryResults, setQueryResults] = useState([]);
  const [sqlError, setSqlError] = useState(null);
  const [taskMessage, setTaskMessage] = useState('Loading...');
  const [isMessageExpanded, setIsMessageExpanded] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [canShowSolution, setCanShowSolution] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showFailure, setShowFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
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

  // Load level content from public/curriculum/modules (see fetchLevel.js)
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      levelDefinitionRef.current = null;
      setTaskMessage('Loading...');
      setSqlError(null);
      setQueryResults([]);
      setSuccessMessage('');
      setShowFailure(false);
      setFailureMessage('');
      setShowSolution(false);
      setCanShowSolution(false);
      try {
        const full = await fetchLevelDefinition(moduleIdNum, levelIdNum);
        if (cancelled) return;
        levelDefinitionRef.current = full;
        setLevelData(stripLevelForClient(full));
        setSqlCode(full.initialCode || '');
        setTaskMessage(full.task);

        const schemaSql = await loadSchemaSql(moduleIdNum, full.schema);
        if (cancelled) return;

        const tableName = getPreviewTableName(full);
        if (!tableName) return;

        const preview = await executePreviewQuery({
          schemaSql,
          query: `SELECT * FROM ${tableName};`,
        });
        if (cancelled) return;

        if (preview.error) {
          setSqlError(preview.error);
          setQueryResults([]);
        } else {
          setQueryResults(preview.output);
        }
      } catch (error) {
        if (cancelled) return;
        console.error('Error loading level:', error);
        setLevelData(null);
        setTaskMessage(`Error loading level: ${error.message}`);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [moduleIdNum, levelIdNum]);
  
  // Effect to persist fullscreen state
  useEffect(() => {
    // Check if we need to restore fullscreen state
    if (fullscreenState && fullscreenState.moduleId === moduleIdNum && fullscreenState.levelId === levelIdNum) {
      setIsFullScreen(true);
    }
  }, [fullscreenState, moduleIdNum, levelIdNum]);

  // Execute SQL locally (sql.js) using schema + solution from curriculum files
  const handleExecute = async () => {
    setIsExecuting(true);
    setSqlError(null);
    setShowFailure(false);

    const level = levelDefinitionRef.current;
    if (!level) {
      setSqlError('Level is still loading.');
      setIsExecuting(false);
      return;
    }

    if (!sqlCode.trim()) {
      setSqlError('SQL query cannot be empty');
      setIsExecuting(false);
      return;
    }

    try {
      const schemaSql = await loadSchemaSql(moduleIdNum, level.schema);
      const result = await executeUserSql({
        schemaSql,
        userQuery: sqlCode,
        level,
      });

      if (isFullScreen) {
        setFsResultsVisible(true);
      }

      if (result.error) {
        setCanShowSolution(true);
        setSqlError(result.error);
        setQueryResults([]);
        handleFailure();
      } else {
        const { output, passed, message } = result;
        setQueryResults(output);

        if (passed) {
          const nextSuccessMessage = message || level.successMessage || 'You passed the level! 🎉';
          setSuccessMessage(nextSuccessMessage);
          setShowFailure(false);
          handleSuccess();
        } else if (message) {
          setCanShowSolution(true);
          handleFailure();
        }
      }
    } catch (error) {
      console.error('Error executing query:', error);
      setSqlError(`Error executing query: ${error.message}`);
      setQueryResults([]);
      handleFailure();

      if (isFullScreen) {
        setFsResultsVisible(true);
      }
    } finally {
      setIsExecuting(false);
    }
  };

  // Toggle elements
  const toggleMessageBox = () => setIsMessageExpanded(prev => !prev);
  const toggleHint = () => {
    setShowHint(prev => {
      const next = !prev;
      if (next) setShowSolution(false);
      return next;
    });
  };
  const toggleSolution = () => {
    setShowSolution(prev => {
      const next = !prev;
      if (next) setShowHint(false);
      return next;
    });
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  // Navigate between levels (and from last level to the next module landing page)
  const handleNavigation = (direction) => {
    if (direction === 'next') {
      if (levelIdNum < maxLevels) {
        if (isFullScreen) {
          setFullscreenState({
            moduleId: moduleIdNum,
            levelId: levelIdNum + 1
          });
        }
        window.location.href = `/module/${moduleIdNum}/${levelIdNum + 1}/`;
      } else if (nextModuleId) {
        if (isFullScreen) {
          setFullscreenState(null);
        }
        window.location.href = `/module/${nextModuleId}/`;
      } else if (onFinalSqlLevel) {
        if (isFullScreen) {
          setFullscreenState(null);
        }
        window.location.href = CURRICULUM_COMPLETION_PATH;
      }
      return;
    }

    if (direction === 'back' && levelIdNum > 1) {
      if (isFullScreen) {
        setFullscreenState({
          moduleId: moduleIdNum,
          levelId: levelIdNum - 1
        });
      }
      window.location.href = `/module/${moduleIdNum}/${levelIdNum - 1}/`;
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
    setTimeout(() => setShowSuccess(false), 5000);
  };
  
  const handleFailure = () => {
    setFailureMessage('Not quite right. Check out the hint or solution if needed.');
    setShowFailure(true);
    setTimeout(() => setShowFailure(false), 3000);
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
          />
          
          <div className="flex flex-1 overflow-hidden">
            {/* Instructions Panel */}
            {fsInstructionsVisible && (
              <InstructionsPanel
                taskMessage={taskMessage}
                levelData={levelData}
                showHint={showHint}
                toggleHint={toggleHint}
                canShowSolution={canShowSolution}
                showSolution={showSolution}
                toggleSolution={toggleSolution}
                solutionText={levelDefinitionRef.current?.solution || ''}
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
              toggleFullScreen={toggleFullScreen}
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
            canGoNext={canGoNext}
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
          />
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 md:gap-4 overflow-hidden p-4">
            {/* Left Column - Instructions & Editor */}
            <div className="flex flex-col h-full overflow-hidden min-h-0">
              <InstructionsPanel
                taskMessage={taskMessage}
                levelData={levelData}
                showHint={showHint}
                toggleHint={toggleHint}
                canShowSolution={canShowSolution}
                showSolution={showSolution}
                toggleSolution={toggleSolution}
                solutionText={levelDefinitionRef.current?.solution || ''}
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
                toggleFullScreen={toggleFullScreen}
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
            canGoNext={canGoNext}
            handleNavigation={handleNavigation}
            handleLevelClick={handleLevelClick}
          />
        </div>
      )}
      
      {/* Success Notification */}
      <SuccessNotification isVisible={showSuccess} message={successMessage} />
      <FailureNotification isVisible={showFailure} message={failureMessage} />
    </div>
  );
} 