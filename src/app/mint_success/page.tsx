"use client";

import { useState, useEffect } from "react";
import {
  Check,
  Copy,
  ExternalLink,
  Share,
  Linkedin,
  Twitter,
  Download,
} from "lucide-react";

interface MintingDetails {
  tokenId: string;
  walletAddress: string;
  ipfsUri: string;
  transactionHash: string;
  mintedAt: string;
  network: string;
  projectName: string;
}

export default function NFTMintedSuccessfully() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [projectData, setProjectData] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("verificationData");
      if (stored) {
        const parsed = JSON.parse(stored);
        setProjectData(parsed);
      }
    }
  }, []);

  useEffect(() => {
    if (projectData.length > 0) {
      console.log("showing project data", projectData);
    }
  }, [projectData]);

  const get_local_minitingData =
    typeof window !== "undefined" ? localStorage.getItem("mintingDetails") : null;
  if (!get_local_minitingData) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            No Minting Data Found
          </h1>
          <p className="text-gray-600">
            It seems like you haven't minted any NFTs yet. Please mint an NFT
            first to view the details.
          </p>
        </div>
      </div>
    );
  }

  const mintingData: MintingDetails = JSON.parse(get_local_minitingData);

  const copyToClipboard = async (
    text: string,
    field: string
  ): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const openInNewTab = (url: string): void => {
    window.open(url, "_blank");
  };

  const shareOnLinkedIn = (): void => {
    const text = `🎉 Just minted my work verification NFT for "${mintingData.projectName}" on ${mintingData.network}! Token ID: ${mintingData.tokenId}`;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      window.location.href
    )}&summary=${encodeURIComponent(text)}`;
    openInNewTab(url);
  };

  const shareOnTwitter = (): void => {
    const text = `🎉 Just minted my work verification NFT for "${mintingData.projectName}" on ${mintingData.network}! Token ID: ${mintingData.tokenId} #NFT #WorkVerification #Blockchain`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(window.location.href)}`;
    openInNewTab(url);
  };

  const copyLink = (): void => {
    copyToClipboard(window.location.href, "link");
  };

  const downloadCertificate = (): void => {
    // Implement certificate download logic
    console.log("Downloading certificate...");
  };

  return (
    <div className="w-full bg-[#F1F1F1] pb-8 pt-16">
      <div className="w-4/5 mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
            🎉 NFT minted Successfully
          </h1>
          <p className="text-gray-600">
            Your work has been permanently been minted and recorded on the
            blockchain
          </p>
        </div>

        {/* NFT Card */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2">{mintingData.projectName}</h2>
              <p className="text-blue-100">Token ID: {mintingData.tokenId}</p>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm mb-1">Minted on</p>
              <p className="font-semibold">FLOW</p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Client Wallet Address */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-400 rounded"></div>
                </div>
                <h3 className="font-medium text-gray-900">
                  Client Wallet Address
                </h3>
              </div>
              <div className="bg-gray-50 rounded-md p-3 flex items-center justify-between">
                <span className="text-gray-700 font-mono text-sm">
                  {mintingData.walletAddress}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      copyToClipboard(mintingData.walletAddress, "wallet")
                    }
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    title="Copy wallet address"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() =>
                      openInNewTab(
                        `https://evm-testnet.flowscan.io/address/${mintingData.walletAddress}`
                      )
                    }
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    title="View on Flowscan"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              {copiedField === "wallet" && (
                <p className="text-green-600 text-xs mt-1">
                  Copied to clipboard!
                </p>
              )}
            </div>

            {/* IPFS URI */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-400 rounded"></div>
                </div>
                <h3 className="font-medium text-gray-900">IPFS URI</h3>
              </div>
              <div className="bg-gray-50 rounded-md p-3 flex items-center justify-between">
                <span className="text-gray-700 font-mono text-sm truncate">
                  {mintingData.ipfsUri}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(mintingData.ipfsUri, "ipfs")}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    title="Copy IPFS URI"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() =>
                      openInNewTab(
                        `${mintingData.ipfsUri}`
                      )
                    }
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    title="View on IPFS"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              {copiedField === "ipfs" && (
                <p className="text-green-600 text-xs mt-1">
                  Copied to clipboard!
                </p>
              )}
            </div>

            {/* Transaction Hash */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">#</span>
                <h3 className="font-medium text-gray-900">Transaction Hash</h3>
              </div>
              <div className="bg-gray-50 rounded-md p-3 flex items-center justify-between">
                <span className="text-gray-700 font-mono text-sm">
                  {mintingData.transactionHash}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      copyToClipboard(mintingData.transactionHash, "hash")
                    }
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    title="Copy transaction hash"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() =>
                      openInNewTab(
                        `https://evm-testnet.flowscan.io/tx/${mintingData.transactionHash}`
                      )
                    }
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    title="View on Flowscan"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              {copiedField === "hash" && (
                <p className="text-green-600 text-xs mt-1">
                  Copied to clipboard!
                </p>
              )}
            </div>

            {/* Minting Details */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-400 rounded"></div>
                </div>
                <h3 className="font-medium text-gray-900">Minting Details</h3>
              </div>
              <div className="bg-gray-50 rounded-md p-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Minted At:</span>
                  <span className="text-gray-900 text-sm font-medium">
                    {mintingData.mintedAt}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Network:</span>
                  <span className="text-gray-900 text-sm font-medium">
                    {mintingData.network}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Project Name:</span>
                  <span className="text-gray-900 text-sm font-medium">
                    {mintingData.projectName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Share Achievement Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Share className="w-5 h-5 text-gray-600" />
            <h3 className="font-medium text-gray-900">Share Achievement</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Let the world know about your verified projects
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={shareOnLinkedIn}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              Share on LinkedIn
            </button>

            <button
              onClick={copyLink}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              <Copy className="w-4 h-4" />
              {copiedField === "link" ? "Copied!" : "Copy Link"}
            </button>

            <button
              onClick={shareOnTwitter}
              className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors"
            >
              <Twitter className="w-4 h-4" />
              Share on Twitter
            </button>

            <button
              onClick={downloadCertificate}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
