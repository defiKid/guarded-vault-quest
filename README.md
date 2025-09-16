# 🏰 Guarded Vault Quest

> *Where encrypted treasures await the brave adventurers*

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/defiKid/guarded-vault-quest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF.svg)](https://vitejs.dev/)

## 🌟 The Quest Begins

Welcome to the most advanced blockchain gaming experience where **Fully Homomorphic Encryption (FHE)** meets fantasy RPG adventure. In this mystical realm, treasure chests remain encrypted until your entire party conquers the dungeon, ensuring fair play and preventing mid-quest exploits.

### 🎮 What Makes This Special?

- **🔐 FHE-Protected Rewards**: Your treasures are encrypted until victory
- **⚔️ Party-Based Gameplay**: Team up with fellow adventurers
- **🎯 Real Wallet Integration**: Connect with MetaMask, Rainbow, and more
- **🏆 Reputation System**: Build your legacy in the blockchain realm
- **🌟 Modern UI**: Crafted with love using React and Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- A **Web3 wallet** (MetaMask, Rainbow, etc.)
- **Sepolia testnet ETH** for gas fees

### Installation

```bash
# Clone the mystical repository
git clone https://github.com/defiKid/guarded-vault-quest.git

# Enter the dungeon
cd guarded-vault-quest

# Install magical dependencies
npm install

# Start your adventure
npm run dev
```

### Environment Setup

Create a `.env.local` file in your project root:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID

# Contract Address (after deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

> 💡 **Pro Tip**: Get your WalletConnect Project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com)

## 🎯 How the Magic Works

### 1. **Form Your Party** 👥
Create or join a dungeon exploration party with fellow adventurers

### 2. **Enter the Dungeon** 🏰
Navigate through encrypted chambers and mysterious rooms

### 3. **Collect Encrypted Treasures** 💎
Treasure chests remain encrypted until party completion

### 4. **Achieve Victory** 🏆
All rewards are revealed and distributed when the quest is complete

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, TypeScript, Vite |
| **UI/UX** | shadcn/ui, Radix UI, Tailwind CSS |
| **Blockchain** | Wagmi, Viem, RainbowKit |
| **Network** | Ethereum Sepolia Testnet |
| **Encryption** | Fully Homomorphic Encryption (FHE) |
| **Smart Contracts** | Solidity with FHE support |

## 📁 Project Structure

```
guarded-vault-quest/
├── 🏰 contracts/           # Smart contracts
│   └── GuardedVaultQuest.sol
├── 🎨 src/
│   ├── components/         # React components
│   ├── lib/               # Utilities & configs
│   └── pages/             # Application pages
├── 🚀 scripts/            # Deployment scripts
└── 📚 docs/               # Documentation
```

## 🔧 Smart Contract Features

### Core Functionality
- **Party Management**: Create and manage exploration parties
- **FHE Integration**: Encrypted reward distribution
- **Reputation System**: Player reputation tracking
- **Treasure Chests**: Encrypted loot until completion

### Security Features
- **Access Control**: Role-based permissions
- **Encrypted Data**: FHE for sensitive information
- **Audit Trail**: Complete transaction history

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repo to Vercel
2. **Set Environment Variables**: Configure your `.env` variables
3. **Deploy**: Click deploy and watch the magic happen

### Manual Deployment

```bash
# Build the project
npm run build

# Preview locally
npm run preview
```

## 🎮 Gameplay Guide

### For Adventurers
1. Connect your wallet to enter the realm
2. Create or join a party (max 10 members)
3. Explore dungeons and collect encrypted treasures
4. Complete quests to unlock rewards
5. Build your reputation in the community

### For Developers
1. Fork the repository
2. Create your feature branch
3. Implement your changes
4. Test thoroughly
5. Submit a pull request

## 🤝 Contributing

We welcome contributions from fellow adventurers! Here's how you can help:

### Ways to Contribute
- 🐛 **Bug Reports**: Found a bug? Let us know!
- 💡 **Feature Requests**: Have an idea? We'd love to hear it!
- 🔧 **Code Contributions**: Submit pull requests
- 📚 **Documentation**: Help improve our docs
- 🎨 **UI/UX**: Enhance the visual experience

### Development Workflow
```bash
# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes
# ... code magic happens ...

# Commit with style
git commit -m "✨ Add amazing feature"

# Push to your fork
git push origin feature/amazing-feature

# Open a Pull Request
```

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Community

- **🐛 Issues**: [GitHub Issues](https://github.com/defiKid/guarded-vault-quest/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/defiKid/guarded-vault-quest/discussions)
- **📧 Contact**: Reach out to the development team

## 🗺️ Roadmap

### Phase 1: Foundation ✅
- [x] Core FHE integration
- [x] Basic party system
- [x] Wallet connectivity

### Phase 2: Enhancement 🚧
- [ ] Advanced FHE operations
- [ ] Multi-chain support
- [ ] Mobile optimization

### Phase 3: Expansion 🔮
- [ ] Tournament system
- [ ] NFT integration
- [ ] Governance token
- [ ] Mobile app

## 🙏 Acknowledgments

- **FHE Technology**: Powered by Zama's FHE implementation
- **UI Components**: Built with shadcn/ui and Radix UI
- **Blockchain**: Ethereum and Sepolia testnet
- **Community**: All the brave adventurers who test and provide feedback

---

<div align="center">

**Ready to begin your quest?** 🏰

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/defiKid/guarded-vault-quest)

*Built with ❤️ by the Guarded Vault Team*

</div>