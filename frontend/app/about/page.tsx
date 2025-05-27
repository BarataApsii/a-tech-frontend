import { PageBanner } from "@/components/page-banner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div>
      <PageBanner 
        title="About Us" 
        description="Building your digital presence with fresh perspectives"
        backgroundImage="/images/banners/about-banner.jpg"
        className="min-h-[200px] sm:min-h-[300px]"
      />
      
      <div className="container py-8 sm:py-16">
        {/* Company Overview */}
        <div className="mb-8 sm:mb-16 p-4 sm:p-8 rounded-lg bg-[hsl(187,70%,15%)]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[hsl(187,100%,95%)]">Who We Are</h2>
            <p className="text-base sm:text-xl text-[hsl(187,50%,80%)] mb-6 sm:mb-8">
              A-Tech Systems represents a fresh approach to web development, bringing modern solutions and innovative ideas to businesses looking to establish their online presence. As an emerging team, we combine the latest technologies with a dedication to delivering high-quality, personalized web solutions.
            </p>
            <div className="grid grid-cols-2 gap-4 sm:gap-8 text-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[hsl(187,100%,80%)] mb-2">24/7</h3>
                <p className="text-sm sm:text-base text-[hsl(187,50%,80%)]">Dedicated Support</p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[hsl(187,100%,80%)] mb-2">Modern</h3>
                <p className="text-sm sm:text-base text-[hsl(187,50%,80%)]">Technologies</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Our Values</h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            <Card className="group overflow-hidden bg-[hsl(187,70%,15%)] hover:bg-[hsl(187,70%,18%)] transition-colors">
              <div className="relative">
                <div className="relative h-48">
                  <Image
                    src="/images/values/innovation.jpg"
                    alt="Innovation background"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[hsl(187,100%,10%)/80%] group-hover:bg-[hsl(187,100%,10%)/70%] transition-colors" />
                </div>
                <CardHeader className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[hsl(187,100%,80%)/10] backdrop-blur-sm rounded-lg flex items-center justify-center mb-4">
                    <Image src="/images/icons/innovation.svg" alt="Innovation" width={24} height={24} />
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-[hsl(187,100%,95%)]">Innovation</CardTitle>
                  <p className="text-sm sm:text-base text-[hsl(187,50%,80%)] mt-2">
                    Embracing cutting-edge technologies and fresh perspectives to create modern web solutions.
                  </p>
                </CardHeader>
              </div>
            </Card>

            <Card className="group overflow-hidden bg-[hsl(187,70%,15%)] hover:bg-[hsl(187,70%,18%)] transition-colors">
              <div className="relative">
                <div className="relative h-48">
                  <Image
                    src="/images/values/quality.jpg"
                    alt="Quality background"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[hsl(187,100%,10%)/80%] group-hover:bg-[hsl(187,100%,10%)/70%] transition-colors" />
                </div>
                <CardHeader className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[hsl(187,100%,80%)/10] backdrop-blur-sm rounded-lg flex items-center justify-center mb-4">
                    <Image src="/images/icons/quality.svg" alt="Quality" width={24} height={24} />
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-[hsl(187,100%,95%)]">Quality</CardTitle>
                  <p className="text-sm sm:text-base text-[hsl(187,50%,80%)] mt-2">
                    Committed to delivering high-quality work that exceeds expectations, no matter the project size.
                  </p>
                </CardHeader>
              </div>
            </Card>

            <Card className="group overflow-hidden bg-[hsl(187,70%,15%)] hover:bg-[hsl(187,70%,18%)] transition-colors">
              <div className="relative">
                <div className="relative h-48">
                  <Image
                    src="/images/values/support.jpg"
                    alt="Support background"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[hsl(187,100%,10%)/80%] group-hover:bg-[hsl(187,100%,10%)/70%] transition-colors" />
                </div>
                <CardHeader className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[hsl(187,100%,80%)/10] backdrop-blur-sm rounded-lg flex items-center justify-center mb-4">
                    <Image src="/images/icons/support.svg" alt="Support" width={24} height={24} />
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-[hsl(187,100%,95%)]">Support</CardTitle>
                  <p className="text-sm sm:text-base text-[hsl(187,50%,80%)] mt-2">
                    Providing dedicated support and clear communication throughout your project journey.
                  </p>
                </CardHeader>
              </div>
            </Card>
          </div>
        </div>

        {/* Why Choose Us */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Why Choose Us</h2>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            <div className="relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/services/web-development.jpg"
                alt="Our workspace"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Fresh Perspective</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Bringing new ideas and modern approaches to web development, unencumbered by outdated practices.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Personal Attention</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Your project gets our full attention and dedication, ensuring every detail is carefully considered.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Modern Technology</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Using the latest frameworks and tools to build fast, secure, and scalable web solutions.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Competitive Pricing</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Offering affordable rates while maintaining high-quality standards for your web development needs.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Custom Hand-Coded Solutions</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  We prioritize hand-coding for faster responsiveness and better performance, while also accommodating CMS preferences like WordPress or Joomla when requested.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 