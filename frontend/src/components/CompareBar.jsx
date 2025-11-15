import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CompareBar.css';

function CompareBar({ selectedItems, productType }) {
  const navigate = useNavigate();

  const handleCompareClick = () => {
    const idsToCompare = selectedItems.map(item => item._id).join(',');
    navigate(`/compare?type=${productType}&ids=${idsToCompare}`);
  };

  return (
    <div className="compare-bar">
      <div className="selected-items">
        <strong>Produits à comparer :</strong>
        {selectedItems.map(item => (
          <span key={item._id} className="item-tag">
            {item.name}
          </span>
        ))}
      </div>
      
      <button 
        className="compare-button" 
        onClick={handleCompareClick}
      >
        Comparer {productType}s ({selectedItems.length})
      </button>
    </div>
  );
}

export default CompareBar;