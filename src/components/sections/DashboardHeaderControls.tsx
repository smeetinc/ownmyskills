"use client";

import { Search } from "lucide-react";
import Link from "next/link";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
  availableSkills: string[];
}

export default function DashboardHeaderControls({
  searchTerm,
  setSearchTerm,
  selectedFilter,
  setSelectedFilter,
  availableSkills,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 md:gap-4 w-full mt-4">
      <div className="relative w-full md:w-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded px-3 py-2 pl-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Search NFTs..."
        />
      </div>

      <div className="w-full md:w-auto">
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="w-full md:w-auto px-4 py-3 font-semibold text-sm bg-white border rounded appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="All Skills">All Skills</option>
          {availableSkills.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-auto">
        <Link href="/request_verification">
          <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
            Request New Verification
          </button>
        </Link>
      </div>
    </div>
  );
}
