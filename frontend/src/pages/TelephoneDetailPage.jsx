import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TelephoneDetailPage() {
  const { id } = useParams(); 
  const [telephone, setTelephone] = useState(null);

  useEffect(() => {
    fetch(`https://mahamoud-compare-tech-api.onrender.com${id}`)
      .then(response => response.json())
      .then(data => {
        setTelephone(data);
      })
      .catch(error => console.error("Erreur:", error));
  }, [id]);

  if (!telephone) {
    return <div>Chargement...</div>;
  }

  return (
    <main style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{telephone.name}</h1>
      
      <div style={{ maxWidth: '400px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0' }}>
          <strong>Marque :</strong>
          <span>{telephone.brand}</span>
        </div>
        
        {telephone.display_size && (
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0' }}>
            <strong>Écran :</strong>
            <span>{telephone.display_size}</span>
          </div>
        )}

        {telephone.cpu_name && (
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0' }}>
            <strong>Processeur :</strong>
            <span>{telephone.cpu_name}</span>
          </div>
        )}

        {telephone.ram_gb && (
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0' }}>
            <strong>RAM :</strong>
            <span>{telephone.ram_gb} GB</span>
          </div>
        )}

        {telephone.battery_mah && (
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0' }}>
            <strong>Batterie :</strong>
            <span>{telephone.battery_mah} mAh</span>
          </div>
        )}
      </div>
    </main>
  );
}

export default TelephoneDetailPage;