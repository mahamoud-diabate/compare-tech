import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';

// On importe le VRAI composant tableau
import CompareTable from '../components/CompareTable'; 

// Cette fonction "traduit" le type de l'URL (singulier)
// en chemin d'API (pluriel)
const getApiEndpoint = (type) => {
  switch (type) {
    case 'cpu': return 'cpus';
    case 'gpu': return 'gpus';
    case 'laptop': return 'laptops';
    case 'telephone': return 'telephones';
    default: return null;
  }
};

function ComparePage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDifferencesOnly, setShowDifferencesOnly] = useState(false);

  const productType = searchParams.get('type');
  const idsQuery = searchParams.get('ids');

  useEffect(() => {
    // On utilise la fonction de traduction
    const apiPath = getApiEndpoint(productType);

    if (!apiPath || !idsQuery) {
      setError("Type de produit invalide ou IDs manquants dans l'URL.");
      setLoading(false);
      return;
    }

    const ids = idsQuery.split(',');
    
    const fetchProducts = async () => {
      try {
        // On prépare un appel API pour chaque ID
        const productPromises = ids.map(id =>
          fetch(`https://mahamoud-compare-tech-api.onrender.com/api/${apiPath}/${id}`)
            .then(res => {
              if (!res.ok) {
                // Si UN SEUL appel échoue, on arrête tout
                throw new Error(`Produit ${id} non trouvé (type: ${apiPath})`);
              }
              return res.json();
            })
            // On rajoute le 'productType' que le CompareTable attend
            .then(data => ({ ...data, productType: productType })) 
        );

        // On attend que TOUS les appels soient terminés
        const fetchedProducts = await Promise.all(productPromises);
        setProducts(fetchedProducts);

      } catch (err) {
        console.error("Erreur fetch:", err);
        setError(err.message); // Affiche l'erreur si un produit n'est pas trouvé
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

  }, [productType, idsQuery]); 

  if (loading) {
    return <Container className="my-5"><div className="text-center">Chargement...</div></Container>;
  }

  if (error) {
    // Affiche l'erreur ici
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