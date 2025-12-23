import React, { useState, useEffect } from 'react';
import {Outlet} from 'react-router-dom';
import Header from'./components/Header';
import Footer from './components/Footer';
import {Toaster} from 'react-hot-toast';
import AppBreadcrumb from './components/AppBreadcrumb';


function App() {
  const[theme,setTheme]=useState(()=>{  
    return localStorage.getItem('theme')||'light';
});
  const toggleTheme=()=>{
    const newTheme=theme==='light'?'dark':'light';
    setTheme(newTheme);
  };
  useEffect(()=>{
    document.documentElement.setAttribute('data-bs-theme',theme);
      localStorage.setItem('theme',theme);
  },[theme]);

return (
    <div className="d-flex flex-column min-vh-100 bg body text-body">
      <Toaster position="top-center" />
      <Header toggleTheme={toggleTheme} theme={theme} />
      <AppBreadcrumb />
      <div style={{flex: 1}}>
      <Outlet /> 
      </div>
      <Footer />
    </div>
  );
}

export default App;