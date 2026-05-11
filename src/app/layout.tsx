import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "sonner";

import { BackgroundWrapper } from "@/components/layout/background-wrapper";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  variable: "--font-exo2",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zkrstic.dev"),
  alternates: {
    canonical: "/",
  },
  title: "Zoran Krstić | Frontend Developer Portfolio",
  description:
    "Portfolio of Zoran Krstić, a frontend developer specialized in React and Next.js. Check out my projects, skills, and contact info.",
  openGraph: {
    title: "Zoran Krstić | Frontend Developer",
    description: "Creating high-performance web apps with modern UX and clean code.",
    url: "https://zkrstic.dev",
    siteName: "Zoran Krstić Portfolio",
    images: [
      {
        url: "https://zkrstic.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zoran Krstić | Frontend Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoran Krstić | Frontend Developer",
    description: "Creating high-performance web apps with modern UX and clean code.",
    images: ["https://zkrstic.dev/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://zkrstic.dev/#person",
        name: "Zoran Krstić",
        url: "https://zkrstic.dev",
        jobTitle: "Frontend Developer",
        description:
          "Frontend developer specializing in React, Next.js, and TypeScript. Available for freelance projects and full-time positions.",
        sameAs: ["https://github.com/krsticzoran", "https://www.linkedin.com/in/zorankrstic/"],
        knowsAbout: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Frontend Development"],
      },
      {
        "@type": "WebSite",
        "@id": "https://zkrstic.dev/#website",
        url: "https://zkrstic.dev",
        name: "Zoran Krstić – Frontend Developer",
        author: { "@id": "https://zkrstic.dev/#person" },
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${exo2.variable} font-exo antialiased`}>
        <BackgroundWrapper>
          <Header />
          <Analytics />
          {children}
          <Toaster position="bottom-left" />
          <Footer />
        </BackgroundWrapper>
      </body>
    </html>
  );
}
