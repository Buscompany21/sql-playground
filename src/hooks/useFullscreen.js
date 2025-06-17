import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useFullscreen(moduleId, levelId) {
  // State for fullscreen mode
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fsInstructionsVisible, setFsInstructionsVisible] = useState(false);
  const [fsResultsVisible, setFsResultsVisible] = useState(false);
  const [editorWidth, setEditorWidth] = useState('65%');
  const [resultsWidth, setResultsWidth] = useState('35%');
  const [fullscreenMode, setFullscreenMode] = useState('editor'); // 'editor' | 'results' | 'split'
  
  // State for resizing
  const [isResizing, setIsResizing] = useState(false);
  const [initialX, setInitialX] = useState(0);
  
  // Persist fullscreen state
  const [fullscreenState, setFullscreenState] = useLocalStorage('sqlEditorFullscreen', null);

  // Toggle fullscreen for editor
  const toggleEditorFullscreen = useCallback(() => {
    setIsFullScreen(prevState => {
      const isEntering = !prevState;
      
      if (isEntering) {
        setFullscreenMode('editor');
        setTimeout(() => {
          setFsInstructionsVisible(false);
          setFsResultsVisible(false);
          setEditorWidth('100%');
        }, 0);
      }
      
      return isEntering;
    });
  }, []);

  // Toggle fullscreen for results
  const toggleResultsFullscreen = useCallback(() => {
    setIsFullScreen(prevState => {
      const isEntering = !prevState;
      
      if (isEntering) {
        setFullscreenMode('results');
        setTimeout(() => {
          setFsInstructionsVisible(false);
          setFsResultsVisible(true);
          setEditorWidth('0%');
          setResultsWidth('100%');
        }, 0);
      }
      
      return isEntering;
    });
  }, []);

  // Toggle split view fullscreen
  const toggleSplitFullscreen = useCallback(() => {
    setIsFullScreen(prevState => {
      const isEntering = !prevState;
      
      if (isEntering) {
        setFullscreenMode('split');
        setTimeout(() => {
          setFsInstructionsVisible(false);
          setFsResultsVisible(true);
          setEditorWidth('50%');
          setResultsWidth('50%');
        }, 0);
      }
      
      return isEntering;
    });
  }, []);

  // Handle ESC key
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

  // Restore fullscreen state
  useEffect(() => {
    if (fullscreenState && fullscreenState.moduleId === moduleId && fullscreenState.levelId === levelId) {
      setIsFullScreen(true);
      setFullscreenMode(fullscreenState.mode || 'split');
    }
  }, [fullscreenState, moduleId, levelId]);

  // Save fullscreen state before navigation
  const saveFullscreenState = useCallback((newModuleId, newLevelId) => {
    if (isFullScreen) {
      setFullscreenState({
        moduleId: newModuleId,
        levelId: newLevelId,
        mode: fullscreenMode
      });
    }
  }, [isFullScreen, setFullscreenState, fullscreenMode]);

  return {
    isFullScreen,
    fullscreenMode,
    fsInstructionsVisible,
    fsResultsVisible,
    editorWidth,
    resultsWidth,
    isResizing,
    initialX,
    toggleEditorFullscreen,
    toggleResultsFullscreen,
    toggleSplitFullscreen,
    setFsInstructionsVisible,
    setFsResultsVisible,
    setEditorWidth,
    setResultsWidth,
    setIsResizing,
    setInitialX,
    saveFullscreenState
  };
} 