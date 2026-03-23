import fs from 'fs';
import path from 'path';

const outputDir = './public/images';
fs.mkdirSync(outputDir, { recursive: true });

let count = 0;

// Extract from menu HTML (I["key"]="data:image/jpeg;base64,...";)
for (const file of ['../Downloads/sushi_iwa_menu.html', '../Downloads/sushi_iwa_website.html']) {
  const html = fs.readFileSync(file, 'utf8');

  // Pattern: I["key"]="data:image/jpeg;base64,..."
  const regex1 = /I\["([^"]+)"\]\s*=\s*"data:image\/jpeg;base64,([A-Za-z0-9+/=]+)"/g;
  let match;
  while ((match = regex1.exec(html)) !== null) {
    const [, key, b64] = match;
    const filename = key.replace(/_/g, '-') + '.jpg';
    const filepath = path.join(outputDir, filename);
    if (!fs.existsSync(filepath)) {
      fs.writeFileSync(filepath, Buffer.from(b64, 'base64'));
      console.log(`extracted: ${filename} (${Math.round(b64.length * 3/4 / 1024)}KB)`);
      count++;
    }
  }
}

console.log(`\nTotal: ${count} images extracted to ${outputDir}`);
