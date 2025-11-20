import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

function DetailSkeleton() {
  return (
    <Container className="my-5">
      
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <Placeholder as="h1" animation="glow" style={{ width: '40%' }}>
          <Placeholder xs={12} />
        </Placeholder>
        <div className="text-center">
            <Placeholder as="div" animation="glow" style={{ width: '100px', height: '20px', marginBottom: '5px' }}>
                <Placeholder xs={12} />
            </Placeholder>
            <Placeholder as="div" animation="glow" style={{ width: '80px', height: '50px', borderRadius: '50px' }}>
                <Placeholder xs={12} style={{ height: '100%' }} />
            </Placeholder>
        </div>
      </div>

      <Row>
        
        <Col md={4} className="mb-4">
           <Card className="h-100 border-0 shadow-sm bg-light d-flex align-items-center justify-content-center" style={{ minHeight: '300px' }}>
             <Placeholder as="div" animation="glow" style={{ width: '50%', height: '50%' }}>
                <Placeholder xs={12} style={{ height: '100%' }} bg="secondary" />
             </Placeholder>
           </Card>
        </Col>

       
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white fw-bold">
                <Placeholder as="span" animation="glow">
                    <Placeholder xs={4} />
                </Placeholder>
            </Card.Header>
            <Card.Body>
                
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="d-flex justify-content-between mb-3 border-bottom pb-2">
                        <Placeholder as="span" animation="glow" style={{ width: '30%' }}>
                            <Placeholder xs={12} />
                        </Placeholder>
                        <Placeholder as="span" animation="glow" style={{ width: '20%' }}>
                            <Placeholder xs={12} />
                        </Placeholder>
                    </div>
                ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailSkeleton;