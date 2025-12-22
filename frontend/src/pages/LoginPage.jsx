import React,  {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import toast from 'react-hot-toast';


function LoginPage() {
    const [password, setPassword]=useState('');
    const navigate=useNavigate();

    const handleLogin = (e) =>{
        e.preventDefault();

        if (password==='104766Dia-'){
            localStorage.setItem('isAdmin','true');
            toast.success("Bienvenue Administrateur 🔓 !");
            navigate('/admin');
        } else {
            toast.error('Mot de passe incorrect⛔');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{minHeight:'60vh'}}>
            <Card className="shadow p-4" style={{width: '100%', maxWidth: '400px'}}>
                <h2 className="text-center mb-4">Acces Admin 🔐</h2>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control
                        type="password"
                        placeholder="Saisir le code secret..."
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Se connecter
                    </Button>
                </Form>

            </Card>
        </Container>
    );

    }

    export default LoginPage;