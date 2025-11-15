import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

function Hero({searchTerm, onSearchChange}){
    return(
        <div className="bg-primary text-white p-5 text-center">
            <Container>
            <h2 className="display-4">Trouvez le meilleur materiel</h2>
            <p className="lead">Comparez des milliers de produits en 1 clic.</p>

            <Form className="d-flex justify-content-center">
                <InputGroup className="w-75">
                    <Form.Control
                    type="search" 
                    placeholder="Rechercher un produit(ex:RTX 5080)..."
                    value={searchTerm}
                    onChange={(e)=> onSearchChange(e.target.value)}
                />
                <Button variant="dark" type="submit">
                    Rechercher
                </Button>
                </InputGroup>
            </Form>
        </Container>
        </div>
    );
}
export default Hero;