// "use client";
// import { Wallet, ChevronDown } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";
// import { useAccount, useConnect, useDisconnect } from "wagmi";
// import { injected, metaMask, walletConnect } from "wagmi/connectors";

// export default function Header() {
// 	const [showWalletOptions, setShowWalletOptions] = useState(false);
// 	const { address, isConnected } = useAccount();
// 	const { connect, connectors, isPending } = useConnect();
// 	const { disconnect } = useDisconnect();

// 	const handleConnectWallet = (connector: any) => {
// 		connect({ connector });
// 		setShowWalletOptions(false);
// 	};

// 	const handleDisconnect = () => {
// 		disconnect();
// 		setShowWalletOptions(false);
// 	};

// 	const formatAddress = (address: string) => {
// 		return `${address.slice(0, 6)}...${address.slice(-4)}`;
// 	};

// 	return (
// 		<header className='fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100'>
// 			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
// 				<div className='flex justify-between items-center h-16'>
// 					{/* Logo */}
// 					<div className='flex items-center space-x-2'>
// 						<Image
// 							src='/logo.svg'
// 							alt='skillproof logo'
// 							width={40}
// 							height={35}
// 							className='object-contain'
// 						/>
// 						<span className='text-xl font-bold text-gray-900'>SkillProof</span>
// 					</div>

// 					{/* Navigation */}
// 					<nav className='hidden md:flex items-center space-x-8'>
// 						<a
// 							href='/#how-it-works'
// 							className='text-gray-600 hover:text-gray-900 transition-colors'>
// 							How It Works
// 						</a>
// 						<a
// 							href='/#my-nfts'
// 							className='text-gray-600 hover:text-gray-900 transition-colors'>
// 							My NFTs
// 						</a>
// 						<a
// 							href='/#verify-work'
// 							className='text-gray-600 hover:text-gray-900 transition-colors'>
// 							Verify Work
// 						</a>
// 						<a
// 							href='/#features'
// 							className='text-gray-600 hover:text-gray-900 transition-colors'>
// 							Features
// 						</a>
// 					</nav>

// 					{/* Connect Wallet Button */}
// 					<div className='relative'>
// 						{!isConnected ? (
// 							<div>
// 								<button
// 									onClick={() => setShowWalletOptions(!showWalletOptions)}
// 									disabled={isPending}
// 									className='bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors'>
// 									<Wallet className='w-4 h-4' />
// 									<span>{isPending ? "Connecting..." : "Connect Wallet"}</span>
// 									<ChevronDown className='w-4 h-4' />
// 								</button>

// 								{/* Wallet Options Dropdown */}
// 								{showWalletOptions && (
// 									<div className='absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10'>
// 										{connectors.map((connector) => (
// 											<button
// 												key={connector.id}
// 												onClick={() => handleConnectWallet(connector)}
// 												disabled={isPending}
// 												className='w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 disabled:opacity-50'>
// 												<Wallet className='w-4 h-4' />
// 												<span>{connector.name}</span>
// 											</button>
// 										))}
// 									</div>
// 								)}
// 							</div>
// 						) : (
// 							<div>
// 								<button
// 									onClick={() => setShowWalletOptions(!showWalletOptions)}
// 									className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors'>
// 									<div className='w-2 h-2 bg-green-300 rounded-full'></div>
// 									<span>{formatAddress(address!)}</span>
// 									<ChevronDown className='w-4 h-4' />
// 								</button>

// 								{/* Connected Wallet Dropdown */}
// 								{showWalletOptions && (
// 									<div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10'>
// 										<div className='px-4 py-2 border-b border-gray-100'>
// 											<p className='text-sm text-gray-500'>Connected</p>
// 											<p className='text-sm font-medium'>
// 												{formatAddress(address!)}
// 											</p>
// 										</div>
// 										<button
// 											onClick={handleDisconnect}
// 											className='w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600'>
// 											Disconnect
// 										</button>
// 									</div>
// 								)}
// 							</div>
// 						)}
// 					</div>
// 				</div>
// 			</div>

// 			{/* Backdrop for closing dropdown */}
// 			{showWalletOptions && (
// 				<div
// 					className='fixed inset-0 z-0'
// 					onClick={() => setShowWalletOptions(false)}
// 				/>
// 			)}
// 		</header>
// 	);
// }

"use client";
import { Wallet, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ConnectWalletButton from "@/components/ConnectWeb3Wallet";
import { useAccount } from "wagmi";

import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const { isConnected } = useAccount();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            <Image
              src="/logo.svg"
              alt="OwnMySkills logo"
              width={40}
              height={35}
              className="object-contain"
            />
            <span className="text-xl font-bold text-gray-900">OwnMySkills</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/#how-it-works"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              How It Works
            </a>
            <a
              href="/#my-nfts"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              My NFTs
            </a>
            <a
              href="/#verify-work"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Verify Work
            </a>
            <a
              href="/#features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
          </nav>

          {/* Connect Wallet Button */}
          <div className="flex items-center space-x-4">
            <ConnectWalletButton />
            {isConnected && (
              <Link href="/dashboard">
                <button className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  Dashboard
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
