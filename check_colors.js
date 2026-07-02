const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function checkColors() {
  const img = await loadImage('public/logos/CheckCars24.png');
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, img.width, img.height).data;
  
  let colors = new Set();
  for (let i=0; i<data.length; i+=4) {
    if (data[i+3] > 100) {
      const r = Math.round(data[i] / 10) * 10;
      const g = Math.round(data[i+1] / 10) * 10;
      const b = Math.round(data[i+2] / 10) * 10;
      colors.add(`${r},${g},${b}`);
    }
  }
  console.log("CheckCars24 colors (rounded):", Array.from(colors).slice(0, 20));

  const img2 = await loadImage('public/logos/Surbhika.png');
  const canvas2 = createCanvas(img2.width, img2.height);
  const ctx2 = canvas2.getContext('2d');
  ctx2.drawImage(img2, 0, 0);
  const data2 = ctx2.getImageData(0, 0, img2.width, img2.height).data;
  
  let colors2 = new Set();
  for (let i=0; i<data2.length; i+=4) {
    if (data2[i+3] > 100) {
      const r = Math.round(data2[i] / 10) * 10;
      const g = Math.round(data2[i+1] / 10) * 10;
      const b = Math.round(data2[i+2] / 10) * 10;
      colors2.add(`${r},${g},${b}`);
    }
  }
  console.log("Surbhika colors (rounded):", Array.from(colors2).slice(0, 20));
}
checkColors();
