import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Lab Notebook AI - Smart Research Assistant",
  description: "AI-powered lab notebook for managing experiments and research with intelligent insights",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR">
      <body className={geistSans.variable + " " + geistMono.variable + " font-sans antialiased"}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
