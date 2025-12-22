import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';

function TechRadar({ product1, product2 }) {
  
  const normalize = (value, maxValue) => {
    if (!value) return 0;
    let score = (value / maxValue) * 100;
    return score > 100 ? 100 : Math.round(score);
  };

  const getData = (p1, p2) => {
    if (!p1) return [];

    const type = p1.productType || 'cpus'; 
    const data = [];

    if (type.includes('cpu')) {
      data.push({ subject: 'Gaming (Single)', A: normalize(p1.geekbench_single, 2500), B: p2 ? normalize(p2.geekbench_single, 2500) : 0, fullMark: 100 });
      data.push({ subject: 'Travail (Multi)', A: normalize(p1.geekbench_multi, 25000), B: p2 ? normalize(p2.geekbench_multi, 25000) : 0, fullMark: 100 });
      data.push({ subject: 'Fréquence', A: normalize(p1.max_freq_ghz, 6.0), B: p2 ? normalize(p2.max_freq_ghz, 6.0) : 0, fullMark: 100 });
      data.push({ subject: 'Efficacité', A: normalize(150 - (p1.tdp || 100), 150), B: p2 ? normalize(150 - (p2.tdp || 100), 150) : 0, fullMark: 100 });
      data.push({ subject: 'Cœurs', A: normalize(p1.cores, 24), B: p2 ? normalize(p2.cores, 24) : 0, fullMark: 100 });
    } 
    else if (type.includes('telephone')) {
      data.push({ subject: 'Puissance', A: normalize(p1.antutu_score, 2000000), B: p2 ? normalize(p2.antutu_score, 2000000) : 0, fullMark: 100 });
      data.push({ subject: 'Batterie', A: normalize(p1.battery_mah, 6000), B: p2 ? normalize(p2.battery_mah, 6000) : 0, fullMark: 100 });
      data.push({ subject: 'RAM', A: normalize(p1.ram_gb, 24), B: p2 ? normalize(p2.ram_gb, 24) : 0, fullMark: 100 });
      data.push({ subject: 'Écran', A: normalize(parseFloat(p1.display_size || 0), 7), B: p2 ? normalize(parseFloat(p2.display_size || 0), 7) : 0, fullMark: 100 });
    }
    // Add other types (gpu, laptop) here if needed
    
    return data;
  };

  const chartData = getData(product1, product2);

  if (chartData.length === 0) return <div className="text-center text-muted p-5">Pas de données radar disponibles pour ce type.</div>;

  return (
    // FIX: We set a fixed height on the container AND explicit width/height on the component
    <div style={{ width: '100%', height: 400, minHeight: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
          
          <Radar
            name={product1.name}
            dataKey="A"
            stroke="#0d6efd"
            fill="#0d6efd"
            fillOpacity={0.4}
          />
          
          {product2 && (
            <Radar
              name={product2.name}
              dataKey="B"
              stroke="#dc3545"
              fill="#dc3545"
              fillOpacity={0.4}
            />
          )}
          
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TechRadar;