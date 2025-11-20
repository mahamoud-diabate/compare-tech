export const calculateCpuScore = (cpu) => {
    if (!cpu.geekbench_single||!cpu.geekbench_multi) return 0;
    const multi=(cpu.geekbench_multi/22000) * 100;
    const single = (cpu.geekbench_single/3000) *100 ;
    return Math.round((multi*0.7) + (single*0.3));
};

export const calculateGpuScore = (gpu) => {
    if (!gpu.benchmark_3dmark) return 0;
    return Math.round((gpu.benchmark_3dmark/3000)*100);
};

export const calculateTelephoneScore=(tel) => {
    if(!tel.antutu_score) return 0;
    return Math.round((tel.antutu_score/2500000)*100);
};

export const calculateLaptopScore=(laptop)=>{
    if(!laptop.geekbench_multi) return 0;
    return Math.round((laptop.geekbench_multi/22000)*100);
};

export const getScoreColor = (score) => {
    if(!score||score===0) return 'secondary';
    if (score>=90) return 'success';
    if (score>= 70) return 'primary';
    if (score>=50) return 'warning';
        return 'danger';
};

export const getProductScore=(product,type)=>{
    if (!product) return 0;
    if (product.score) return product.score;

    switch (type){
        case 'cpu': return calculateCpuScore(product);
        case 'gpu': return calculateGpuScore(product);
        case 'laptop': return calculateLaptopScore(product);
        case 'telephone': return calculateTelephoneScore(product);
        default: return 0;
    }
};
