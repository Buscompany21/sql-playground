import { Button } from '../ui/button'
import { 
  ArrowLeft, 
  ArrowRight, 
  Loader2, 
  PlayCircle, 
  BookOpen, 
  Monitor, 
  PanelLeft, 
  PanelRight 
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { LevelProgressIndicator } from './LevelProgressIndicator'

export function FooterNavigation({
  isFullScreen,
  moduleId,
  levelId,
  maxLevels,
  isExecuting,
  handleExecute,
  handleNavigation,
  handleLevelClick,
  toggleInstructionsPanel,
  toggleResultsPanel,
  fsInstructionsVisible,
  fsResultsVisible
}) {
  // Fullscreen version with execute button and panel toggles
  if (isFullScreen) {
    return (
      <div className="border-t border-slate-200 py-2 px-4 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            onClick={handleExecute}
            disabled={isExecuting}
            className={cn(
              "py-2 px-4 h-9 text-white flex items-center justify-center gap-2",
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

          <Button
            variant="outline"
            size="sm"
            onClick={toggleInstructionsPanel}
            className="h-9 text-slate-700 border-slate-300 hover:bg-slate-100"
          >
            {fsInstructionsVisible ? <PanelLeft className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
            <span className="ml-1">{fsInstructionsVisible ? "Hide Instructions" : "Show Instructions"}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleResultsPanel}
            className="h-9 text-slate-700 border-slate-300 hover:bg-slate-100"
          >
            {fsResultsVisible ? <PanelRight className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
            <span className="ml-1">{fsResultsVisible ? "Hide Results" : "Show Results"}</span>
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleNavigation('back')}
            disabled={levelId <= 1}
            className="h-9 gap-1 text-slate-700 border-slate-300 hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
          
          <div className="hidden sm:flex items-center">
            <LevelProgressIndicator
              currentLevel={levelId}
              maxLevels={maxLevels}
              onLevelClick={handleLevelClick}
            />
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleNavigation('next')}
            disabled={levelId >= maxLevels}
            className="h-9 gap-1 text-slate-700 border-slate-300 hover:bg-slate-100"
          >
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Regular mode version with just navigation
  return (
    <div className="border-t py-3 px-6 bg-white flex items-center justify-between">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleNavigation('back')}
        disabled={levelId <= 1}
        className="h-8 gap-1"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Previous</span>
      </Button>
      
      <LevelProgressIndicator
        currentLevel={levelId}
        maxLevels={maxLevels}
        onLevelClick={handleLevelClick}
      />
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleNavigation('next')}
        disabled={levelId >= maxLevels}
        className="h-9 gap-1 text-slate-700 border-slate-300 hover:bg-slate-100"
      >
        <span>Next</span>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
} 