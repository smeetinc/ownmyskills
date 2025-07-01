import { useState, useCallback, useEffect } from 'react'
import { useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi'
import { PinataSDK } from 'pinata-web3'
import { toast } from 'react-hot-toast'
import { supabase } from '@/utils/supabase';

interface UploadedFileMeta {
    name: string;
    downloadLink: string;
    size: string;
    type: string;
    hash: string;
}

interface WorkVerificationData {
    projectName: string;
    walletAddress: string;
    projectDescription: string;
    completionDate: string; 
    projectValue: string;
    projectLink: string;
    skills: string[];
    files: UploadedFileMeta[]; 
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
    submittedFiles: {
        id: string;
        name: string;
        size: number;
        type: string;
        downloadUrl: string;
    }[];
    projectValue: string;
    projectLink?: string;
}

export function useDocumentUpload() {
  const { address } = useAccount()
    
  const [isUploading, setIsUploading] = useState(false)
  const [IsStored, setIsStored] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  
  // Pinata setup
  const pinataCloudGateway = process.env.NEXT_PUBLIC_GATEWAY
  const pinata = new PinataSDK({
    pinataJwt: process.env.NEXT_PUBLIC_JWT_SECRET,
    pinataGateway: pinataCloudGateway
  })
  
  // Function to retrieve specific work verification by ID
  const getWorkVerification = useCallback(
    async (verificationId: string): Promise<ProjectVerificationData | null> => {
      if (!verificationId) {
        toast.error("Verification ID is required");
        return null;
      }

      setIsLoading(true);
      
      try {
        const { data, error } = await supabase
          .from("work_verifications")
          .select(`
            id,
            project_name,
            wallet_address,
            project_description,
            completion_date,
            project_value,
            project_link,
            skills,
            files,
            status,
            created_at,
            updated_at
          `)
          .eq('id', verificationId)
          .single();

        if (error) {
          console.error("Supabase fetch error:", error);
          toast.error(`Failed to fetch verification: ${error.message}`);
          return null;
        }

        if (!data) {
          toast.error("Verification not found");
          return null;
        }

        // Transform the data to match the expected interface
        const transformedData: ProjectVerificationData = {
          id: data.id,
          projectName: data.project_name,
          freelancerName: "Freelancer", // You might want to add this to your database
          freelancerWallet: data.wallet_address,
          completedDate: new Date(data.completion_date).toLocaleDateString('en-US', {
            year: '2-digit',
            month: 'short',
            day: 'numeric'
          }),
          submittedDate: new Date(data.created_at).toLocaleDateString('en-US', {
            year: '2-digit',
            month: 'short',
            day: 'numeric'
          }),
          status: data.status || "pending",
          projectDescription: data.project_description,
          technologies: data.skills || [],
          submittedFiles: (data.files || []).map((file: any, index: number) => ({
            id: `file-${index + 1}`,
            name: file.name,
            size: convertSizeToBytes(file.size), // Convert string size back to bytes
            type: file.type || "application/octet-stream",
            downloadUrl: file.downloadLink
          })),
          projectValue: data.project_value,
          projectLink: data.project_link
        };

        return transformedData;
      } catch (err) {
        console.error("getWorkVerification error:", err);
        toast.error("Unexpected error fetching verification data");
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Function to update verification status
  const updateVerificationStatus = useCallback(
    async (verificationId: string, status: "approved" | "rejected", comment?: string): Promise<boolean> => {
      try {
        const updateData: any = {
          status,
          updated_at: new Date().toISOString()
        };

        if (comment) {
          updateData.client_comment = comment;
        }

        const { error } = await supabase
          .from("work_verifications")
          .update(updateData)
          .eq('id', verificationId);

        if (error) {
          console.error("Supabase update error:", error);
          toast.error(`Failed to update verification: ${error.message}`);
          return false;
        }

        toast.success(`Verification ${status} successfully`);
        return true;
      } catch (err) {
        console.error("updateVerificationStatus error:", err);
        toast.error("Unexpected error updating verification status");
        return false;
      }
    },
    []
  );

  // Helper function to convert size string back to bytes for display
  function convertSizeToBytes(sizeString: string): number {
    if (!sizeString || sizeString === "0 Bytes") return 0;
    
    const units: { [key: string]: number } = {
      'Bytes': 1,
      'KB': 1024,
      'MB': 1024 * 1024,
      'GB': 1024 * 1024 * 1024
    };
    
    const parts = sizeString.split(' ');
    if (parts.length !== 2) return 0;
    
    const size = parseFloat(parts[0]);
    const unit = parts[1];
    
    return Math.round(size * (units[unit] || 1));
  }
  
  const storeVerificationRequest = useCallback(
    async (payload: WorkVerificationData) => {
      try {
        const {
          projectName,
          walletAddress,
          projectDescription,
          completionDate,
          projectValue,
          projectLink,
          skills,
          files,
        } = payload;
  
        const { data, error } = await supabase.from("work_verifications").insert([
          {
            project_name: projectName,
            wallet_address: walletAddress,
            project_description: projectDescription,
            completion_date: completionDate,
            project_value: projectValue,
            project_link: projectLink,
            skills: skills,
            status: 'pending', // Set default status
            files: files.map((file) => ({
              name: file.name,
              downloadLink: file.downloadLink,
              size: file.size,
              type: file.type,
              hash: file.hash
            })),
          },
        ]).select('id').single();
  
        if (error) {
          console.error("Supabase insert error:", error);
          toast.error(`Failed to store verification: ${error.message}`);
          return false;
        }
  
        setIsStored(true);
        toast.success("Verification request stored successfully");
        return data.id;
      } catch (err) {
        console.error("storeVerificationRequest error:", err);
        toast.error("Unexpected error storing verification request");
        setIsStored(false);
        return false;
      }
    },
    []
  );
  
  function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  // Upload to IPFS function
  const uploadToIpfs = useCallback(
    async (files: File[]): Promise<UploadedFileMeta[] | false>  => {
        if (!address) {
            toast.error("Connect your wallet first")
            return false
        }
      
        if (files.length === 0) {
            toast.error("No files selected")
            return false
        }
        setIsUploading(true)
        
        const uploadedMeta: UploadedFileMeta[] = [];

      for (const file of files) {
        try {
            // eslint-disable-next-line prefer-const
            let uploadToast = toast.loading(`Uploading to IPFS!`)
            const upload = await pinata.upload.file(file);

            const fileHash = upload.IpfsHash;
            const fileUrl = `https://${pinataCloudGateway}/ipfs/${fileHash}`;

            uploadedMeta.push({
                name: file.name,
                downloadLink: fileUrl,
                size: formatFileSize(file.size),
                type: file.type,
                hash: fileHash,
            });
            toast.dismiss(uploadToast)
            setIsUploading(false)

            toast.success(`Document uploaded to IPFS`)
        } catch (uploadToIpfsError) {
            console.error("uploadToIpfsError", uploadToIpfsError)
            
            toast.error(String(uploadToIpfsError))
            setIsUploading(false)
            return false
        }
      }

      return uploadedMeta;
    },
    [address, pinata.upload, pinataCloudGateway]
  )
  
  // Function to get all approved work verifications
  const getAllApprovedWork = useCallback(
    async (walletAddress?: string): Promise<ProjectVerificationData[]> => {
      setIsLoading(true);
      
      try {
        let query = supabase
          .from("work_verifications")
          .select(`
            id,
            project_name,
            wallet_address,
            project_description,
            completion_date,
            project_value,
            project_link,
            skills,
            files,
            status,
            created_at,
            updated_at
          `)
          .order('updated_at', { ascending: false });

        // If wallet address is provided, filter by it
        if (walletAddress) {
          query = query.eq('wallet_address', walletAddress);
        }

        const { data, error } = await query;

        if (error) {
          console.error("Supabase fetch error:", error);
          toast.error(`Failed to fetch work verifications: ${error.message}`);
          return [];
        }

        if (!data || data.length === 0) {
          return [];
        }

        // Transform the data to match the expected interface
        const transformedData: ProjectVerificationData[] = data.map((item) => ({
          id: item.id,
          projectName: item.project_name,
          freelancerName: "Freelancer", // You might want to add this to your database
          freelancerWallet: item.wallet_address,
          completedDate: new Date(item.completion_date).toLocaleDateString('en-US', {
            year: '2-digit',
            month: 'short',
            day: 'numeric'
          }),
          submittedDate: new Date(item.created_at).toLocaleDateString('en-US', {
            year: '2-digit',
            month: 'short',
            day: 'numeric'
          }),
          status: item.status || "approved",
          projectDescription: item.project_description,
          technologies: item.skills || [],
          submittedFiles: (item.files || []).map((file: any, index: number) => ({
            id: `file-${index + 1}`,
            name: file.name,
            size: convertSizeToBytes(file.size),
            type: file.type || "application/octet-stream",
            downloadUrl: file.downloadLink
          })),
          projectValue: item.project_value,
          projectLink: item.project_link
        }));

        return transformedData;
      } catch (err) {
        console.error("getAllApprovedWork error:", err);
        toast.error("Unexpected error fetching work verifications");
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    uploadToIpfs,
    storeVerificationRequest,
    getWorkVerification,
    updateVerificationStatus,
    getAllApprovedWork,
    isUploading,
    IsStored,
    isLoading,
  }
}