// types.ts or src/types/index.ts

export interface NFTData {
  id: string;
  title: string;
  image: string;
  description: string;
  tags: string[];
  client: string;
  value: string;
  completedDate: string;
  projectLink?: string;
  freelancerWallet: string;
  status: string;
}
