import React, {useState} from 'react';
import {Outlet} from 'react-router-dom';
import Header from'./components/Header';
import Footer from './components/Footer';
import CompareBar from './components/CompareBar';
function App() {
  const[compareList,setCompareList]=useState([]);

  const handleCompareToggle=(product,productType)=>{
    setCompareList(prevList=>{
      const isSelected=prevList.some(item=>item._id===product._id);

      if (isSelected){
        return prevList.filter(item=>item._id!==product._id);
      } else{
        return [...prevList,{...product,productType}];
      }
    });
  };
  return(
    <div>
      <Header/>
      <Outlet context={{
        compareList:compareList,
        onCompareToggle:handleCompareToggle
  }}
  />
  {compareList.length>0 &&(
    <CompareBar selectedItems={compareList}/>
  )}
      
      <Footer/>
    </div>
  );
}
export default App;