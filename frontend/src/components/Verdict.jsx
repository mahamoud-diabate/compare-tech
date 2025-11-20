import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';


const parseValue = (val) => {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const match = val.match(/[\d\.]+/);
    return match ? parseFloat(match[0]) : 0;
  }
  return 0;
};

function Verdict({ products, productType }) {
  if (products.length !== 2) return null;

  const p1 = products[0];
  const p2 = products[1];
  const p1Score = p1.score || 0;
  const p2Score = p2.score || 0;

  let winner = null;
  let diff = 0;
  if (p1Score > p2Score) {
    winner = p1;
    diff = Math.round(((p1Score - p2Score) / p2Score) * 100);
  } else if (p2Score > p1Score) {
    winner = p2;
    diff = Math.round(((p2Score - p1Score) / p1Score) * 100);
  }


  const getReasons = (itemA, itemB) => {
    const reasons = [];
    
    const compareNumeric = (key, label, invert = false) => {
      const valA = parseValue(itemA[key]);
      const valB = parseValue(itemB[key]);
      if (!valA || !valB) return;

      if (invert) {
        if (valA < valB) reasons.push(`Meilleur ${label} (${itemA[key]} vs ${itemB[key]})`);
      } else {
        if (valA > valB) reasons.push(`Meilleur ${label} (${itemA[key]} vs ${itemB[key]})`);
      }
    };

    if (productType === 'cpu') {
      compareNumeric('cores', 'nombre de Cœurs');
      compareNumeric('threads', 'nombre de Threads');
      compareNumeric('max_freq_ghz', 'Fréquence Turbo');
      compareNumeric('geekbench_multi', 'Performance Multi-Cœur');
      compareNumeric('tdp', 'Efficacité Énergétique (TDP)', true);
    }
    if (productType === 'gpu') {
      compareNumeric('memory_gb', 'VRAM');
      compareNumeric('benchmark_3dmark', 'Performance 3DMark');
    }
    if (productType === 'telephone' || productType === 'laptop') {
      compareNumeric('ram_gb', 'RAM');
      compareNumeric('storage_gb', 'Stockage');
      compareNumeric('battery_mah', 'Batterie');
      compareNumeric('battery_life_hours', 'Autonomie');
    }

    return reasons;
  };

  const p1Reasons = getReasons(p1, p2);
  const p2Reasons = getReasons(p2, p1);

  return (
    <Card className="mb-5 shadow-sm border-0 bg-light">
      <Card.Body className="p-4">
        <h3 className="text-center mb-4">🏆 Verdict du Comparatif</h3>
        
        {winner ? (
          <div className="text-center mb-4">
            <h4 className="fw-bold text-success">
              {winner.name} est le gagnant !
            </h4>
            <p className="text-muted">
              Il est environ <strong>{diff}% plus performant</strong> selon notre Score global.
            </p>
          </div>
        ) : (
          <div className="text-center mb-4"><h4>C'est un match nul !</h4></div>
        )}

        <Row>
          <Col md={6} className="mb-3">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Header className="bg-white fw-bold text-primary">
                Pourquoi choisir {p1.name} ?
              </Card.Header>
              <Card.Body>
                <ul className="mb-0 ps-3">
                  {p1Reasons.length > 0 ? p1Reasons.map((r, i) => (
                    <li key={i} className="mb-2">{r}</li>
                  )) : <li>Aucun avantage technique majeur</li>}
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-3">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Header className="bg-white fw-bold text-primary">
                Pourquoi choisir {p2.name} ?
              </Card.Header>
              <Card.Body>
                <ul className="mb-0 ps-3">
                  {p2Reasons.length > 0 ? p2Reasons.map((r, i) => (
                    <li key={i} className="mb-2">{r}</li>
                  )) : <li>Aucun avantage technique majeur</li>}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Verdict;