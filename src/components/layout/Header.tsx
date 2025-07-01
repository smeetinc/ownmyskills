"use client";
import { Wallet, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import ConnectWalletButton from "@/components/ConnectWeb3Wallet";

export default function Header() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    router.push(href);
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => {
              router.push("/");
              setMenuOpen(false);
            }}
          >
            <Image
              src="/logo.svg"
              alt="OwnMySkills logo"
              width={40}
              height={35}
              className="object-contain"
            />
            <span className="text-xl font-bold text-gray-900">OwnMySkills</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a
              href="/#how-it-works"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              How It Works
            </a>
            <a
              href="/#my-nfts"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              My NFTs
            </a>
            <a
              href="/#verify-work"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Verify Work
            </a>
            <a
              href="/#features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
          </nav>

          {/* Connect Button & Dashboard */}
          <div className="hidden lg:flex items-center space-x-4">
            <ConnectWalletButton />
            {isConnected && (
              <Link href="/dashboard">
                <button className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  Dashboard
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-gray-700 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-4 py-4 space-y-4">
          <a
            onClick={() => handleNavClick("/#how-it-works")}
            className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
          >
            How It Works
          </a>
          <a
            onClick={() => handleNavClick("/#my-nfts")}
            className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
          >
            My NFTs
          </a>
          <a
            onClick={() => handleNavClick("/#verify-work")}
            className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
          >
            Verify Work
          </a>
          <a
            onClick={() => handleNavClick("/#features")}
            className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
          >
            Features
          </a>
          <div className="pt-4 border-t border-gray-100">
            <ConnectWalletButton />
          </div>
          {isConnected && (
            <button
              onClick={() => handleNavClick("/dashboard")}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg cursor-pointer"
            >
              Dashboard
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
