import { PageBanner } from "@/components/page-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Check } from "lucide-react"

/**
 * Service type definition for the services array
 */
interface Service {
  /** The name/title of the service */
  title: string
  /** Detailed description of the service, supports bullet points with \n */
  description: string
  /** Path to the service's illustration image */
  image: string
}

/**
 * Services Data
 * Comprehensive list of services offered by A-Tech Systems
 * 
 * Each service includes:
 * - Title: Name of the service
 * - Description: Detailed explanation of service offerings
 * - Image: Illustration representing the service
 * 
 * Note: Some services (like E-commerce) include package details in the description
 */
const services: Service[] = [
  {
    title: "Web Design",
    description: "Beautiful, responsive websites with modern UI/UX design principles that engage your audience and drive conversions.",
    image: "/images/services/web-design.jpg"
  },
  {
    title: "Web Development",
    description: "Custom web applications and solutions built with the latest technologies and best practices for optimal performance.",
    image: "/images/services/web-development.jpg"
  },
  {
    title: "E-commerce Solutions",
    description: "• Starter Package: Up to 100 products, basic payment gateway, simple inventory management, mobile-responsive design\n\n• Standard Package: Unlimited products, multiple payment gateways, advanced inventory, order tracking, customer accounts",
    image: "/images/services/ecommerce.jpg"
  },
  {
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.",
    image: "/images/services/mobile-development.jpg"
  },
  {
    title: "Content Management",
    description: "Custom CMS solutions that make it easy to manage and update your website content, blogs, and digital assets.",
    image: "/images/services/cms.jpg"
  },
  {
    title: "Website Maintenance",
    description: "Regular updates, security patches, and technical support to keep your website running smoothly and securely.",
    image: "/images/services/maintenance.jpg"
  }
];

export default function ServicesPage() {
  return (
    <div>
      <PageBanner 
        title="Our Services" 
        description="We offer a comprehensive range of web design and development services to help your business succeed online."
        backgroundImage="/images/banners/services-banner.jpg"
        className="min-h-[200px] sm:min-h-[300px]"
      />
      
      <div className="container py-8 sm:py-16">
        {/* Services Introduction */}
        <div className="mb-8 sm:mb-16 p-4 sm:p-8 rounded-lg bg-primary/5 backdrop-blur-sm">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center">Web Solutions</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-center">
            From stunning website designs to powerful web applications, we deliver cutting-edge digital solutions that help businesses thrive in the modern digital landscape.
          </p>
        </div>

        {/* Other Services Grid */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden group bg-[hsl(187,70%,15%)] hover:bg-[hsl(187,70%,18%)] transition-colors">
              <div className="relative h-40 sm:h-48">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[hsl(187,100%,10%)/80%] group-hover:bg-[hsl(187,100%,10%)/70%] transition-colors" />
              </div>
              <CardHeader className="p-4 sm:p-6 relative">
                <CardTitle className="text-lg sm:text-xl text-[hsl(187,100%,95%)]">{service.title}</CardTitle>
                <CardDescription className="mt-2 text-sm sm:text-base whitespace-pre-line text-[hsl(187,50%,80%)]">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 