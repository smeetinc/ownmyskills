"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
        Something went wrong
      </h2>
      <p className="text-gray-600 mb-6">Please try again or go back home.</p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
        >
          Try again
        </button>
        <button
          onClick={() => router.push("/")}
          className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Home
        </button>
      </div>
    </motion.div>
  );
}
