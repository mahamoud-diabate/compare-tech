import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ProductList.css';

function ProductList({ cpus, compareList = [], onCompareToggle = () => {}, productType = "cpu", compareType }) {

  const getTitle = () => {
    if (productType === 'gpu') return 'Cartes Graphiques (GPUs)';
    if (productType === 'laptop') return 'Ordinateurs Portables';
    if (productType === 'telephone') return 'Téléphones';
    return 'Processeurs (CPUs)';
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">{getTitle()}</h2>
      
      <Row xs={1} md={2} lg={4} className="g-4">
        {cpus.map(product => {
          const isSelected = compareList.includes(product._id);
          const isDisabled = !isSelected && compareType !== null && productType !== compareType;

          return (
            <Col key={product._id}>
              <Card className={`h-100 shadow-sm ${isDisabled ? 'disabled-card' : ''}`}>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  
                  <Form.Check 
                    type="checkbox"
                    id={`compare-${product._id}`}
                    label="Comparer"
                    checked={isSelected}
                    onChange={() => onCompareToggle(product)}
                    disabled={isDisabled}
                  />
                  
                  <ListGroup variant="flush" className="flex-grow-1 mt-3">
                    <ListGroup.Item><strong>Marque:</strong> {product.brand}</ListGroup.Item>
                    
                    {productType === 'cpu' && (
                      <>
                        {product.cores && (<ListGroup.Item><strong>Cœurs:</strong> {product.cores}</ListGroup.Item>)}
                        {product.threads && (<ListGroup.Item><strong>Threads:</strong> {product.threads}</ListGroup.Item>)}
                      </>
                    )}
                    {productType === 'gpu' && (
                      <>
                        {product.cores && (<ListGroup.Item><strong>Cœurs CUDA/Stream:</strong> {product.cores}</ListGroup.Item>)}
                        {product.memory_gb && (<ListGroup.Item><strong>Mémoire:</strong> {product.memory_gb} GB</ListGroup.Item>)}
                      </>
                    )}
                    {productType === 'laptop' && (
                      <>
                        {product.cpu_name && (<ListGroup.Item><strong>CPU:</strong> {product.cpu_name}</ListGroup.Item>)}
                        {product.ram_gb && (<ListGroup.Item><strong>RAM:</strong> {product.ram_gb} GB</ListGroup.Item>)}
                      </>
                    )}
                    {productType === 'telephone' && (
                      <>
                        {product.display_size && (<ListGroup.Item><strong>Écran:</strong> {product.display_size}</ListGroup.Item>)}
                        {product.cpu_name && (<ListGroup.Item><strong>CPU:</strong> {product.cpu_name}</ListGroup.Item>)}
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