const fs = require('fs');
try {
  fs.renameSync('public/all-work/3D Product Visualization', 'public/all-work/3d-product-visualization');
  fs.renameSync('public/all-work/3d-product-visualization/01 SURBHIKA MARRIGOLD PETALS VIDEO WEBSITE.mp4', 'public/all-work/3d-product-visualization/01-surbhika-marigold-petals.mp4');
  fs.renameSync('public/all-work/3d-product-visualization/02 SUMMERCOOL BIG-B JUMBO COOLER VIDEO_HIGH_RENDER.mp4', 'public/all-work/3d-product-visualization/02-summercool-big-b-jumbo-cooler.mp4');
  console.log('Renamed successfully');
} catch (e) {
  console.error(e);
}
