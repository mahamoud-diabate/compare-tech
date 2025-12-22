import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import './ProductList.css';
// Import des fonctions de calcul corrigées
import { getProductScore, getScoreColor } from '../utils/scores'; 

function ProductList({ cpus, compareList = [], onCompareToggle = () => {}, productType = "cpu", compareType }) {
  
  const [sortOption, setSortOption] = useState('score-desc');

  const getTitle = () => {
    if (productType === 'gpus') return 'Cartes Graphiques (GPUs)';
    if (productType === 'laptops') return 'Ordinateurs Portables';
    if (productType === 'telephones') return 'Téléphones';
    return 'Processeurs (CPUs)';
  };

  const getBadges = (product) => {
    const badges = [];
    const type = product.productType || productType;

    if (type.includes('cpu')) {
        if (product.geekbench_single >= 2800) badges.push({ label: 'Gaming', bg: 'danger' });
        if (product.geekbench_multi >= 20000) badges.push({ label: 'Workstation', bg: 'info' });
        if (product.tdp && product.tdp <= 65) badges.push({ label: 'Éco', bg: 'success' });
    }
    else if (type.includes('gpu')) {
        if (product.benchmark_3dmark >= 25000) badges.push({ label: '4K', bg: 'danger' });
        else if (product.benchmark_3dmark >= 15000) badges.push({ label: '1440p', bg: 'primary' });
    }
    else if (type.includes('laptop')) {
        if (product.gpu_name && (product.gpu_name.includes('RTX') || product.gpu_name.includes('RX'))) {
            badges.push({ label: 'Gamer', bg: 'danger' });
        }
        if (product.battery_life_hours >= 12) badges.push({ label: 'Marathon', bg: 'success' });
        if (product.display_brightness_nits >= 500) badges.push({ label: 'Écran Pro', bg: 'info' });
    }
    else if (type.includes('telephone')) {
        if (product.antutu_score >= 1500000) badges.push({ label: 'Flagship', bg: 'danger' });
        if (product.battery_mah >= 5000) badges.push({ label: 'Endurance', bg: 'success' });
    }
    return badges;
  };

  const sortedProducts = [...cpus].sort((a, b) => {
    if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
    if (sortOption === 'name-desc') return b.name.localeCompare(a.name);
    const scoreA = getProductScore(a, productType);
    const scoreB = getProductScore(b, productType);
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
      
      <Row xs={1} md={2} lg={4} className="g-4 align-items-stretch">
        {sortedProducts.map(product => {
          const isSelected = compareList.includes(product._id);
          const isDisabled = !isSelected && compareType !== null && compareType !== undefined && productType !== compareType;
          const score = getProductScore(product, productType);
          const badges = getBadges(product);

          return (
            <Col key={product._id} className="d-flex">
              <Card className={`w-100 shadow-sm border-0 d-flex flex-column bg-body-tertiary ${isDisabled ? 'disabled-card' : ''}`} style={{ transition: 'transform 0.2s' }}>
                
                {score > 0 && (
                  <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
                    <Badge bg={getScoreColor(score)} pill className="shadow border border-light py-2 px-3 fw-bold" style={{fontSize: '0.9rem'}}>
                      {score}
                    </Badge>
                  </div>
                )}

                <div className="d-flex align-items-center justify-content-center bg-white rounded-top p-3" style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                   {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                   ) : (
                      <div className="text-muted text-center opacity-50">
                        <span style={{fontSize: '3rem'}}>📷</span>
                      </div>
                   )}
                </div>

                <Card.Body className="d-flex flex-column p-3">
                  
                  <div className="mb-2 d-flex align-items-start gap-1 flex-wrap" style={{ height: '25px', overflow: 'hidden' }}>
                    {badges.map((b, i) => (
                        <Badge key={i} bg={b.bg} style={{fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.5px'}}>{b.label}</Badge>
                    ))}
                  </div>

                  <Card.Title 
                    className="fw-bold mb-1 text-center text-dark" 
                    style={{ 
                        height: '50px', 
                        fontSize: '1.1rem',
                        display: '-webkit-box', 
                        WebkitLineClamp: 2, 
                        WebkitBoxOrient: 'vertical', 
                        overflow: 'hidden',
                        lineHeight: '1.2'
                    }}
                    title={product.name}
                  >
                    {product.name}
                  </Card.Title>
                  
                  <Card.Text className="text-muted small mb-3 text-center text-uppercase fw-bold" style={{ height: '15px', fontSize: '0.75rem' }}>
                    {product.brand}
                  </Card.Text>

                  <div className="mb-4 pt-2 border-top border-light-subtle" style={{ height: '65px' }}>
                     {productType.includes('cpu') && (
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <div className="text-center px-3">
                                <div className="fw-bold fs-5 text-dark">{product.cores}</div>
                                <div className="text-muted" style={{fontSize: '0.7rem'}}>CŒURS</div>
                            </div>
                            <div style={{width: '1px', height: '30px', backgroundColor: '#dee2e6'}}></div>
                            <div className="text-center px-3">
                                <div className="fw-bold fs-5 text-dark">{product.max_freq_ghz}</div>
                                <div className="text-muted" style={{fontSize: '0.7rem'}}>GHZ</div>
                            </div>
                        </div>
                     )}

                     {productType.includes('laptop') && (
                        <div className="d-flex flex-column justify-content-center align-items-center h-100 small">
                           <div className="fw-bold text-dark text-truncate w-100 text-center">{product.cpu_name}</div>
                           <div className="text-muted">{product.ram_gb} GB RAM</div>
                        </div>
                     )}

                     {productType.includes('gpu') && (
                         <div className="d-flex justify-content-center align-items-center h-100">
                             <div className="text-center px-3">
                                 <div className="fw-bold fs-5 text-dark">{product.memory_gb}</div>
                                 <div className="text-muted" style={{fontSize: '0.7rem'}}>GB VRAM</div>
                             </div>
                         </div>
                     )}

                     {productType.includes('telephone') && (
                         <div className="d-flex justify-content-center align-items-center h-100">
                            <div className="text-center px-2">
                                <div className="fw-bold text-dark">{product.storage_gb} <span style={{fontSize: '0.7rem'}}>GB</span></div>
                            </div>
                            <div style={{width: '1px', height: '20px', backgroundColor: '#dee2e6'}} className="mx-2"></div>
                            <div className="text-center px-2">
                                <div className="fw-bold text-dark">{product.battery_mah} <span style={{fontSize: '0.7rem'}}>mAh</span></div>
                            </div>
                         </div>
                     )}
                  </div>

                  <div className="mt-auto">
                    <Form.Check 
                      type="checkbox"
                      id={`compare-${product._id}`}
                      label={isSelected ? "Sélectionné" : "Comparer"}
                      checked={isSelected}
                      onChange={() => onCompareToggle(product)}
                      disabled={isDisabled}
                      className={`mb-2 small fw-bold d-flex justify-content-center ${isSelected ? "text-primary" : "text-muted"}`}
                    />

                    <LinkContainer to={`/${productType}/${product._id}`}>
                       <Button variant={isSelected ? "primary" : "outline-dark"} className="w-100 rounded-2 fw-bold btn-sm py-2">
                         Voir fiche technique
                       </Button>
                    </LinkContainer>
                  </div>
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