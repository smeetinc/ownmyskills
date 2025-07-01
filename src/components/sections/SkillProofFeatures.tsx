"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function SkillProofFeatures() {
  const features = [
    {
      title: "Wallet-Based Login",
      description:
        "Connect with MetaMask or any wallet to verify and own your work—no passwords needed.",
      icon: "/frame5.png",
    },
    {
      title: "Client Verification",
      description:
        "Secure digital signatures from clients provide authentic proof of work completion.",
      icon: "/frame6.png",
    },
    {
      title: "Global Portfolio",
      description:
        "Showcase your verified work history to clients worldwide with blockchain-backed proof.",
      icon: "/frame7.png",
    },
    {
      title: "Instant Minting",
      description:
        "Automated NFT creation upon client verification with low gas fees and fast processing.",
      icon: "/frame8.png",
    },
    {
      title: "Easy Integration",
      description:
        "Simple tools for clients to verify work without needing deep web3 knowledge.",
      icon: "/frame3.png",
    },
    {
      title: "Public Skill Gallery",
      description:
        "Explore verified work from real freelancers. Browse Skill NFTs tied to real contributions.",
      icon: "/frame9.png",
    },
  ];

  return (
    <section className="bg-[#F1F1F1] py-6 px-4 w-full" id="features">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h1 className="text-center font-bold text-3xl">SkillProof Features</h1>
        <p className="my-6 text-center text-gray-600 max-w-3xl mx-auto">
          Everything you need to build and showcase your professional reputation
          on-chain.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={{
              hidden: { opacity: 0, scale: 0.95, y: 30 },
              show: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition"
          >
            {/* Icon */}
            <div className="w-fit h-fit mb-4">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={36}
                height={28}
                className="object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
