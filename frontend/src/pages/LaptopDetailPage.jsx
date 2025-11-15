import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

function LaptopDetailPage() {
  const { id } = useParams(); 
  const [laptop, setLaptop] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://mahamoud-compare-tech-api.onrender.com/api/laptops/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Produit non trouvé');
        }
        return response.json();
      })
      .then(data => {
        setLaptop(data);
      })
      .catch(error => {
        console.error("Erreur:", error);
        setError(error.message);
      });
  }, [id]);

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">Erreur : {error}</Alert>
      </Container>
    );
  }

  if (!laptop) {
    return (
      <Container className="my-5">
        <div>Chargement...</div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={8}>
          <h1>{laptop.name}</h1>
          <p className="lead">Spécifications techniques</p>

          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Marque :</strong> {laptop.brand}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Processeur :</strong> {laptop.cpu_name || 'N/A'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Carte Graphique :</strong> {laptop.gpu_name || 'N/A'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>RAM :</strong> {laptop.ram_gb ? `${laptop.ram_gb} GB` : 'N/A'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Stockage :</strong> {laptop.storage_gb ? `${laptop.storage_gb} GB` : 'N/A'}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        
        <Col md={4}>
          
        </Col>
      </Row>
    </Container>
  );
}

export default LaptopDetailPage;