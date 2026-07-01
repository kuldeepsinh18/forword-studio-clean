const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getDimensions(filePath) {
    try {
        const out = execSync(`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "${filePath}"`).toString().trim();
        return `${path.basename(path.dirname(filePath))}/${path.basename(filePath)}: ${out}`;
    } catch (e) {
        return `Failed to probe ${filePath}`;
    }
}

let result = "";
result += getDimensions('public/selected-work/gopal-snacks/preview.mp4') + "\n";
result += getDimensions('public/selected-work/Mahalaxmi-masala/preview.mp4') + "\n";
result += getDimensions('public/selected-work/raj-air-cooler/preview.mp4') + "\n";
result += getDimensions('public/selected-work/DTC Still Waters/preview.mp4') + "\n";
result += getDimensions('public/selected-work/DTC Still Waters/VIDEO.mp4') + "\n";
result += getDimensions('public/selected-work/dabur lal tail/preview.mp4') + "\n";

fs.writeFileSync('video-dimensions.txt', result);
