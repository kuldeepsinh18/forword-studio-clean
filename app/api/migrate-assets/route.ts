import { NextResponse } from 'next/server';
import fs from 'fs';

export async function GET() {
  const oldDir = 'C:\\Users\\Win10\\Desktop\\Forword Studio\\public\\selected-work\\Raj Air Cooler';
  const newDir = 'C:\\Users\\Win10\\Desktop\\Forword Studio\\public\\selected-work\\raj-air-cooler';
  
  let logs = [];

  try {
    // 1. Create new directory
    if (!fs.existsSync(newDir)) {
      fs.mkdirSync(newDir, { recursive: true });
      logs.push('Created new directory: raj-air-cooler');
    }
    
    // 2. Copy files EXCEPT reel-02.mp4
    if (fs.existsSync(oldDir)) {
      const files = fs.readdirSync(oldDir);
      for (const file of files) {
        if (file === 'reel-02.mp4') {
          logs.push('Skipping oversized file: reel-02.mp4 (will be excluded/deleted)');
          continue;
        }
        fs.copyFileSync(`${oldDir}\\${file}`, `${newDir}\\${file}`);
        logs.push(`Copied ${file}`);
      }
      
      // 3. Delete the old directory and its contents
      for (const file of files) {
        fs.unlinkSync(`${oldDir}\\${file}`);
      }
      fs.rmdirSync(oldDir);
      logs.push('Deleted old directory: Raj Air Cooler');
      
    } else {
      logs.push('Old folder not found (may already be renamed)');
    }
    
    return NextResponse.json({ status: 'success', logs });
  } catch (e) {
    return NextResponse.json({ status: 'error', error: e instanceof Error ? e.message : 'Unknown error', logs });
  }
}
