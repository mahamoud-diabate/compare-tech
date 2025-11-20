import React from 'react';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import {LinkContainer} from 'react-router-bootstrap';
import './Header.css';

function Header(toggleTheme,theme){
return(
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
            <LinkContainer to="/">
                <Navbar.Brand>KING2MO CompareTech</Navbar.Brand>
            </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
            <LinkContainer to="/">
            <Nav.Link>CPUs</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/gpus">
              <Nav.Link>GPUs</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/laptops">
              <Nav.Link>Laptops</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/telephones">
              <Nav.Link>Téléphones</Nav.Link>
            </LinkContainer>
            <Button 
            variant={theme === 'dark' ? 'outline-light' : 'light'} 
            onClick={toggleTheme}
            className="ms-3 rounded-circle"
            style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </Button>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;