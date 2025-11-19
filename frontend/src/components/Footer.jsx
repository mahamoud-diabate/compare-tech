import React from 'react';
import Container from 'react-bootstrap/Container';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container className="text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} CompareTech.</p>
        <small className="text-white-50">
          Projet Portfolio - Développé avec le stack MERN (MongoDB, Express, React, Node).
        </small>
      </Container>
    </footer>
  );
}

export default Footer;