const fs = require('fs');

const sourceFile = 'C:\\Users\\Win10\\Desktop\\MODERN AIR-COOLER FUNKEY REEL.mp4';
const destFile = 'C:\\Users\\Win10\\Desktop\\Forword Studio\\public\\selected-work\\raj-air-cooler\\reel-02.mp4';

try {
  if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, destFile);
    console.log('✅ Successfully copied and renamed the 16MB compressed video to reel-02.mp4');
  } else {
    console.log('❌ Could not find the video file on your desktop.');
  }
} catch (e) {
  console.error('Error copying file:', e);
}
