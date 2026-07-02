const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');

const projectUrl = 'https://www.behance.net/gallery/207076997/OCEANICA-BRAND-IDENTITY';
const targetDir = path.join(__dirname, 'public', 'selected-work', 'oceanica');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

(async () => {
  console.log('Launching Puppeteer...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport large enough so lazy loaded images might trigger or be in DOM
  await page.setViewport({ width: 1920, height: 1080 });

  console.log(`Navigating to ${projectUrl}...`);
  await page.goto(projectUrl, { waitUntil: 'networkidle2' });

  console.log('Scrolling down to trigger lazy loading of all assets...');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 500;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });

  // Extract images
  console.log('Extracting high-res images and GIFs...');
  const imageUrls = await page.evaluate(() => {
    // Behance project images typically have class 'ImageElement-image' or are inside 'Project-module'
    const imgs = Array.from(document.querySelectorAll('img'));
    const urls = new Set();
    
    imgs.forEach(img => {
      let src = img.getAttribute('src');
      // sometimes lazy loaded images store high-res in data-src or srcset
      const srcset = img.getAttribute('srcset');
      if (srcset) {
        // extract the largest source from srcset
        const sources = srcset.split(',').map(s => s.trim().split(' '));
        // simple heuristic: last one or matching fs/max_1200
        const bestSource = sources.find(s => s[0].includes('/fs/') || s[0].includes('/source/')) || sources[sources.length - 1];
        if (bestSource && bestSource[0]) {
          src = bestSource[0];
        }
      }
      
      if (src && (src.includes('project_modules') || src.includes('behance.net'))) {
        // Try to replace smaller versions with 'fs' or 'source'
        src = src.replace(/max_\d+/g, 'fs').replace(/disp/g, 'source');
        urls.add(src);
      }
    });
    return Array.from(urls).filter(u => u.includes('project_modules'));
  });

  console.log(`Found ${imageUrls.length} assets. Downloading...`);
  
  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    // Grab extension, default to .jpg
    const ext = path.extname(new URL(url).pathname) || '.jpg';
    const filename = `media-${(i + 1).toString().padStart(2, '0')}${ext}`;
    console.log(`Downloading ${filename} from ${url}`);
    try {
      await download(url, path.join(targetDir, filename));
    } catch (err) {
      console.error(`Failed to download ${url}`, err);
    }
  }

  console.log('All downloads complete!');
  await browser.close();
})();
