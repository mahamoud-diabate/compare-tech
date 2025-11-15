import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

function GpuDetailPage() {
  const { id } = useParams(); 
  const [gpu, setGpu] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://mahamoud-compare-tech-api.onrender.com/api/gpus/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Produit non trouvé');
        }
        return response.json();
      })
      .then(data => {
        setGpu(data);
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

  if (!gpu) {
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
          <h1>{gpu.name}</h1>
          <p className="lead">Spécifications techniques</p>

          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Marque :</strong> {gpu.brand}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Cœurs CUDA/Stream :</strong> {gpu.cores || 'N/A'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Mémoire :</strong> {gpu.memory_gb ? `${gpu.memory_gb} GB` : 'N/A'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Type Mémoire :</strong> {gpu.memory_type || 'N/A'}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        
        <Col md={4}>
          [Image of {gpu.name}]
        </Col>
      </Row>
    </Container>
  );
}

export default GpuDetailPage;