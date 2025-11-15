import React, {useState} from 'react';
import {Outlet} from 'react-router-dom';
import Header from'./components/Header';
import Footer from './components/Footer';
import {Toaster} from 'react-hot-toast';

function App() {
return (
    <div>
      <Toaster position="top-center" />
      <Header />
      
      <Outlet /> 

      <Footer />
    </div>
  );
}

export default App;