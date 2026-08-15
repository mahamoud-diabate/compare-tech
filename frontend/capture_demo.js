// Script de capture de démonstration pour CompareTech
import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = join(__dirname, 'demo-screenshots');

mkdirSync(OUTPUT_DIR, { recursive: true });

async function capturePage(page, url, filename, delay = 2000) {
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 }).catch(() => {});
  await new Promise(r => setTimeout(r, delay));
  await page.screenshot({ path: join(OUTPUT_DIR, filename), fullPage: true });
  console.log(`  ✓ ${filename}`);
}

async function captureDemo() {
  const browser = await puppeteer.launch({ 
    headless: true,
    executablePath: 'C:/Users/diaba/.cache/puppeteer/chrome/win64-149.0.7827.22/chrome-win64/chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('📸 Capture de la démo CompareTech...\n');

  // 1. Home page
  await capturePage(page, BASE_URL, '01-home.png');

  // 2. CPUs page
  await capturePage(page, `${BASE_URL}/cpus`, '02-cpus.png');

  // 3. GPUs page
  await capturePage(page, `${BASE_URL}/gpus`, '03-gpus.png');

  // 4. Laptops page
  await capturePage(page, `${BASE_URL}/laptops`, '04-laptops.png');

  // 5. Telephones page
  await capturePage(page, `${BASE_URL}/telephones`, '05-phones.png');

  // 6. Home + recherche RTX
  await capturePage(page, BASE_URL, '06-recherche.png', 500);
  const searchInput = await page.$('input[type="search"]');
  if (searchInput) {
    await searchInput.click();
    await page.keyboard.type('RTX 4070', { delay: 80 });
    await page.keyboard.press('Enter');
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({ path: join(OUTPUT_DIR, '07-search-results.png'), fullPage: true });
    console.log('  ✓ 07-search-results.png');
  }

  // 7. Admin page
  await capturePage(page, `${BASE_URL}/admin`, '08-admin.png');

  await browser.close();

  console.log('\n🎬 Assemblage du GIF...');
  
  // Créer le GIF avec ffmpeg (palette optimisée)
  const ffmpegPath = 'C:/Users/diaba/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.1-full_build/bin/ffmpeg.exe';
  const gifOutput = join(__dirname, 'Animation.gif');
  
  // D'abord générer la palette, puis le GIF
  const cmd = `"${ffmpegPath}" -y -framerate 1/2 -i "${OUTPUT_DIR}/%02d-*.png" -vf "fps=1,scale=1280:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5" -loop 0 "${gifOutput}" 2>&1`;
  
  const output = execSync(cmd, { timeout: 30000, shell: true });
  console.log(output.toString());
  console.log(`\n✅ GIF créé : Animation.gif (${(require('fs').statSync(gifOutput).size / 1024 / 1024).toFixed(1)} MB)`);
}

captureDemo().catch(err => {
  console.error('❌ Erreur:', err.message);
  process.exit(1);
});
