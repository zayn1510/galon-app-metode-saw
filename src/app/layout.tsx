import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
})

export const metadata = {
  title: 'GalonBest',
  description: 'Air Galon Terbaik',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={poppins.variable}>
      <body>{children}</body>
    </html>
  )
}
