import React from 'react';
import './CompareTable.css';

const ALL_SPECS = [
  { label: 'Marque', key: 'brand' },
  { label: 'Cœurs', key: 'cores' },
  { label: 'Threads', key: 'threads' },
  { label: 'Fréq. Max', key: 'max_freq_ghz' },
  { label: 'Fréq. Base', key: 'base_freq_ghz' },
  { label: 'Mémoire (GB)', key: 'memory_gb' },
  { label: 'Type Mémoire', key: 'memory_type' },

  { label: 'Processeur', key: 'cpu_name' },
  { label: 'Carte Graphique', key: 'gpu_name' },
  { label: 'RAM (GB)', key: 'ram_gb' },
  { label: 'Stockage (GB)', key: 'storage_gb' },

  { label: 'Écran', key: 'display_size' },
  { label: 'Batterie (mAh)', key: 'battery_mah' },
];

function CompareTable({products}){
    return (
    <table className="compare-table">
      <thead>
        <tr>
          <th className="spec-label">Caractéristique</th>
          {products.map(product => (
            <th key={product._id}>
              {product.name}
              <span className={`type-tag ${product.productType}`}>
                {product.productType}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ALL_SPECS.map(row => (
          <tr key={row.key}>
            <td className="spec-label">{row.label}</td>
            
            {products.map(product => (
              <td key={product._id}>
                {product[row.key] || 'N/A'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CompareTable;