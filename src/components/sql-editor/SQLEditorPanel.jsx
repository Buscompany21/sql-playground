import { Card } from '../ui/card'
import { Button } from '../ui/button'
import CodeMirror from '@uiw/react-codemirror'
import { sql } from '@codemirror/lang-sql'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { PlayCircle, Loader2, Maximize2 } from 'lucide-react'
import { cn } from '../../lib/utils'

export default function SQLEditorPanel({
  sqlCode,
  onChange,
  isFullScreen,
  width,
  editorRef,
  isExecuting,
  handleExecute,
  toggleFullScreen
}) {
  // Common CodeMirror configuration
  const codeMirrorConfig = {
    value: sqlCode,
    theme: vscodeDark,
    extensions: [sql()],
    height: "100%",
    className: "h-full",
    foldGutter: false,
    indentWithTab: false,
    basicSetup: {
      lineNumbers: true,
      highlightActiveLine: true,
      highlightSelectionMatches: true,
      closeBrackets: true,
      autocompletion: true,
      history: true,
      highlightActiveLineGutter: true,
      drawSelection: true,
      indentOnInput: true,
      bracketMatching: true,
      syntaxHighlighting: true,
      foldGutter: false,
      foldGUI: false,
      tabSize: 2,
      placeholder: "Enter your SQL query here..."
    }
  };

  // Fullscreen version
  if (isFullScreen) {
    return (
      <div
        ref={editorRef}
        style={{ 
          width: width,
          transition: 'width 0.1s ease-out' 
        }}
        className="h-full overflow-hidden flex flex-col min-w-0"
      >
        <div className="flex-1 bg-[#1e1e1e] overflow-hidden relative">
          <CodeMirror
            {...codeMirrorConfig}
            onChange={onChange}
          />
          
          {/* Floating execute button in fullscreen mode */}
          <div className="absolute bottom-4 right-4 z-10">
            <Button 
              onClick={handleExecute}
              disabled={isExecuting}
              className={cn(
                "py-1.5 px-3 text-white flex items-center justify-center gap-1.5 shadow-lg",
                isExecuting 
                  ? "bg-[#68A4A1]/70 cursor-not-allowed" 
                  : "bg-[#2A6B70] hover:bg-[#235458]"
              )}
              title="Execute SQL Query"
            >
              {isExecuting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Executing...</span>
                </>
              ) : (
                <>
                  <PlayCircle className="h-3.5 w-3.5" />
                  <span>Execute Query</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Regular mode version
  return (
    <Card className="flex-1 flex flex-col border-slate-200 overflow-hidden min-h-0">
      <div className="flex justify-between items-center px-3 py-2 bg-slate-100 border-b border-slate-200">
        <h3 className="font-medium text-sm text-slate-700">SQL Editor</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleFullScreen}
          className="h-7 w-7 p-0 hover:bg-slate-200"
          title="Expand editor to full screen"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-hidden min-h-0 bg-[#1e1e1e]">
        <CodeMirror
          {...codeMirrorConfig}
          onChange={onChange}
        />
      </div>
      
      <div className="p-3 bg-[#1e1e1e] border-t border-[#2d2d2d]">
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
  );
} 