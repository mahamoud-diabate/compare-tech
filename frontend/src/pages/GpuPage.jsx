import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import toast from 'react-hot-toast';

import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import CompareBar from '../components/CompareBar';
import FilterSidebar from '../components/FilterSidebar';
import AnimatedPage from '../components/AnimatedPage';

function GpuPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gpus, setGpus] = useState([]);
  
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    memory_gb: []
  });

  const [compareList, setCompareList] = useState([]);
  const MAX_COMPARE_ITEMS = 3;

  const filterOptions = [
    { id: 'brand', label: 'Marque', options: ["Nvidia", "AMD", "Intel"] },
    { id: 'memory_gb', label: 'VRAM', options: [8, 12, 16, 20, 24], unit: 'GB' }
  ];

  const handleFilterChange = (groupId, value) => {
    setSelectedFilters(prev => {
      const groupFilters = prev[groupId] || [];
      const newGroupFilters = groupFilters.includes(value)
        ? groupFilters.filter(item => item !== value)
        : [...groupFilters, value];
      
      return { ...prev, [groupId]: newGroupFilters };
    });
  };

  const handleCompareToggle = (product) => {
    setCompareList(prevList => {
      const isSelected = prevList.some(item => item._id === product._id);
      if (isSelected) return prevList.filter(item => item._id !== product._id);
      if (prevList.length >= MAX_COMPARE_ITEMS) {
          toast.error(`Limite de ${MAX_COMPARE_ITEMS} produits atteinte.`);
          return prevList;
      }
      return [...prevList, { ...product, productType: 'gpu' }];
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
    
    const matchesBrand = selectedFilters.brand.length === 0 || selectedFilters.brand.includes(gpu.brand);
    const matchesMemory = selectedFilters.memory_gb.length === 0 || selectedFilters.memory_gb.includes(gpu.memory_gb);

    return matchesSearch && matchesBrand && matchesMemory;
  });

  const compareIds = compareList.map(item => item._id);

  return (
    <AnimatedPage>
      <Hero searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <Container className="my-5">
        <Row>
          <Col md={3}>
            <FilterSidebar 
              filters={filterOptions}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          </Col>
          
          <Col md={9}>
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
          </Col>
        </Row>
      </Container>

      {compareList.length > 0 && (
        <CompareBar selectedItems={compareList} productType="gpu" onClear={() => setCompareList([])} />
      )}
    </AnimatedPage>
  );
}

export default GpuPage;