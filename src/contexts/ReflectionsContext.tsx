import React, { createContext, useContext, useState, useEffect } from 'react';

interface ReflectionsContextType {
  reflections: Record<string, string>;
  addReflection: (key: string, content: string) => void;
  removeReflection: (key: string) => void;
}

const ReflectionsContext = createContext<ReflectionsContextType | undefined>(undefined);

export function ReflectionsProvider({ children }: { children: React.ReactNode }) {
  const [reflections, setReflections] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedReflections = localStorage.getItem('reflections');
    if (savedReflections) {
      setReflections(JSON.parse(savedReflections));
    }
  }, []);

  const addReflection = (key: string, content: string) => {
    const updatedReflections = { ...reflections, [key]: content };
    setReflections(updatedReflections);
    localStorage.setItem('reflections', JSON.stringify(updatedReflections));
  };

  const removeReflection = (key: string) => {
    const updatedReflections = { ...reflections };
    delete updatedReflections[key];
    setReflections(updatedReflections);
    localStorage.setItem('reflections', JSON.stringify(updatedReflections));
  };

  return (
    <ReflectionsContext.Provider value={{ reflections, addReflection, removeReflection }}>
      {children}
    </ReflectionsContext.Provider>
  );
}

export function useReflections() {
  const context = useContext(ReflectionsContext);
  if (context === undefined) {
    throw new Error('useReflections must be used within a ReflectionsProvider');
  }
  return context;
}