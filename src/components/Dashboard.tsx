import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Reflection, Stage } from '../types';
import { stages } from '../data/stages';
import { Calendar, X, Download, CheckCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';
import SubsectionProgress from './SubsectionProgress';

interface DashboardProps {
  reflections: Reflection[];
  onClose: () => void;
}

export default function Dashboard({ reflections, onClose }: DashboardProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const getReflectionForSubsection = (stageId: number, subsectionId: number) => {
    return reflections.find(
      r => r.stageId === stageId && r.subsectionId === subsectionId
    );
  };

  const isSubsectionCompleted = (stageId: number, subsectionId: number) => {
    return reflections.some(
      r => r.stageId === stageId && r.subsectionId === subsectionId
    );
  };

  const getStageProgress = (stage: Stage) => {
    const completed = stage.subsections.filter(sub => 
      isSubsectionCompleted(stage.id, sub.id)
    ).length;
    return {
      completed,
      total: stage.subsections.length,
      percentage: (completed / stage.subsections.length) * 100
    };
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = margin;

    // Title and Date
    doc.setFontSize(24);
    doc.setTextColor(75, 85, 99);
    doc.text('Your Success Map', pageWidth / 2, yPos, { align: 'center' });
    yPos += 20;

    // Content for each stage
    stages.forEach((stage) => {
      // Stage Title
      doc.setFontSize(16);
      doc.setTextColor(31, 41, 55);
      doc.text(stage.title, margin, yPos);
      yPos += 10;

      // Subsections
      stage.subsections.forEach((subsection) => {
        const reflection = getReflectionForSubsection(stage.id, subsection.id);
        if (reflection) {
          doc.setFontSize(12);
          doc.setTextColor(75, 85, 99);
          doc.text(subsection.title + ':', margin, yPos);
          yPos += 7;

          doc.setFontSize(11);
          doc.setTextColor(31, 41, 55);
          const lines = doc.splitTextToSize(reflection.content, pageWidth - (margin * 2));
          doc.text(lines, margin, yPos);
          yPos += (lines.length * 7) + 5;
        }
      });

      yPos += 10;

      // Add new page if needed
      if (yPos > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        yPos = margin;
      }
    });

    // Generated timestamp
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text(
      `Generated on ${new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );

    doc.save('success-map.pdf');
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Map</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={downloadPDF}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {stages.map((stage) => {
          const progress = getStageProgress(stage);
          
          return (
            <div key={stage.id} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {stage.title}
                  </h3>
                  {progress.completed === progress.total && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress.percentage}%` }}
                      className={`h-full rounded-full ${
                        progress.completed === progress.total
                          ? 'bg-green-500'
                          : 'bg-indigo-600'
                      }`}
                    />
                  </div>
                  <span className="text-sm text-gray-600">
                    {progress.completed}/{progress.total}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {stage.subsections.map((subsection) => {
                  const reflection = getReflectionForSubsection(stage.id, subsection.id);
                  const isCompleted = !!reflection;

                  return (
                    <div key={subsection.id} className="border border-gray-100 rounded-lg p-4">
                      <SubsectionProgress
                        title={subsection.title}
                        isCompleted={isCompleted}
                        isActive={false}
                        onClick={() => {}}
                      />
                      {reflection && (
                        <div className="mt-3 pl-4 border-l-2 border-indigo-100">
                          <p className="text-gray-600 whitespace-pre-wrap">
                            {reflection.content}
                          </p>
                          <p className="text-sm text-gray-400 mt-2">
                            Added on {new Date(reflection.date).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}