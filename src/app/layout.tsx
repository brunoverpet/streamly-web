import type { Metadata } from 'next'
import { Kalam, Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

const kalam = Kalam({
  variable: '--font-test',
  weight: ['400'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Streamly',
  description:
    'Un projet pour suivre les films et séries que tu as déjà vus et obtenir des recommandations personnalisées.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${kalam.variable} ${poppins.className} antialiased`}>{children}</body>
    </html>
  )
}
