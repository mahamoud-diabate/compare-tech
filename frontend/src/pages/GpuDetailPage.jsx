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

function GpuDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpertMode, setIsExpertMode] = useState(false);

  useEffect(() => {
    fetch(`https://mahamoud-compare-tech-api.onrender.com/api/gpus/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Produit non trouvé');
        return response.json();
      })
      .then(data => {
        setProduct({ ...data, productType: 'gpu' });
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

  const score = getProductScore(product, 'gpu');
  const scoreVariant = getScoreColor(score);
  
  const getCircleColor = (variant) => {
    if (variant === 'success') return '#198754';
    if (variant === 'primary') return '#0d6efd';
    if (variant === 'warning') return '#ffc107';
    return '#dc3545';
  };

  return (
    <Container className="my-5">
      <div className="mb-5 border-bottom pb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
            <Link to="/gpus" className="text-decoration-none text-muted small fw-bold">← Retour aux GPU</Link>
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
        <Col lg={5}>
            <Card className="border-0 shadow-sm mb-4 overflow-hidden">
                <Card.Body className="p-4 text-center bg-white position-relative">
                    <div className="position-absolute top-0 end-0 m-3 z-3">
                        <div className="rounded-circle d-flex flex-column align-items-center justify-content-center text-white shadow"
                             style={{ width: '90px', height: '90px', backgroundColor: getCircleColor(scoreVariant) }}>
                            <span className="fw-bold" style={{fontSize: '2rem', lineHeight: '1'}}>{score}</span>
                            <span style={{fontSize: '0.7rem', opacity: 0.9}}>SUR 100</span>
                        </div>
                    </div>
                    <div style={{ height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                        ) : (
                            <div className="text-muted display-1 opacity-25">🎮</div>
                        )}
                    </div>
                </Card.Body>
            </Card>

            {isExpertMode && (
                <div className="fade-in">
                    <Card className="border-0 shadow-sm">
                        <Card.Header className="bg-white border-bottom-0 pt-4 pb-0 text-center">
                            <h5 className="fw-bold mb-0">Radar 3D & Gaming</h5>
                        </Card.Header>
                        <Card.Body>
                            <TechRadar product1={product} product2={null} />
                        </Card.Body>
                    </Card>
                </div>
            )}
        </Col>

        <Col lg={7}>
            {!isExpertMode ? (
                <div className="fade-in">
                    <Card className="border-0 bg-light mb-4 p-4 shadow-sm">
                        <h4 className="fw-bold mb-3">💡 Analyse Gaming</h4>
                        <p className="lead mb-4">
                            Cette carte graphique obtient <strong>{score}/100</strong>.
                            {product.benchmark_3dmark > 20000 
                                ? " C'est une carte taillée pour la 4K Ultra et le Ray Tracing avancé." 
                                : " Elle est parfaite pour jouer en 1080p ou 1440p avec un framerate élevé."}
                            {product.memory_gb >= 16 && " Sa grande quantité de VRAM est idéale pour la création 3D et l'avenir."}
                        </p>
                        <div className="d-grid gap-2">
                             <Button variant="outline-primary" onClick={() => setIsExpertMode(true)} className="fw-bold">
                                Voir les scores 3DMark détaillés ⚡
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
                                    ) : <span className="text-muted">Aucun point fort listé.</span>}
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
                                        <small className="text-muted text-uppercase fw-bold" style={{fontSize: '0.7rem'}}>Mémoire Vidéo (VRAM)</small>
                                        <div className="fs-5 fw-bold text-dark">{product.memory_gb} GB</div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="p-3 bg-body-tertiary rounded h-100">
                                        <small className="text-muted text-uppercase fw-bold" style={{fontSize: '0.7rem'}}>Type Mémoire</small>
                                        <div className="fs-5 fw-bold text-dark">GDDR6X</div>
                                    </div>
                                </Col>
                            </Row>

                            <div className="mt-4 p-3 border rounded bg-light">
                                <h6 className="fw-bold mb-3 border-bottom pb-2">Benchmarks Synthétiques</h6>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span>Score 3DMark TimeSpy</span>
                                    <span className="font-monospace fw-bold fs-5 text-primary">{product.benchmark_3dmark ? product.benchmark_3dmark.toLocaleString() : 'N/A'}</span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

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
        <SimilarProducts currentId={id} category="gpus" />
      </div>
    </Container>
  );
}

export default GpuDetailPage;