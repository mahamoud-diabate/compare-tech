import { API_BASE } from '../api';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { LinkContainer } from 'react-router-bootstrap';
import AnimatedPage from '../components/AnimatedPage';



function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [stats, setStats] = useState({ cpus: 0, gpus: 0, laptops: 0, phones: 0 });
  const [loading, setLoading] = useState(true);

  const categories = [
    { title: "Processeurs", link: "/cpus", desc: "Intel Core vs AMD Ryzen — Geekbench, cœurs, TDP", icon: "🧠", color: "primary" },
    { title: "Cartes Graphiques", link: "/gpus", desc: "NVIDIA RTX vs AMD Radeon — 3DMark, VRAM", icon: "🎮", color: "success" },
    { title: "Laptops", link: "/laptops", desc: "MacBook, Dell XPS, ThinkPad — perf, autonomie", icon: "💻", color: "info" },
    { title: "Smartphones", link: "/telephones", desc: "iPhone vs Galaxy vs Pixel — AnTuTu, batterie", icon: "📱", color: "warning" },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const [featuredRes, cpusRes, gpusRes, laptopsRes, phonesRes] = await Promise.all([
          fetch(`${API_BASE}/featured`).then(r => r.json()),
          fetch(`${API_BASE}/cpus`).then(r => r.json()),
          fetch(`${API_BASE}/gpus`).then(r => r.json()),
          fetch(`${API_BASE}/laptops`).then(r => r.json()),
          fetch(`${API_BASE}/telephones`).then(r => r.json()),
        ]);
        setFeaturedProducts(featuredRes);
        setStats({
          cpus: Array.isArray(cpusRes) ? cpusRes.length : 0,
          gpus: Array.isArray(gpusRes) ? gpusRes.length : 0,
          laptops: Array.isArray(laptopsRes) ? laptopsRes.length : 0,
          phones: Array.isArray(phonesRes) ? phonesRes.length : 0,
        });
      } catch (err) {
        console.error("Erreur chargement homepage:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const totalProducts = stats.cpus + stats.gpus + stats.laptops + stats.phones;

  return (
    <AnimatedPage>
      {/* HERO */}
      <section className="ct-hero">
        <Container className="text-center">
          <div className="ct-hero-badge mb-3">
            ⚡ {totalProducts.toLocaleString()}+ produits analysés
          </div>
          <h1 className="ct-hero-title">
            Le comparateur hardware<br />
            <span className="ct-hero-highlight">intelligent</span>
          </h1>
          <p className="ct-hero-subtitle">
            Comparez CPUs, GPUs, laptops et smartphones avec des scores objectifs<br />
            basés sur des benchmarks réels — Geekbench, 3DMark, AnTuTu.
          </p>
          <div className="ct-hero-actions">
            <LinkContainer to="/cpus">
              <Button size="lg" className="ct-hero-btn-primary me-3">
                Commencer à comparer →
              </Button>
            </LinkContainer>
            <LinkContainer to="/compare">
              <Button size="lg" variant="outline-light" className="ct-hero-btn-secondary">
                Voir un comparatif
              </Button>
            </LinkContainer>
          </div>

          {/* Quick Stats */}
          <Row className="ct-stats-row mt-5 g-3">
            {[
              { label: 'Processeurs', value: stats.cpus, icon: '🧠' },
              { label: 'GPUs', value: stats.gpus, icon: '🎮' },
              { label: 'Laptops', value: stats.laptops, icon: '💻' },
              { label: 'Smartphones', value: stats.phones, icon: '📱' },
            ].map((stat) => (
              <Col xs={6} md={3} key={stat.label}>
                <div className="ct-stat-card">
                  <div className="ct-stat-icon">{stat.icon}</div>
                  <div className="ct-stat-value">
                    {loading ? <span className="ct-skeleton d-inline-block" style={{width:40,height:28}} /> : stat.value}
                  </div>
                  <div className="ct-stat-label">{stat.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CATEGORIES */}
      <Container className="my-5 pt-3">
        <h2 className="ct-section-title">Explorez les catégories</h2>
        <p className="ct-section-subtitle">Choisissez une catégorie pour découvrir et comparer</p>

        <Row xs={1} md={2} lg={4} className="g-4 mb-5">
          {categories.map((cat) => (
            <Col key={cat.title}>
              <LinkContainer to={cat.link} style={{ cursor: 'pointer' }}>
                <Card className="ct-category-card h-100">
                  <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                    <div className="ct-category-icon">{cat.icon}</div>
                    <Card.Title className="fw-bold mt-3 mb-2">{cat.title}</Card.Title>
                    <Card.Text className="text-muted small">{cat.desc}</Card.Text>
                  </Card.Body>
                </Card>
              </LinkContainer>
            </Col>
          ))}
        </Row>

        {/* FEATURED */}
        {featuredProducts.length > 0 && (
          <div className="my-5">
            <h2 className="ct-section-title">🏆 Top Performers</h2>
            <p className="ct-section-subtitle">Les meilleurs scores dans chaque catégorie</p>
            <Row xs={1} md={2} lg={4} className="g-4">
              {featuredProducts.map((product) => (
                <Col key={product._id}>
                  <Card className="ct-featured-card h-100">
                    {product.imageUrl && (
                      <div className="ct-featured-img-wrapper">
                        <Card.Img
                          variant="top"
                          src={product.imageUrl}
                          className="ct-featured-img"
                        />
                      </div>
                    )}
                    <Card.Body className="text-center">
                      <Badge bg="warning" text="dark" className="mb-2 px-2 py-1">
                        {product.highlight || 'Top'}
                      </Badge>
                      <Card.Title className="h6">{product.name}</Card.Title>
                      <Card.Text className="text-muted small mb-3">{product.brand}</Card.Text>
                      <LinkContainer to={`/${product.productType}/${product._id}`}>
                        <Button variant="outline-primary" size="sm" className="w-100">
                          Voir la fiche →
                        </Button>
                      </LinkContainer>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {/* WHY COMPARETECH */}
        <div className="ct-why-section my-5">
          <Row className="align-items-center g-5">
            <Col md={6}>
              <h2 className="fw-bold mb-3">
                Pourquoi <span style={{color:'#3b82f6'}}>CompareTech</span> ?
              </h2>
              <ul className="ct-feature-list">
                <li>📊 <strong>Scores objectifs</strong> — calculés à partir de benchmarks réels (Geekbench, 3DMark, AnTuTu)</li>
                <li>🔄 <strong>Comparaison multi-produits</strong> — comparez jusqu'à 3 produits côte à côte</li>
                <li>📈 <strong>Graphiques radar</strong> — visualisez les forces et faiblesses en un coup d'œil</li>
                <li>🎯 <strong>Mode différences</strong> — isolez ce qui distingue vraiment les produits</li>
                <li>🔄 <strong>Données à jour</strong> — base de données régulièrement mise à jour</li>
              </ul>
            </Col>
            <Col md={6} className="text-center">
              <div className="ct-why-visual">
                <div className="ct-why-chart-placeholder">
                  <span style={{fontSize:'4rem'}}>📊</span>
                  <p className="text-muted mt-3">Graphiques interactifs<br/>Comparaisons intelligentes</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </AnimatedPage>
  );
}

export default HomePage;
