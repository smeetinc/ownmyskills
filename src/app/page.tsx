"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";

import SkillNFT from "@/components/sections/SkillNFT";
import VerifyWork from "@/components/sections/VerifyWork";
import TrueSkillNFT from "@/components/sections/TrueSkillNFT";
import Features from "@/components/sections/Features";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800); // fake load
    return () => clearTimeout(t);
  }, []);

  // Listen to scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading homepage...</p>
        </div>
      </div>
    );
  }
  return (
    <main className="font-display relative">
      <HeroSection />
      <HowItWorksSection />
      <Features />
      <TrueSkillNFT />
      {/* <SkillNFT /> */}
      <VerifyWork />

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg z-50 transition-all"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}
    </main>
  );
}
