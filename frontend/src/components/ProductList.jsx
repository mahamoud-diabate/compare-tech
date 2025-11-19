import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import './ProductList.css';

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
    if (productType === 'cpu') return calculateCpuScore(product);
    if (productType === 'gpu') return calculateGpuScore(product);
    if (productType === 'telephone') return calculateTelephoneScore(product);
    if (productType === 'laptop') return calculateLaptopScore(product);
    return 0;
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 display-5 fw-bold">{getTitle()}</h2>
      
      <Row xs={1} md={2} lg={4} className="g-4">
        {cpus.map(product => {
          const isSelected = compareList.includes(product._id);
          const isDisabled = !isSelected && compareType !== null && productType !== compareType;
          
          const score = getProductScore(product);

          return (
            <Col key={product._id}>
              <Card className={`h-100 ${isDisabled ? 'disabled-card' : ''}`}>
                
                {score > 0 && (
                  <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
                    <Badge bg={getScoreColor(score)} style={{ fontSize: '1.1rem' }}>
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

                <Card.Body className="d-flex flex-column text-center">
                  <Card.Title>{product.name}</Card.Title>
                  
                  <Form.Check 
                    type="checkbox"
                    id={`compare-${product._id}`}
                    label="Comparer"
                    checked={isSelected}
                    onChange={() => onCompareToggle(product)}
                    disabled={isDisabled}
                    className="mb-3"
                  />
                  
                  <ListGroup variant="flush" className="text-start mb-3">
                    <ListGroup.Item><strong>Marque:</strong> <span>{product.brand}</span></ListGroup.Item>
                    
                    {productType === 'cpu' && (
                      <>
                        {product.cores && (<List