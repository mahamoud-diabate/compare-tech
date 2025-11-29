import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';

function Hero({ searchTerm = "", onSearchChange = () => {}, allProducts = [] }) {
  const [suggestions, setSuggestions] = useState([]);
  const [localTerm, setLocalTerm] = useState(searchTerm || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm !== undefined) {
      setLocalTerm(searchTerm);
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalTerm(value);
   
    if (onSearchChange) {
        onSearchChange(value);
    }

    if (value.length > 0 && allProducts && allProducts.length > 0) {
      const matches = allProducts.filter(product => 
        (product.name && product.name.toLowerCase().includes(value.toLowerCase())) ||
        (product.brand && product.brand.toLowerCase().includes(value.toLowerCase()))
      );
    
      setSuggestions(matches.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (product) => {
    const type = product.productType || 'cpu';
    navigate(`/${type}/${product._id}`);
    setSuggestions([]);
    setLocalTerm(''); 
    if (onSearchChange) onSearchChange('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleBlur = () => {
    setTimeout(() => setSuggestions([]), 200);
  };

  return (
    <div className="bg-primary text-white p-5 text-center position-relative">
      <Container>
        <h2 className="display-4 fw-bold">Trouvez le meilleur matériel</h2>
        <p className="lead mb-4">Comparez des milliers de produits en un clic.</p>
        
        <div className="d-flex justify-content-center position-relative">
          <div className="w-75 position-relative">
            <Form className="d-flex" onSubmit={handleSubmit}>
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Rechercher (ex: RTX 4070, iPhone 16...)"
                  value={localTerm}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="shadow-sm border-0 p-3"
                  autoComplete="off"
                />
                <Button variant="dark" type="submit" className="px-4 fw-bold">
                  Rechercher
                </Button>
              </InputGroup>
            </Form>

            {suggestions.length > 0 && (
              <ListGroup 
                className="position-absolute w-100 shadow text-start" 
                style={{ zIndex: 1000, top: '100%', left: 0, marginTop: '5px' }}
              >
                {suggestions.map((product) => (
                  <ListGroup.Item 
                    key={product._id} 
                    action 
                    onClick={() => handleSuggestionClick(product)}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{product.name}</strong>
                      <small className="text-muted ms-2">({product.brand})</small>
                    </div>
                    <span className="badge bg-light text-dark border">
                      {product.productType ? product.productType.toUpperCase() : 'PRODUIT'}
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Hero;