import Image from "next/image";
import React, { useState } from "react";

const allNfts = [
  {
    title: "Crypto Wallet Integration",
    image: "/skill1.png",
    description:
      "Integrated multi-chain wallet functionality into client’s existing platform with enhanced security.",
    tags: ["Web3.js", "Solidity", "Filecoin"],
    client: "Blockchain Solutions",
    value: "3.2 ETH",
  },
  {
    title: "Food Blog",
    image: "/skill2.png",
    description:
      "Food mastery on the blockchain. You can build a responsive website.",
    tags: ["Web3.js", "Solidity", "Filecoin"],
    client: "Tasty Hand Solutions",
    value: "5.0 ETH",
  },
  {
    title: "Crypto Wallet Integration",
    image: "/skill1.png",
    description:
      "Integrated multi-chain wallet functionality into client’s existing platform with enhanced security.",
    tags: ["Web3.js", "Solidity", "Filecoin"],
    client: "Blockchain Solutions",
    value: "3.2 ETH",
  },
  {
    title: "NFT Marketplace UI",
    image: "/skill2.png",
    description:
      "Designed an intuitive NFT trading interface for collectors and creators.",
    tags: ["React", "Tailwind CSS", "UX"],
    client: "PixelTrade",
    value: "2.8 ETH",
  },
  {
    title: "Token Vesting Dashboard",
    image: "/skill1.png",
    description: "Built a secure dashboard for token release schedules.",
    tags: ["Next.js", "Viem", "Hardhat"],
    client: "LaunchHub",
    value: "4.6 ETH",
  },
  {
    title: "DAO Voting System",
    image: "/skill2.png",
    description: "Engineered a blockchain voting mechanism for DAOs.",
    tags: ["Ethers.js", "Solidity", "ZK"],
    client: "GovBlocks",
    value: "6.1 ETH",
  },
];

const ITEMS_PER_PAGE = 3;

export default function SkillNFT() {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const visibleNFTs = allNfts.slice(0, visibleCount);
  const hasMore = visibleCount < allNfts.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className="bg-[#F1F1F1] py-6 px-4" id="my-nfts">
      <div className="flex justify-between items-center my-4">
        <h4 className="text-xl font-bold">My Skill NFT</h4>
        <div className="flex items-center gap-4">
          <input
            type="search"
            className="rounded px-3 py-2"
            placeholder="search NFT..."
          />
          <button className="px-4 py-3 font-semibold text-sm bg-white border rounded">
            All Skills
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {visibleNFTs.map((nft, index) => (
          <div key={index} className="w-full bg-white py-3 px-1">
            <div className="w-full">
              <Image
                src={nft.image}
                alt={nft.title}
                width={484}
                height={363}
                className="object-contain w-full"
              />
            </div>
            <div className="pl-4 pr-8 pt-4 pb-8 mb-4">
              <div className="flex justify-between items-center">
                <h5 className="font-bold">{nft.title}</h5>
                <button className="w-fit rounded py-1 px-6 bg-[#78F9C6] font-bold text-[#286442F7]">
                  Verified
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-700">{nft.description}</p>
              <div className="my-4 flex flex-wrap items-center gap-2">
                {nft.tags.map((tag, i) => (
                  <button
                    key={i}
                    className="bg-[#6C51D93D] px-4 py-2 rounded text-[#8E35EA] text-xs"
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-sm">
                <p>
                  Client: <strong>{nft.client}</strong>
                </p>
                <p>
                  Value: <strong>{nft.value}</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="w-full flex items-center justify-center my-6">
          <button
            onClick={loadMore}
            className="text-[#171F4280] border border-[#171F4280] rounded-lg px-6 py-3 hover:bg-gray-100 transition"
          >
            Load More NFTs
          </button>
        </div>
      )}
    </div>
  );
}
