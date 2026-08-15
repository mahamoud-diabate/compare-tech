import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-auto border-top border-secondary">
      <Container>
        <Row className="g-4">
          
          {/* Colonne 1 : Marque */}
          <Col md={4} className="mb-3">
            <h5 className="fw-bold text-white mb-3">CompareTech 🚀</h5>
            <p className="text-secondary small">
              La référence pour comparer objectivement vos futurs équipements tech. 
              Analyses basées sur des benchmarks réels et des spécifications techniques précises.
            </p>
          </Col>

          {/* Colonne 2 : Liens Rapides */}
          <Col md={4} className="mb-3">
            <h6 className="fw-bold text-white mb-3">Navigation</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/laptops" className="text-decoration-none text-secondary hover-white">Ordinateurs Portables</Link></li>
              <li className="mb-2"><Link to="/cpus" className="text-decoration-none text-secondary hover-white">Processeurs (CPU)</Link></li>
              <li className="mb-2"><Link to="/gpus" className="text-decoration-none text-secondary hover-white">Cartes Graphiques</Link></li>
              <li className="mb-2"><Link to="/telephones" className="text-decoration-none text-secondary hover-white">Smartphones</Link></li>
            </ul>
          </Col>

          {/* Colonne 3 : Admin & Crédits */}
          <Col md={4}>
            <h6 className="fw-bold text-white mb-3">Projet</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/login" className="text-decoration-none text-secondary">Accès Admin 🔐</Link></li>
              <li className="text-secondary small mt-4">
                &copy; {new Date().getFullYear()} CompareTech. <br/>
                Développé avec React & Node.js.
              </li>
            </ul>
          </Col>

        </Row>
      </Container>
    </footer>
  );
}

export default Footer;