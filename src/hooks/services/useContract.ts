import SKILLPROOF from "@/constants/abis/SkillProof.json"
import { SKILLPROOF_CONTRACT } from '@/constants/addresses/Skillproof-contract'
import { useReadContract } from 'wagmi'
import { useEffect, useState } from "react"

export const useReadAppContract = (functionName: string, args: unknown[] = []) => {
  const [isMounted, setIsMounted] = useState(false);
  
  const result = useReadContract({
    abi: SKILLPROOF,
    address: SKILLPROOF_CONTRACT,
    functionName,
    args,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return { data: null, loading: true, error: null };
  }

  return {
    data: result.data as unknown,
    loading: result.isPending,
    error: result.error,
  };
};