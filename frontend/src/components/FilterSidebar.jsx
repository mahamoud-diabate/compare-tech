import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function FilterSidebar({ brands, selectedBrands, onBrandChange }) {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-white fw-bold">Filtres</Card.Header>
      <Card.Body>
        <h6 className="mb-3">Marques</h6>
        <Form>
          {brands.map((brand) => (
            <Form.Check 
              key={brand}
              type="checkbox"
              id={`brand-${brand}`}
              label={brand}

              checked={selectedBrands.includes(brand)}
    
              onChange={() => onBrandChange(brand)}
              className="mb-2"
            />
          ))}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default FilterSidebar;