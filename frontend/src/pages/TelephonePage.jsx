import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import CompareBar from '../components/CompareBar';

function TelephonePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [telephones, setTelephones] = useState([]);
  const [compareList, setCompareList] = useState([]);

  const handleCompareToggle = (product) => {
    setCompareList(prevList => {
      const isSelected = prevList.some(item => item._id === product._id);
      if (isSelected) {
        return prevList.filter(item => item._id !== product._id);
      } else {
        return [...prevList, { ...product, productType: 'telephone' }];
      }
    });
  };

  useEffect(() => {
    fetch('https://mahamoud-compare-tech-api.onrender.com/api/telephones')
      .then(response => response.json())
      .then(data => setTelephones(data))
      .catch(error => console.error("Erreur:", error));
  }, []);

  const filteredTelephones = telephones.filter(tel => {
    const searchLower = searchTerm.toLowerCase();
    const nameMatches = tel.name.toLowerCase().includes(searchLower);
    const brandMatches = tel.brand.toLowerCase().includes(searchLower);
    return nameMatches || brandMatches;
  });

  const compareIds = compareList.map(item => item._id);

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
          onCompareToggle={handleCompareToggle}
          productType="telephone"
          compareType="telephone" 
        />
      </main>

      {compareList.length > 0 && (
        <CompareBar selectedItems={compareList} productType="telephone" 
        onClear={() => setCompareList([])}/>
      )}
    </>
  );
}

export default TelephonePage;