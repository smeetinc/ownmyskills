import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Web3Provider } from "@/providers/Web3Provider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "OwnMySkills – Mint your Skills as NFT Proof",
  description:
    "Verify your freelance work, request client approval, and mint your skills as NFTs with SkillProof – the trustless proof of your real-world contributions.",
  keywords: [
    "mint skills",
    "NFT skills",
    "make my skills NFT",
    "client approval",
    "request verification",
    "SkillProof",
    "freelance verification",
    "web3 proof of work",
    "blockchain resume",
  ],
  metadataBase: new URL("https://skillproof-coral.vercel.app"),
  openGraph: {
    title: "SkillProof – Mint your Skills as NFT Proof",
    description:
      "The fastest way for freelancers to prove verified work. Mint your skills as NFTs and build a verified portfolio.",
    url: "https://skillproof-coral.vercel.app",
    siteName: "SkillProof",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillProof – Mint your Skills as NFT Proof",
    description:
      "Verify freelance work and mint your verified skills as NFTs. Proof of work, powered by web3.",
    images: ["/image.png"],
    creator: "@yourTwitterHandle",
  },
};
<meta name="apple-mobile-web-app-title" content="SkillProof" />;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <Web3Provider>
          <Header />
          <Toaster position="top-right" />
          {children}
          <Footer />
        </Web3Provider>
      </body>
    </html>
  );
}
