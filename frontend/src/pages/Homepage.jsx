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

function HomePage() {
  // État pour les produits vedettes
  const [featuredProducts, setFeaturedProducts] = useState([]);
  // État pour TOUS les produits (pour la recherche)
  const [allProducts, setAllProducts] = useState([]);

  const categories = [
    { title: "Processeurs (CPUs)", link: "/cpus", desc: "Intel Core vs AMD Ryzen", color: "primary" },
    { title: "Cartes Graphiques (GPUs)", link: "/gpus", desc: "Nvidia RTX vs AMD Radeon", color: "success" },
    { title: "Laptops", link: "/laptops", desc: "MacBook, Dell, Asus...", color: "info" },
    { title: "Téléphones", link: "/telephones", desc: "iPhone vs Samsung vs Pixel", color: "warning" },
  ];

  useEffect(() => {
    // 1. Charger les produits vedettes
    fetch('https://mahamoud-compare-tech-api.onrender.com/api/featured')
      .then(res => res.json())
      .then(data => setFeaturedProducts(data))
      .catch(err => console.error("Erreur featured:", err));

    // 2. Charger TOUS les produits pour la barre de recherche intelligente
    const fetchAll = async () => {
        try {
            const urls = [
                'https://mahamoud-compare-tech-api.onrender.com/api/cpus',
                'https://mahamoud-compare-tech-api.onrender.com/api/gpus',
                'https://mahamoud-compare-tech-api.onrender.com/api/laptops',
                'https://mahamoud-compare-tech-api.onrender.com/api/telephones'
            ];
            const responses = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));
            
            // On ajoute le type à chaque produit pour savoir où rediriger
            const cpus = responses[0].map(p => ({ ...p, productType: 'cpu' }));
            const gpus = responses[1].map(p => ({ ...p, productType: 'gpu' }));
            const laptops = responses[2].map(p => ({ ...p, productType: 'laptop' }));
            const phones = responses[3].map(p => ({ ...p, productType: 'telephone' }));

            // On combine tout dans une seule liste
            setAllProducts([...cpus, ...gpus, ...laptops, ...phones]);
        } catch (error) {
            console.error("Erreur chargement global:", error);
        }
    };
    fetchAll();
  }, []);

  return (
    <AnimatedPage>
      {/* On passe la liste complète "allProducts" au Hero */}
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

        {/* Catégories */}
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