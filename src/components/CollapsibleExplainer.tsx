import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface CollapsibleExplainerProps {
  title: string;
  children: React.ReactNode;
}

export default function CollapsibleExplainer({ title, children }: CollapsibleExplainerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-indigo-200 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.2)] bg-gradient-to-r from-indigo-50/50 to-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-indigo-50/50 rounded-lg transition-colors"
      >
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-5 h-5 text-indigo-500" />
          <span className="text-sm font-medium text-indigo-700">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-indigo-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-indigo-500" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 text-sm text-gray-600 border-t border-indigo-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}