const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
require('dotenv').config();
const Gpu = require('../models/Gpu');

const WIKI_URLS = [
    'https://en.wikipedia.org/wiki/List_of_Nvidia_graphics_processing_units',
    'https://en.wikipedia.org/wiki/List_of_AMD_graphics_processing_units'
];

async function scrapeGpus() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected!');

        const allGpus = [];

        for (const url of WIKI_URLS) {
            console.log(`Fetching ${url}...`);
            const { data } = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            });
            const $ = cheerio.load(data);

            // Wikipedia tables for GPUs are usually 'wikitable'
            $('table.wikitable tr').each((index, element) => {
                if (allGpus.length >= 100) return false;

                const row = $(element);
                const cells = row.find('td');
                
                if (cells.length < 5) return;

                const name = $(cells[0]).text().trim();
                if (!name || name.length < 3 || name.includes('Series')) return;

                const brand = url.includes('Nvidia') ? 'Nvidia' : 'AMD';
                
                // Try to find memory in columns (Wikipedia GPU tables are huge and vary)
                // We'll use some regex on the row text to find "GB"
                const rowText = row.text();
                const memMatch = rowText.match(/(\d+)\s*GB/i);
                const memory = memMatch ? parseInt(memMatch[1]) : 8;

                allGpus.push({
                    name: name,
                    brand: brand,
                    memory_gb: memory,
                    imageUrl: 'https://via.placeholder.com/150?text=GPU',
                    benchmark_3dmark: Math.floor(Math.random() * 20000) + 5000, // Placeholder
                    pros: ['Proven architecture', 'Good driver support'],
                    cons: ['High power draw']
                });
            });
        }

        console.log(`Found ${allGpus.length} GPUs. Inserting...`);
        if (allGpus.length > 0) {
            await Gpu.insertMany(allGpus);
            console.log('Successfully inserted GPUs!');
        }

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

scrapeGpus();
