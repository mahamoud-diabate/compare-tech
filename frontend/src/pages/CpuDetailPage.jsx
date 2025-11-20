import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import { getProductScore, getScoreColor } from '../utils/scores';
import SimilarProducts from '../components/SimilarProducts';

function CpuDetailPage() {
  const { id } = useParams(); 
  const [cpu, setCpu] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://mahamoud-compare-tech-api.onrender.com/api/cpus/${id}`)
      .then(response => {
        if (!response.ok) { throw new Error('Produit non trouvé'); }
        return response.json();
      })
      .then(data => setCpu(data))
      .catch(error => setError(error.message));
  }, [id]);

  if (error) return <Container className="my-5"><Alert variant="danger">Erreur : {error}</Alert></Container>;
  if (!cpu) return <Container className="my-5"><div>Chargement...</div></Container>;

  const score = getProductScore(cpu, 'cpu');
  const scoreColor = getScoreColor(score);

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <h1>{cpu.name}</h1>
        <div className="text-center">
          <h5 className="text-muted mb-0">Score CompareTech</h5>
          <Badge bg={scoreColor} style={{ fontSize: '2rem', borderRadius: '50px', padding: '10px 25px' }}>
            {score}
          </Badge>
        </div>
      </div>

      <Row>
        <Col md={4} className="mb-4">
           <Card className="h-100 border-0 shadow-sm bg-light d-flex align-items-center justify-content-center">
             <div className="p-5 text-muted">Image du CPU</div>
           </Card>
        </Col>

        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header as="h5" className="bg-white fw-bold">Spécifications Techniques</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between">
                <strong>Marque</strong> <span>{cpu.brand}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between">
                <strong>Cœurs</strong> <span>{cpu.cores}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between">
                <strong>Threads</strong> <span>{cpu.threads || 'N/A'}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between">
                <strong>Fréquence Max</strong> <span>{cpu.max_freq_ghz || 'N/A'}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between">
                <strong>TDP</strong> <span>{cpu.tdp ? `${cpu.tdp} W` : 'N/A'}</span>
              </ListGroup.Item>
              
              <ListGroup.Item className="bg-light fw-bold mt-2">Benchmarks</ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between">
                <span>Geekbench (Single-Core)</span> 
                <span className="fw-bold">{cpu.geekbench_single || 'N/A'}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between">
                <span>Geekbench (Multi-Core)</span> 
                <span className="fw-bold">{cpu.geekbench_multi || 'N/A'}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Card className="h-100 border-success shadow-sm" style={{borderLeft: '5px solid #198754'}}>
            <Card.Body>
              <h4 className="text-success mb-3">✅ Avantages</h4>
              <ul className="list-unstyled">
                {cpu.pros && cpu.pros.map((pro, i) => (
                  <li key={i} className="mb-2">✓ {pro}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mt-3 mt-md-0">
          <Card className="h-100 border-danger shadow-sm" style={{borderLeft: '5px solid #dc3545'}}>
            <Card.Body>
              <h4 className="text-danger mb-3">❌ Inconvénients</h4>
              <ul className="list-unstyled">
                {cpu.cons && cpu.cons.map((con, i) => (
                  <li key={i} className="mb-2">✕ {con}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <SimilarProducts currentId={id} category="cpus" />
    </Container>
  );
}

export default CpuDetailPage;