import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import Hero from '../components/Hero';

function HomePage() {
  
  const categories = [
    { title: "Processeurs (CPUs)", link: "/cpus", desc: "Intel Core vs AMD Ryzen", color: "primary" },
    { title: "Cartes Graphiques (GPUs)", link: "/gpus", desc: "Nvidia RTX vs AMD Radeon", color: "success" },
    { title: "Laptops", link: "/laptops", desc: "MacBook, Dell, Asus...", color: "info" },
    { title: "Téléphones", link: "/telephones", desc: "iPhone vs Samsung vs Pixel", color: "warning" },
  ];

  return (
    <>
      <Hero searchTerm="" onSearchChange={() => {}} />
      <Container className="my-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">Bienvenue sur CompareTech</h2>
          <p className="lead text-muted">Le comparateur technique de référence.</p>
        </div>

        <Row xs={1} md={2} lg={4} className="g-4">
          {categories.map((cat) => (
            <Col key={cat.title}>
              <Card className="h-100 shadow-sm text-center border-0">
                <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
                  <div className={`bg-${cat.color} bg-opacity-10 p-3 rounded-circle mb-3 text-${cat.color}`} style={{width: '60px', height: '60px', fontSize: '24px'}}>
                    ➜
                  </div>
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
        
        <div className="mt-5 p-5 bg-light rounded-3 shadow-sm">
          <h3>Pourquoi utiliser CompareTech ?</h3>
          <p>Notre algorithme analyse les benchmarks réels (Geekbench, 3DMark, AnTuTu) pour vous donner un score objectif et impartial.</p>
        </div>
      </Container>
    </>
  );
}

export default HomePage;