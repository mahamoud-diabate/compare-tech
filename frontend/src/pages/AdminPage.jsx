import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import toast from 'react-hot-toast';

function AdminPage() {
  const [productType, setProductType] = useState('cpus');
  

  const initialFormState = {
    name: '', brand: '', imageUrl: '', price: '',
    cores: '', threads: '', max_freq_ghz: '', base_freq_ghz: '', 
    memory_gb: '', memory_type: '', 
    cpu_name: '', gpu_name: '', ram_gb: '', storage_gb: '', 
    display_size: '', battery_mah: '', // Tel
    display_brightness_nits: '', battery_life_hours: '',
    geekbench_single: '', geekbench_multi: '', benchmark_3dmark: '', antutu_score: '',
    tdp: '',
    pros: '', cons: '' 
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const payload = { ...formData };
    
    
    ['cores', 'threads', 'ram_gb', 'storage_gb', 'battery_mah', 'price', 
     'geekbench_single', 'geekbench_multi', 'benchmark_3dmark', 'antutu_score', 
     'tdp', 'display_brightness_nits', 'battery_life_hours', 'memory_gb'].forEach(field => {
       if (payload[field]) payload[field] = Number(payload[field]);
    });

    
    if (payload.pros) payload.pros = payload.pros.split(',').map(s => s.trim());
    if (payload.cons) payload.cons = payload.cons.split(',').map(s => s.trim());

    try {
      
      const response = await fetch(`https://mahamoud-compare-tech-api.onrender.com/api/${productType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([payload]) 
      });

      if (response.ok) {
        toast.success('Produit ajouté avec succès !');
        setFormData(initialFormState); 
      } else {
        const errorData = await response.json();
        toast.error('Erreur: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error(error);
      toast.error('Erreur de connexion au serveur');
    }
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Panneau d'Administration</h1>
      <Card className="shadow-sm p-4">
        <Form onSubmit={handleSubmit}>
          
          
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Type de Produit</Form.Label>
            <Form.Select value={productType} onChange={(e) => setProductType(e.target.value)}>
              <option value="cpus">Processeur (CPU)</option>
              <option value="gpus">Carte Graphique (GPU)</option>
              <option value="laptops">Ordinateur Portable</option>
              <option value="telephones">Téléphone</option>
            </Form.Select>
          </Form.Group>

          <h4 className="mb-3">Informations Générales</h4>
          <Row className="mb-3">
            <Col><Form.Control placeholder="Nom (ex: Core i9-14900K)" name="name" value={formData.name} onChange={handleChange} required /></Col>
            <Col><Form.Control placeholder="Marque (ex: Intel)" name="brand" value={formData.brand} onChange={handleChange} required /></Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Control placeholder="URL de l'image (https://...)" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
          </Form.Group>

          <h4 className="mb-3">Spécifications Techniques</h4>
          
          
          <Row className="g-3 mb-4">
            
            {productType === 'cpus' && (
              <>
                <Col md={6}><Form.Control type="number" placeholder="Cœurs" name="cores" onChange={handleChange} /></Col>
                <Col md={6}><Form.Control type="number" placeholder="Threads" name="threads" onChange={handleChange} /></Col>
                <Col md={6}><Form.Control placeholder="Fréq. Max (ex: 5.0 GHz)" name="max_freq_ghz" onChange={handleChange} /></Col>
                <Col md={6}><Form.Control type="number" placeholder="TDP (Watts)" name="tdp" onChange={handleChange} /></Col>
                <Col md={6}><Form.Control type="number" placeholder="Score Geekbench Single" name="geekbench_single" onChange={handleChange} /></Col>
                <Col md={6}><Form.Control type="number" placeholder="Score Geekbench Multi" name="geekbench_multi" onChange={handleChange} /></Col>
              </>
            )}

            
            {productType === 'gpus' && (
              <>
                <Col md={6}><Form.Control type="number" placeholder="Cœurs CUDA/Stream" name="cores" onChange={handleChange} /></Col>
                <Col md={6}><Form.Control type="number" placeholder="Mémoire VRAM (GB)" name="memory_gb" onChange={handleChange} /></Col>
                <Col md={6}><Form.Control placeholder="Type Mémoire (ex: GDDR6X)" name="memory_type" onChange={handleChange} /></Col>
                <Col md={6}><Form.Control type="number" placeholder="Score 3DMark" name="benchmark_3dmark" onChange={handleChange} /></Col>
              </>
            )}

            
            {productType === 'laptops' && (
              <>
                <Col md={6}><Form.Control placeholder="Nom du CPU" name="cpu_name" onChange={handleChange} /></Col>
                <Col md={6}><Form.Control placeholder="Nom du GPU" name="gpu_name" onChange={handleChange} /></Col>
                <Col md={6}><Form.Control type="number" placeholder="RAM (GB)" name="ram_gb" onChange={handleChange} /></Col>
                <Col md={6}><Form.Control type="number" placeholder="Stockage (GB)" name="storage_gb" onChange={handleChange} /></Col>
                <Col md={6}><Form.Control type="number" placeholder="Score Geekbench Multi" name="geekbench_multi" onChange={handleChange} /></Col>
                <Col md={6}><Form.Control type="number" placeholder="Autonomie (Heures)" name="battery_life_hours" onChange={handleChange} /></Col>
              </>
            )}

            
            {productType === 'telephones' && (
              <>
                 <Col md={6}><Form.Control placeholder="Taille Écran (ex: 6.1 pouces)" name="display_size" onChange={handleChange} /></Col>
                 <Col md={6}><Form.Control placeholder="Nom du Processeur" name="cpu_name" onChange={handleChange} /></Col>
                 <Col md={6}><Form.Control type="number" placeholder="RAM (GB)" name="ram_gb" onChange={handleChange} /></Col>
                 <Col md={6}><Form.Control type="number" placeholder="Batterie (mAh)" name="battery_mah" onChange={handleChange} /></Col>
                 <Col md={6}><Form.Control type="number" placeholder="Score AnTuTu" name="antutu_score" onChange={handleChange} /></Col>
              </>
            )}
          </Row>

          <h4 className="mb-3">Analyse (Séparer par des virgules)</h4>
          <Form.Group className="mb-3">
            <Form.Control as="textarea" rows={2} placeholder="Avantages (ex: Écran superbe, Rapide, Pas cher)" name="pros" value={formData.pros} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control as="textarea" rows={2} placeholder="Inconvénients (ex: Chauffe, Pas de chargeur, Cher)" name="cons" value={formData.cons} onChange={handleChange} />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" size="lg" type="submit">
              Ajouter le Produit
            </Button>
          </div>

        </Form>
      </Card>
    </Container>
  );
}

export default AdminPage;