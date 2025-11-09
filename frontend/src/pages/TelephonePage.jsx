import React, {useState, useEffect} from 'react';
import {useOutletContext} from 'react-router-dom';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';

function TelephonePage(){
    const [searchTerm, setSearchTerm]=useState('');
    const [telephones, setTelephones]=useState([]);

    const{compareList, onCompareToggle}=useOutletContext();

    useEffect(()=>{
        fetch('https://mahamoud-compare-tech-api.onrender.com')
        .then(response=>response.json())
        .then(data=>setTelephones(data))
        .catch(error=>console.error("Erreur:",error));
    },[]);
    const filteredTelephones = telephones.filter(tel => {
    const searchLower = searchTerm.toLowerCase();
    const nameMatches = tel.name.toLowerCase().includes(searchLower);
    const brandMatches = tel.brand.toLowerCase().includes(searchLower);
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
        cpus={filteredTelephones}
        compareList={compareIds}
        onCompareToggle={onCompareToggle}
        productType="telephone" 
        />
      </main>
    </>
  );
}

export default TelephonePage;