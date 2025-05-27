const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

const IMAGE_DIRS = [
  'public/images/banners',
  'public/images/services',
  'public/images/values',
  'public/images/icons'
];

const MAX_WIDTH = 1920;
const WEBP_QUALITY = 80;
const JPEG_QUALITY = 80;
const PNG_QUALITY = [0.6, 0.8];

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.svg') return; // SVGs are already optimized

  try {
    let sharpInstance = sharp(filePath);
    const metadata = await sharpInstance.metadata();
    
    // Resize if width exceeds maximum while maintaining aspect ratio
    if (metadata.width > MAX_WIDTH) {
      sharpInstance = sharpInstance.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

    // Generate WebP version
    const webpPath = filePath.replace(ext, '.webp');
    await sharpInstance.webp({ quality: WEBP_QUALITY }).toFile(webpPath);

    // Optimize original format
    if (ext === '.jpg' || ext === '.jpeg') {
      await imagemin([filePath], {
        destination: path.dirname(filePath),
        plugins: [imageminMozjpeg({ quality: JPEG_QUALITY })]
      });
    } else if (ext === '.png') {
      await imagemin([filePath], {
        destination: path.dirname(filePath),
        plugins: [imageminPngquant({ quality: PNG_QUALITY })]
      });
    }
  } catch (error) {
    throw new Error(`Failed to optimize ${filePath}: ${error.message}`);
  }
}

async function processDirectory(dir) {
  try {
    const files = await fs.readdir(dir);
    const optimizationPromises = files.map(async (file) => {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);
      
      if (stat.isDirectory()) {
        await processDirectory(filePath);
      } else if (/\.(jpg|jpeg|png|svg)$/i.test(file)) {
        await optimizeImage(filePath);
      }
    });

    await Promise.all(optimizationPromises);
  } catch (error) {
    throw new Error(`Failed to process directory ${dir}: ${error.message}`);
  }
}

async function main() {
  const results = {
    success: [],
    failed: []
  };

  for (const dir of IMAGE_DIRS) {
    try {
      await fs.access(dir);
      await processDirectory(dir);
      results.success.push(dir);
    } catch (error) {
      results.failed.push({ dir, error: error.message });
    }
  }

  return results;
}

main()
  .then(results => {
    if (results.success.length > 0) {
      process.stdout.write(`Successfully optimized images in: ${results.success.join(', ')}\n`);
    }
    if (results.failed.length > 0) {
      process.stderr.write('Failed to optimize some directories:\n');
      results.failed.forEach(({ dir, error }) => {
        process.stderr.write(`${dir}: ${error}\n`);
      });
      process.exit(1);
    }
  })
  .catch(error => {
    process.stderr.write(`Fatal error: ${error.message}\n`);
    process.exit(1);
  }); 