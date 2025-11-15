import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

function TelephoneDetailPage() {
  const { id } = useParams(); 
  const [telephone, setTelephone] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://mahamoud-compare-tech-api.onrender.com/api/telephones/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Produit non trouvé');
        }
        return response.json();
      })
      .then(data => {
        setTelephone(data);
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

  if (!telephone) {
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
          <h1>{telephone.name}</h1>
          <p className="lead">Spécifications techniques</p>

          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Marque :</strong> {telephone.brand}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Écran :</strong> {telephone.display_size || 'N/A'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Processeur :</strong> {telephone.cpu_name || 'N/A'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>RAM :</strong> {telephone.ram_gb ? `${telephone.ram_gb} GB` : 'N/A'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Batterie :</strong> {telephone.battery_mah ? `${telephone.battery_mah} mAh` : 'N/A'}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        
        <Col md={4}>
          
        </Col>
      </Row>
    </Container>
  );
}

export default TelephoneDetailPage;