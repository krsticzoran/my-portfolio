import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "sonner";

import { BackgroundWrapper } from "@/components/layout/background-wrapper";
import { Header } from "@/components/layout/header";

const exo2 = Exo_2({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-exo2",
});

export const metadata: Metadata = {
  title: "Zoran Krstić | Frontend Developer Portfolio",
  description:
    "Portfolio of Zoran Krstić, a frontend developer specialized in React and Next.js. Check out my projects, skills, and contact info.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${exo2.variable} font-exo antialiased`}>
        <BackgroundWrapper>
          <Header />
          {children}
          <Toaster position="bottom-left" />
        </BackgroundWrapper>
      </body>
    </html>
  );
}
