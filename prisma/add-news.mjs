import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const newsItem = await prisma.post.create({
    data: {
      title: "A-Tech Strengthens Cybersecurity Services Portfolio",
      description: "A-Tech announces enhanced cybersecurity services to protect businesses in an increasingly digital world.",
      content: `
        <h2>Protecting Your Digital Assets</h2>
        <p>In response to growing cyber threats, A-Tech is proud to announce our enhanced cybersecurity services portfolio. We're committed to helping businesses protect their digital assets with state-of-the-art security solutions.</p>
        
        <h3>Our Enhanced Security Services:</h3>
        <ul>
          <li>Comprehensive Security Audits</li>
          <li>Penetration Testing</li>
          <li>Zero-Trust Architecture Implementation</li>
          <li>24/7 Security Monitoring</li>
          <li>Incident Response Planning</li>
        </ul>
        
        <h3>Why Choose A-Tech for Cybersecurity?</h3>
        <p>Our cybersecurity experts bring years of experience in protecting businesses from evolving threats:</p>
        <ul>
          <li>Certified security professionals</li>
          <li>Industry-leading security tools and practices</li>
          <li>Customized security solutions</li>
          <li>Proactive threat detection and prevention</li>
        </ul>
        
        <h3>New Security Features</h3>
        <p>Our enhanced services include:</p>
        <ul>
          <li>AI-powered threat detection</li>
          <li>Cloud security solutions</li>
          <li>Employee security training</li>
          <li>Compliance management</li>
        </ul>
        
        <p>Contact A-Tech today to learn how we can help secure your business against cyber threats.</p>
      `,
      slug: "a-tech-strengthens-cybersecurity-services",
      type: "NEWS",
      published: true,
      category: "Security Services",
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