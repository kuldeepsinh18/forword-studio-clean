import { NextResponse } from 'next/server';
import fs from 'fs';

export async function GET() {
  const oldDir = 'C:\\Users\\Win10\\Desktop\\Forword Studio\\public\\Selected Work\\Gopal Snacks (Social Media Campaign)';
  const newDir = 'C:\\Users\\Win10\\Desktop\\Forword Studio\\public\\selected-work\\gopal-snacks';
  let status: string[] = [];

  try {
    if (!fs.existsSync('C:\\Users\\Win10\\Desktop\\Forword Studio\\public\\selected-work')) {
      fs.mkdirSync('C:\\Users\\Win10\\Desktop\\Forword Studio\\public\\selected-work', { recursive: true });
    }
    
    if (fs.existsSync(oldDir)) {
      fs.renameSync(oldDir, newDir);
      status.push('Renamed Gopal Snacks folder successfully');
    } else {
      status.push('Old folder still not found, checking directory listing...');
      status.push(fs.readdirSync('C:\\Users\\Win10\\Desktop\\Forword Studio\\public\\Selected Work').join(', '));
    }
  } catch (e) {
    status.push('Error: ' + (e instanceof Error ? e.message : 'Unknown error'));
  }

  return NextResponse.json({ status });
}
