import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ReflectionsProvider } from './contexts/ReflectionsContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReflectionsProvider>
      <App />
    </ReflectionsProvider>
  </StrictMode>
);