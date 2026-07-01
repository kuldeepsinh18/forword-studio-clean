const fs = require('fs');
const path = require('path');

const target = path.join(process.cwd(), 'public', 'Selected Work', 'Gopal Snacks (Social Media Campaign)', 'cover.png');

if (fs.existsSync(target)) {
  fs.unlinkSync(target);
  console.log('Deleted cover.png');
} else {
  console.log('File not found');
}
