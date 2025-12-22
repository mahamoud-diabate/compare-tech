import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function NotFoundPage() {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: '70vh' }}>
      
      <div style={{ fontSize: '8rem' }}>🚧</div>
      
      <h1 className="display-1 fw-bold text-dark">404</h1>
      <h2 className="mb-4">Oups ! Page introuvable.</h2>
      
      <p className="lead text-muted mb-5" style={{ maxWidth: '600px' }}>
        Il semble que le composant que vous cherchez a été débranché ou n'existe pas. 
        Vérifiez l'URL ou revenez à la base.
      </p>

      <div className="d-flex gap-3">
        <Link to="/">
            <Button variant="primary" size="lg" className="rounded-pill px-4 fw-bold">
                🏠 Retour à l'accueil
            </Button>
        </Link>
        <Link to="/laptops">
            <Button variant="outline-dark" size="lg" className="rounded-pill px-4 fw-bold">
                💻 Voir les Laptops
            </Button>
        </Link>
      </div>

    </Container>
  );
}

export default NotFoundPage;