const fs = require('fs');
const path = require('path');

const oldDir = 'C:\\Users\\Win10\\Desktop\\Forword Studio\\public\\selected-work\\Raj Air Cooler';
const newDir = 'C:\\Users\\Win10\\Desktop\\Forword Studio\\public\\selected-work\\raj-air-cooler';

try {
  if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir, { recursive: true });
    console.log('Created new directory: raj-air-cooler');
  }
  
  if (fs.existsSync(oldDir)) {
    const files = fs.readdirSync(oldDir);
    for (const file of files) {
      if (file === 'reel-02.mp4') {
        console.log('Skipping oversized file: reel-02.mp4');
        continue;
      }
      fs.copyFileSync(`${oldDir}\\${file}`, `${newDir}\\${file}`);
      console.log(`Copied ${file}`);
    }
    
    for (const file of files) {
      fs.unlinkSync(`${oldDir}\\${file}`);
    }
    fs.rmdirSync(oldDir);
    console.log('Deleted old directory: Raj Air Cooler');
  } else {
    console.log('Old folder not found (may already be renamed)');
  }
} catch (e) {
  console.error(e);
}
