import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'; // Pour le switch
import Button from 'react-bootstrap/Button';
import { getProductScore, getScoreColor } from '../utils/scores';
import SpecBar from '../components/SpecBar';
import SimilarProducts from '../components/SimilarProducts';

function TelephoneDetailPage() {
  const { id } = useParams(); 
  const [telephone, setTelephone] = useState(null);
  const [error, setError] = useState(null);
  
  // 1. NOUVEL ÉTAT : Mode Expert (Faux par défaut pour la simplicité)
  const [isExpertMode, setIsExpertMode] = useState(false);

  useEffect(() => {
    fetch(`https://mahamoud-compare-tech-api.onrender.com/api/telephones/${id}`)
      .then(response => {
        if (!response.ok) { throw new Error('Produit non trouvé'); }
        return response.json();
      })
      .then(data => setTelephone(data))
      .catch(error => setError(error.message));
  }, [id]);

  if (error) return <Container className="my-5"><Alert variant="danger">Erreur : {error}</Alert></Container>;
  if (!telephone) return <Container className="my-5"><div>Chargement...</div></Container>;

  const score = getProductScore(telephone, 'telephone');
  const scoreColor = getScoreColor(score);

  return (
    <Container className="my-5">
      
      {/* EN-TÊTE & CONTRÔLE DU MODE */}
      <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-3">
        <div>
          <h1 className="fw-bold mb-1">{telephone.name}</h1>
          <span className="text-muted">Smartphone {telephone.brand}</span>
        </div>
        
        {/* L'Interrupteur Magique */}
        <Form.Check 
          type="switch"
          id="expert-mode-switch"
          label="Mode Expert (Détails Techniques)"
          className="fw-bold text-primary"
          checked={isExpertMode}
          onChange={() => setIsExpertMode(!isExpertMode)}
        />
      </div>

      <Row>
        {/* COLONNE GAUCHE : IMAGE & SCORE (Toujours visible) */}
        <Col md={5} className="mb-4">
           <Card className="h-100 border-0 shadow-sm bg-white d-flex flex-column align-items-center justify-content-center p-3">
             {telephone.imageUrl ? (
                <img src={telephone.imageUrl} alt={telephone.name} style={{ maxWidth: '100%', maxHeight: '350px', objectFit: 'contain' }} />
             ) : (
                <div className="p-5 text-muted">Pas d'image</div>
             )}
             
             {/* Le Score est toujours visible, c'est l'info clé */}
             <div className="text-center mt-4">
                <Badge bg={scoreColor} style={{ fontSize: '3rem', borderRadius: '50px', padding: '15px 40px' }}>
                  {score}/100
                </Badge>
                <p className="text-muted mt-2 fw-bold">Note Globale</p>
             </div>
           </Card>
        </Col>

        {/* COLONNE DROITE : L'INFORMATION */}
        <Col md={7}>
          
          {/* --- VUE SIMPLE (Par défaut) --- */}
          {!isExpertMode ? (
            <div className="fade-in">
              <h3 className="mb-4">Ce qu'il faut savoir en bref :</h3>
              
              {/* Les 3 Points Forts (Arguments Massue) */}
              <Card className="border-0 bg-light mb-4 p-3">
                 {telephone.pros && telephone.pros.slice(0, 3).map((pro, i) => (
                    <div key={i} className="d-flex align-items-center mb-3">
                      <span style={{ fontSize: '1.5rem', marginRight: '15px' }}>✅</span>
                      <span className="fw-bold" style={{ fontSize: '1.1rem' }}>{pro}</span>
                    </div>
                 ))}
                 {!telephone.pros && <p>Un excellent choix pour sa catégorie.</p>}
              </Card>

              {/* Verdict Rapide */}
              <div className="alert alert-info border-0 shadow-sm">
                <h5 className="fw-bold">💡 Notre Avis</h5>
                <p className="mb-0">
                  Le <strong>{telephone.name}</strong> est idéal pour ceux qui cherchent 
                  un téléphone puissant de la marque {telephone.brand}. 
                  Avec son score de <strong>{score}/100</strong>, c'est une valeur sûre.
                </p>
              </div>

              {/* Gros Bouton d'Action */}
              <div className="d-grid gap-2 mt-4">
                 <Button variant="success" size="lg" style={{ fontWeight: 'bold', padding: '15px' }}>
                    Voir le meilleur prix
                 </Button>
              </div>
            </div>
          ) : (
            
            /* --- VUE EXPERT (Si activé) --- */
            <div className="fade-in">
              <Card className="shadow-sm border-0">
                <Card.Header className="bg-dark text-white fw-bold py-3">
                    ⚙️ Fiche Technique Complète
                </Card.Header>
                <ListGroup variant="flush">
                  {/* Specs Détaillées */}
                  <ListGroup.Item className="d-flex justify-content-between py-3">
                    <span>Écran</span> <strong>{telephone.display_size}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between py-3">
                    <span>Processeur</span> <strong>{telephone.cpu_name}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between py-3">
                    <span>RAM</span> <strong>{telephone.ram_gb} GB</strong>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between py-3">
                    <span>Batterie</span> <strong>{telephone.battery_mah} mAh</strong>
                  </ListGroup.Item>
                  
                  {/* Benchmarks avec Barres */}
                  <ListGroup.Item className="bg-light fw-bold mt-3">Benchmarks</ListGroup.Item>
                  <ListGroup.Item className="py-3">
                    <div className="d-flex justify-content-between mb-2">
                        <span>AnTuTu v10</span>
                        <strong>{telephone.antutu_score || 'N/A'}</strong>
                    </div>
                    <SpecBar value={telephone.antutu_score} maxValue={2500000} />
                  </ListGroup.Item>
                </ListGroup>
              </Card>

              {/* Liste complète des avantages/inconvénients */}
              <Row className="mt-4">
                <Col md={6}>
                  <Card className="h-100 border-danger shadow-sm">
                    <Card.Header className="bg-danger text-white">Points Faibles</Card.Header>
                    <Card.Body>
                      <ul className="mb-0 ps-3">
                        {telephone.cons && telephone.cons.map((con, i) => (
                          <li key={i}>{con}</li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
                 <Col md={6}>
                   {/* On remet les points forts complets ici pour les experts */}
                   <Card className="h-100 border-success shadow-sm">
                    <Card.Header className="bg-success text-white">Points Forts</Card.Header>
                    <Card.Body>
                      <ul className="mb-0 ps-3">
                        {telephone.pros && telephone.pros.map((pro, i) => (
                          <li key={i}>{pro}</li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                 </Col>
              </Row>
            </div>
          )}
        </Col>
      </Row>

      <SimilarProducts currentId={id} category="telephones" />
    </Container>
  );
}

export default TelephoneDetailPage;