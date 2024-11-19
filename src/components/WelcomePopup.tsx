import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WelcomePopup({ isOpen, onClose }: WelcomePopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Welcome to Success Map!</h2>
                
                <p className="text-gray-600">
                  Success Map helps you connect and build shared clarity through the science of connection. 
                  This step-by-step framework guides you through meaningful conversations to uncover goals, 
                  explore past successes, validate efforts, and plan for the future.
                </p>
                
                <p className="text-gray-600">
                  Start with the five steps: Identify, Uncover, Validate, Understand, and Explore. 
                  Ask the right questions, reflect, and create a shared map for success.
                </p>
                
                <div className="pt-4">
                  <p className="text-sm text-gray-500 italic">
                    Tap '?' in the menu anytime for guidance. Let's get started!
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Built by <a href="https://producthacker.ai" className="text-indigo-600 hover:text-indigo-700" target="_blank" rel="noopener noreferrer">Cam Fortin</a> for <a href="https://www.linkedin.com/in/bfretwell/" className="text-indigo-600 hover:text-indigo-700" target="_blank" rel="noopener noreferrer">Brian Fretwell</a> of <a href="https://www.findinggood.com/" className="text-indigo-600 hover:text-indigo-700" target="_blank" rel="noopener noreferrer">Finding Good</a> based on his "Success Map" framework and workshop PDF.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}