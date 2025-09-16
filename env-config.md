# Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration (Optional)
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia

# Contract Configuration
NEXT_PUBLIC_CONTRACT_ADDRESS=

# Private Key for Deployment (DO NOT COMMIT TO GIT)
PRIVATE_KEY=

# Etherscan API Key for Contract Verification
ETHERSCAN_API_KEY=

# Sepolia RPC URL for Hardhat
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
```

## Important Notes:

1. **Never commit `.env.local` to version control**
2. **Replace `PRIVATE_KEY` with your actual private key for deployment**
3. **Update `NEXT_PUBLIC_CONTRACT_ADDRESS` after deploying the contract**
4. **Get your own WalletConnect Project ID from https://cloud.walletconnect.com**
