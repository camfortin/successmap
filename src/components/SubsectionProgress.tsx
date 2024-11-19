import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SubsectionProgressProps {
  title: string;
  isCompleted: boolean;
  isActive: boolean;
  onClick: () => void;
}

export default function SubsectionProgress({
  title,
  isCompleted,
  isActive,
  onClick,
}: SubsectionProgressProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-lg transition-all transform ${
        isActive
          ? 'bg-indigo-100 ring-2 ring-indigo-500 shadow-sm scale-[1.02]'
          : isCompleted
          ? 'bg-green-50 hover:bg-green-100'
          : 'bg-gray-50 hover:bg-gray-100'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${
          isActive ? 'text-indigo-700' : 'text-gray-700'
        }`}>{title}</span>
        {isCompleted && <CheckCircle className="w-4 h-4 text-green-500" />}
      </div>
    </button>
  );
}