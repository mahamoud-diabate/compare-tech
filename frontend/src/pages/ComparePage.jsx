import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import CompareTable from '../components/CompareTable';
import Verdict from '../components/Verdict';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { getProductScore } from '../utils/scores';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ComparePage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = React.useState([]);
  const [showDifferencesOnly, setShowDifferencesOnly] = useState(false);
  const productType = searchParams.get('type');
  const idsString = searchParams.get('ids');

  React.useEffect(() => {
    if (idsString && productType) {
      const idsArray = idsString.split(',');
      const apiUrl = `https://mahamoud-compare-tech-api.onrender.com/api/${productType}s/compare`;

      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: idsArray })
      })
      .then(response => response.json())
      .then(data => {
        const typedData = data.map(item => ({ ...item, productType }));
        setProducts(typedData);
      })
      .catch(error => console.error("Erreur:", error));
    }
  }, [searchParams, productType, idsString]);

  if (products.length === 0) {
    return (
      <Container className="my-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
      </Container>
    );
  }

  const chartLabels = products.map(p => p.name);
  let datasets = [];

  // --- LOGIQUE DE GRAPHIQUE DYNAMIQUE ---
  if (productType === 'laptop') {
    // Pour les Laptops : 3 Barres (Performance, Écran, Batterie)
    const perfData = products.map(p => Math.round((p.geekbench_multi / 22000) * 100));
    const screenData = products.map(p => Math.round((p.display_brightness_nits / 1600) * 100));
    const batteryData = products.map(p => Math.round((p.battery_life_hours / 20) * 100));

    datasets = [
      { label: 'Performance', data: perfData, backgroundColor: 'rgba(13, 110, 253, 0.7)' },
      { label: 'Écran (Luminosité)', data: screenData, backgroundColor: 'rgba(255, 193, 7, 0.7)' },
      { label: 'Autonomie', data: batteryData, backgroundColor: 'rgba(25, 135, 84, 0.7)' },
    ];
  } else {
    // Pour les autres : 1 Barre (Score Global)
    const scoreData = products.map(p => getProductScore(p, productType));
    datasets = [
      { label: 'Score Global', data: scoreData, backgroundColor: 'rgba(13, 110, 253, 0.7)', borderRadius: 5 },
    ];
  }

  const data = { labels: chartLabels, datasets: datasets };

  const options = {
    indexAxis: productType === 'laptop' ? 'x' : 'y', // Vertical pour laptop, Horizontal pour les autres
    scales: { x: { beginAtZero: true, max: 100 }, y: { beginAtZero: true, max: 100 } },
    responsive: true,
    plugins: { legend: { display: true } },
  };

  return (
    <Container className="my-5">
      {/* En-tête VS */}
      <div className="text-center mb-5">
        <h4 className="text-muted text-uppercase small fw-bold mb-3">Comparatif {productType}</h4>
        <Row className="align-items-center justify-content-center">
          {products.map((p, index) => (
            <React.Fragment key={p._id}>
              <Col xs={5} md={4}>
                <h2 className="fw-bold text-dark">{p.name}</h2>
                <Badge bg="light" text="dark" className="border mt-2">{p.brand}</Badge>
              </Col>
              {index < products.length - 1 && (
                <Col xs={2} md={1}>
                  <div className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center mx-auto" 
                       style={{ width: '50px', height: '50px', fontWeight: 'bold', fontSize: '1.2rem' }}>VS</div>
                </Col>
              )}
            </React.Fragment>
          ))}
        </Row>
      </div>

      {/* Graphique */}
      <Card className="shadow-sm mb-5 border-0">
        <Card.Body className="p-4">
          <h3 className="mb-4 text-center">Analyse des Performances</h3>
          <div style={{ maxWidth: '800px', height: '400px', margin: 'auto' }}>
            <Bar options={options} data={data} />
          </div>
        </Card.Body>
      </Card>
      
      <Verdict products={products} productType={productType} />

      <div className="d-flex justify-content-between align-items-center mb-3 mt-5">
        <h2 className="mb-0">Spécifications Techniques</h2>
        <Form.Check 
          type="switch"
          id="diff-switch"
          label="Différences seulement"
          className="fw-bold"
          checked={showDifferencesOnly}
          onChange={() => setShowDifferencesOnly(!showDifferencesOnly)}
        />
      </div>

      <CompareTable products={products} showDifferencesOnly={showDifferencesOnly} />
    </Container>
  );
}

export default ComparePage;