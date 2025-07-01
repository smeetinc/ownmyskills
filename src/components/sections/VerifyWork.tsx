"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

interface FormData {
  verifyLink: string;
}

export default function VerifyWork() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    verifyLink: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!formData.verifyLink.trim()) {
      toast.error("Paste freelancer link to proceed");
      return;
    }

    router.push(formData.verifyLink);
  };

  return (
    <motion.section
      className="py-16 bg-white"
      id="verify-work"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Left Content */}
        <div>
          <motion.h2
            className="text-2xl font-semibold text-gray-900 mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Verify Work as a Client
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Are you a client who needs to verify a freelancer’s work? Paste the
            link received from the freelancer below to access pending
            verification requests.
          </motion.p>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex gap-3 items-stretch">
              <div className="w-4/5 ">
                <input
                  type="text"
                  name="verifyLink"
                  value={formData.verifyLink}
                  onChange={handleInputChange}
                  placeholder="https://......."
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white px-3 py-2 rounded-lg shadow-md hover:opacity-90 transition cursor-pointer"
              >
                Go
              </button>
            </div>
          </motion.form>
        </div>

        {/* Right Illustration */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Image
            src="/person1.svg"
            alt="Client Verification Illustration"
            width={400}
            height={300}
            className="object-contain"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
