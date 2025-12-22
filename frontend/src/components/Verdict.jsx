import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';

function Verdict({ products, productType }) {

  if (!products || products.length < 2) {
    return (
      <Alert variant="info" className="text-center">
        Sélectionnez deux produits pour voir le verdict de l'IA. 🤖
      </Alert>
    );
  }

  const p1 = products[0];
  const p2 = products[1];


  let mainMetricKey = '';
  let mainMetricLabel = '';
  let secondaryMetricKey = '';
  let secondaryMetricLabel = '';

  if (productType.includes('cpu')) {
    mainMetricKey = 'geekbench_multi';
    mainMetricLabel = 'Performance Multicœur';
    secondaryMetricKey = 'geekbench_single';
    secondaryMetricLabel = 'Gaming (Single-Core)';
  } else if (productType.includes('gpu')) {
    mainMetricKey = 'benchmark_3dmark';
    mainMetricLabel = 'Puissance Graphique (3DMark)';
    secondaryMetricKey = 'memory_gb';
    secondaryMetricLabel = 'Mémoire Vidéo (VRAM)';
  } else if (productType.includes('laptop')) {
    mainMetricKey = 'geekbench_multi';
    mainMetricLabel = 'Puissance Brute';
    secondaryMetricKey = 'battery_life_hours';
    secondaryMetricLabel = 'Autonomie';
  } else if (productType.includes('telephone')) {
    mainMetricKey = 'antutu_score';
    mainMetricLabel = 'Performance Globale (AnTuTu)';
    secondaryMetricKey = 'battery_mah';
    secondaryMetricLabel = 'Taille Batterie';
  }

  // --- 2. ANALYSE DU VAINQUEUR ---
  const val1 = Number(p1[mainMetricKey]) || 0;
  const val2 = Number(p2[mainMetricKey]) || 0;

  // Si pas de données, on arrête
  if (val1 === 0 && val2 === 0) return null;

  let winner, loser, diffPercent;

  if (val1 > val2) {
    winner = p1;
    loser = p2;
    diffPercent = Math.round(((val1 - val2) / val2) * 100);
  } else {
    winner = p2;
    loser = p1;
    diffPercent = Math.round(((val2 - val1) / val1) * 100);
  }

 
  const winnerSec = Number(winner[secondaryMetricKey]) || 0;
  const loserSec = Number(loser[secondaryMetricKey]) || 0;
  let nuanceText = null;

  if (loserSec > winnerSec) {
   
    const diffSec = Math.round(((loserSec - winnerSec) / winnerSec) * 100);
    nuanceText = `Cependant, le ${loser.name} garde l'avantage sur ${secondaryMetricLabel.toLowerCase()} (+${diffSec}%).`;
  } else if (loser.price && winner.price && loser.price < winner.price) {
   
    const priceDiff = winner.price - loser.price;
    nuanceText = `Cela dit, le ${loser.name} est plus économique (économie de ${priceDiff}€).`;
  }

  return (
    <Card className="shadow-lg border-0 mb-5 overflow-hidden">
      <div className="bg-primary p-3 text-white text-center">
        <h3 className="mb-0 fw-bold">🏆 Le Verdict de l'Expert</h3>
      </div>
      <Card.Body className="p-4 text-center">
        
        <h4 className="fw-normal text-muted mb-3">Le grand gagnant est le...</h4>
        <h1 className="display-4 fw-bold text-primary mb-3">
            {winner.name}
        </h1>

        <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
            <Badge bg="success" className="fs-5 px-3 py-2 rounded-pill">
                +{diffPercent}% plus performant
            </Badge>
            <span className="text-muted small">sur {mainMetricLabel}</span>
        </div>

        <p className="lead px-md-5">
            Si vous cherchez la puissance pure, le <strong>{winner.name}</strong> est le choix incontestable. 
            Il domine son adversaire avec un score de <strong>{Math.round(Math.max(val1, val2)).toLocaleString()}</strong> contre {Math.round(Math.min(val1, val2)).toLocaleString()}.
        </p>

        {nuanceText && (
            <Alert variant="warning" className="d-inline-block mt-3 px-4 fw-bold text-dark border-warning">
                ☝️ {nuanceText}
            </Alert>
        )}

        <div className="mt-4 pt-4 border-top">
            <p className="small text-muted mb-0">
                *Analyse basée sur les spécifications techniques théoriques et les benchmarks {mainMetricKey.split('_')[0]}.
            </p>
        </div>

      </Card.Body>
    </Card>
  );
}

export default Verdict;