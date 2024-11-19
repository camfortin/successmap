import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  completed?: boolean;
}

export default function ProgressIndicator({ current, total, completed }: ProgressIndicatorProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="flex items-center space-x-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className={`h-full rounded-full ${
            completed ? 'bg-green-500' : 'bg-indigo-600'
          }`}
        />
      </div>
      {completed && (
        <CheckCircle className="w-5 h-5 text-green-500" />
      )}
      <span className="text-sm text-gray-600">
        {current}/{total}
      </span>
    </div>
  );
}