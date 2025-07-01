"use client";

import { useState, ChangeEvent, FormEvent, DragEvent, useEffect } from "react";
import { Upload, X, Plus, Calendar, Link2, Loader2 } from "lucide-react";
import { useRef } from "react";

import { useDocumentUpload } from "@/hooks/write/uploadToIpfs";
import { toast } from "react-hot-toast";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";

interface FormData {
  projectName: string;
  walletAddress: string;
  projectDescription: string;
  completionDate: string;
  projectValue: string;
  projectLink: string;
}

interface UploadedFile {
  id: number;
  name: string;
  size: number;
  type: string;
  file: File;
}

export default function RequestWorkVerification() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { uploadToIpfs, storeVerificationRequest, isUploading, IsStored } =
    useDocumentUpload();

  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    projectName: "",
    walletAddress: "",
    projectDescription: "",
    completionDate: "",
    projectValue: "",
    projectLink: "",
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "UI Design",
    "Figma",
    "JavaScript",
  ]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Update wallet address when connected wallet changes
  useEffect(() => {
    if (!isConnected) {
      toast.error("Unauthorized! Connect wallet to proceed");
      router.push("/");
    }
    if (isConnected && address) {
      setFormData((prev) => ({
        ...prev,
        walletAddress: address,
      }));
    }
  }, [address, isConnected]);

  const availableSkills: string[] = [
    "UI Design",
    "Figma",
    "JavaScript",
    "React",
    "Node.js",
    "HTML/CSS",
    "TypeScript",
    "Python",
    "Adobe XD",
    "Sketch",
    "Vue.js",
    "Angular",
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillToggle = (skill: string): void => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleFileUpload = (files: FileList | null): void => {
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeFile = (fileId: number): void => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Basic form validation
    if (!formData.projectName.trim()) {
      toast.error("Project name is required");
      return;
    }

    if (!formData.projectDescription.trim()) {
      toast.error("Project description is required");
      return;
    }

    if (!formData.completionDate) {
      toast.error("Completion date is required");
      return;
    }

    if (!formData.projectValue) {
      toast.error("Project value is required");
      return;
    }

    if (!isConnected) {
      toast.error("Please connect your wallet to submit");
      return;
    }

    setIsSubmitting(true);

    try {
      let uploadedFileMeta: any[] = [];

      // Upload files to IPFS if any files are selected
      if (uploadedFiles.length > 0) {
        const filesToUpload = uploadedFiles.map((file) => file.file);
        const uploadResult = await uploadToIpfs(filesToUpload);

        if (!uploadResult) {
          toast.error("Failed to upload files to IPFS");
          setIsSubmitting(false);
          return;
        }

        uploadedFileMeta = uploadResult;
      }

      // Prepare data for storage
      const verificationData = {
        projectName: formData.projectName,
        walletAddress: formData.walletAddress,
        projectDescription: formData.projectDescription,
        completionDate: formData.completionDate,
        projectValue: formData.projectValue,
        projectLink: formData.projectLink,
        skills: selectedSkills,
        files: uploadedFileMeta,
      };

      // Store verification request in database
      const storeResult = await storeVerificationRequest(verificationData);

      if (storeResult && storeResult !== false) {
        setFormData({
          projectName: "",
          walletAddress: address || "",
          projectDescription: "",
          completionDate: "",
          projectValue: "",
          projectLink: "",
        });
        setSelectedSkills([]);
        setUploadedFiles([]);

        // Set verification ID and show popup
        setVerificationId(storeResult);
        setShowSuccessPopup(true);
      } else {
        toast.error("Failed to submit verification request");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred during submission");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F1F1F1] pt-16 ">
      {/* Main Content */}
      <div className="w-4/5 mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-8">
            Request Work Verification
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center">
              {/* Project Name */}
              <div className="w-2/5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  placeholder="E-commerce website"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Wallet Address */}
              <div className="w-2/5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wallet Address
                  {isConnected && (
                    <span className="ml-2 text-xs text-green-600 font-normal">
                      (Connected)
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  name="walletAddress"
                  value={formData.walletAddress}
                  onChange={handleInputChange}
                  placeholder={
                    isConnected ? "Connected wallet address" : "0x0..."
                  }
                  disabled={isConnected}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isConnected
                      ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                      : ""
                  }`}
                />
                {!isConnected && (
                  <p className="text-xs text-amber-600 mt-1">
                    Please connect your wallet to auto-fill this field
                  </p>
                )}
              </div>
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Description *
              </label>
              <textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleInputChange}
                placeholder="Describe the work completed..."
                rows={4}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Completion Date and Project Value */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Completion Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="completionDate"
                    value={formData.completionDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Value (ETH) *
                </label>
                <input
                  type="number"
                  name="projectValue"
                  value={formData.projectValue}
                  onChange={handleInputChange}
                  placeholder="0.0"
                  step="0.01"
                  min="0"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* On-chain Contributions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                On-chain Contributions
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleSkillToggle(skill)}
                      className="ml-1 text-purple-600 hover:text-purple-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="relative">
                <select
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    if (
                      e.target.value &&
                      !selectedSkills.includes(e.target.value)
                    ) {
                      handleSkillToggle(e.target.value);
                    }
                    e.target.value = "";
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">+ Add Skill</option>
                  {availableSkills
                    .filter((skill) => !selectedSkills.includes(skill))
                    .map((skill) => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* File Upload */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attach Work Sample
                </label>
                <div
                  className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors ${
                    dragOver
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">
                    Drag and drop files here, or click to browse work
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Max file size: 50mb (PNG, JPG, ZIP)
                  </p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".png,.jpg,.jpeg,.zip"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFileUpload(e.target.files)
                  }
                  className="hidden"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Link
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="projectLink"
                    value={formData.projectLink}
                    onChange={handleInputChange}
                    placeholder="https://github.com/yourproject"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Link2 className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Paste a link to your completed work here
                </p>
              </div>
            </div>

            {/* Uploaded Files Display */}
            {uploadedFiles.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Uploaded Files ({uploadedFiles.length})
                </label>
                <div className="space-y-2">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          <Upload className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="text-gray-400 hover:text-red-500"
                        disabled={isSubmitting}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="w-full text-right">
              <button
                type="submit"
                disabled={!isConnected || isSubmitting || isUploading}
                className={`py-3 px-6 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center gap-2 ml-auto ${
                  isConnected && !isSubmitting && !isUploading
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {(isSubmitting || isUploading) && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                {isUploading
                  ? "Uploading to IPFS..."
                  : isSubmitting
                  ? "Submitting..."
                  : "Submit for Verification"}
              </button>
              {!isConnected && (
                <p className="text-xs text-gray-500 mt-2">
                  Please connect your wallet to submit
                </p>
              )}
              {uploadedFiles.length > 0 && (
                <p className="text-xs text-blue-600 mt-2">
                  {uploadedFiles.length} file(s) will be uploaded to IPFS during
                  submission
                </p>
              )}
            </div>
          </form>
        </div>
        {/* Success Popup */}
        {showSuccessPopup && verificationId && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Verification Submitted Successfully!
                </h3>
                <p className="text-gray-600 mb-4">
                  Your work verification request has been submitted. Share this
                  link with your client for verification.
                </p>
                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Verification URL:
                  </p>
                  <p className="text-sm font-mono bg-white p-2 rounded border break-all">
                    {`${window.location.origin}/verify/${verificationId}`}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/verify/${verificationId}`
                      );
                      toast.success("URL copied to clipboard!");
                    }}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Copy URL
                  </button>
                  <button
                    onClick={() => {
                      setShowSuccessPopup(false);
                      setVerificationId(null);
                    }}
                    className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
