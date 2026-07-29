import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: '#0f172a', color: '#f1f5f9' }}>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid rgba(37, 99, 235, 0.2)',
          },
        }}
      />
      <Header toggleTheme={toggleTheme} theme={theme} />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;