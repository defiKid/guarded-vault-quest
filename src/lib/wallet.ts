import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

// Get projectId from https://cloud.walletconnect.com
export const config = getDefaultConfig({
  appName: 'Guarded Vault Quest',
  projectId: '2ec9743d0d0cd7fb94dee1a7e6d33475',
  chains: [sepolia],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

export const chainId = 11155111; // Sepolia testnet
export const rpcUrl = 'https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990';
