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


const AVAILABLE_BRANDS = ["Apple", "Samsung", "Google", "Xiaomi", "OnePlus"];

function TelephonePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [telephones, setTelephones] = useState([]);
  

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
        return [...prevList, { ...product, productType: 'telephone' }];
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
    fetch('https://mahamoud-compare-tech-api.onrender.com/api/telephones')
      .then(response => response.json())
      .then(data => setTelephones(data))
      .catch(error => console.error("Erreur:", error));
  }, []);

  const filteredTelephones = telephones.filter(tel => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = tel.name.toLowerCase().includes(searchLower) || 
                          tel.brand.toLowerCase().includes(searchLower);
    
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(tel.brand);

    return matchesSearch && matchesBrand;
  });

  const compareIds = compareList.map(item => item._id);

  return (
    <AnimatedPage>
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
                cpus={filteredTelephones} 
                compareList={compareIds}
                onCompareToggle={handleCompareToggle}
                productType="telephone"
                compareType="telephone"
                maxItems={MAX_COMPARE_ITEMS}
              />
            </main>
          </Col>
        </Row>
      </Container>

      {compareList.length > 0 && (
        <CompareBar 
            selectedItems={compareList} 
            productType="telephone" 
            onClear={() => setCompareList([])}
        />
      )}
    </AnimatedPage>
  );
}

export default TelephonePage;