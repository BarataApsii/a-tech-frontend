import type { Metadata } from "next"
import { Inter, Audiowide, Russo_One } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })
const audiowide = Audiowide({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-audiowide'
})
const russoOne = Russo_One({
  weight: '400',
  subsets: ["latin"],
  variable: '--font-russo'
})

export const metadata: Metadata = {
  title: "Atech Systems - Web Design & Development",
  description: "Professional web design and development services",
  metadataBase: new URL('https://atech-systems.com/'),
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} ${audiowide.variable} ${russoOne.variable}`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  )
}
