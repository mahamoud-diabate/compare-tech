import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getProductScore, getScoreColor } from '../utils/scores';
import SpecBar from '../components/SpecBar';
import SimilarProducts from '../components/SimilarProducts';

function LaptopDetailPage() {
  const { id } = useParams(); 
  const [laptop, setLaptop] = useState(null);
  const [error, setError] = useState(null);
  
  
  const [isExpertMode, setIsExpertMode] = useState(false);

  useEffect(() => {
    fetch(`https://mahamoud-compare-tech-api.onrender.com/api/laptops/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Produit non trouvé');
        return response.json();
      })
      .then(data => setLaptop(data))
      .catch(error => setError(error.message));
  }, [id]);

  if (error) return <Container className="my-5"><Alert variant="danger">Erreur : {error}</Alert></Container>;
  if (!laptop) return <Container className="my-5"><div>Chargement...</div></Container>;

  const score = getProductScore(laptop, 'laptop');
  const scoreColor = getScoreColor(score);

  return (
    <Container className="my-5">
      
      <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-3">
        <div>
          <h1 className="fw-bold mb-1">{laptop.name}</h1>
          <span className="text-muted">Ordinateur Portable {laptop.brand}</span>
        </div>
        
        <Form.Check 
          type="switch"
          id="expert-mode-switch"
          label="Mode Expert"
          className="fw-bold text-primary"
          checked={isExpertMode}
          onChange={() => setIsExpertMode(!isExpertMode)}
        />
      </div>

      <Row>
        <Col md={5} className="mb-4">
           <Card className="h-100 border-0 shadow-sm bg-white d-flex flex-column align-items-center justify-content-center p-3">
             {laptop.imageUrl ? (
                <img src={laptop.imageUrl} alt={laptop.name} style={{ maxWidth: '100%', maxHeight: '350px', objectFit: 'contain' }} />
             ) : (
                <div className="p-5 text-muted">Pas d'image</div>
             )}
             
             <div className="text-center mt-4">
                <Badge bg={scoreColor} style={{ fontSize: '3rem', borderRadius: '50px', padding: '15px 40px' }}>
                  {score}/100
                </Badge>
                <p className="text-muted mt-2 fw-bold">Note Globale</p>
             </div>
           </Card>
        </Col>

        <Col md={7}>
          
          {!isExpertMode ? (
            
            <div className="fade-in">
              <h3 className="mb-4">Verdict rapide :</h3>
              
              <Card className="border-0 bg-light mb-4 p-3">
                 {laptop.pros && laptop.pros.slice(0, 3).map((pro, i) => (
                    <div key={i} className="d-flex align-items-center mb-3">
                      <span style={{ fontSize: '1.5rem', marginRight: '15px' }}>✅</span>
                      <span className="fw-bold" style={{ fontSize: '1.1rem' }}>{pro}</span>
                    </div>
                 ))}
                 {!laptop.pros && <p>Un laptop solide et performant.</p>}
              </Card>

              <div className="alert alert-info border-0 shadow-sm">
                <h5 className="fw-bold">💡 Notre Avis</h5>
                <p className="mb-0">
                  Le <strong>{laptop.name}</strong> obtient un score de <strong>{score}/100</strong>.
                  {score > 80 ? " Idéal pour les créateurs et les gamers exigeants." : " Parfait pour la bureautique et les étudiants."}
                </p>
              </div>

              <div className="d-grid gap-2 mt-4">
                 <Button variant="success" size="lg" style={{ fontWeight: 'bold', padding: '15px' }}>
                    Voir les offres
                 </Button>
              </div>
            </div>
          ) : (
            
            <div className="fade-in">
              <Card className="shadow-sm border-0">
                <Card.Header className="bg-dark text-white fw-bold py-3">
                    ⚙️ Fiche Technique
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between py-3">
                    <span>Processeur</span> <strong>{laptop.cpu_name}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between py-3">
                    <span>Carte Graphique</span> <strong>{laptop.gpu_name}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between py-3">
                    <span>RAM / Stockage</span> <strong>{laptop.ram_gb}GB / {laptop.storage_gb}GB</strong>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between py-3">
                    <span>Luminosité</span> <strong>{laptop.display_brightness_nits ? `${laptop.display_brightness_nits} nits` : 'N/A'}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between py-3">
                    <span>Autonomie</span> <strong>{laptop.battery_life_hours ? `${laptop.battery_life_hours}h` : 'N/A'}</strong>
                  </ListGroup.Item>
                  
                  <ListGroup.Item className="bg-light fw-bold mt-3">Benchmarks</ListGroup.Item>
                  <ListGroup.Item className="py-3">
                    <div className="d-flex justify-content-between mb-2">
                        <span>Geekbench (Multi)</span> <strong>{laptop.geekbench_multi || 'N/A'}</strong>
                    </div>
                    <SpecBar value={laptop.geekbench_multi} maxValue={22000} />
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              
              <Row className="mt-4">
                <Col md={6}>
                   <Card className="h-100 border-success shadow-sm">
                    <Card.Header className="bg-success text-white">Points Forts</Card.Header>
                    <Card.Body>
                      <ul className="mb-0 ps-3">
                        {laptop.pros && laptop.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="h-100 border-danger shadow-sm">
                    <Card.Header className="bg-danger text-white">Points Faibles</Card.Header>
                    <Card.Body>
                      <ul className="mb-0 ps-3">
                        {laptop.cons && laptop.cons.map((con, i) => <li key={i}>{con}</li>)}
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </Col>
      </Row>

      <SimilarProducts currentId={id} category="laptops" />
    </Container>
  );
}

export default LaptopDetailPage;