import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function LaptopDetailPage() {
  const { id } = useParams(); 
  const [laptop, setLaptop] = useState(null);

  useEffect(() => {
    fetch(`https://mahamoud-compare-tech-api.onrender.com${id}`)
      .then(response => response.json())
      .then(data => {
        setLaptop(data);
      })
      .catch(error => console.error("Erreur:", error));
  }, [id]);

  if (!laptop) {
    return <div>Chargement...</div>;
  }
  return (
    <main style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{laptop.name}</h1>
      
      <div style={{ maxWidth: '400px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0' }}>
          <strong>Marque :</strong>
          <span>{laptop.brand}</span>
        </div>
        
        {laptop.cpu_name && (
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0' }}>
            <strong>Processeur :</strong>
            <span>{laptop.cpu_name}</span>
          </div>
        )}

        {laptop.gpu_name && (
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0' }}>
            <strong>Carte Graphique :</strong>
            <span>{laptop.gpu_name}</span>
          </div>
        )}

        {laptop.ram_gb && (
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0' }}>
            <strong>RAM :</strong>
            <span>{laptop.ram_gb} GB</span>
          </div>
        )}

        {laptop.storage_gb && (
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0' }}>
            <strong>Stockage :</strong>
            <span>{laptop.storage_gb} GB</span>
          </div>
        )}
      </div>
    </main>
  );
}

export default LaptopDetailPage;