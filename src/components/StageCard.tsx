import React from 'react';
import { motion } from 'framer-motion';
import { Search, Lightbulb, CheckCircle, Brain, Compass } from 'lucide-react';
import { Stage } from '../types';

interface StageCardProps {
  stage: Stage;
  isActive: boolean;
  onClick: () => void;
}

const iconMap = {
  search: Search,
  lightbulb: Lightbulb,
  'check-circle': CheckCircle,
  brain: Brain,
  compass: Compass,
};

export default function StageCard({ stage, isActive, onClick }: StageCardProps) {
  const Icon = iconMap[stage.icon as keyof typeof iconMap];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-4 rounded-xl cursor-pointer transition-colors ${
        isActive
          ? 'bg-indigo-600 text-white shadow-lg'
          : 'bg-white hover:bg-indigo-50'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${isActive ? 'bg-indigo-500' : 'bg-indigo-100'}`}>
          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-indigo-600'}`} />
        </div>
        <h3 className="text-base font-semibold truncate">{stage.title}</h3>
      </div>
    </motion.div>
  );
}