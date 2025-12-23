import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function Verdict({ products, productType }) {
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!products || products.length < 2) return null;

  const p1 = products[0];
  const p2 = products[1];

  // Fonction pour appeler ton Backend (qui appelle Gemini)
  const askGemini = async () => {
    setLoading(true);
    try {
     const response = await fetch('http://localhost:3001/api/ai/verdict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product1: p1, product2: p2 })
      });
      const data = await response.json();
      setAiAnalysis(data.aiResponse);
    } catch (error) {
      console.error("Erreur IA", error);
      setAiAnalysis("Désolé, je n'arrive pas à joindre le serveur IA.");
    }
    setLoading(false);
  };

  // --- LOGIQUE CLASSIQUE (Maths) ---
  let mainMetricKey = productType.includes('cpu') ? 'geekbench_multi' : 
                      productType.includes('gpu') ? 'benchmark_3dmark' : 
                      productType.includes('laptop') ? 'geekbench_multi' : 'antutu_score';
  
  const val1 = Number(p1[mainMetricKey]) || 0;
  const val2 = Number(p2[mainMetricKey]) || 0;
  
  let winner = val1 > val2 ? p1 : p2;
  let diffPercent = val1 && val2 ? Math.round((Math.abs(val1 - val2) / Math.min(val1, val2)) * 100) : 0;

  return (
    <Card className="shadow-lg border-0 mb-5 overflow-hidden">
      <div className="bg-primary p-3 text-white text-center d-flex justify-content-between align-items-center">
        <h3 className="mb-0 fw-bold mx-auto">🏆 Verdict</h3>
      </div>
      
      <Card.Body className="p-4 text-center">
        
        {/* VERDICT CLASSIQUE (Immédiat) */}
        <h4 className="fw-normal text-muted mb-3">Mathématiquement, le gagnant est...</h4>
        <h1 className="display-4 fw-bold text-primary mb-3">{winner.name}</h1>
        <Badge bg="success" className="fs-5 px-3 py-2 rounded-pill mb-4">
            +{diffPercent}% de puissance théorique
        </Badge>

        <hr className="my-4"/>

        {/* ZONE IA (Gemini) */}
        {!aiAnalysis ? (
            <div className="text-center">
                <p className="lead">Tu veux un avis plus nuancé et humain ?</p>
                <Button 
                    variant="outline-dark" 
                    size="lg" 
                    className="rounded-pill px-4 fw-bold ai-btn"
                    onClick={askGemini}
                    disabled={loading}
                >
                    {loading ? '🧠 Analyse en cours...' : '✨ Demander à l\'IA Gemini'}
                </Button>
            </div>
        ) : (
            <div className="bg-light p-4 rounded-3 border border-2 border-info text-start">
                <h5 className="fw-bold text-info mb-3">🤖 L'avis de Gemini :</h5>
                {/* On affiche le texte de l'IA (Markdown supporté si besoin) */}
                <p style={{ whiteSpace: 'pre-line', fontSize: '1.1rem' }}>
                    {aiAnalysis}
                </p>
            </div>
        )}

      </Card.Body>
    </Card>
  );
}

export default Verdict;