"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="bg-[#0F172A] text-white py-12 mt-16">
      <div className="w-full px-4 lg:px-0 lg:w-4/5 mx-auto flex justify-between items-start flex-col lg:flex-row gap-6">
        {/* Logo & Tagline */}
        <div className="w-full lg:w-1/2 px-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            <Image
              src="/logo.svg"
              alt="OwnMySkills Logo"
              width={40}
              height={35}
              className="object-contain"
            />
            <h3 className="text-lg font-semibold mb-2 text-[#3B99FC] italic">
              OwnMySkills
            </h3>
          </div>

          <p className="text-md lg:text-lg text-gray-300 font-bold italic">
            Transforming the way freelance work is trusted, by letting your
            contributions live forever on-chain — visible, verifiable, and
            client-approved.
          </p>
        </div>
        <div className="w-full lg:w-1/2 px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-white mb-3">Platform</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/#how-it-works" className="hover:text-white">
                  How it works
                </a>
              </li>
              <li>
                <a href="/#my-nfts" className="hover:text-white">
                  MySkillNFTs
                </a>
              </li>

              <li>
                <a href="/#features" className="hover:text-white">
                  Features
                </a>
              </li>
            </ul>
          </div>

          {/* Feature Links */}
          <div>
            <h4 className="font-semibold text-white mb-3">Features</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/#wallet" className="hover:text-white">
                  Wallet-based
                </a>
              </li>
              <li>
                <a href="/#easy" className="hover:text-white">
                  Easy Integration
                </a>
              </li>
              <li>
                <a href="/#client" className="hover:text-white">
                  Client Verification
                </a>
              </li>
              <li>
                <a href="/#global" className="hover:text-white">
                  Global Portfolio
                </a>
              </li>
              <li>
                <a href="/#public" className="hover:text-white">
                  Public Skill Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Users*/}
          <div>
            <h4 className="font-semibold text-white mb-3">For Users</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Freelancer Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Client Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Submit Work
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="my-4 w-full flex items-center justify-center text-white font-semibold">
        <p> &copy; {new Date().getFullYear()} | All rights reserved</p>
      </div>
    </footer>
  );
}
