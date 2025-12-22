import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function AdminPage() {
  const [productType, setProductType] = useState('cpus');
  const [existingProducts, setExistingProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  
  const initialFormState = {
    name: '', brand: '', imageUrl: '', price: '',
    cores: '', threads: '', max_freq_ghz: '', base_freq_ghz: '',
    memory_gb: '', memory_type: '',
    cpu_name: '', gpu_name: '', ram_gb: '', storage_gb: '',
    display_size: '', battery_mah: '',
    display_brightness_nits: '', battery_life_hours: '',
    geekbench_single: '', geekbench_multi: '', benchmark_3dmark: '', antutu_score: '',
    tdp: '',
    pros: '', cons: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchProducts = () => {
    fetch(`https://mahamoud-compare-tech-api.onrender.com/api/${productType}`)
      .then(res => res.json())
      .then(data => setExistingProducts(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
    setEditingId(null);
    setFormData(initialFormState);
  }, [productType]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    const dataToEdit = { ...product };
    
    if (Array.isArray(dataToEdit.pros)) dataToEdit.pros = dataToEdit.pros.join(', ');
    
    if (Array.isArray(dataToEdit.cons)) dataToEdit.cons = dataToEdit.cons.join(', ');
    
    setFormData({ ...initialFormState, ...dataToEdit });
    window.scrollTo(0, 0);
    toast('Mode Édition activé', { icon: '✏️' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Es-tu sûr de vouloir supprimer ce produit ?")) return;
    try {
      await fetch(`https://mahamoud-compare-tech-api.onrender.com/api/${productType}/${id}`, {
        method: 'DELETE'
      });
      toast.success('Produit supprimé !');
      fetchProducts();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = { ...formData };
    
    ['cores', 'threads', 'ram_gb', 'storage_gb', 'battery_mah', 'price', 
     'geekbench_single', 'geekbench_multi', 'benchmark_3dmark', 'antutu_score', 
     'tdp', 'display_brightness_nits', 'battery_life_hours', 'memory_gb'].forEach(field => {
       if (payload[field]) payload[field] = Number(payload[field]);
    });

    if (typeof payload.pros === 'string') {
        payload.pros = payload.pros.split(',').map(s => s.trim()).filter(s => s);
    }
    if (typeof payload.cons === 'string') {
        payload.cons = payload.cons.split(',').map(s => s.trim()).filter(s => s);
    }

    try {
      let response;
      if (editingId) {
        response = await fetch(`https://mahamoud-compare-tech-api.onrender.com/api/${productType}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch(`https://mahamoud-compare-tech-api.onrender.com/api/${productType}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify([payload]) 
        });
      }

      if (response.ok) {
        toast.success(editingId ? 'Produit modifié !' : 'Produit ajouté !');
        setFormData(initialFormState);
        setEditingId(null);
        fetchProducts();
      } else {
        const errorData = await response.json();
        toast.error('Erreur: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error(error);
      toast.error('Erreur serveur');
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem('isAdmin');
  toast.success('Déconnecté !');
  navigate('/login');
};

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Gestion du Catalogue</h1>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="outline-danger" onClick={handleLogout}>
        🔒 Déconnexion
        </Button>
      </div>
      
      <Card className="shadow-sm p-4 mb-5 border-0 border-top border-4 border-primary">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">{editingId ? '✏️ Modifier un produit' : '➕ Ajouter un produit'}</h4>
            {editingId && <Button variant="secondary" size="sm" onClick={handleCancel}>Annuler l'édition</Button>}
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Catégorie</Form.Label>
            <Form.Select 
                value={productType} 
                onChange={(e) => setProductType(e.target.value)}
                disabled={!!editingId}
            >
              <option value="cpus">Processeur (CPU)</option>
              <option value="gpus">Carte Graphique (GPU)</option>
              <option value="laptops">Ordinateur Portable</option>
              <option value="telephones">Téléphone</option>
            </Form.Select>
          </Form.Group>

          <Row className="mb-3">
            <Col><Form.Control placeholder="Nom (ex: iPhone 16)" name="name" value={formData.name} onChange={handleChange} required /></Col>
            <Col><Form.Control placeholder="Marque (ex: Apple)" name="brand" value={formData.brand} onChange={handleChange} required /></Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Control placeholder="URL Image (https://...)" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
          </Form.Group>
          <div className="p-3 bg-light rounded mb-3">
            <h6 className="text-muted mb-3">Spécifications Techniques</h6>
            <Row className="g-3">
                {productType === 'cpus' && (
                <>
                    <Col md={6}><Form.Control type="number" placeholder="Cœurs" name="cores" value={formData.cores} onChange={handleChange} /></Col>
                    <Col md={6}><Form.Control type="number" placeholder="Threads" name="threads" value={formData.threads} onChange={handleChange} /></Col>
                    <Col md={6}><Form.Control placeholder="Fréq. Max" name="max_freq_ghz" value={formData.max_freq_ghz} onChange={handleChange} /></Col>
                    <Col md={6}><Form.Control type="number" placeholder="Geekbench Multi" name="geekbench_multi" value={formData.geekbench_multi} onChange={handleChange} /></Col>
                </>
                )}
                {productType === 'gpus' && (
                <>
                    <Col md={6}><Form.Control type="number" placeholder="VRAM (GB)" name="memory_gb" value={formData.memory_gb} onChange={handleChange} /></Col>
                    <Col md={6}><Form.Control type="number" placeholder="3DMark Score" name="benchmark_3dmark" value={formData.benchmark_3dmark} onChange={handleChange} /></Col>
                </>
                )}
                {productType === 'telephones' && (
                <>
                    <Col md={6}><Form.Control placeholder="Écran" name="display_size" value={formData.display_size} onChange={handleChange} /></Col>
                    <Col md={6}><Form.Control type="number" placeholder="AnTuTu Score" name="antutu_score" value={formData.antutu_score} onChange={handleChange} /></Col>
                </>
                )}
                {productType === 'laptops' && (
                <>
                    <Col md={6}><Form.Control placeholder="CPU" name="cpu_name" value={formData.cpu_name} onChange={handleChange} /></Col>
                    <Col md={6}><Form.Control placeholder="GPU" name="gpu_name" value={formData.gpu_name} onChange={handleChange} /></Col>
                    <Col md={6}><Form.Control type="number" placeholder="RAM (GB)" name="ram_gb" value={formData.ram_gb} onChange={handleChange} /></Col>
                    <Col md={6}><Form.Control type="number" placeholder="Stockage (GB)" name="storage_gb" value={formData.storage_gb} onChange={handleChange} /></Col>
                </>
                )}
            </Row>
          </div>

          <h4 className="mb-3">Analyse (Séparer par des virgules)</h4>
          
          <Form.Group className="mb-3">
            <Form.Label className="text-success fw-bold">Avantages (Pros)</Form.Label>
            <Form.Control 
                as="textarea" 
                rows={2} 
                placeholder="Ex: Écran superbe, Rapide, Pas cher" 
                name="pros" 
                value={formData.pros} 
                onChange={handleChange} 
            />
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label className="text-danger fw-bold">Inconvénients (Cons)</Form.Label>
            <Form.Control 
                as="textarea" 
                rows={2} 
                placeholder="Ex: Chauffe, Pas de chargeur, Cher" 
                name="cons" 
                value={formData.cons} 
                onChange={handleChange} 
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant={editingId ? "warning" : "primary"} size="lg" type="submit">
              {editingId ? 'Sauvegarder les modifications' : 'Ajouter le Produit'}
            </Button>
          </div>
        </Form>
      </Card>

      <h3 className="mb-3">Produits existants ({existingProducts.length})</h3>
      <div className="table-responsive">
        <Table striped bordered hover className="align-middle">
            <thead className="table-dark">
                <tr>
                    <th>Image</th>
                    <th>Nom</th>
                    <th>Marque</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {existingProducts.map(p => (
                    <tr key={p._id}>
                        <td style={{width: '60px'}}>
                            {p.imageUrl && <img src={p.imageUrl} alt="" style={{width: '40px', height: '40px', objectFit: 'contain'}} />}
                        </td>
                        <td className="fw-bold">{p.name}</td>
                        <td><Badge bg="secondary">{p.brand}</Badge></td>
                        <td>
                            <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(p)}>✏️</Button>
                            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(p._id)}>🗑️</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default AdminPage;