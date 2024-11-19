import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Stage } from '../types';
import { stageGuides } from '../data/stageGuides';

interface StageGuideProps {
  stage: Stage;
  isOpen: boolean;
  onClose: () => void;
}

export default function StageGuide({ stage, isOpen, onClose }: StageGuideProps) {
  const guide = stageGuides[stage.id - 1];

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{stage.title}</h2>
                  <p className="text-gray-600 mt-2">{guide.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Potential Questions</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {guide.questions.map((question, index) => (
                      <li key={index}>{question}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Best Practices</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {guide.bestPractices.map((practice, index) => (
                      <li key={index}>{practice}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Signs of Clarity</h3>
                  <p className="text-gray-600">{guide.signsOfClarity}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Example Conversation</h3>
                  <div className="space-y-3">
                    {guide.conversation.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          index % 2 === 0 ? 'justify-start' : 'justify-end'
                        }`}
                      >
                        <div
                          className={`rounded-lg p-3 max-w-[80%] ${
                            index % 2 === 0
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-indigo-100 text-indigo-800'
                          }`}
                        >
                          <span className="text-sm font-medium">
                            {index % 2 === 0 ? 'User: ' : 'Guide: '}
                          </span>
                          {message}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}