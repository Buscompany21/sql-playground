import { Card, CardContent } from '../ui/card'
import { BookOpen, MessageSquare, ChevronUp, ChevronDown, HelpCircle, KeyRound } from 'lucide-react'

export function InstructionsPanel({
  taskMessage,
  levelData,
  showHint,
  toggleHint,
  canShowSolution = false,
  showSolution = false,
  toggleSolution,
  solutionText,
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
          <div className="flex items-center gap-2">
            {levelData?.hintMessage && (
              <button
                onClick={toggleHint}
                className="text-xs flex items-center gap-1 px-2 py-1 rounded hover:bg-[#E6F2F2] transition-colors text-[#5B8A9D]"
              >
                <HelpCircle className="h-3 w-3" />
                <span>{showHint ? "Hide hint" : "Show hint"}</span>
              </button>
            )}
            {canShowSolution && (
              <button
                onClick={toggleSolution}
                className="text-xs flex items-center gap-1 px-2 py-1 rounded hover:bg-[#E6F2F2] transition-colors text-[#5B8A9D]"
              >
                <KeyRound className="h-3 w-3" />
                <span>{showSolution ? "Hide solution" : "Show solution"}</span>
              </button>
            )}
          </div>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1 text-sm">
          <p className="text-[#2E3A45] whitespace-pre-line">{taskMessage}</p>
          
          {levelData?.hintMessage && showHint && (
            <div className="mt-4 p-3 rounded bg-[#E9F1F5] border border-[#5B8A9D]/20 text-[#5B8A9D]">
              <div className="flex items-center gap-2 mb-1 text-[#5B8A9D] text-xs font-medium">
                <MessageSquare className="h-3 w-3" />
                <span>Hint</span>
              </div>
              <p className="whitespace-pre-line">{levelData.hintMessage}</p>
            </div>
          )}

          {canShowSolution && showSolution && (
            <div className="mt-4 p-3 rounded bg-[#F8F3E8] border border-[#C8A45A]/30 text-[#6B572A]">
              <div className="flex items-center gap-2 mb-1 text-xs font-medium">
                <KeyRound className="h-3 w-3" />
                <span>Solution</span>
              </div>
              <pre className="text-xs whitespace-pre-wrap break-words font-mono">{solutionText}</pre>
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
          <div className="flex items-center gap-2">
            {levelData?.hintMessage && (
              <button
                onClick={toggleHint}
                className="px-2 py-1 rounded-full hover:bg-[#E6F2F2] transition-colors text-[#5B8A9D] text-xs flex items-center gap-1"
                aria-label={showHint ? "Hide hint" : "Show hint"}
              >
                <HelpCircle className="h-4 w-4" />
                <span>{showHint ? "Hide hint" : "Show hint"}</span>
              </button>
            )}
            {canShowSolution && (
              <button
                onClick={toggleSolution}
                className="px-2 py-1 rounded-full hover:bg-[#E6F2F2] transition-colors text-[#5B8A9D] text-xs flex items-center gap-1"
                aria-label={showSolution ? "Hide solution" : "Show solution"}
              >
                <KeyRound className="h-4 w-4" />
                <span>{showSolution ? "Hide solution" : "Show solution"}</span>
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
            <p className="whitespace-pre-line">{taskMessage}</p>
            
            {levelData?.hintMessage && showHint && (
              <div className="mt-3 p-3 text-sm bg-[#E9F1F5] rounded-md border border-[#5B8A9D]/20">
                <div className="flex items-center gap-2 mb-1 text-[#5B8A9D] font-medium">
                  <MessageSquare className="h-4 w-4" />
                  <span>Hint</span>
                </div>
                <p className="text-[#5B8A9D] whitespace-pre-line">{levelData.hintMessage}</p>
              </div>
            )}

            {canShowSolution && showSolution && (
              <div className="mt-3 p-3 text-sm bg-[#F8F3E8] rounded-md border border-[#C8A45A]/30">
                <div className="flex items-center gap-2 mb-1 text-[#8A6D2D] font-medium">
                  <KeyRound className="h-4 w-4" />
                  <span>Solution</span>
                </div>
                <pre className="text-xs whitespace-pre-wrap break-words font-mono text-[#8A6D2D]">{solutionText}</pre>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 