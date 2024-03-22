import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geist = localFont({
  src: '@/fonts/GeistVariableVF.woff2',
  variable: '--font-geist'
})

const geistMono = localFont({
  src: '@/fonts/GeistMonoVariableVF.woff2',
  variable: '--font-geist-mono'
})

let metadataBase: URL
if (process.env.VERCEL_URL) metadataBase = new URL('https://plane-specs-calculator.vercel.app')
else metadataBase = new URL(`http://localhost:${process.env.PORT || 3000}`)

export const metadata: Metadata = {
  metadataBase,
  title: 'Plane Spec Calculator',
  description:
    'A calculator for BUS 374 plane design specs',
  openGraph: {
    images: '/og-image.png'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
