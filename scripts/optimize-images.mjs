import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images/webp');

fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg'));
const placeholders = {};

for (const file of files) {
  const key = file.replace('.jpg', '');
  const inputPath = path.join(inputDir, file);

  // Full WebP
  await sharp(inputPath)
    .webp({ quality: 82 })
    .toFile(path.join(outputDir, key + '.webp'));

  // Blur placeholder (20px wide, base64)
  const blurBuf = await sharp(inputPath)
    .resize(20)
    .blur(2)
    .webp({ quality: 20 })
    .toBuffer();

  placeholders[key] = 'data:image/webp;base64,' + blurBuf.toString('base64');
  console.log(`✓ ${key}`);
}

// Write placeholders map
const content = `export const PLACEHOLDERS: Record<string, string> = ${JSON.stringify(placeholders, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, '../src/data/imagePlaceholders.ts'), content);
console.log('Done. ' + files.length + ' images optimized.');
