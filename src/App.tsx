import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Map, HelpCircle } from 'lucide-react';
import { Stage, Reflection } from './types';
import { stages } from './data/stages';
import { stageGuides } from './data/stageGuides';
import StageCard from './components/StageCard';
import PromptSection from './components/PromptSection';
import Dashboard from './components/Dashboard';
import WelcomePopup from './components/WelcomePopup';
import CompletionModal from './components/CompletionModal';
import CollapsibleExplainer from './components/CollapsibleExplainer';

export default function App() {
  const [activeStage, setActiveStage] = useState<Stage>(stages[0]);
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    const savedReflections = localStorage.getItem('reflections');
    if (savedReflections) {
      setReflections(JSON.parse(savedReflections));
    }
    
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (hasSeenWelcome) {
      setShowWelcome(false);
    }
  }, []);

  const handleSaveReflection = (newReflection: Omit<Reflection, 'id'>) => {
    // Remove any existing reflection for this subsection
    const filteredReflections = reflections.filter(
      r => !(r.stageId === newReflection.stageId && r.subsectionId === newReflection.subsectionId)
    );

    // Only add the new reflection if it has content
    const updatedReflections = newReflection.content.trim()
      ? [...filteredReflections, { ...newReflection, id: crypto.randomUUID() }]
      : filteredReflections;

    setReflections(updatedReflections);
    localStorage.setItem('reflections', JSON.stringify(updatedReflections));

    // Special handling for the final subsection (5.3)
    if (activeStage.id === 5 && newReflection.subsectionId === 3) {
      setShowCompletion(true);
      return false;
    }

    // If we're at the last subsection of any other stage
    if (newReflection.subsectionId === 3) {
      // Move to first subsection of next stage
      setActiveStage(stages[activeStage.id]);
      return 1;
    }
    
    // Move to next subsection within current stage
    return newReflection.subsectionId + 1;
  };

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  const handleCompletionClose = () => {
    setShowCompletion(false);
    setShowDashboard(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Success Map</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowWelcome(true)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowDashboard(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Map className="w-4 h-4" />
                <span>My Map</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {stages.map((stage) => (
            <StageCard
              key={stage.id}
              stage={stage}
              isActive={activeStage.id === stage.id}
              onClick={() => setActiveStage(stage)}
            />
          ))}
        </motion.div>

        <PromptSection
          stage={activeStage}
          onSaveReflection={handleSaveReflection}
          existingReflections={reflections}
        />

        <div className="mt-12 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Section Guides</h2>
          {stages.map((stage, index) => (
            <CollapsibleExplainer
              key={stage.id}
              title={`${stage.title} - ${stage.description}`}
            >
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                  <p className="text-gray-600">{stageGuides[index].description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Key Questions</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {stageGuides[index].questions.map((q, i) => (
                      <li key={i} className="text-gray-600">{q}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Best Practices</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {stageGuides[index].bestPractices.map((p, i) => (
                      <li key={i} className="text-gray-600">{p}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Signs of Clarity</h4>
                  <p className="text-gray-600">{stageGuides[index].signsOfClarity}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Example Conversation</h4>
                  <div className="space-y-2">
                    {stageGuides[index].conversation.map((message, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded ${
                          i % 2 === 0 ? 'bg-gray-100' : 'bg-indigo-50'
                        }`}
                      >
                        {message}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CollapsibleExplainer>
          ))}
        </div>
      </main>

      <footer className="py-6 border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-center text-gray-500">
            Built by <a href="https://producthacker.ai" className="text-indigo-600 hover:text-indigo-700" target="_blank" rel="noopener noreferrer">Cam Fortin</a> for <a href="https://www.linkedin.com/in/bfretwell/" className="text-indigo-600 hover:text-indigo-700" target="_blank" rel="noopener noreferrer">Brian Fretwell</a> of <a href="https://www.findinggood.com/" className="text-indigo-600 hover:text-indigo-700" target="_blank" rel="noopener noreferrer">Finding Good</a> based on his "Success Map" framework and workshop PDF.
          </p>
        </div>
      </footer>

      {showWelcome && <WelcomePopup isOpen={showWelcome} onClose={handleCloseWelcome} />}
      
      {showDashboard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-4xl mt-16">
            <Dashboard reflections={reflections} onClose={() => setShowDashboard(false)} />
          </div>
        </div>
      )}
      
      {showCompletion && <CompletionModal onClose={handleCompletionClose} />}
    </div>
  );
}