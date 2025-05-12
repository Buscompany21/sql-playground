import { useState } from 'react'
import { motion } from 'framer-motion'
import { moduleConfig } from '../../config/moduleConfig'
import { Button } from '../ui/button'
import Link from 'next/link'
import { X, ChevronDown, ChevronRight, FileText } from 'lucide-react'
import { cn } from '../../lib/utils'

// Individual module navigation item with expandable levels
const ModuleNavigationItem = ({ 
  moduleId, 
  moduleData, 
  activeModuleId, 
  activeLevelId,
  isExpanded,
  onToggle
}) => {
  const maxLevels = moduleData.levels || 0;
  const isActive = moduleId === activeModuleId;
  
  return (
    <div className="border rounded-md overflow-hidden">
      <button
        onClick={onToggle}
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

export function Sidebar({ 
  isOpen, 
  onClose, 
  activeModuleId, 
  activeLevelId
}) {
  // Track which module is currently expanded (if any)
  const [expandedModuleId, setExpandedModuleId] = useState(activeModuleId);
  
  // Function to toggle a module's expanded state
  const toggleModule = (moduleId) => {
    if (expandedModuleId === moduleId) {
      // If clicking on already expanded module, collapse it
      setExpandedModuleId(null);
    } else {
      // Otherwise, expand this module and collapse any other
      setExpandedModuleId(moduleId);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-y-0 left-0 z-[1000] w-96 bg-white shadow-lg flex flex-col overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-[#2A6B70] font-medium text-lg">Modules</h2>
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
                isExpanded={expandedModuleId === id}
                onToggle={() => toggleModule(id)}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 