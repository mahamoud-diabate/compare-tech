import React, {useState, useEffect} from 'react';
import {useOutletContext} from 'react-router-dom';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';

function GpuPage(){
    const [searchTerm, setSearchTerm]=useState('');
    const [gpus, setGpus]=useState([]);

    const{compareList, onCompareToggle}=useOutletContext();

    useEffect(()=>{
        fetch('http://localhost:3001/api/gpus')
        .then(response=>response.json())
        .then(data=>setGpus(data))
        .catch(error=>console.error("Error:",error));
    },[]);
    const filteredGpus = gpus.filter(gpu => {
    const searchLower = searchTerm.toLowerCase();
    const nameMatches = gpu.name.toLowerCase().includes(searchLower);
    const brandMatches = gpu.brand.toLowerCase().includes(searchLower);
    return nameMatches || brandMatches;
    });

    const compareIds=compareList.map(item=>item._id);

    return (
    <>
      <Hero 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      
      <main>
        <ProductList 
        cpus={filteredGpus}
        compareList={compareIds}
        onCompareToggle={onCompareToggle}
        productType="gpu" 
        />
      </main>
    </>
  );
}

export default GpuPage;