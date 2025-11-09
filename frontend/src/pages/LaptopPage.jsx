import React, {useState, useEffect} from 'react';
import {useOutletContext} from 'react-router-dom';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';

function LaptopPage(){
    const [searchTerm, setSearchTerm]=useState('');
    const [laptops, setLaptops]=useState([]);

    const{compareList, onCompareToggle}=useOutletContext();

    useEffect(()=>{
        fetch('http://localhost:3001/api/laptops')
        .then(response=>response.json())
        .then(data=>setLaptops(data))
        .catch(error=>console.error("Erreur:",error));
    },[]);
    const filteredLaptops = laptops.filter(laptop => {
    const searchLower = searchTerm.toLowerCase();
    const nameMatches = laptop.name.toLowerCase().includes(searchLower);
    const brandMatches = laptop.brand.toLowerCase().includes(searchLower);
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
        cpus={filteredLaptops}
        compareList={compareIds}
        onCompareToggle={onCompareToggle}
        productType="laptop" 
        />
      </main>
    </>
  );
}

export default LaptopPage;