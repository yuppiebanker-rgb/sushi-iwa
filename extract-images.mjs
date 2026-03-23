// extract-images.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const menuHtml = fs.readFileSync('C:/Users/patri/Downloads/sushi_iwa_menu.html', 'utf8');
const outputDir = path.join(__dirname, 'public/images');
fs.mkdirSync(outputDir, { recursive: true });

// Extract I["key"]="data:image/jpeg;base64,..." pattern
const regex = /I\["([^"]+)"\]="data:image\/jpeg;base64,([^"]+)";/g;
let match, count = 0;

while ((match = regex.exec(menuHtml)) !== null) {
  const [, key, b64] = match;
  const filename = key.replace(/_/g, '-') + '.jpg';
  fs.writeFileSync(path.join(outputDir, filename), Buffer.from(b64, 'base64'));
  console.log(`✓ ${filename}`);
  count++;
}

console.log(`\n✓ Extracted ${count} images to public/images/`);
