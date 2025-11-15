import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ComparePage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = React.useState([]);
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
      <main style={{ padding: '40px' }}>
        <h1>Comparaison des Produits</h1>
        <p>Chargement ou aucun produit sélectionné...</p>
      </main>
    );
  }

  const chartLabels = products.map(p => p.name);
  const chartDataPoints = products.map(p => p.score || 0);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Score CompareTech (sur 100)',
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
        display: true,
        text: `Comparaison des Scores (${productType}s)`,
      },
    },
  };

  return (
    <main style={{ padding: '40px' }}>
      <h1>Comparaison des {productType}s</h1>
      
      <div style={{ maxWidth: '800px', margin: 'auto' }}>
        <Bar options={options} data={data} />
      </div>
    </main>
  );
}

export default ComparePage;