import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Youtube } from "lucide-react"

const navigation = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'News', href: '/news' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Web Design', href: '/services#web-design' },
    { name: 'Web Development', href: '/services#web-development' },
    { name: 'E-commerce Solutions', href: '/services#ecommerce' },
    { name: 'Mobile Development', href: '/services#mobile' },
    { name: 'Content Management', href: '/services#cms' },
    { name: 'Website Maintenance', href: '/services#maintenance' },
  ],
  social: [
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/apsii.tese.1' },
    { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@barataapsii2466' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/barata.apsii/' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/apsie-tese-6853b3233/' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-[hsl(187,70%,15%)]">
      <div className="container py-12 sm:py-16">
        <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-4 px-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[hsl(187,100%,95%)]">Atech Systems</h3>
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-[hsl(187,50%,80%)]">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:apsiitese@gmail.com" className="hover:text-[hsl(187,100%,80%)] transition-colors">
                  apsiitese@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2 text-[hsl(187,50%,80%)]">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+67571570096" className="hover:text-[hsl(187,100%,80%)] transition-colors">
                  +675 7157 0096
                </a>
              </p>
              <p className="flex items-center gap-2 text-[hsl(187,50%,80%)]">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>4th street, Graceville Estate,<br />Makana 9mile, Port Moresby,<br />Papua New Guinea</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[hsl(187,100%,95%)]">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[hsl(187,50%,80%)] hover:text-[hsl(187,100%,80%)] transition-colors block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[hsl(187,100%,95%)]">Services</h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[hsl(187,50%,80%)] hover:text-[hsl(187,100%,80%)] transition-colors block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[hsl(187,100%,95%)]">Connect With Us</h3>
            <div className="flex gap-4">
              {navigation.social.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-[hsl(187,50%,80%)] hover:text-[hsl(187,100%,80%)] transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-6 w-6" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-[hsl(187,50%,25%)] text-center px-8">
          <p className="text-[hsl(187,50%,80%)]">
            © {new Date().getFullYear()} Atech Systems. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 