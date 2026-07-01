const fs = require('fs');
const path = require('path');

const publicWorkDir = path.join(process.cwd(), 'public', 'all-work');
const dataOutputDir = path.join(process.cwd(), 'data');
const dataOutputFile = path.join(dataOutputDir, 'work-data.json');

// Ensure data dir exists
if (!fs.existsSync(dataOutputDir)) {
  fs.mkdirSync(dataOutputDir, { recursive: true });
}

const SUPPORTED_EXTS = ['.mp4', '.png', '.jpg', '.jpeg', '.webp'];

// Helper to normalize names: lowercase and replace non-alphanumeric with hyphens
function normalizeName(name) {
  const ext = path.extname(name);
  const base = path.basename(name, ext);
  const normalizedBase = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
  return normalizedBase + ext.toLowerCase();
}

function processDirectory(dirPath) {
  let items = [];
  if (!fs.existsSync(dirPath)) return items;

  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const oldPath = path.join(dirPath, file);
    const newName = normalizeName(file);
    const newPath = path.join(dirPath, newName);

    // Rename if needed
    if (file !== newName) {
      console.log(`Renaming: ${file} -> ${newName}`);
      fs.renameSync(oldPath, newPath);
    }
    
    items.push({ name: newName, path: newPath });
  }
  return items;
}

function generateManifest() {
  console.log('Scanning and normalizing public/all-work...');
  
  if (!fs.existsSync(publicWorkDir)) {
    console.log('Creating public/all-work directory...');
    fs.mkdirSync(publicWorkDir, { recursive: true });
  }

  const rootItems = processDirectory(publicWorkDir);
  const categories = [];

  for (const rootItem of rootItems) {
    const stat = fs.statSync(rootItem.path);
    if (!stat.isDirectory()) continue; // Categories must be folders

    const categoryNameRaw = rootItem.name.replace(/-/g, ' ');
    // Title case the category name
    const categoryName = categoryNameRaw.replace(/\b\w/g, c => c.toUpperCase());
    
    const category = {
      id: rootItem.name,
      name: categoryName,
      projects: []
    };

    const categoryItems = processDirectory(rootItem.path);

    for (const catItem of categoryItems) {
      const itemStat = fs.statSync(catItem.path);
      
      // If it's a file, it's a single-asset project
      if (itemStat.isFile()) {
        const ext = path.extname(catItem.name);
        if (!SUPPORTED_EXTS.includes(ext)) continue;
        
        const projectNameRaw = path.basename(catItem.name, ext).replace(/-/g, ' ');
        const projectName = projectNameRaw.replace(/\b\w/g, c => c.toUpperCase());
        
        category.projects.push({
          id: path.basename(catItem.name, ext),
          name: projectName,
          category: categoryName,
          media: [`/all-work/${category.id}/${catItem.name}`],
          preview: `/all-work/${category.id}/${catItem.name}`
        });
      } 
      // If it's a directory, it's a multi-asset project (campaign/grid)
      else if (itemStat.isDirectory()) {
        const projectItems = processDirectory(catItem.path);
        const media = [];
        let preview = '';
        
        for (const projItem of projectItems) {
          const projItemStat = fs.statSync(projItem.path);
          if (projItemStat.isFile()) {
            const ext = path.extname(projItem.name);
            if (SUPPORTED_EXTS.includes(ext)) {
              const url = `/all-work/${category.id}/${catItem.name}/${projItem.name}`;
              media.push(url);
              // Use first video as preview, fallback to first image
              if (!preview || (ext === '.mp4' && !preview.endsWith('.mp4'))) {
                preview = url;
              }
            }
          }
        }

        if (media.length > 0) {
          const projectNameRaw = catItem.name.replace(/-/g, ' ');
          const projectName = projectNameRaw.replace(/\b\w/g, c => c.toUpperCase());
          
          category.projects.push({
            id: catItem.name,
            name: projectName,
            category: categoryName,
            media: media,
            preview: preview || media[0]
          });
        }
      }
    }

    if (category.projects.length > 0) {
      categories.push(category);
    }
  }

  fs.writeFileSync(dataOutputFile, JSON.stringify({ categories }, null, 2));
  console.log('✅ Generated assets manifest at data/work-data.json');
}

generateManifest();
