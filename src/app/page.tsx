"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Wallet, CheckCircle, Award, ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import SkillProofFeatures from "@/components/sections/SkillProofFeatures";
import SkillNFT from "@/components/sections/SkillNFT";
import VerifyWork from "@/components/sections/VerifyWork";
import TrueSkillNFT from "@/components/sections/TrueSkillNFT";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800); // fake load
    return () => clearTimeout(t);
  }, []);

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
    <main className="font-display">
      <HeroSection />
      <HowItWorksSection />
      <SkillProofFeatures />
      <TrueSkillNFT />
      {/* <SkillNFT /> */}
      <VerifyWork />
    </main>
  );
}
