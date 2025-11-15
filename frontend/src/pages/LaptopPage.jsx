import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import CompareBar from '../components/CompareBar';

function LaptopPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [laptops, setLaptops] = useState([]);
  const [compareList, setCompareList] = useState([]);

  const handleCompareToggle = (product) => {
    setCompareList(prevList => {
      const isSelected = prevList.some(item => item._id === product._id);
      if (isSelected) {
        return prevList.filter(item => item._id !== product._id);
      } else {
        return [...prevList, { ...product, productType: 'laptop' }];
      }
    });
  };

  useEffect(() => {
    fetch('https://mahamoud-compare-tech-api.onrender.com/api/laptops')
      .then(response => response.json())
      .then(data => setLaptops(data))
      .catch(error => console.error("Erreur:", error));
  }, []);

  const filteredLaptops = laptops.filter(laptop => {
    const searchLower = searchTerm.toLowerCase();
    const nameMatches = laptop.name.toLowerCase().includes(searchLower);
    const brandMatches = laptop.brand.toLowerCase().includes(searchLower);
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
          cpus={filteredLaptops} 
          compareList={compareIds}
          onCompareToggle={handleCompareToggle}
          productType="laptop"
          compareType="laptop" 
        />
      </main>

      {compareList.length > 0 && (
        <CompareBar selectedItems={compareList} productType="laptop" />
      )}
    </>
  );
}

export default LaptopPage;