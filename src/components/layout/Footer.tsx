"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="bg-[#0F172A] text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Tagline */}
        <div>
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
            <h3 className="text-lg font-semibold mb-2">OwnMySkills</h3>
          </div>

          <p className="text-sm text-gray-300">
            Building trust in the freelance economy <br />
            through blockchain verification
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="font-semibold text-white mb-3">Platform</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                How it works
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                My NFTs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Verify Work
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
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
              <a href="#" className="hover:text-white">
                Wallet-based
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Easy Integration
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Client Verification
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Global Portfolio
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Public Skill Gallery
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
