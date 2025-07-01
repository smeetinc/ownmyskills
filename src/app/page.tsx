"use client";

import Image from "next/image";
import { useState } from "react";
import { Wallet, CheckCircle, Award, ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import SkillProofFeatures from "@/components/sections/SkillProofFeatures";
import SkillNFT from "@/components/sections/SkillNFT";
import VerifyWork from "@/components/sections/VerifyWork";

export default function Home() {
  return (
    <main className="font-display">
      <HeroSection />
      <HowItWorksSection />
      <SkillProofFeatures />
      <SkillNFT />
      <VerifyWork />
    </main>
  );
}
