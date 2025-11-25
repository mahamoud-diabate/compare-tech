import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import './ProductList.css';

// --- Algorithmes de score (inchangés) ---
const calculateCpuScore = (cpu) => {
  if (!cpu.geekbench_single || !cpu.geekbench_multi) return 0;
  const multi = (cpu.geekbench_multi / 22000) * 100;
  const single = (cpu.geekbench_single / 3000) * 100;
  return Math.round((multi * 0.7) + (single * 0.3));
};
const calculateGpuScore = (gpu) => {
  if (!gpu.benchmark_3dmark) return 0;
  return Math.round((gpu.benchmark_3dmark / 30000) * 100);
};
const calculateTelephoneScore = (tel) => {
  if (!tel.antutu_score) return 0;
  return Math.round((tel.antutu_score / 2500000) * 100);
};
const calculateLaptopScore = (laptop) => {
  if (!laptop.geekbench_multi) return 0;
  return Math.round((laptop.geekbench_multi / 22000) * 100);
};

function ProductList({ cpus, compareList = [], onCompareToggle = () => {}, productType = "cpu", compareType }) {
  
  const [sortOption, setSortOption] = useState('score-desc');

  const getTitle = () => {
    if (productType === 'gpu') return 'Cartes Graphiques (GPUs)';
    if (productType === 'laptop') return 'Ordinateurs Portables';
    if (productType === 'telephone') return 'Téléphones';
    return 'Processeurs (CPUs)';
  };

  const getScoreColor = (score) => {
    if (!score || score === 0) return 'secondary';
    if (score >= 90) return 'success';
    if (score >= 70) return 'primary';
    if (score >= 50) return 'warning';
    return 'danger';
  };

  const getProductScore = (product) => {
    if (product.score) return product.score;
    if (productType === 'cpu') return calculateCpuScore(product);
    if (productType === 'gpu') return calculateGpuScore(product);
    if (productType === 'telephone') return calculateTelephoneScore(product);
    if (productType === 'laptop') return calculateLaptopScore(product);
    return 0;
  };

  // --- NOUVEAU : Logique des Badges d'Usage ---
  const getBadges = (product) => {
    const badges = [];
    // On s'assure d'avoir le bon type
    const type = product.productType || productType;

    if (type === 'cpu') {
        if (product.geekbench_single >= 2800) badges.push({ label: 'Gaming 🎮', bg: 'danger' });
        if (product.geekbench_multi >= 20000) badges.push({ label: 'Workstation 🏗️', bg: 'info' });
        if (product.tdp && product.tdp <= 65) badges.push({ label: 'Éco 🌱', bg: 'success' });
    }
    else if (type === 'gpu') {
        if (product.benchmark_3dmark >= 25000) badges.push({ label: '4K Gaming 🖥️', bg: 'danger' });
        else if (product.benchmark_3dmark >= 15000) badges.push({ label: '1440p Gaming 🎯', bg: 'primary' });
        if (product.memory_gb >= 20) badges.push({ label: 'Créateur 🎨', bg: 'warning' });
    }
    else if (type === 'laptop') {
        // Si le nom du GPU contient "RTX" ou "RX", c'est souvent un PC Gamer
        if (product.gpu_name && (product.gpu_name.includes('RTX') || product.gpu_name.includes('RX'))) {
            badges.push({ label: 'Gamer 🎮', bg: 'danger' });
        }
        if (product.display_brightness_nits >= 500) badges.push({ label: 'Écran Pro 👁️', bg: 'info' });
        if (product.battery_life_hours >= 12) badges.push({ label: 'Marathon 🔋', bg: 'success' });
    }
    else if (type === 'telephone') {
        if (product.antutu_score >= 1500000) badges.push({ label: 'Flagship 🚀', bg: 'danger' });
        if (product.battery_mah >= 5000) badges.push({ label: 'Endurance 🔋', bg: 'success' });
    }
    
    return badges;
  };

  // Logique de tri
  const sortedProducts = [...cpus].sort((a, b) => {
    if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
    if (sortOption === 'name-desc') return b.name.localeCompare(a.name);
    
    const scoreA = getProductScore(a);
    const scoreB = getProductScore(b);

    if (sortOption === 'score-desc') return scoreB - scoreA;
    if (sortOption === 'score-asc') return scoreA - scoreB;
    return 0;
  });

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="display-5 fw-bold mb-0">{getTitle()}</h2>
        
        <Form.Select 
          style={{ width: '200px' }} 
          value={sortOption} 
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="score-desc">⚡ Score (Haut → Bas)</option>
          <option value="score-asc">🐌 Score (Bas → Haut)</option>
          <option value="name-asc">🔤 Nom (A → Z)</option>
          <option value="name-desc">🔤 Nom (Z → A)</option>
        </Form.Select>
      </div>
      
      <Row xs={1} md={2} lg={4} className="g-4">
        {sortedProducts.map(product => {
          const isSelected = compareList.includes(product._id);
          const isDisabled = !isSelected && compareType !== null && productType !== compareType;
          const score = getProductScore(product);
          
          // Calcul des badges
          const badges = getBadges(product);

          return (
            <Col key={product._id}>
              <Card className={`h-100 ${isDisabled ? 'disabled-card' : ''}`}>
                
                {score > 0 && (
                  <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
                    <Badge bg={getScoreColor(score)} style={{ fontSize: '1.1rem', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                      {score}
                    </Badge>
                  </div>
                )}

                {product.imageUrl && (
                  <Card.Img 
                    variant="top" 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="product-card-image"
                  />
                )}

                <Card.Body className="d-flex flex-column text-center pt-0">
                  <Card.Title className="mb-2">{product.name}</Card.Title>
                  
                  {/* --- AFFICHAGE DES BADGES --- */}
                  <div className="mb-3" style={{ minHeight: '25px' }}>
                      {badges.map((badge, index) => (
                          <Badge key={index} bg={badge.bg} className="me-1 mb-1">
                              {badge.label}
                          </Badge>
                      ))}
                  </div>

                  <Form.Check 
                    type="checkbox"
                    id={`compare-${product._id}`}
                    label="Comparer"
                    checked={isSelected}
                    onChange={() => onCompareToggle(product)}
                    disabled={isDisabled}
                    className="mb-3 custom-checkbox"
                  />
                  
                  <ListGroup variant="flush" className="text-start mb-3 small-specs">
                    <ListGroup.Item><strong>Marque:</strong> <span>{product.brand}</span></ListGroup.Item>
                    
                    {productType === 'cpu' && (
                      <>
                        {product.cores && (<ListGroup.Item><strong>Cœurs:</strong> <span>{product.cores}</span></ListGroup.Item>)}
                        {product.threads && (<ListGroup.Item><strong>Threads:</strong> <span>{product.threads}</span></ListGroup.Item>)}
                      </>
                    )}
                    {productType === 'gpu' && (
                      <>
                        {product.cores && (<ListGroup.Item><strong>Cœurs:</strong> <span>{product.cores}</span></ListGroup.Item>)}
                        {product.memory_gb && (<ListGroup.Item><strong>VRAM:</strong> <span>{product.memory_gb} GB</span></ListGroup.Item>)}
                      </>
                    )}
                    {productType === 'laptop' && (
                      <>
                        {product.cpu_name && (<ListGroup.Item><strong>CPU:</strong> <span>{product.cpu_name}</span></ListGroup.Item>)}
                        {product.ram_gb && (<ListGroup.Item><strong>RAM:</strong> <span>{product.ram_gb} GB</span></ListGroup.Item>)}
                      </>
                    )}
                    {productType === 'telephone' && (
                      <>
                        {product.display_size && (<ListGroup.Item><strong>Écran:</strong> <span>{product.display_size}</span></ListGroup.Item>)}
                        {product.battery_mah && (<ListGroup.Item><strong>Batterie:</strong> <span>{product.battery_mah} mAh</span></ListGroup.Item>)}
                      </>
                    )}
                  </ListGroup>
                  
                  <LinkContainer to={`/${productType}/${product._id}`} className="mt-auto">
                    <Button variant="outline-primary">Voir les détails</Button>
                  </LinkContainer>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default ProductList;