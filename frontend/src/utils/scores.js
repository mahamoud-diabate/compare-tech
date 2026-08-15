// --- FORMULES DE CALCUL (Recalibrage 2025) ---

export const calculateCpuScore = (cpu) => {
  if (!cpu.geekbench_single || !cpu.geekbench_multi) return 0;
  const multi = (cpu.geekbench_multi / 29000) * 100;
  const single = (cpu.geekbench_single / 3500) * 100;
  let total = Math.round((multi * 0.7) + (single * 0.3));
  return total > 100 ? 100 : total;
};

export const calculateGpuScore = (gpu) => {
  if (!gpu.benchmark_3dmark) return 0;
  let score = Math.round((gpu.benchmark_3dmark / 35000) * 100);
  return score > 100 ? 100 : score;
};

export const calculateTelephoneScore = (tel) => {
  if (!tel.antutu_score) return 0;
  let score = Math.round((tel.antutu_score / 3200000) * 100);
  return score > 100 ? 100 : score;
};

export const calculateLaptopScore = (laptop) => {
  if (!laptop.geekbench_multi) return 0;
  let score = Math.round((laptop.geekbench_multi / 26000) * 100);
  return score > 100 ? 100 : score;
};

// --- C'EST CETTE FONCTION QUI MANQUAIT ---
export const getScoreColor = (score) => {
  if (!score || score === 0) return 'secondary';
  if (score >= 90) return 'success'; // Vert pour l'excellence
  if (score >= 70) return 'primary'; // Bleu pour le très bon
  if (score >= 50) return 'warning'; // Jaune pour le moyen
  return 'danger'; // Rouge pour le faible
};

// Fonction principale de distribution
export const getProductScore = (product, typeOverride) => {
    if (product.score) return product.score;
    const type = typeOverride || product.productType || '';
    
    if (type.includes('cpu')) return calculateCpuScore(product);
    if (type.includes('gpu')) return calculateGpuScore(product);
    if (type.includes('telephone')) return calculateTelephoneScore(product);
    if (type.includes('laptop')) return calculateLaptopScore(product);
    return 0;
};