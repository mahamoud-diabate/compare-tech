import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';

import TechRadar from '../components/TechRadar';
import SimilarProducts from '../components/SimilarProducts';
import { getProductScore, getScoreColor } from '../utils/scores';

function CpuDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // État pour le Mode Expert
  const [isExpertMode, setIsExpertMode] = useState(false);

  useEffect(() => {
    fetch(`https://mahamoud-compare-tech-api.onrender.com/api/cpus/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Produit non trouvé');
        return response.json();
      })
      .then(data => {
        // Important : définir le type pour le Radar
        setProduct({ ...data, productType: 'cpu' });
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Container className="my-5 text-center"><div className="spinner-border text-primary"></div></Container>;
  if (error) return <Container className="my-5"><Alert variant="danger">Erreur : {error}</Alert></Container>;
  if (!product) return <Container className="my-5"><Alert variant="warning">Produit introuvable</Alert></Container>;

  const score = getProductScore(product, 'cpu');
  const scoreVariant = getScoreColor(score);
  
  const getCircleColor = (variant) => {
    if (variant === 'success') return '#198754';
    if (variant === 'primary') return '#0d6efd';
    if (variant === 'warning') return '#ffc107';
    return '#dc3545';
  };

  return (
    <Container className="my-5">
      {/* HEADER AVEC SWITCH */}
      <div className="mb-5 border-bottom pb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
            <Link to="/cpus" className="text-decoration-none text-muted small fw-bold">← Retour aux Processeurs</Link>
            
            <Form.Check 
                type="switch"
                id="expert-mode-switch"
                label="Mode Expert"
                className="fw-bold text-primary"
                checked={isExpertMode}
                onChange={() => setIsExpertMode(!isExpertMode)}
            />
        </div>

        <div className="d-flex justify-content-between align-items-end mt-3 flex-wrap gap-3">
            <div>
                <Badge bg="dark" className="mb-2 text-uppercase">{product.brand}</Badge>
                <h1 className="fw-bold display-5 mb-0">{product.name}</h1>
            </div>
            <div className="text-end">
                <div className="fs-2 fw-bold text-primary mb-2">
                    {product.price ? `${product.price} €` : 'Prix N/A'}
                </div>
                {product.buyUrl && (
                    <Button href={product.buyUrl} target="_blank" variant="success" size="lg" className="rounded-pill px-4 fw-bold shadow-sm">
                        Voir l'offre 🛒
                    </Button>
                )}
            </div>
        </div>
      </div>

      <Row className="g-4 mb-5">
        
        {/* --- COLONNE GAUCHE (Visuel + Radar) --- */}
        <Col lg={5}>
            <Card className="border-0 shadow-sm mb-4 overflow-hidden">
                <Card.Body className="p-4 text-center bg-white position-relative">
                    {/* Score Cercle */}
                    <div className="position-absolute top-0 end-0 m-3 z-3">
                        <div className="rounded-circle d-flex flex-column align-items-center justify-content-center text-white shadow"
                             style={{ width: '90px', height: '90px', backgroundColor: getCircleColor(scoreVariant) }}>
                            <span className="fw-bold" style={{fontSize: '2rem', lineHeight: '1'}}>{score}</span>
                            <span style={{fontSize: '0.7rem', opacity: 0.9}}>SUR 100</span>
                        </div>
                    </div>

                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                        ) : (
                            <div className="text-muted display-1 opacity-25">⚡</div>
                        )}
                    </div>
                </Card.Body>
            </Card>

            {/* Radar (Visible en Expert) */}
            {isExpertMode && (
                <div className="fade-in">
                    <Card className="border-0 shadow-sm">
                        <Card.Header className="bg-white border-bottom-0 pt-4 pb-0 text-center">
                            <h5 className="fw-bold mb-0">Architecture & Performance</h5>
                        </Card.Header>
                        <Card.Body>
                            <TechRadar product1={product} product2={null} />
                        </Card.Body>
                    </Card>
                </div>
            )}
        </Col>

        {/* --- COLONNE DROITE (Détails) --- */}
        <Col lg={7}>
            
            {!isExpertMode ? (
                /* MODE NORMAL */
                <div className="fade-in">
                    <Card className="border-0 bg-light mb-4 p-4 shadow-sm">
                        <h4 className="fw-bold mb-3">💡 L'avis de l'Expert</h4>
                        <p className="lead mb-4">
                            Ce processeur obtient un score de <strong>{score}/100</strong>.
                            {product.geekbench_single > 2500 
                                ? " C'est un monstre pour le Gaming grâce à sa fréquence élevée." 
                                : " Il offre un bon équilibre pour le multitâche et la bureautique avancée."}
                            {product.cores >= 12 && " Avec son grand nombre de cœurs, il excellera en montage vidéo et 3D."}
                        </p>
                        
                        <div className="d-grid gap-2">
                             <Button variant="outline-primary" onClick={() => setIsExpertMode(true)} className="fw-bold">
                                Voir les fréquences et benchmarks détaillés ⚡
                             </Button>
                        </div>
                    </Card>

                    <Row className="g-3">
                        <Col md={6}>
                            <Card className="h-100 border-0 shadow-sm border-top border-4 border-success bg-white">
                                <Card.Body>
                                    <h5 className="text-success fw-bold mb-3">✅ Points Forts</h5>
                                    {product.pros && product.pros.length > 0 ? (
                                        <ul className="list-unstyled mb-0">
                                            {product.pros.map((pro, i) => <li key={i} className="mb-2">✓ {pro}</li>)}
                                        </ul>
                                    ) : <span className="text-muted">Pas de points forts spécifiques.</span>}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="h-100 border-0 shadow-sm border-top border-4 border-danger bg-white">
                                <Card.Body>
                                    <h5 className="text-danger fw-bold mb-3">❌ Points Faibles</h5>
                                    {product.cons && product.cons.length > 0 ? (
                                        <ul className="list-unstyled mb-0">
                                            {product.cons.map((con, i) => <li key={i} className="mb-2">⚠️ {con}</li>)}
                                        </ul>
                                    ) : <span className="text-muted">R.A.S.</span>}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            ) : (
                /* MODE EXPERT */
                <div className="fade-in">
                    <Card className="border-0 shadow-sm mb-4">
                        <Card.Header className="bg-dark text-white pt-3 px-4 d-flex justify-content-between align-items-center">
                            <h5 className="fw-bold mb-0">⚡ Spécifications Techniques</h5>
                            <Badge bg="warning" text="dark">EXPERT</Badge>
                        </Card.Header>
                        <Card.Body className="px-4 pb-4 pt-4">
                            <Row xs={1} md={2} className="g-3">
                                <Col>
                                    <div className="p-3 bg-body-tertiary rounded h-100">
                                        <small className="text-muted text-uppercase fw-bold" style={{fontSize: '0.7rem'}}>Cœurs / Threads</small>
                                        <div className="fs-5 fw-bold text-dark">{product.cores} Cœurs</div>
                                        <div className="text-muted small">{product.threads} Threads</div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="p-3 bg-body-tertiary rounded h-100">
                                        <small className="text-muted text-uppercase fw-bold" style={{fontSize: '0.7rem'}}>Fréquence Boost</small>
                                        <div className="fs-5 fw-bold text-dark">{product.max_freq_ghz} GHz</div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="p-3 bg-body-tertiary rounded h-100">
                                        <small className="text-muted text-uppercase fw-bold" style={{fontSize: '0.7rem'}}>Socket</small>
                                        <div className="fs-5 fw-bold text-dark">{product.socket || 'N/A'}</div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="p-3 bg-body-tertiary rounded h-100">
                                        <small className="text-muted text-uppercase fw-bold" style={{fontSize: '0.7rem'}}>Consommation (TDP)</small>
                                        <div className="fs-5 fw-bold text-dark">{product.tdp} W</div>
                                    </div>
                                </Col>
                            </Row>

                            <div className="mt-4 p-3 border rounded bg-light">
                                <h6 className="fw-bold mb-3 border-bottom pb-2">Benchmarks Synthétiques</h6>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span>Geekbench 6 (Multi-Core)</span>
                                    <span className="font-monospace fw-bold fs-5 text-primary">{product.geekbench_multi ? product.geekbench_multi.toLocaleString() : 'N/A'}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Geekbench 6 (Single-Core)</span>
                                    <span className="font-monospace fw-bold">{product.geekbench_single ? product.geekbench_single.toLocaleString() : 'N/A'}</span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Rappel des Pros/Cons */}
                    <Row className="g-3">
                         <Col md={6}>
                            <Card className="h-100 border-0 shadow-sm border-start border-4 border-success bg-white">
                                <Card.Body className="py-2">
                                    <strong className="text-success">✅ Points Forts :</strong>
                                    <ul className="mb-0 ps-3 small mt-1">
                                        {product.pros && product.pros.map((p,i) => <li key={i}>{p}</li>)}
                                    </ul>
                                </Card.Body>
                            </Card>
                         </Col>
                         <Col md={6}>
                            <Card className="h-100 border-0 shadow-sm border-start border-4 border-danger bg-white">
                                <Card.Body className="py-2">
                                    <strong className="text-danger">❌ Points Faibles :</strong>
                                    <ul className="mb-0 ps-3 small mt-1">
                                        {product.cons && product.cons.map((c,i) => <li key={i}>{c}</li>)}
                                    </ul>
                                </Card.Body>
                            </Card>
                         </Col>
                    </Row>
                </div>
            )}
        </Col>
      </Row>

      <div className="mt-5 pt-4 border-top">
        <SimilarProducts currentId={id} category="cpus" />
      </div>

    </Container>
  );
}

export default CpuDetailPage;