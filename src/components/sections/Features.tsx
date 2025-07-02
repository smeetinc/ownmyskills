"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      id: "wallet",
      title: "Wallet-Based Login",
      description:
        "Connect securely with your wallet to own your professional identity – no passwords, just control over your verified work.",
      icon: "/frame5.png",
    },
    {
      id: "client",
      title: "Client Verification",
      description:
        "Clients digitally approve your completed projects, creating unforgeable, client-approved proof of your skills.",
      icon: "/frame6.png",
    },
    {
      id: "global",
      title: "Global Portfolio",
      description:
        "Build a dynamic, blockchain-backed portfolio that showcases your verified expertise to the world, beyond traditional resumes.",
      icon: "/frame7.png",
    },
    {
      id: "instant",
      title: "Instant Minting",
      description:
        "Seamlessly transform client-approved work into permanent, immutably on-chain Skill NFTs.",
      icon: "/frame8.png",
    },
    {
      id: "easy",
      title: "Easy Integration",
      description:
        "Effortless tools make client verification simple for anyone, removing Web3 barriers to get your work approved.",
      icon: "/frame3.png",
    },
    {
      id: "public",
      title: "Public Skill Gallery",
      description:
        "Explore a transparent gallery of verifiable skills, allowing you to discover real contributions beyond unreliable portfolios.",
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
        <h1 className="text-center font-bold text-3xl">OwnMySkill Features</h1>
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
            id={feature.id}
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
