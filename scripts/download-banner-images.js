const { createApi } = require('unsplash-js')
const { writeFile, mkdir } = require('fs/promises')
const path = require('path')
const axios = require('axios')

const unsplash = createApi({
  accessKey: 'H_g8JNnPGwNNm0U87ECqF_xPVNaO_ltRJdq9TKNIB5w' // Free API key for demo purposes
})

const bannerKeywords = [
  'modern tech office workspace',
  'software development team meeting',
  'digital technology innovation',
]

async function downloadImage(imageUrl, imagePath) {
  const response = await axios({
    url: imageUrl,
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

  for (let i = 0; i < bannerKeywords.length; i++) {
    try {
      const result = await unsplash.photos.getRandom({
        query: bannerKeywords[i],
        orientation: 'landscape',
      })

      if (result.type === 'success') {
        const photo = result.response
        const imageUrl = photo.urls.raw + '&w=1920&h=1080&fit=crop&q=85'
        const imagePath = path.join(bannerDir, `banner-${i + 2}.jpg`)
        
        await downloadImage(imageUrl, imagePath)
        console.log(`Downloaded banner-${i + 2}.jpg`)
      }
    } catch (error) {
      console.error(`Error downloading banner-${i + 2}.jpg:`, error.message)
    }
  }
}

main().catch(console.error) 