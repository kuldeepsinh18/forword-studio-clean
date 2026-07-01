import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function walk(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file: string) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      results.push(file);
    }
  });
  return results;
}

export async function GET() {
  // Obfuscate the string so @vercel/nft doesn't statically bundle the entire 344MB public folder
  const folderName = ['p', 'u', 'b', 'l', 'i', 'c'].join('');
  const dir = path.join(process.cwd(), folderName);
  
  try {
    const res = walk(dir);
    return NextResponse.json(res);
  } catch (error) {
    // Fallback if public folder is not available at runtime on Vercel Lambda
    return NextResponse.json({ error: "Directory not found or accessible" }, { status: 404 });
  }
}
