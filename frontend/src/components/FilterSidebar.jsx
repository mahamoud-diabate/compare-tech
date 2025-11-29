import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';

function FilterSidebar({ filters, selectedFilters, onFilterChange }) {
  return (
    <Card className="shadow-sm mb-4 border-0">
      <Card.Header className="bg-white fw-bold border-bottom">Filtres</Card.Header>
      <Card.Body className="p-0">
        <Accordion defaultActiveKey={['0', '1', '2']} alwaysOpen flush>
          {filters.map((group, index) => (
            <Accordion.Item eventKey={String(index)} key={group.id}>
              <Accordion.Header className="small fw-bold">{group.label}</Accordion.Header>
              <Accordion.Body>
                <Form>
                  {group.options.map((option) => (
                    <Form.Check 
                      key={option}
                      type="checkbox"
                      id={`${group.id}-${option}`}
                      label={group.unit ? `${option} ${group.unit}` : option}
                      checked={selectedFilters[group.id]?.includes(option)}
                      onChange={() => onFilterChange(group.id, option)}
                      className="mb-2"
                    />
                  ))}
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card.Body>
    </Card>
  );
}

export default FilterSidebar;