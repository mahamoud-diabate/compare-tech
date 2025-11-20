import React from 'react';
import Verdict from '../components/Verdict';
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
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const calculateCpuScore = (cpu) => {
  if (!cpu.geekbench_single || !cpu.geekbench_multi) return 0;
  const multiScore = (cpu.geekbench_multi / 22000) * 100;
  const singleScore = (cpu.geekbench_single / 3000) * 100;
  return (multiScore * 0.7) + (singleScore * 0.3);
};

const calculateGpuScore = (gpu) => {
  if (!gpu.benchmark_3dmark) return 0;
  const score = (gpu.benchmark_3dmark / 30000) * 100;
  return score;
};

const calculateTelephoneScore = (tel) => {
  if (!tel.antutu_score) return 0;

  const score = (tel.antutu_score / 2500000) * 100;
  return score;
};

function ComparePage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = React.useState([]);
  const [showDifferencesOnly, setShowDifferencesOnly] = React.useState(false);
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
      <Container className="my-5">
        <h1>Comparaison des Produits</h1>
        <p>Chargement ou aucun produit sélectionné...</p>
      </Container>
    );
  }

  const chartLabels = products.map(p => p.name);
  
  
  let chartDataPoints = [];
  if (productType === 'cpu') {
    chartDataPoints = products.map(p => calculateCpuScore(p));
  } else if (productType === 'gpu') {
    chartDataPoints = products.map(p => calculateGpuScore(p));
  } else if (productType === 'telephone') {
    chartDataPoints = products.map(p => calculateTelephoneScore(p));
  } else {
  
    chartDataPoints = products.map(p => p.score || 0);
  }
  

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Score CompareTech (calculé)',
        data: chartDataPoints,
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        max: 100
      }
    },
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: false,
      },
    },
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Comparaison des {productType}s</h1>
      
      <Card className="shadow-sm mb-5">
        <Card.Body>
          <Card.Title>Scores de Performance</Card.Title>
          <div style={{ maxWidth: '800px', margin: 'auto' }}>
            <Bar options={options} data={data} />
          </div>
        </Card.Body>
      </Card>

      <Verdict products={products} productType={productType} />
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Spécifications Détaillées</h2>
        <Form.Check 
          type="switch"
          id="diff-switch"
          label="Montrer les différences seulement"
          checked={showDifferencesOnly}
          onChange={() => setShowDifferencesOnly(!showDifferencesOnly)}
        />
      </div>

      <CompareTable products={products} showDifferencesOnly={showDifferencesOnly} />
    </Container>
  );
}

export default ComparePage;