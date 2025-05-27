import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const newsItem = await prisma.post.create({
    data: {
      title: "A-Tech Launches New Web Development Services",
      description: "Introducing our expanded range of web development services, including modern frontend frameworks and cloud solutions.",
      content: `
        <h2>Expanding Our Services</h2>
        <p>We are excited to announce the launch of our expanded web development services. Our team now offers comprehensive solutions using the latest technologies and frameworks.</p>
        
        <h3>New Services Include:</h3>
        <ul>
          <li>Next.js and React Development</li>
          <li>Full-Stack JavaScript Solutions</li>
          <li>Cloud Infrastructure Setup</li>
          <li>Performance Optimization</li>
        </ul>
        
        <h3>Why Choose Our Services?</h3>
        <p>Our experienced team combines technical expertise with creative design to deliver:</p>
        <ul>
          <li>Fast, responsive websites</li>
          <li>Modern user interfaces</li>
          <li>Scalable backend solutions</li>
          <li>SEO-friendly implementations</li>
        </ul>
        
        <p>Contact us today to learn how we can help transform your digital presence.</p>
      `,
      slug: "a-tech-launches-new-web-development-services",
      type: "NEWS",
      published: true,
      category: "Company News",
      authorId: "cmb5sa5eq0000vk0sfkrjsg8j"
    }
  })

  console.log("Created news item:", newsItem)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }) 