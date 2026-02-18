import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import Market from './pages/Market';
import Converter from './components/Converter';
import Settings from './pages/Settings';
import { ToastContainer } from './components/Toast';
import { useToast } from './hooks/useToast';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const { toasts, addToast, removeToast } = useToast();

  return (
    <ThemeProvider>
      <Router>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        <Layout addToast={addToast}>
          <Routes>
            <Route path="/" element={<Dashboard addToast={addToast} />} />
            <Route path="/assets" element={<Assets addToast={addToast} />} />
            <Route path="/market" element={<Market addToast={addToast} />} />
            <Route path="/converter" element={<div className="max-w-md mx-auto mt-10"><Converter addToast={addToast} /></div>} />
            <Route path="/settings" element={<Settings addToast={addToast} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
