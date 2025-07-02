"use client";

import { useState, useEffect } from "react";
import {
  Download,
  Shield,
  User,
  Calendar,
  Clock,
  FileText,
  AlertTriangle,
  Check,
  X,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useDocumentUpload } from "@/hooks/write/uploadToIpfs";
import { useMintNFT } from '@/hooks/write/useMintNFT'

interface SubmittedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  downloadUrl: string;
}

interface ProjectVerificationData {
  id: string;
  projectName: string;
  freelancerName: string;
  freelancerWallet: string;
  completedDate: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
  projectDescription: string;
  technologies: string[];
  submittedFiles: SubmittedFile[];
  projectValue: string;
  projectLink?: string;
}

export default function UserWorkVerification() {
  const router = useRouter();
  const params = useParams();
  const verificationId = params?.id as string;
  
  const { mintNFT, isMinting } = useMintNFT()


  const { getWorkVerification, isLoading } =
    useDocumentUpload();

  const [verificationData, setVerificationData] =
    useState<ProjectVerificationData | null>(null);
  const [error, setError] = useState<string>("");

  // Fetch verification data from Supabase
  useEffect(() => {
    const fetchVerificationData = async () => {
      if (!verificationId) {
        setError("Verification ID is missing");
        return;
      }

      try {
        const data = await getWorkVerification(verificationId);
        if (data) {
          // Save to localStorage
          localStorage.setItem("verificationData", JSON.stringify(data));
          setVerificationData(data);
          setError("");
        } else {
          setError("Verification data not found");
        }
      } catch (err) {
        console.error("Error fetching verification data:", err);
        setError("Failed to load verification data");
      }
    };

    fetchVerificationData();
  }, [verificationId, getWorkVerification]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleFileDownload = (file: SubmittedFile): void => {
    // Open file in new tab for IPFS links or trigger download
    if (file.downloadUrl.includes("ipfs")) {
      window.open(file.downloadUrl, "_blank");
    } else {
      // Fallback for other file types
      const link = document.createElement("a");
      link.href = file.downloadUrl;
      link.download = file.name;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const formatSignature = (sig: string) => {
    if (!sig.startsWith('0x')) {
      return `0x${sig}`
    }
    return sig
  }
  const handleMintNFT = async () => {
    if (!verificationData) return

    // Convert date string to timestamp
    const completionDate = new Date(verificationData.completedDate).getTime() / 1000

    // This is where you would get the signature from your backend
    // For now using a placeholder


    
    const success = await mintNFT(
      verificationData.freelancerWallet,
      verificationData.projectName,
      verificationData.projectDescription,
      completionDate,
      verificationData.submittedFiles[0]?.downloadUrl || '', // Using first file's IPFS URI as metadata
    )

    if (success) {
      // Minting successful - router.push will be handled in the mintNFT function
      console.log('NFT minted successfully')
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading verification details...</p>
        </div>
      </div>
    );
  }

  if (error || !verificationData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-2" />
            <p className="text-gray-600 text-lg">
              {error || "Verification data not found"}
            </p>
            <button
              onClick={() => router.back()}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Determine status styling and text
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "approved":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          label: "Approved",
        };
      case "rejected":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          label: "Rejected",
        };
      default:
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          label: "Pending Verification",
        };
    }
  };

  const statusDisplay = getStatusDisplay(verificationData.status);
  const isStatusFinal =
    verificationData.status === "approved" ||
    verificationData.status === "rejected";

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-8">
      <div className="w-full mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Work Verification
            </h1>
            <p className="text-gray-600">Review and check client reviews</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Overview */}
            <div className="bg-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {verificationData.projectName}
              </h2>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{verificationData.freelancerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Completed {verificationData.completedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Submitted {verificationData.submittedDate}</span>
                  </div>
                </div>

                <span
                  className={`${statusDisplay.bg} ${statusDisplay.text} text-sm font-medium px-3 py-1 rounded-full`}
                >
                  {statusDisplay.label}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Freelancer wallet address
                  </span>
                </div>
                <p className="text-gray-900 font-mono text-sm">
                  {verificationData.freelancerWallet}
                </p>
              </div>
            </div>

            {/* Project Description */}
            <div className="bg-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Project Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {verificationData.projectDescription}
              </p>
              {verificationData.projectLink && (
                <div className="mt-4">
                  <a
                    href={verificationData.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm underline"
                  >
                    View Project Link →
                  </a>
                </div>
              )}
            </div>

            {/* Technologies Used */}
            <div className="bg-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {verificationData.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Submitted Files */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Submitted Files
              </h3>
              {verificationData.submittedFiles.length > 0 ? (
                <div className="space-y-3">
                  {verificationData.submittedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleFileDownload(file)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        <Download className="w-4 h-4" />
                        {file.downloadUrl.includes("ipfs")
                          ? "View"
                          : "Download"}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No files submitted
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Status Message for Final States */}
            {isStatusFinal && (
              <div
                className={`${statusDisplay.bg} border border-gray-200 rounded-lg p-4`}
              >
                <div className="flex items-center gap-3">
                  {verificationData.status === "approved" ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <X className="w-5 h-5 text-red-600" />
                  )}
                  <div>
                    <h4 className={`font-medium ${statusDisplay.text} mb-1`}>
                      Verification {statusDisplay.label}
                    </h4>
                    <p
                      className={`text-sm ${statusDisplay.text.replace(
                        "800",
                        "700"
                      )}`}
                    >
                      This verification has been {verificationData.status}.
                    </p>
                    {verificationData.status === "approved" && (
                      <button
                        onClick={handleMintNFT}
                        disabled={isMinting}
                        className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                          ${isMinting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isMinting ? 'Minting...' : 'Mint NFT'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Before Signing Warning */}
            {!isStatusFinal && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-2">
                      Before Signing:
                    </h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Review all submitted files carefully</li>
                      <li>• Signing is irreversible and will mint an NFT</li>
                      <li>• Ensure project meets all requirements</li>
                      <li>• The freelancer will receive payment proof</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Project Summary */}
            <div className="bg-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Project Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Files Submitted</span>
                  <span className="font-medium text-gray-900">
                    {verificationData.submittedFiles.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Skills Used</span>
                  <span className="font-medium text-gray-900">
                    {verificationData.technologies.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Project Value</span>
                  <span className="font-medium text-gray-900">
                    {verificationData.projectValue} FLOW
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completion Date</span>
                  <span className="font-medium text-gray-900">
                    {verificationData.completedDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
