import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function SimilarProducts({ currentId, category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
   
    fetch(`https://mahamoud-compare-tech-api.onrender.com/api/${category}`)
      .then(res => res.json())
      .then(data => {
      
        const others = data.filter(p => p._id !== currentId);
        
        setProducts(others.slice(0, 3));
      })
      .catch(err => console.error(err));
  }, [category, currentId]);

  if (products.length === 0) return null;

  const typeSingular = category.slice(0, -1); 

  return (
    <div className="mt-5">
      <h3 className="mb-4">Ces produits pourraient vous intéresser</h3>
      <Row xs={1} md={3} className="g-4">
        {products.map(product => (
          <Col key={product._id}>
            <Card className="h-100 shadow-sm border-0">
              
              {product.imageUrl && (
                <Card.Img 
                  variant="top" 
                  src={product.imageUrl} 
                  style={{ maxHeight: '150px', objectFit: 'contain', padding: '10px' }}
                />
              )}

              <Card.Body className="text-center">
                <Card.Title style={{ fontSize: '1rem' }}>{product.name}</Card.Title>
                <Link to={`/${typeSingular}/${product._id}`}>
                  <Button variant="outline-primary" size="sm" className="mt-2">
                    Voir la fiche
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default SimilarProducts;