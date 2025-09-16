# Guarded Vault Quest

A revolutionary blockchain gaming platform that combines fantasy RPG elements with advanced Fully Homomorphic Encryption (FHE) technology to protect treasure rewards until party completion.

## Features

- **FHE Protected Rewards**: Treasure chests are encrypted using Fully Homomorphic Encryption until the entire party completes the dungeon
- **Real Wallet Integration**: Connect with popular wallets like Rainbow, MetaMask, and more
- **Secure Gaming**: Prevents mid-run trades and information leaks
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Blockchain Ready**: Deployed on Sepolia testnet with smart contract integration

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Radix UI, Tailwind CSS
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **Blockchain**: Ethereum Sepolia Testnet
- **Encryption**: Fully Homomorphic Encryption (FHE)
- **Smart Contracts**: Solidity with FHE support

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, Rainbow, etc.)
- Sepolia testnet ETH for gas fees

### Installation

```bash
# Clone the repository
git clone https://github.com/defiKid/guarded-vault-quest.git

# Navigate to the project directory
cd guarded-vault-quest

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration (Optional)
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

## How It Works

1. **Connect Wallet**: Players connect their Web3 wallet to join the quest
2. **Form Party**: Create or join a dungeon exploration party
3. **Explore Dungeon**: Navigate through encrypted chambers and rooms
4. **Collect Rewards**: Treasure chests are encrypted until party completion
5. **Complete Quest**: All rewards are revealed and distributed when the party finishes

## Smart Contract Features

- **FHE Integration**: Core data is encrypted using Fully Homomorphic Encryption
- **Party Management**: Secure party formation and management
- **Reward Distribution**: Automated and secure reward distribution
- **Reputation System**: Player reputation tracking with encrypted scores

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set the environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please open an issue on GitHub or contact the development team.

## Roadmap

- [ ] Multi-chain support
- [ ] Advanced FHE operations
- [ ] Mobile app development
- [ ] Tournament system
- [ ] NFT integration
- [ ] Governance token

---

Built with ❤️ by the Guarded Vault Team