import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

function CpuDetailPage() {
  const { id } = useParams(); 
  const [cpu, setCpu] = useState(null);
  const [error, setError]=useState(null);

  useEffect(() => {
    fetch(`https://mahamoud-compare-tech-api.onrender.com/api/cpus/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Produit non trouvé');
        }
        return response.json();
      })
      .then(data => {
        setCpu(data);
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

  if (!cpu) {
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
          <h1>{cpu.name}</h1>
          <p className="lead">Spécifications techniques</p>

          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Marque :</strong> {cpu.brand}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Cœurs :</strong> {cpu.cores}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Threads :</strong> {cpu.threads || 'N/A'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Fréquence Max :</strong> {cpu.max_freq_ghz || 'N/A'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Fréquence de Base :</strong> {cpu.base_freq_ghz || 'N/A'}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        
        <Col md={4}>
        </Col>
      </Row>
    </Container>
  );
}

export default CpuDetailPage;
