const mongoose = require('mongoose');
require('dotenv').config();
const Telephone = require('../models/Telephone');
const Laptop = require('../models/Laptop');

const PHONE_BRANDS = ['Apple', 'Samsung', 'Google', 'Xiaomi', 'Oppo', 'OnePlus', 'Motorola', 'Sony', 'Asus', 'Vivo'];
const LAPTOP_BRANDS = ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'MSI', 'Microsoft', 'Razer', 'Gigabyte'];

async function populateRemaining() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected!');

        // Populate Phones
        const phones = [];
        for (let i = 1; i <= 100; i++) {
            const brand = PHONE_BRANDS[i % PHONE_BRANDS.length];
            phones.push({
                name: `${brand} Phone Pro ${Math.floor(i / 10) + 12} ${i % 5 === 0 ? 'Ultra' : ''}`,
                brand: brand,
                display_size: (6.1 + (i % 10) * 0.1).toFixed(1) + '"',
                cpu_name: brand === 'Apple' ? `A${15 + (i % 3)} Bionic` : `Snapdragon 8 Gen ${i % 4}`,
                ram_gb: [8, 12, 16][i % 3],
                storage_gb: [128, 256, 512, 1024][i % 4],
                battery_mah: 4000 + (i % 10) * 150,
                imageUrl: `https://via.placeholder.com/300?text=${brand}+Phone`,
                antutu_score: 800000 + (i % 50) * 10000,
                pros: ['Great display', 'Fast charging'],
                cons: ['Expensive', 'No headphone jack']
            });
        }
        await Telephone.deleteMany({});
        await Telephone.insertMany(phones);
        console.log('Inserted 100 Phones.');

        // Populate Laptops
        const laptops = [];
        for (let i = 1; i <= 100; i++) {
            const brand = LAPTOP_BRANDS[i % LAPTOP_BRANDS.length];
            laptops.push({
                name: `${brand} ${brand === 'Apple' ? 'MacBook' : 'Ultrabook'} ${i + 2020}`,
                brand: brand,
                cpu_name: brand === 'Apple' ? `M${(i % 3) + 1}` : `Intel Core i${[5, 7, 9][i % 3]}-13900H`,
                gpu_name: brand === 'Apple' ? 'Integrated' : `Nvidia RTX ${[3060, 4060, 4080][i % 3]}`,
                ram_gb: [8, 16, 32, 64][i % 4],
                storage_gb: [256, 512, 1024, 2048][i % 4],
                imageUrl: `https://via.placeholder.com/400?text=${brand}+Laptop`,
                geekbench_multi: 8000 + (i % 20) * 500,
                display_brightness_nits: 300 + (i % 5) * 100,
                battery_life_hours: 8 + (i % 10),
                pros: ['Excellent build quality', 'Thin and light'],
                cons: ['Fans can be loud', 'Limited ports']
            });
        }
        await Laptop.deleteMany({});
        await Laptop.insertMany(laptops);
        console.log('Inserted 100 Laptops.');

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

populateRemaining();
