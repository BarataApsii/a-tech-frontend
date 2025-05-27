const axios = require('axios')
const { writeFile, mkdir } = require('fs/promises')
const path = require('path')

const placeholderImages = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c',
  'https://images.unsplash.com/photo-1552664730-d307ca884978',
  'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b',
]

async function downloadImage(imageUrl, imagePath) {
  const response = await axios({
    url: imageUrl + '?w=1920&h=1080&fit=crop&q=85',
    responseType: 'arraybuffer'
  })
  await writeFile(imagePath, response.data)
}

async function main() {
  const bannerDir = path.join(process.cwd(), 'public', 'images', 'banners')
  
  try {
    await mkdir(bannerDir, { recursive: true })
  } catch (error) {
    if (error.code !== 'EEXIST') throw error
  }

  for (let i = 0; i < placeholderImages.length; i++) {
    try {
      const imagePath = path.join(bannerDir, `banner-${i + 2}.jpg`)
      await downloadImage(placeholderImages[i], imagePath)
      console.log(`Downloaded banner-${i + 2}.jpg`)
    } catch (error) {
      console.error(`Error downloading banner-${i + 2}.jpg:`, error.message)
    }
  }
}

main().catch(console.error) 