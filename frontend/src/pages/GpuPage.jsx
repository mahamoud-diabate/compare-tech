import React, { useState, useEffect } from 'react';
// On n'a PAS besoin de useOutletContext ici
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import CompareBar from '../components/CompareBar'; // On importe la barre

function GpuPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gpus, setGpus] = useState([]);
  
  // --- ON AJOUTE LA LOGIQUE DE COMPARAISON PROPRE À CETTE PAGE ---
  const [compareList, setCompareList] = useState([]); // Liste d'objets GPU

  const handleCompareToggle = (product) => {
    setCompareList(prevList => {
      const isSelected = prevList.some(item => item._id === product._id);
      if (isSelected) {
        return prevList.filter(item => item._id !== product._id);
      } else {
        return [...prevList, { ...product, productType: 'gpu' }];
      }
    });
  };
  // --- FIN DE LA LOGIQUE ---

  useEffect(() => {
    fetch('https://mahamoud-compare-tech-api.onrender.com/api/gpus')
      .then(response => response.json())
      .then(data => setGpus(data))
      .catch(error => console.error("Erreur:", error));
  }, []);

  const filteredGpus = gpus.filter(gpu => {
    const searchLower = searchTerm.toLowerCase();
    const nameMatches = gpu.name.toLowerCase().includes(searchLower);
    const brandMatches = gpu.brand.toLowerCase().includes(searchLower);
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
          cpus={filteredGpus} 
          compareList={compareIds}
          onCompareToggle={handleCompareToggle}
          productType="gpu"
          compareType="gpu" 
        />
      </main>

      {compareList.length > 0 && (
        <CompareBar selectedItems={compareList} productType="gpu"
        onClear={() => setCompareList([])} />
      )}
    </>
  );
}

export default GpuPage;