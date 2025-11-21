import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

function SpecBar({ value, maxValue }) {
  if (!value || !maxValue) {
    return <span>N/A</span>;
  }

  const percentage = (value / maxValue) * 100;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
     
      <ProgressBar 
        now={percentage} 
        style={{ width: '100px', height: '12px' }} 
        variant="info"
      />
     
      <span>{value}</span>
    </div>
  );
}

export default SpecBar;