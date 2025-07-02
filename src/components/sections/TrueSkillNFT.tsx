"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useDocumentUpload } from "@/hooks/write/uploadToIpfs";
import { Search, ExternalLink, Calendar, User } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface NFTData {
  id: string;
  title: string;
  image: string;
  description: string;
  tags: string[];
  client: string;
  value: string;
  completedDate: string;
  projectLink?: string;
  freelancerWallet: string;
  status: string;
}

const ITEMS_PER_PAGE = 6;

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function TrueSkillNFT() {
  const { address } = useAccount();
  const { getAllApprovedWork, isLoading } = useDocumentUpload();

  const [allNfts, setAllNfts] = useState<NFTData[]>([]);
  const [filteredNfts, setFilteredNfts] = useState<NFTData[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Skills");
  const [error, setError] = useState<string>("");
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);

  useEffect(() => {
    const fetchApprovedWork = async () => {
      try {
        const workData = await getAllApprovedWork(address);

        if (workData && workData.length > 0) {
          const transformedNfts: NFTData[] = workData.map((work) => ({
            id: work.id,
            title: work.projectName,
            image: work.submittedFiles[0]?.downloadUrl || "/skill1.png",
            description: work.projectDescription,
            tags: work.technologies,
            client: "Verified Client",
            value: `${work.projectValue} FLOW`,
            completedDate: work.completedDate,
            projectLink: work.projectLink,
            freelancerWallet: work.freelancerWallet,
            status: work.status,
          }));

          setAllNfts(transformedNfts);
          setFilteredNfts(transformedNfts);

          const allSkills = transformedNfts.flatMap((nft) => nft.tags);
          const uniqueSkills = Array.from(new Set(allSkills));
          setAvailableSkills(uniqueSkills);

          setError("");
        } else {
          setAllNfts([]);
          setFilteredNfts([]);
          setError("No approved work found");
        }
      } catch (err) {
        console.error("Error fetching approved work:", err);
        setError("Failed to load work data");
      }
    };

    fetchApprovedWork();
  }, [getAllApprovedWork, address]);

  useEffect(() => {
    let filtered = allNfts;

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (nft) =>
          nft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          nft.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          nft.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedFilter !== "All Skills") {
      filtered = filtered.filter((nft) => nft.tags.includes(selectedFilter));
    }

    setFilteredNfts(filtered);
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchTerm, selectedFilter, allNfts]);

  const visibleNFTs = filteredNfts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNfts.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleSkillFilter = (skill: string) => {
    setSelectedFilter(skill);
  };

  const getPreviewImage = (nft: NFTData): string => {
    if (nft.image && nft.image.includes("ipfs")) {
      return nft.image;
    }
    return Math.random() > 0.5 ? "/skill1.png" : "/skill2.png";
  };

  if (isLoading) {
    return (
      <div className="bg-[#F1F1F1] py-6 px-4 pt-16" id="my-nfts">
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your work...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="bg-[#F1F1F1] py-6 px-4 text-center" id="my-nfts">
        <p className="font-bold text-red-600">
          Connect your wallet to see your NFT(s)
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F1F1F1] py-6 px-4 pt-16" id="my-nfts">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex justify-between items-center my-4 overflow-x-auto flex-col md:flex-row">
          <h4 className="text-sm md:text-lg lg:text-xl font-bold mb-4 lg:mb-0">
            My Skill NFT ({filteredNfts.length})
          </h4>
          <div className="flex items-center gap-4 my-4 lg:my-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-2 md:w-4 h-4" />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded px-3 py-2 pl-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Search NFTs..."
              />
            </div>
            <div className="relative">
              <select
                value={selectedFilter}
                onChange={(e) => handleSkillFilter(e.target.value)}
                className="px-4 py-3 font-semibold text-sm bg-white border rounded appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All Skills">All Skills</option>
                {availableSkills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <Link href="/request_verification">
                <button className="hidden bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg lg:flex items-center space-x-2 transition-colors">
                  Request New Verification
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors font-bold lg:hidden">
                  +
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">{error}</p>
        </div>
      )}

      {filteredNfts.length === 0 && !error && !isLoading && (
        <div className="text-center py-20 pt-16">
          <div className="text-gray-500">
            <h3 className="text-lg font-semibold mb-2">No NFTs Found</h3>
            <p>
              {searchTerm || selectedFilter !== "All Skills"
                ? "Try adjusting your search or filter criteria"
                : "Complete and get approved work to see your Skill NFTs here"}
            </p>
          </div>
        </div>
      )}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full "
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {visibleNFTs.map((nft) => (
          <motion.div
            key={nft.id}
            variants={itemVariants}
            transition={{ duration: 0.4 }}
            className="w-full bg-white py-3 px-1 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="w-full">
              <Image
                src={getPreviewImage(nft)}
                alt={nft.title}
                width={484}
                height={363}
                className="object-cover w-full h-48 rounded scale-none hover:scale-120 transition-all duration-300"
                onError={(e) => {
                  // Fallback to default image if IPFS image fails to load
                  e.currentTarget.src = "/skill1.png";
                }}
              />
            </div>
            <div className="pl-4 pr-8 pt-4 pb-8 mb-4">
              <div className="flex justify-between items-start mb-2">
                <Link
                  href={`/work/${nft.id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <h5 className="font-bold text-lg leading-tight">
                    {nft.title}
                  </h5>
                </Link>

                <button
                  className={`w-fit rounded py-1 px-3 font-bold text-xs ${
                    nft.status === "approved"
                      ? "bg-[#78F9C6] text-[#286442F7]"
                      : nft.status === "rejected"
                      ? "bg-[#F97878] text-[#7F2E2E]"
                      : "bg-[#FF8C00] text-[#000000]"
                  }`}
                >
                  {nft.status === "approved"
                    ? "Verified"
                    : nft.status === "rejected"
                    ? "Rejected"
                    : "Pending"}
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{nft.completedDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span className="font-mono">
                    {nft.freelancerWallet.slice(0, 6)}...
                    {nft.freelancerWallet.slice(-4)}
                  </span>
                </div>
              </div>

              <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                {nft.description}
              </p>

              {nft.projectLink && (
                <a
                  href={nft.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 mt-2"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Project
                </a>
              )}

              <div className="my-4 flex flex-wrap items-center gap-2">
                {nft.tags.slice(0, 3).map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => handleSkillFilter(tag)}
                    className="bg-[#6C51D93D] px-3 py-1 rounded text-[#8E35EA] text-xs hover:bg-[#6C51D950] transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
                {nft.tags.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{nft.tags.length - 3} more
                  </span>
                )}
              </div>

              <div className="flex justify-between text-sm">
                <p>
                  Client: <strong>{nft.client}</strong>
                </p>
                <p>
                  Value: <strong className="text-green-600">{nft.value}</strong>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {hasMore && (
        <div className="w-full flex items-center justify-center my-6">
          <button
            onClick={loadMore}
            className="text-[#171F4280] border border-[#171F4280] rounded-lg px-6 py-3 hover:bg-gray-100 transition"
          >
            Load More NFTs ({filteredNfts.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
