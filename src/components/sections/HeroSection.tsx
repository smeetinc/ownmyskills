"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const HeroSection = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  const handleFreelance = () => {
    if (!isConnected) {
      toast.error("Please connect wallet to proceed");
    } else {
      router.push("/request_verification");
    }
  };

  return (
    <section
      className="pt-16 text-white"
      style={{
        background:
          "linear-gradient(135deg, #171F42 0%, #171F42 40%, #293775 50%, #3F2888 60%, #3F2888 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-400/30 rounded-full text-blue-200 text-sm mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Web3 Work Verification
          </motion.div>

          <motion.h1
            className="text-4xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Mint Your Skills as{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              NFT Proof
            </span>
          </motion.h1>

          <motion.p
            className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            SkillProof helps freelancers verify completed work through NFTs
            signed by clients, building a trustworthy network relying on
            traditional resumes or reviews.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg flex items-center space-x-2 text-lg font-semibold transition-colors cursor-pointer"
              onClick={handleFreelance}
            >
              <span>Start Building Proof</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <Link
              href={"https://youtu.be/QLSysfGhfEQ"}
              className="cursor-pointer"
              target="_blank"
            >
              <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                View Demo
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
