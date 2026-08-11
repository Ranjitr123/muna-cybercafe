const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/favicon.svg'));

  console.log('Generating PNG favicons using Sharp...');

  // 16x16
  await sharp(svgBuffer).resize(16, 16).png().toFile(path.join(__dirname, '../public/favicon-16x16.png'));

  // 32x32
  await sharp(svgBuffer).resize(32, 32).png().toFile(path.join(__dirname, '../public/favicon-32x32.png'));
  await sharp(svgBuffer).resize(32, 32).png().toFile(path.join(__dirname, '../public/favicon.ico'));
  await sharp(svgBuffer).resize(32, 32).png().toFile(path.join(__dirname, '../src/app/favicon.ico'));

  // Apple Touch Icon (180x180)
  await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
  await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(__dirname, '../src/app/apple-icon.png'));

  // Android Chrome (192x192)
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(__dirname, '../public/android-chrome-192x192.png'));

  // Android Chrome (512x512)
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(__dirname, '../public/android-chrome-512x512.png'));

  console.log('All favicons generated successfully!');
}

generateFavicons().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
