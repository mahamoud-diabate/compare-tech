const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
require('dotenv').config();
const Cpu = require('../models/Cpu');

const SCRAPE_URL = 'https://www.notebookcheck.net/Mobile-Processors-Benchmark-List.2436.0.html';

async function scrapeCpus() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected!');

        console.log(`Fetching ${SCRAPE_URL}...`);
        const { data } = await axios.get(SCRAPE_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const $ = cheerio.load(data);
        const cpus = [];

        // Catch all variations of Notebookcheck benchmark rows
        $('tr.odd, tr.even, tr.desk_odd, tr.desk_even, tr.smartphone_odd, tr.smartphone_even').each((index, element) => {
            if (cpus.length >= 100) return false;

            const row = $(element);
            const nameLink = row.find('td:nth-child(2) a');
            const name = nameLink.text().trim() || row.find('td:nth-child(2)').text().trim();
            
            if (!name || name === 'Model') return;

            // Determine brand
            let brand = 'Other';
            const nameLower = name.toLowerCase();
            if (nameLower.includes('intel')) brand = 'Intel';
            else if (nameLower.includes('amd') || nameLower.includes('ryzen')) brand = 'AMD';
            else if (nameLower.includes('apple')) brand = 'Apple';
            else if (nameLower.includes('snapdragon') || nameLower.includes('qualcomm')) brand = 'Qualcomm';
            else if (nameLower.includes('dimensity') || nameLower.includes('mediatek')) brand = 'MediaTek';

            // Extract cores/threads from the 8th column (usually format "8/16")
            const coreThreadText = row.find('td:nth-child(8)').text().trim();
            const ctMatch = coreThreadText.match(/(\d+)\s*\/\s*(\d+)/);
            const cores = ctMatch ? parseInt(ctMatch[1]) : (parseInt(coreThreadText) || 0);
            const threads = ctMatch ? parseInt(ctMatch[2]) : cores;

            if (cores > 0) {
                cpus.push({
                    name: name,
                    brand: brand,
                    cores: cores,
                    threads: threads,
                    imageUrl: 'https://via.placeholder.com/150?text=CPU',
                    geekbench_multi: Math.floor(Math.random() * 15000) + 5000,
                    pros: ['Detailed benchmarks available', 'Reliable performance'],
                    cons: ['Specific socket required']
                });
            }
        });

        console.log(`Found ${cpus.length} CPUs. Inserting into database...`);

        if (cpus.length > 0) {
            // Optional: Clear existing CPUs first if you want a clean start
            // await Cpu.deleteMany({});
            await Cpu.insertMany(cpus);
            console.log('Successfully inserted CPUs!');
        } else {
            console.log('No CPUs found. Check the selectors.');
        }

    } catch (error) {
        console.error('Error during scraping:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
}

scrapeCpus();
