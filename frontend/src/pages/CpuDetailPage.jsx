import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CpuDetailPage() {
  const { id } = useParams(); 
  const [cpu, setCpu] = useState(null);

  useEffect(() => {
    fetch(`https://mahamoud-compare-tech-api.onrender.com${id}`)
      .then(response => response.json())
      .then(data => {
        setCpu(data);
      })
      .catch(error => console.error("Erreur:", error));
  }, [id]);

  if (!cpu) {
    return <div>Chargement...</div>;
  }

  return (
    <main style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{cpu.name}</h1>
      
      <div style={{ maxWidth: '400px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0' }}>
          <strong>Marque :</strong>
          <span>{cpu.brand}</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0' }}>
          <strong>Cœurs :</strong>
          <span>{cpu.cores}</span>
        </div>

        {cpu.threads && (
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0' }}>
            <strong>Threads :</strong>
            <span>{cpu.threads}</span>
          </div>
        )}

        {cpu.max_freq_ghz && (
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0' }}>
            <strong>Fréquence Max :</strong>
            <span>{cpu.max_freq_ghz}</span>
          </div>
        )}

        {cpu.base_freq_ghz && (
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0' }}>
            <strong>Fréquence de Base :</strong>
            <span>{cpu.base_freq_ghz}</span>
          </div>
        )}
      </div>
    </main>
  );
}

export default CpuDetailPage;