import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Exo_2,Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "sonner";

import { BackgroundWrapper } from "@/components/layout/background-wrapper";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AuthProvider } from "@/providers/auth-provider";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  variable: "--font-exo2",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
   display: "swap",
  preload: true,
  variable: "--font-geist-mono", 
});

export const metadata: Metadata = {
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
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${exo2.variable} ${geistMono.variable} font-exo antialiased`}>
        <BackgroundWrapper>
          <Header />
          <Analytics />
          <AuthProvider>{children}</AuthProvider>
          <Toaster position="bottom-left" />
          <Footer />
        </BackgroundWrapper>
      </body>
    </html>
  );
}
