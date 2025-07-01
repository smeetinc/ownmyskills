"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

    // Basic form validation
    if (!formData.verifyLink.trim()) {
      toast.error("Paste freelancer link to proceed");
      return;
    }

    router.push(formData.verifyLink);
  };

  return (
    <section className="py-16 bg-white" id="verify-work">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Left Content */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Verify Work as a Client
          </h2>
          <p className="text-gray-600 mb-6">
            Are you a client who needs to verify a freelancer’s work? Paste the
            link received from the freelancer below to access pending
            verification requests.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-3 items-stretch">
              {/* Verify Link */}
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
          </form>
        </div>

        {/* Right Illustration */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/person1.svg"
            alt="Client Verification Illustration"
            width={400}
            height={300}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
