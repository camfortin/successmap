import React from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Trophy } from 'lucide-react';

interface CompletionModalProps {
  onClose: () => void;
}

export default function CompletionModal({ onClose }: CompletionModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={500}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl p-8 max-w-md mx-4 relative z-10"
      >
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-yellow-100 p-4 rounded-full">
              <Trophy className="w-12 h-12 text-yellow-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Congratulations!
          </h2>
          <p className="text-gray-600">
            You've completed all sections of your Success Map! This is a significant milestone in your journey.
          </p>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            View My Complete Map
          </button>
        </div>
      </motion.div>
    </div>
  );
}