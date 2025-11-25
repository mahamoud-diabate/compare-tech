import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import CompareBar from '../components/CompareBar';
import toast from 'react-hot-toast';
import FilterSidebar from '../components/FilterSidebar';
import AnimatedPage from '../components/AnimatedPage';

const AVAILABLE_BRANDS = ["Nvidia", "AMD", "Intel"];

function GpuPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gpus, setGpus] = useState([]);
  

  const [selectedBrands, setSelectedBrands] = useState([]);
  
  const [compareList, setCompareList] = useState([]);
  const MAX_COMPARE_ITEMS = 3;

  const handleCompareToggle = (product) => {
    setCompareList(prevList => {
      const isSelected = prevList.some(item => item._id === product._id);

      if (isSelected) {
        return prevList.filter(item => item._id !== product._id);
      } else {
        if (prevList.length >= MAX_COMPARE_ITEMS) {
          toast.error(`Limite de ${MAX_COMPARE_ITEMS} produits atteinte.`);
          return prevList;
        }
        return [...prevList, { ...product, productType: 'gpu' }];
      }
    });
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand)) {
        return prev.filter(b => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };

  useEffect(() => {
    fetch('https://mahamoud-compare-tech-api.onrender.com/api/gpus')
      .then(response => response.json())
      .then(data => setGpus(data))
      .catch(error => console.error("Erreur:", error));
  }, []);

  const filteredGpus = gpus.filter(gpu => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = gpu.name.toLowerCase().includes(searchLower) || 
                          gpu.brand.toLowerCase().includes(searchLower);
    
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(gpu.brand);

    return matchesSearch && matchesBrand;
  });

  const compareIds = compareList.map(item => item._id);

  return (
    <AnimatedPage>
      <Hero 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      
      <div className="container my-5">
        <div className="row">
          <div className="col-md-3">
            <FilterSidebar 
              brands={AVAILABLE_BRANDS}
              selectedBrands={selectedBrands}
              onBrandChange={handleBrandChange}
            />
          </div>
          
          <div className="col-md-9">
            <main>
              <ProductList 
                cpus={filteredGpus} 
                compareList={compareIds}
                onCompareToggle={handleCompareToggle}
                productType="gpu"
                compareType="gpu"
                maxItems={MAX_COMPARE_ITEMS}
              />
            </main>
          </div>
        </div>
      </div>

      {compareList.length > 0 && (
        <CompareBar 
          selectedItems={compareList} 
          productType="gpu" 
          onClear={() => setCompareList([])} 
        />
      )}
    </AnimatedPage>
  );
}

export default GpuPage;