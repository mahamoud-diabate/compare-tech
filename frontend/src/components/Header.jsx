import { API_BASE } from '../api';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import { LinkContainer } from 'react-router-bootstrap';



function Header({ toggleTheme, theme }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const urls = ['cpus', 'gpus', 'laptops', 'telephones'].map(e => `${API_BASE}/${e}`);
        const responses = await Promise.all(urls.map(url => fetch(url).then(r => r.json())));
        const cpus = responses[0].map(p => ({ ...p, productType: 'cpu' }));
        const gpus = responses[1].map(p => ({ ...p, productType: 'gpu' }));
        const laptops = responses[2].map(p => ({ ...p, productType: 'laptop' }));
        const phones = responses[3].map(p => ({ ...p, productType: 'telephone' }));
        setAllProducts([...cpus, ...gpus, ...laptops, ...phones]);
      } catch (e) { /* silent */ }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const matches = allProducts.filter(p =>
        (p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase()))
      ).slice(0, 6);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, allProducts]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (product) => {
    const type = product.productType || 'cpu';
    navigate(`/${type}/${product._id}`);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
  };

  return (
    <Navbar expand="lg" sticky="top" className="ct-navbar" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="ct-brand">
            <span className="ct-brand-icon">⚡</span>
            <span className="ct-brand-text">Compare<span className="text-primary">Tech</span></span>
          </Navbar.Brand>
        </LinkContainer>

        <div className="ct-search-desktop" ref={searchRef}>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="ct-search-group">
              <InputGroup.Text className="ct-search-icon">🔍</InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                className="ct-search-input"
                autoComplete="off"
              />
            </InputGroup>
          </Form>
          {showSuggestions && suggestions.length > 0 && (
            <ListGroup className="ct-search-dropdown">
              {suggestions.map((product) => (
                <ListGroup.Item
                  key={product._id}
                  action
                  onClick={() => handleSelect(product)}
                  className="ct-search-item"
                >
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div>
                      <strong className="d-block">{product.name}</strong>
                      <small className="text-muted">{product.brand}</small>
                    </div>
                    <span className="ct-search-badge">{product.productType?.toUpperCase()}</span>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center">
            <LinkContainer to="/cpus"><Nav.Link className="ct-nav-link">CPU</Nav.Link></LinkContainer>
            <LinkContainer to="/gpus"><Nav.Link className="ct-nav-link">GPU</Nav.Link></LinkContainer>
            <LinkContainer to="/laptops"><Nav.Link className="ct-nav-link">Laptops</Nav.Link></LinkContainer>
            <LinkContainer to="/telephones"><Nav.Link className="ct-nav-link">Phones</Nav.Link></LinkContainer>
            <LinkContainer to="/admin">
              <Nav.Link className="ct-nav-link ct-nav-admin">Admin</Nav.Link>
            </LinkContainer>
            <button
              className="ct-theme-toggle ms-lg-3 mt-2 mt-lg-0"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </Nav>
        </Navbar.Collapse>

        {/* Barre de recherche mobile */}
        <div className="ct-search-mobile mt-2" ref={searchRef}>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                className="ct-search-input"
                autoComplete="off"
              />
            </InputGroup>
          </Form>
          {showSuggestions && suggestions.length > 0 && (
            <ListGroup className="ct-search-dropdown">
              {suggestions.map((product) => (
                <ListGroup.Item key={product._id} action onClick={() => handleSelect(product)}>
                  <strong>{product.name}</strong> <small className="text-muted">({product.brand})</small>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
