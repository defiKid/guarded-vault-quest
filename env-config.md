# 🔐 Environment Configuration

> *Secure configuration for your Guarded Vault Quest*

## 📝 Setup Instructions

Create a `.env.local` file in the root directory with the following variables:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID

# Infura Configuration (Optional)
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia

# Contract Configuration
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000

# Private Key for Deployment (DO NOT COMMIT TO GIT)
PRIVATE_KEY=YOUR_PRIVATE_KEY

# Etherscan API Key for Contract Verification
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_KEY

# Sepolia RPC URL for Hardhat
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
```

## 🔑 How to Get Your Keys

### WalletConnect Project ID
1. Visit [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Create a new project
3. Copy your Project ID

### Infura API Key
1. Go to [infura.io](https://infura.io)
2. Create a new project
3. Select Ethereum network
4. Copy your Project ID

### Etherscan API Key
1. Visit [etherscan.io](https://etherscan.io)
2. Create an account
3. Go to API Keys section
4. Generate a new API key

## ⚠️ Security Notes

1. **Never commit `.env.local` to version control**
2. **Replace placeholder values with your actual keys**
3. **Keep private keys secure and never share them**
4. **Use different keys for development and production**

## 🚀 Deployment

After setting up your environment variables:

1. **Local Development**: Run `npm run dev`
2. **Build**: Run `npm run build`
3. **Deploy**: Push to GitHub and deploy via Vercel

## 🔧 Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| Wallet won't connect | Check WalletConnect Project ID |
| RPC errors | Verify Infura API key |
| Build failures | Ensure all required variables are set |

### Validation

Test your configuration by:
1. Starting the development server
2. Connecting a wallet
3. Switching to Sepolia network
4. Verifying contract interactions

---

*Keep your keys safe and your quests secure!* 🏰