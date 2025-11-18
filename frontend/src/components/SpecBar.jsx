import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

// Ce composant reçoit une valeur (ex: 2950)
// et une valeur maximale (ex: 3000)
function SpecBar({ value, maxValue }) {
  if (!value || !maxValue) {
    return <span>N/A</span>;
  }

  // On calcule le pourcentage (ex: 2950 / 3000 * 100 = 98.3%)
  const percentage = (value / maxValue) * 100;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* 1. La barre de progression Bootstrap */}
      <ProgressBar 
        now={percentage} 
        style={{ width: '100px', height: '12px' }} 
        variant="info"
      />
      {/* 2. La valeur en texte */}
      <span>{value}</span>
    </div>
  );
}

export default SpecBar;