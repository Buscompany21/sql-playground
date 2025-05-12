import { cn } from '../../lib/utils'

export function LevelProgressIndicator({ currentLevel, maxLevels, onLevelClick }) {
  return (
    <div className="flex items-center space-x-2">
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
} 