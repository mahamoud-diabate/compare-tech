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
      <h2 className="text-center mb-4 display-5 fw-bold">{getTitle()}</h2>
      
      <Row xs={1} md={2} lg={4} className="g-4">
        {cpus.map(product => {
          const isSelected = compareList.includes(product._id);
          const isDisabled = !isSelected && compareType !== null && productType !== compareType;

          return (
            <Col key={product._id}>
              <Card className={`h-100 shadow-sm ${isDisabled ? 'disabled-card' : ''}`}>
                
                {/* --- NOUVEAU : Affichage de l'image de la carte --- */}
                {product.imageUrl && (
                  <Card.Img 
                    variant="top" 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="product-card-image"
                  />
                )}
                {/* --- FIN NOUVEAU --- */}

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
                        {product.cores && (<ListGroup.Item><strong>Cœurs:</strong> <span>{product.cores}</span></ListGroup.Item>)}
                        {product.threads && (<ListGroup.Item><strong>Threads:</strong> <span>{product.threads}</span></ListGroup.Item>)}
                      </>
                    )}
                    {productType === 'gpu' && (
                      <>
                        {product.cores && (<ListGroup.Item><strong>Cœurs CUDA:</strong> <span>{product.cores}</span></ListGroup.Item>)}
                        {product.memory_gb && (<ListGroup.Item><strong>Mémoire:</strong> <span>{product.memory_gb} GB</span></ListGroup.Item>)}
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
                        {product.cpu_name && (<ListGroup.Item><strong>CPU:</strong> <span>{product.cpu_name}</span></ListGroup.Item>)}
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