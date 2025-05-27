const https = require('https');
const fs = require('fs');
const path = require('path');

const IMAGE_CATEGORIES = {
  banners: {
    'hero-banner.jpg': 'https://images.unsplash.com/photo-1497366216548-37526070297c',
    'services-banner.jpg': 'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
    'about-banner.jpg': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    'blog-banner.jpg': 'https://images.unsplash.com/photo-1497366412874-3415097a27e7',
    'contact-banner.jpg': 'https://images.unsplash.com/photo-1497366216548-37526070297c',
  },
  services: {
    'web-design.jpg': 'https://images.unsplash.com/photo-1559028012-481c04fa702d',
    'web-development.jpg': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    'ecommerce.jpg': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
    'mobile-development.jpg': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    'cms.jpg': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
    'maintenance.jpg': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  },
  values: {
    'innovation.jpg': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    'quality.jpg': 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2',
    'support.jpg': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
  }
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', reject);
  });
}

async function ensureDirectories() {
  const directories = Object.keys(IMAGE_CATEGORIES).map(category => 
    path.join('public/images', category)
  );

  await Promise.all(directories.map(dir => 
    fs.promises.mkdir(dir, { recursive: true })
  ));
}

async function downloadCategoryImages(category, images) {
  const results = {
    success: [],
    failed: []
  };

  for (const [filename, url] of Object.entries(images)) {
    const filepath = path.join('public/images', category, filename);
    try {
      await downloadImage(url, filepath);
      results.success.push(filename);
    } catch (error) {
      results.failed.push({ filename, error: error.message });
    }
  }

  return results;
}

async function main() {
  try {
    await ensureDirectories();
    
    const results = {};
    for (const [category, images] of Object.entries(IMAGE_CATEGORIES)) {
      results[category] = await downloadCategoryImages(category, images);
    }

    // Report results
    Object.entries(results).forEach(([category, { success, failed }]) => {
      if (success.length > 0) {
        process.stdout.write(`✓ ${category}: Downloaded ${success.length} images\n`);
      }
      if (failed.length > 0) {
        process.stderr.write(`✗ ${category}: Failed to download ${failed.length} images:\n`);
        failed.forEach(({ filename, error }) => {
          process.stderr.write(`  - ${filename}: ${error}\n`);
        });
      }
    });

    // Exit with error if any downloads failed
    const hasFailures = Object.values(results).some(({ failed }) => failed.length > 0);
    if (hasFailures) {
      process.exit(1);
    }
  } catch (error) {
    process.stderr.write(`Fatal error: ${error.message}\n`);
    process.exit(1);
  }
}

main(); 