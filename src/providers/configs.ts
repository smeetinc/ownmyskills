import { baseSepolia, base } from "wagmi/chains";
import { createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
    getDefaultConfig({
        appName: "SkillProof",
        chains: [baseSepolia, base], // Ensure these chains meet the required type structure
        walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
    
        appDescription: "Blockchain-based skill verification platform",
        appIcon: "https://skillproof.com/logo.svg",
      })
  );
