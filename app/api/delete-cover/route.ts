import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const target = path.join(process.cwd(), 'public', 'Selected Work', 'Gopal Snacks (Social Media Campaign)', 'cover.png');
  let status = '';

  if (fs.existsSync(target)) {
    fs.unlinkSync(target);
    status = 'Deleted cover.png';
  } else {
    status = 'File not found';
  }

  return NextResponse.json({ status });
}
