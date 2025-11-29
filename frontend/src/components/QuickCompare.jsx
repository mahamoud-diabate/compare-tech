import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function QuickCompare({allProducts}){
    const navigate=useNavigate();
    const[category,setCategory]=useState('cpu');
    const[product1,setProduct1]=useState('');
    const[product2,setProduct2]=useState('');

    const availableProducts=allProducts.filter(p=>p.productType===category);

    const handleCompare=()=>{
        if (product1 && product2) {
            navigate(`/compare?type=${category}&ids=${product1},${product2}`);
        }
    };

    return (
        <Card className="shadow-sm border-0 mb-5 bg-light">
            <Card.Body className="p-4">
                <h3 className="text-center mb-4 fw-bold">⚡ Comparateur Rapide</h3>

                <div className="d-flex flex-column gap-3">
                    <Form.Group className="text-center mb-3">
                        <Form.Label className="fw-bold text-muted text-uppercase samell">Je veux comparer des:</Form.Label>
                        <div className="d-flex justify-content gap-2">
                            {['cpu','gpu','laptop','telephone'].map(type=>(
                                <Button
                                    key={type}
                                    variant={category===type?'dark':'outline-secondary'}
                                    size="sm"
                                    onClick={()=>{setCategory(type);setProduct1('');setProduct2('');}}
                                    className="text-uppercase fw-bold px-3"
                                    >
                                        {type==='cpu'?'processeurs':type==='gpu'?'Cartes Graphiques':type==='telephone'?'Téléphones':'Laptops'}
                                    </Button>
                            ))}
                        </div>
                    </Form.Group>
                    <Row className="align-items-end g-3">
                    <Col md={5}>
                        <Form.Select
                        value={product1}
                        onChange={(e)=>setProduct1(e.target.value)}
                        className="p-3 fw-bold border-0 shadow-sm"
                        >
                            <option value="">Choisir le produit 1...</option>
                            {availableProducts.map(p=>(
                                <option key={p._id} value={p._id}>{p.name}</option>
                            ))}
                        </Form.Select>
                    </Col>

                    <Col md={2} className="text-center">
                    <div className="fw-bold text-danger fs-4">VS</div>
                    </Col>
                    <Col md={5}>
                    <Form.Select
                        value={product2}
                        onChange={(e)=>setProduct2(e.target.value)}
                        className="p-3 fw-bold border-0 shadow-sm"
                        >
                            <option value="">Choisir le produit 2...</option>
                            {availableProducts.map(p=>(
                                <option key={p._id} value={p._id}>{p.name}</option>
                            ))}
                            </Form.Select>
                    </Col>
                    </Row>
                    
                    <div className="text-center mt-3">
                        <Button
                        variant="primary"
                        size="lg"
                        onClick={handleCompare}
                        disabled={!product1||!product2}
                        className="px-5 fw-Bold rounded-pill"
                        >
                            Lancer le Comparatif 🚀
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );

}

export default QuickCompare;