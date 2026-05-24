import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
  }

  try {
    const dirPath = path.join(process.cwd(), 'public', 'img', id);
    if (!fs.existsSync(dirPath)) {
       return NextResponse.json({ images: [] });
    }

    const files = fs.readdirSync(dirPath);
    
    // Filter to only include image files and sort them naturally
    const images = files
      .filter(file => /\.(png|jpe?g|webp)$/i.test(file))
      .sort((a, b) => {
        // Natural sort (e.g., 2.png comes before 10.png)
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
      });

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Error reading directory:", error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}
