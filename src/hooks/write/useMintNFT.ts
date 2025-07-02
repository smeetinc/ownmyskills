import { useWriteContract, useWaitForTransactionReceipt, useAccount, usePublicClient, useSignMessage } from 'wagmi'
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import SKILLPROOF from "@/constants/abis/SkillProof.json"
import { SKILLPROOF_CONTRACT } from '@/constants/addresses/Skillproof-contract'
import { useRouter } from 'next/navigation'

export function useMintNFT() {
  const router = useRouter()
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const publicClient = usePublicClient()
  const [isMintingInProgress, setIsMintingInProgress] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [currentToastId, setCurrentToastId] = useState<string | null>(null)
  
  const { 
    writeContract, 
    data: hash, 
    error: writeError,
    reset: resetWrite
  } = useWriteContract()
  
  const { 
    isLoading, 
    isSuccess, 
    error: receiptError,
    status
  } = useWaitForTransactionReceipt({ 
    hash,
    timeout: 120_000, // 2 minutes timeout
    confirmations: 1,
    retryCount: 3,
    retryDelay: 2000
  })

  // Handle transaction success
  useEffect(() => {
    if (isSuccess && hash && isMintingInProgress) {
      if (currentToastId) {
        toast.dismiss(currentToastId)
      }
      toast.success('NFT minted successfully!')
      
      const mintingDetails = {
        tokenId: hash,
        transactionHash: hash,
        mintedAt: new Date().toLocaleDateString(),
        network: 'FLOW',
        status: 'completed'
      }
      
      const storedDetails = localStorage.getItem('pendingMint')
      if (storedDetails) {
        const pendingData = JSON.parse(storedDetails)
        Object.assign(mintingDetails, pendingData)
        localStorage.removeItem('pendingMint')
      }
      
      localStorage.setItem('mintingDetails', JSON.stringify(mintingDetails))
      setIsMintingInProgress(false)
      setRetryCount(0)
      setCurrentToastId(null)
      router.push('/mint_success')
    }
  }, [isSuccess, hash, isMintingInProgress, router, currentToastId])

  // Handle transaction errors and retries
  useEffect(() => {
    if (receiptError && isMintingInProgress) {
      const errorMessage = receiptError.message.toLowerCase()
      
      if (currentToastId) {
        toast.dismiss(currentToastId)
      }

      // Check if it's a dropped/replaced transaction
      if (errorMessage.includes('dropped') || 
          errorMessage.includes('replaced') || 
          errorMessage.includes('timeout')) {
        
        if (retryCount < 3) {
          const newToastId = toast.loading(`Transaction replaced. Retrying... (${retryCount + 1}/3)`)
          setCurrentToastId(newToastId)
          setRetryCount(prev => prev + 1)
          
          // Reset wagmi state before retry
          resetWrite()
          
          // Retry after delay
          setTimeout(() => {
            retryLastTransaction()
          }, 3000)
          
          return
        } else {
          toast.error('Transaction failed after 3 attempts. Please try again.')
        }
      } else {
        toast.error(`Transaction failed: ${receiptError.message}`)
      }
      
      setIsMintingInProgress(false)
      setRetryCount(0)
      setCurrentToastId(null)
      localStorage.removeItem('pendingMint')
    }
  }, [receiptError, isMintingInProgress, retryCount, currentToastId, resetWrite])

  // Handle write errors
  useEffect(() => {
    if (writeError && isMintingInProgress) {
      if (currentToastId) {
        toast.dismiss(currentToastId)
      }
      
      console.error('Write error:', writeError)
      toast.error(`Failed to submit transaction: ${writeError.message}`)
      setIsMintingInProgress(false)
      setRetryCount(0)
      setCurrentToastId(null)
      localStorage.removeItem('pendingMint')
    }
  }, [writeError, isMintingInProgress, currentToastId])

  // Store last transaction parameters for retry
  const [lastTransactionParams, setLastTransactionParams] = useState<any>(null)

  const retryLastTransaction = async () => {
    if (!lastTransactionParams) return
    
    try {
      // Get current gas price and add 20% buffer
      const gasPrice = await publicClient?.getGasPrice()
      const bufferedGasPrice = gasPrice ? (gasPrice * BigInt(120)) / BigInt(100) : undefined

      await writeContract({
        ...lastTransactionParams,
        gasPrice: bufferedGasPrice,
        gas: BigInt(600000) // Increased gas limit
      })
    } catch (error) {
      console.error('Retry failed:', error)
    }
  }

  const mintNFT = async (
    freelancerAddress: string,
    projectName: string,
    description: string,
    completionDate: number,
    metadataURI: string,
  ) => {
    try {
      if (!address) {
        toast.error('Please connect your wallet first')
        return false
      }

      const message = `Mint NFT for ${freelancerAddress}`
      const signature = await signMessageAsync({ message })

      setIsMintingInProgress(true)
      setRetryCount(0)
      
      // Store pending mint data
      const pendingMintData = {
        walletAddress: freelancerAddress,
        ipfsUri: metadataURI,
        projectName: projectName,
        description: description,
        completionDate: completionDate
      }
      localStorage.setItem('pendingMint', JSON.stringify(pendingMintData))

      const mintToastId = toast.loading('Preparing transaction...')
      setCurrentToastId(mintToastId)

      // Validate inputs
      if (!freelancerAddress || !projectName || !metadataURI || !signature) {
        throw new Error('Missing required parameters')
      }

      // Ensure proper formatting
      const formattedAddress = freelancerAddress.startsWith('0x') 
        ? freelancerAddress as `0x${string}`
        : `0x${freelancerAddress}` as `0x${string}`

      const formattedSignature = signature.startsWith('0x')
        ? signature as `0x${string}`
        : `0x${signature}` as `0x${string}`

      const args = [
        formattedAddress,
        projectName,
        description,
        BigInt(completionDate),
        metadataURI,
        formattedSignature
      ]

      // Get current gas price with buffer for faster confirmation
      const gasPrice = await publicClient?.getGasPrice()
      const bufferedGasPrice = gasPrice ? (gasPrice * BigInt(130)) / BigInt(100) : undefined

      const transactionParams = {
        address: SKILLPROOF_CONTRACT as `0x${string}`,
        abi: SKILLPROOF,
        functionName: 'mintSkillNFT',
        args: args,
        gasPrice: bufferedGasPrice,
        gas: BigInt(600000), // Conservative gas limit
        value: BigInt(0) // Explicit value
      }

      // Store params for potential retry
      setLastTransactionParams(transactionParams)

      console.log('Submitting transaction with params:', {
        ...transactionParams,
        gasPrice: bufferedGasPrice?.toString(),
        args: args.map(arg => typeof arg === 'bigint' ? arg.toString() : arg)
      })

      toast.dismiss(mintToastId)
      const submittingToastId = toast.loading('Submitting transaction...')
      setCurrentToastId(submittingToastId)

      await writeContract(transactionParams)

      toast.dismiss(submittingToastId)
      const confirmingToastId = toast.loading('Waiting for confirmation...')
      setCurrentToastId(confirmingToastId)

    } catch (error: any) {
      console.error('Error initiating mint:', error)
      
      if (currentToastId) {
        toast.dismiss(currentToastId)
      }
      
      let errorMessage = 'Unknown error occurred'
      if (error?.message) {
        if (error.message.includes('User rejected')) {
          errorMessage = 'Transaction was rejected'
        } else if (error.message.includes('insufficient funds')) {
          errorMessage = 'Insufficient funds for gas'
        } else {
          errorMessage = error.message
        }
      }
      
      toast.error(`Failed to mint NFT: ${errorMessage}`)
      setIsMintingInProgress(false)
      setRetryCount(0)
      setCurrentToastId(null)
      localStorage.removeItem('pendingMint')
      return false
    }
  }

  return {
    mintNFT,
    isMinting: isLoading || isMintingInProgress,
    mintingSuccess: isSuccess,
    transactionHash: hash,
    error: writeError || receiptError,
    status,
    retryCount
  }
}