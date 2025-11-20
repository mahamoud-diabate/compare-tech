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
import SpecBar from '../components/SpecBar';
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
      {/* En-tête */}
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <h1 className="fw-bold mb-0">{cpu.name}</h1>
          <span className="text-muted">{cpu.brand} Processor</span>
        </div>
        <div className="text-center">
          <div className="text-uppercase small text-muted fw-bold mb-1">Score Global</div>
          <Badge bg={scoreColor} style={{ fontSize: '2.5rem', borderRadius: '12px', padding: '15px 30px' }}>
            {score}
          </Badge>
        </div>
      </div>

      <Row>
        <Col md={4} className="mb-4">
           <Card className="h-100 border-0 shadow-sm bg-white d-flex align-items-center justify-content-center overflow-hidden">
             {cpu.imageUrl ? (
                <img src={cpu.imageUrl} alt={cpu.name} style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }} />
             ) : (
                <div className="p-5 text-muted">Pas d'image</div>
             )}
           </Card>
        </Col>

        <Col md={8}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white fw-bold border-bottom py-3">Spécifications Techniques</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                <span>Cœurs / Threads</span>
                <span className="fw-bold">{cpu.cores} Cœurs / {cpu.threads} Threads</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                <span>Fréquence Max</span>
                <span className="fw-bold">{cpu.max_freq_ghz || 'N/A'}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                <span>TDP (Consommation)</span>
                <span className="fw-bold">{cpu.tdp ? `${cpu.tdp} W` : 'N/A'}</span>
              </ListGroup.Item>
              
             
              <ListGroup.Item className="bg-light fw-bold mt-3">Performance (Geekbench 6)</ListGroup.Item>
              
              <ListGroup.Item className="py-3">
                <div className="d-flex justify-content-between mb-2">
                    <span>Single-Core</span>
                    <strong>{cpu.geekbench_single || 'N/A'}</strong>
                </div>
               
                <SpecBar value={cpu.geekbench_single} maxValue={3000} />
              </ListGroup.Item>

              <ListGroup.Item className="py-3">
                <div className="d-flex justify-content-between mb-2">
                    <span>Multi-Core</span>
                    <strong>{cpu.geekbench_multi || 'N/A'}</strong>
                </div>
                <SpecBar value={cpu.geekbench_multi} maxValue={22000} />
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>

     
      <Row className="mt-4">
        <Col md={6} className="mb-3">
          <Card className="h-100 border-0 shadow-sm" style={{ borderTop: '4px solid #198754' }}>
            <Card.Body>
              <h5 className="text-success mb-3 fw-bold">✅ Points Forts</h5>
              <ul className="list-unstyled mb-0">
                {cpu.pros && cpu.pros.map((pro, i) => (
                  <li key={i} className="mb-2 d-flex align-items-start">
                    <span className="me-2">👍</span> {pro}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card className="h-100 border-0 shadow-sm" style={{ borderTop: '4px solid #dc3545' }}>
            <Card.Body>
              <h5 className="text-danger mb-3 fw-bold">❌ Points Faibles</h5>
              <ul className="list-unstyled mb-0">
                {cpu.cons && cpu.cons.map((con, i) => (
                  <li key={i} className="mb-2 d-flex align-items-start">
                    <span className="me-2">👎</span> {con}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CpuDetailPage;