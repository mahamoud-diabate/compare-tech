import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

function LoadingSpinner({ message = "Chargement des données..." }) {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '400px' }}>
      <Spinner animation="border" role="status" variant="primary" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p className="mt-3 text-muted fw-bold">{message}</p>
    </Container>
  );
}

export default LoadingSpinner;