import React from 'react';
import './CompareTable.css';

const CPU_SPECS = [
  { label: 'Marque', key: 'brand' },
  { label: 'Cœurs', key: 'cores' },
  { label: 'Threads', key: 'threads' },
  { label: 'Fréq. Max', key: 'max_freq_ghz' },
  { label: 'Fréq. Base', key: 'base_freq_ghz' },
  { label: 'Score', key: 'score' },
];
const GPU_SPECS = [
  { label: 'Marque', key: 'brand' },
  { label: 'Cœurs CUDA/Stream', key: 'cores' },
  { label: 'Mémoire (GB)', key: 'memory_gb' },
  { label: 'Type Mémoire', key: 'memory_type' },
  { label: 'Score', key: 'score' },
];
const LAPTOP_SPECS = [
  { label: 'Marque', key: 'brand' },
  { label: 'Processeur', key: 'cpu_name' },
  { label: 'Carte Graphique', key: 'gpu_name' },
  { label: 'RAM (GB)', key: 'ram_gb' },
  { label: 'Score', key: 'score' },
];
const TELEPHONE_SPECS = [
  { label: 'Marque', key: 'brand' },
  { label: 'Écran', key: 'display_size' },
  { label: 'Processeur', key: 'cpu_name' },
  { label: 'Batterie (mAh)', key: 'battery_mah' },
  { label: 'Score', key: 'score' },
];

const SPEC_MAP = {
  cpu: CPU_SPECS,
  gpu: GPU_SPECS,
  laptop: LAPTOP_SPECS,
  telephone: TELEPHONE_SPECS,
};

function CompareTable({ products }) {

  const productType = products[0]?.productType || 'cpu'; 
  const specRows = SPEC_MAP[productType];

  return (
    <table className="compare-table">
      <thead>
        <tr>
          <th className="spec-label">Caractéristique</th>
          {products.map(product => (
            <th key={product._id}>
              {product.name}
              {product.productType && (
                <span className={`type-tag ${product.productType}`}>
                  {product.productType}
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {specRows.map(row => (
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