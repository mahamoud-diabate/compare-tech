import React from 'react';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap';
import './Header.css';

function Header(){
return(
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
            <LinkContainer to="/">
                <Navbar.Brand>CompareTech</Navbar.Brand>
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
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;