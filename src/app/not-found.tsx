"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Frown className="w-16 h-16 text-blue-600 mb-4" />
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Sorry, the page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
      >
        Go back home
      </Link>
    </motion.div>
  );
}
