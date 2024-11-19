import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import SubsectionProgress from './SubsectionProgress';

interface PromptSectionProps {
  stage: {
    id: number;
    subsections: Array<{
      id: number;
      title: string;
      prompt: string;
    }>;
  };
  onSaveReflection: (reflection: { stageId: number; subsectionId: number; content: string; date: string }) => number | false;
  existingReflections: Array<{
    id: string;
    stageId: number;
    subsectionId: number;
    content: string;
    date: string;
  }>;
}

export default function PromptSection({ stage, onSaveReflection, existingReflections }: PromptSectionProps) {
  const [inputValue, setInputValue] = useState('');
  const [enterToSave, setEnterToSave] = useState(true);
  const [activeSubsectionId, setActiveSubsectionId] = useState(1);

  const activeSubsection = stage.subsections.find(s => s.id === activeSubsectionId) || stage.subsections[0];
  
  // Update input value when switching sections or subsections
  useEffect(() => {
    const currentReflection = existingReflections.find(
      r => r.stageId === stage.id && r.subsectionId === activeSubsectionId
    );
    setInputValue(currentReflection?.content || '');
  }, [stage.id, activeSubsectionId, existingReflections]);

  const handleSave = () => {
    const nextSubsection = onSaveReflection({
      stageId: stage.id,
      subsectionId: activeSubsectionId,
      content: inputValue,
      date: new Date().toISOString()
    });

    if (nextSubsection !== false) {
      setActiveSubsectionId(nextSubsection);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && enterToSave) {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {stage.subsections.map((subsection) => (
            <SubsectionProgress
              key={subsection.id}
              title={subsection.title}
              isCompleted={existingReflections.some(
                r => r.stageId === stage.id && r.subsectionId === subsection.id
              )}
              isActive={activeSubsectionId === subsection.id}
              onClick={() => setActiveSubsectionId(subsection.id)}
            />
          ))}
        </div>
      </div>
      
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700">
            {activeSubsection.prompt}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEnterToSave(!enterToSave)}
              className={`text-sm ${enterToSave ? 'text-blue-600' : 'text-gray-400'}`}
            >
              Enter to save {enterToSave ? 'on' : 'off'}
            </button>
            <button
              onClick={handleSave}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Save reflection"
            >
              <Save className="w-5 h-5 text-blue-600" />
            </button>
          </div>
        </div>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your reflection here..."
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] resize-none"
        />
      </div>
    </div>
  );
}