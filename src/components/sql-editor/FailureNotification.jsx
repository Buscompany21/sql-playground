import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

export function FailureNotification({ isVisible, message }) {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 border border-[#D56262]/30"
      >
        <div className="h-8 w-8 bg-[#FCECEC] rounded-full flex items-center justify-center">
          <AlertCircle className="h-5 w-5 text-[#D56262]" />
        </div>
        <div>
          <p className="font-medium text-[#2E3A45]">Not quite right</p>
          <p className="text-xs text-[#4E5964]">{message || 'Check out the hint or solution if needed.'}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
