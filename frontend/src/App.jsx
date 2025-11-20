import React, {useState} from 'react';
import {Outlet} from 'react-router-dom';
import Header from'./components/Header';
import Footer from './components/Footer';
import {Toaster} from 'react-hot-toast';

function App() {
  const[theme,setTheme]=useState('light');
  const toggleTheme=()=>{
    const newTheme=theme==='light'?'dark':'light';
    setTheme(newTheme);
  };
  useEffect(()=>{
    document.documentElement.setAttribute('data-bs-theme',theme);
  },[theme]);

return (
    <div className={theme==='dark'? 'bg-dark text-light':'bg-light text-dark'} style={{mineHeight:'100vh',display:'flex',flexDirection:'column'}}>
      <Toaster position="top-center" />
      <Header toggleTheme={toggleTheme} theme={theme} />
      <div style={{flex:1}}>
      <Outlet /> 
      </div>
      <Footer />
    </div>
  );
}

export default App;