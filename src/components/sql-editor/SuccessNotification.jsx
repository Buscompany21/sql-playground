import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export function SuccessNotification({ isVisible }) {
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
} 