// src/pages/ComparePage.jsx

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';

import CompareTable from '../components/CompareTable'; 

function ComparePage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDifferencesOnly, setShowDifferencesOnly] = useState(false);

  const productType = searchParams.get('type');
  const ids = searchParams.get('ids');

  useEffect(() => {
    if (!productType || !ids) {
      setError("Type de produit ou IDs manquants dans l'URL.");
      setLoading(false);
      return;
    }

    fetch(`https://mahamoud-compare-tech-api.onrender.com/api/${productType}?ids=${ids}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des produits à comparer.');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const productsWithType = data.map(p => ({ ...p, productType: productType }));
          setProducts(productsWithType);
        } else {
          throw new Error("La réponse de l'API n'était pas un tableau.");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur fetch:", err);
        setError(err.message);
        setLoading(false);
      });

  }, [productType, ids]); 

  if (loading) {
    return <Container className="my-5"><div className="text-center">Chargement...</div></Container>;
  }

  if (error) {
    return <Container className="my-5"><Alert variant="danger">Erreur : {error}</Alert></Container>;
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Comparaison des produits</h2>
      
      <Form.Check 
        type="switch"
        id="differences-switch"
        label="Afficher uniquement les différences"
        checked={showDifferencesOnly}
        onChange={(e) => setShowDifferencesOnly(e.target.checked)}
        className="mb-3"
      />
      
      {products.length > 0 ? (
        <CompareTable 
          products={products} 
          showDifferencesOnly={showDifferencesOnly} 
        />
      ) : (
        <Alert variant="info">Aucun produit à comparer ou erreur lors du chargement.</Alert>
      )}
    </Container>
  );
}

export default ComparePage;