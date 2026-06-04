import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://charlessolarwater.co.za'),
  title: "Charlessolarwater Projects | Engineering Water. Powering Infrastructure. Advancing Africa.",
  description:
    "Integrated engineering solutions across water systems, electrical infrastructure, construction, and intelligent automation. Multi-sector African engineering partner since 2012.",
  keywords: [
    "Charlessolarwater",
    "water engineering",
    "electrical infrastructure",
    "solar water heating",
    "construction",
    "automation",
    "South Africa",
    "Africa",
    "engineering",
    "infrastructure",
  ],
  authors: [{ name: "Charlessolarwater Projects" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Charlessolarwater Projects",
    description:
      "Integrated engineering solutions across water, energy, construction, and intelligent automation in Africa.",
    type: "website",
    url: "https://charlessolarwater.co.za",
    siteName: "Charlessolarwater Projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "Charlessolarwater Projects — Engineering Water. Powering Infrastructure. Advancing Africa.",
    description:
      "Integrated engineering solutions across water systems, electrical infrastructure, construction, and intelligent automation. Multi-sector African engineering partner since 2012.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Charlessolarwater Projects",
  "description": "Integrated engineering solutions across water systems, electrical infrastructure, construction, and intelligent automation in Africa.",
  "url": "https://charlessolarwater.co.za",
  "telephone": "+27 83 314 5636",
  "email": "info@charlessolarwater.co.za",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Edenvale",
    "addressLocality": "Johannesburg",
    "addressCountry": "ZA"
  },
  "foundingDate": "2012",
  "founder": {
    "@type": "Person",
    "name": "Charles Somanje"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical images */}
        <link rel="preload" fetchPriority="high" as="image" href="/company-logo.png" />
        <link rel="preload" as="image" href="/founder-photo.png" />
        <link rel="preload" as="image" href="/tina-photo.png" />
        <link rel="preload" as="image" href="/chunda-photo.png" />
        <link rel="preload" as="image" href="/nomsa-photo.png" />
        <link rel="preload" as="image" href="/david-photo.png" />
        <link rel="preload" as="image" href="/tina-avatar.png" />
        <link rel="preload" fetchPriority="high" as="image" href="/hero-home.png" />
        <link rel="preload" as="image" href="/hero-about.png" />
        <link rel="preload" as="image" href="/hero-services.png" />
        <link rel="preload" as="image" href="/hero-projects.png" />
        <link rel="preload" as="image" href="/hero-automation.png" />
        <link rel="preload" as="image" href="/hero-contact.png" />
        <link rel="preload" as="image" href="/hero-consultation.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd)
          }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
