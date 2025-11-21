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
import SimilarProducts from '../components/SimilarProducts';

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

  if (error) return <Container className="my-5"><Alert variant="danger">Erreur : {error}</Alert></Container>;
  if (!laptop) return <Container className="my-5"><div>Chargement...</div></Container>;

  const score = getProductScore(laptop, 'laptop');
  const scoreColor = getScoreColor(score);

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <h1 className="fw-bold mb-0">{laptop.name}</h1>
          <span className="text-muted">Ordinateur Portable {laptop.brand}</span>
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
             {laptop.imageUrl ? (
                <img src={laptop.imageUrl} alt={laptop.name} style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }} />
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
                <span>Marque</span>
                <span className="fw-bold">{laptop.brand}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                <span>Processeur (CPU)</span>
                <span className="fw-bold">{laptop.cpu_name || 'N/A'}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                <span>Carte Graphique (GPU)</span>
                <span className="fw-bold">{laptop.gpu_name || 'N/A'}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                <span>RAM</span>
                <span className="fw-bold">{laptop.ram_gb ? `${laptop.ram_gb} GB` : 'N/A'}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                <span>Stockage</span>
                <span className="fw-bold">{laptop.storage_gb ? `${laptop.storage_gb} GB` : 'N/A'}</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                <span>Luminosité Écran</span>
                <span className="fw-bold">{laptop.display_brightness_nits ? `${laptop.display_brightness_nits} nits` : 'N/A'}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                <span>Autonomie Batterie</span>
                <span className="fw-bold">{laptop.battery_life_hours ? `${laptop.battery_life_hours} heures` : 'N/A'}</span>
              </ListGroup.Item>
              
              {/* Performance */}
              <ListGroup.Item className="bg-light fw-bold mt-3">Performance</ListGroup.Item>
              
              <ListGroup.Item className="py-3">
                <div className="d-flex justify-content-between mb-2">
                    <span>Geekbench (Multi-Core)</span>
                    <strong>{laptop.geekbench_multi || 'N/A'}</strong>
                </div>
                <SpecBar value={laptop.geekbench_multi} maxValue={22000} />
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
                {laptop.pros && laptop.pros.map((pro, i) => (
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
                {laptop.cons && laptop.cons.map((con, i) => (
                  <li key={i} className="mb-2 d-flex align-items-start">
                    <span className="me-2">👎</span> {con}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <SimilarProducts currentId={id} category="laptops" />

    </Container>
  );
}

export default LaptopDetailPage;