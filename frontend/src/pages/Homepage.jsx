import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import toast from 'react-hot-toast';

import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import CompareBar from '../components/CompareBar';
import FilterSidebar from '../components/FilterSidebar';

const AVAILABLE_BRANDS = ["Intel", "AMD"];

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cpus, setCpus] = useState([]);
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
        return [...prevList, { ...product, productType: 'cpu' }];
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
    fetch('https://mahamoud-compare-tech-api.onrender.com/api/cpus')
      .then(response => response.json())
      .then(data => setCpus(data))
      .catch(error => console.error("Erreur:", error));
  }, []);

  const filteredCpus = cpus.filter(cpu => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = cpu.name.toLowerCase().includes(searchLower) || 
                          cpu.brand.toLowerCase().includes(searchLower);
    
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(cpu.brand);

    return matchesSearch && matchesBrand;
  });

  const compareIds = compareList.map(item => item._id);

  return (
    <>
      <Hero 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      
      <Container className="my-5">
        <Row>
          <Col md={3}>
            <FilterSidebar 
              brands={AVAILABLE_BRANDS}
              selectedBrands={selectedBrands}
              onBrandChange={handleBrandChange}
            />
          </Col>
          
          <Col md={9}>
          <main>
            <ProductList 
              cpus={filteredCpus} 
              compareList={compareIds}
              onCompareToggle={handleCompareToggle}
              productType="cpu"
              compareType="cpu"
              maxItems={MAX_COMPARE_ITEMS}
              />
            </main>

          </Col>
        </Row>
      </Container>

      {compareList.length > 0 && (
        <CompareBar selectedItems={compareList} productType="cpu"
        onClear={()=>setCompareList([])}
        />
      )}
    </>
  );
}

export default HomePage;