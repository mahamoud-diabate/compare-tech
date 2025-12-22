import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { LinkContainer } from 'react-router-bootstrap';
import Hero from '../components/Hero';
import AnimatedPage from '../components/AnimatedPage';
import QuickCompare from '../components/QuickCompare';
import UserProfiles from '../components/UserProfiles';

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const categories = [
    { title: "Processeurs (CPUs)", link: "/cpus", desc: "Intel Core vs AMD Ryzen", color: "primary" },
    { title: "Cartes Graphiques (GPUs)", link: "/gpus", desc: "Nvidia RTX vs AMD Radeon", color: "success" },
    { title: "Laptops", link: "/laptops", desc: "MacBook, Dell, Asus...", color: "info" },
    { title: "Téléphones", link: "/telephones", desc: "iPhone vs Samsung vs Pixel", color: "warning" },
  ];

  useEffect(() => {
    fetch('https://mahamoud-compare-tech-api.onrender.com/api/featured')
      .then(res => res.json())
      .then(data => setFeaturedProducts(data))
      .catch(err => console.error(err));

    const fetchAll = async () => {
        try {
            const urls = [
                'https://mahamoud-compare-tech-api.onrender.com/api/cpus',
                'https://mahamoud-compare-tech-api.onrender.com/api/gpus',
                'https://mahamoud-compare-tech-api.onrender.com/api/laptops',
                'https://mahamoud-compare-tech-api.onrender.com/api/telephones'
            ];
            const responses = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));
            
            const cpus = responses[0].map(p => ({ ...p, productType: 'cpu' }));
            const gpus = responses[1].map(p => ({ ...p, productType: 'gpu' }));
            const laptops = responses[2].map(p => ({ ...p, productType: 'laptop' }));
            const phones = responses[3].map(p => ({ ...p, productType: 'telephone' }));

            setAllProducts([...cpus, ...gpus, ...laptops, ...phones]);
        } catch (error) {
            console.error("Erreur chargement global:", error);
        }
    };
    fetchAll();
  }, []);

  return (
    <AnimatedPage>
      <Hero 
        searchTerm="" 
        onSearchChange={() => {}} 
        allProducts={allProducts} 
      />
      
      <Container className="my-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">Bienvenue sur CompareTech</h2>
          <p className="lead text-muted">Le comparateur technique de référence.</p>
        </div>
        <QuickCompare allProducts={allProducts}/>
        </Container>
        <UserProfiles />

      <Container className="my-5">
        <h2 className="text-center mb-4 fw-bold">Parcourir par Catégorie</h2>

        <Row xs={1} md={2} lg={4} className="g-4 mb-5">
          {categories.map((cat) => (
            <Col key={cat.title}>
              <Card className="h-100 shadow-sm text-center border-0">
                <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
                  <div className={`bg-${cat.color} bg-opacity-10 p-3 rounded-circle mb-3 text-${cat.color}`} style={{width: '60px', height: '60px', fontSize: '24px'}}>➜</div>
                  <Card.Title className="fw-bold">{cat.title}</Card.Title>
                  <Card.Text>{cat.desc}</Card.Text>
                  <LinkContainer to={cat.link}>
                    <Button variant={`outline-${cat.color}`} className="mt-3 stretched-link">Explorer</Button>
                  </LinkContainer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        {featuredProducts.length > 0 && (
            <div className="my-5">
            <h2 className="text-center mb-4 fw-bold">🏆 Les Champions du Moment</h2>
            <Row xs={1} md={2} lg={4} className="g-4">
                {featuredProducts.map((product) => (
                <Col key={product._id}>
                    <Card className="h-100 shadow border-0 border-top border-4 border-warning">
                    {product.imageUrl && (
                        <Card.Img 
                        variant="top" 
                        src={product.imageUrl} 
                        style={{ height: '180px', objectFit: 'contain', padding: '15px' }} 
                        />
                    )}
                    <Card.Body className="text-center">
                        <Badge bg="warning" text="dark" className="mb-2">
                        {product.highlight}
                        </Badge>
                        <Card.Title style={{fontSize: '1.1rem'}}>{product.name}</Card.Title>
                        <LinkContainer to={`/${product.productType}/${product._id}`}>
                        <Button variant="outline-dark" size="sm" className="mt-2">Voir la fiche</Button>
                        </LinkContainer>
                    </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
            </div>
        )}
        
        <div className="mt-5 p-5 bg-body-tertiary rounded-3 shadow-sm">
          <h3>Pourquoi utiliser CompareTech ?</h3>
          <p>Notre algorithme analyse les benchmarks réels (Geekbench, 3DMark, AnTuTu) pour vous donner un score objectif et impartial.</p>
        </div>
      </Container>
    </AnimatedPage>
  );
}

export default HomePage;