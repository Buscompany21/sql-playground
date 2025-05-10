import { Card, CardContent } from '../ui/card'
import { BookOpen, MessageSquare, ChevronUp, ChevronDown, HelpCircle } from 'lucide-react'

export function InstructionsPanel({
  taskMessage,
  levelData,
  showHint,
  toggleHint,
  isFullScreen = false,
  isMessageExpanded = true,
  toggleMessageBox,
  width
}) {
  // Fullscreen version has a different layout
  if (isFullScreen) {
    return (
      <div
        className="h-full border-r border-slate-200 flex flex-col bg-white overflow-hidden"
        style={{ width: width || "300px" }}
      >
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
    );
  }
  
  // Regular mode version
  return (
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
  );
} 