import React from 'react';
import Accordion from  'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './CompareTable.css';

const CPU_SPECS = [
  {group:'Specifications de Base',
   spec: [
  { label: 'Marque', key: 'brand' },
  { label: 'Cœurs', key: 'cores' },
  { label: 'Threads', key: 'threads' },
  { label: 'Fréq. Max', key: 'max_freq_ghz' },
  { label: 'Fréq. Base', key: 'base_freq_ghz' },
  {label:'TDP (Watts)', key:'tdp'},
      ]
  },
  {
    group:'Performance (Benchmarks)',
    specs:[
  { label: 'Geekbench (Single)', key: 'geekbench_single' },
  { label: 'Geekbench (Multi)', key: 'geekbench_multi' },
    ]
  },
  {group:'Analyse',
    specs:[
  {label: 'Avantages', key:'pros', type:'liste'},
  {label: 'Inconvenients', key:'cons',type:'liste'}
    ]
  }
];


const GPU_SPECS = [
  {group: 'Specifications de Base',
   specs: [
  { label: 'Marque', key: 'brand' },
  { label: 'Cœurs CUDA/Stream', key: 'cores' },
  { label: 'Mémoire (GB)', key: 'memory_gb' },
  { label: 'Type Mémoire', key: 'memory_type' },
   ]
  },
  {group: 'Performance (Benchmarks)',
    specs:[
  { label: '3DMark Score', key: 'benchmark_3dmark' },
    ]
  },
  {group:'Analyse',
    specs:[
  { label: 'Avantages', key: 'pros', type: 'list' },
  { label: 'Inconvénients', key: 'cons', type: 'list' }
    ]
  }
  ];

  
const LAPTOP_SPECS = [
  {
    group: 'Spécifications Principales',
    specs: [
      { label: 'Marque', key: 'brand' },
      { label: 'Processeur', key: 'cpu_name' },
      { label: 'Carte Graphique', key: 'gpu_name' },
      { label: 'RAM (GB)', key: 'ram_gb' },
      { label: 'Stockage (GB)', key: 'storage_gb' },
    ]
  },
  {
    group: 'Performance (Benchmarks)',
    specs:[
      { label: 'Geekbench (Multi)', key: 'geekbench_multi' },
    ]
  },
  {
    group: 'Analyse',
    specs:[
      { label: 'Avantages', key: 'pros', type: 'list' },
      { label: 'Inconvénients', key: 'cons', type: 'list' }
    ]
  }
];

const TELEPHONE_SPECS = [
  {
    group: 'Spécifications Principales',
    specs: [
      { label: 'Marque', key: 'brand' },
      { label: 'Écran', key: 'display_size' },
      { label: 'Processeur', key: 'cpu_name' },
      { label: 'Batterie (mAh)', key: 'battery_mah' },
    ]
  },
  {
    group: 'Performance (Benchmarks)',
    specs:[
      { label: 'AnTuTu Score', key: 'antutu_score' },
    ]
  },
  {
    group: 'Analyse',
    specs:[
      { label: 'Avantages', key: 'pros', type: 'list' },
      { label: 'Inconvénients', key: 'cons', type: 'list' }
    ]
  }
];

const SPEC_MAP = {
  cpu: CPU_SPECS,
  gpu: GPU_SPECS,
  laptop: LAPTOP_SPECS,
  telephone: TELEPHONE_SPECS,
};

const areValuesIdentical = (products, key) => {
    if (!products || products.length === 0) return true;
    const firstValue = products[0][key] || 'N/A';
    return products.every(product => (product[key] || 'N/A') === firstValue);
};

function CompareTable({ products, showDifferencesOnly }) {

  const productType = products[0]?.productType || 'cpu'; 
  const specGroups = SPEC_MAP[productType] || [];
  
  const areValueIdentical=(products, key) =>{
    if (!products || products.length === 0) return true;
    const firstValue = products[0][key] || 'N/A';
    return products.every(product=>(product[key]||'N/A')===firstValue);
  };

  return (
    <div>
      <Row className="text-center mb-4">
        {products.map(product=>(
          <Col key={product._id}>
            <h3 className="h5">{product.name}</h3>
            <span className={`type-tag ${product.productType}`}>
              {product.productType}
            </span>
            </Col>
        ))}
      </Row>
        
      <Accordion defaultActiveKey="0" alwaysOpen>
        {specGroups.map((group, groupIndex)=>(
          <Accordion.Item eventKey={String(groupIndex)} key={group.group}>
            <Accordion.Header>{group.group}</Accordion.Header>
            <Accordion.Body>
              {group.specs.map(row=>{
                const isIdentical = areVauluesIdentical(product, row.key);
                if (showDifferencesOnly && isIdentical) {
                  return null;
                }
                
                return (
                  <Row key={Row.key} className= "spec-row">
                    <Col xs={12} md={3} className="spec-label">{row.label}</Col>

                    {products.map(product=>(
                      <Col key={product._id} xs={6} md={productType=== 'cpu' ? 4 : 4}>
                        {row.type === 'list' && product[row.key] ? (
                          <ul className="spec-list">
                            {product[row.key].map((item,index)=>(
                              <li key={index}>
                                {row.key === 'pros' ? '✅' : '❌'} {item}
                              </li>
                            ))}
                            </ul>
                        ):(
                          product[row.key] || 'N/A'
                        )}
                      </Col>
                    ))}
                  </Row>
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}
export default CompareTable;