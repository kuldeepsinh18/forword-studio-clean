import { NextResponse } from 'next/server';
import fs from 'fs';

export async function GET() {
  const oldDir = 'C:\\Users\\Win10\\Desktop\\Forword Studio\\public\\Selected Work\\Gopal Snacks (Social Media Campaign)';
  const newDir = 'C:\\Users\\Win10\\Desktop\\Forword Studio\\public\\selected-work\\gopal-snacks';

  try {
    if (!fs.existsSync(newDir)) {
      fs.mkdirSync(newDir, { recursive: true });
    }
    
    // Copy all files
    const files = fs.readdirSync(oldDir);
    for (const file of files) {
      fs.copyFileSync(`${oldDir}\\${file}`, `${newDir}\\${file}`);
    }
    
    return NextResponse.json({ status: 'success', filesCopied: files.length });
  } catch (e) {
    return NextResponse.json({ status: 'error', error: e instanceof Error ? e.message : 'Unknown error' });
  }
}
