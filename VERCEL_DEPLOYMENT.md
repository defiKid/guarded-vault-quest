# 🚀 Vercel Deployment Guide

> *Deploy your Guarded Vault Quest to the cloud with ease*

## 📋 Prerequisites

- **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
- **GitHub Repository**: Ensure your code is pushed to GitHub
- **Environment Variables**: Prepare all required environment variables

## 🎯 Step-by-Step Deployment

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"** or **"Import Project"**
3. Connect your GitHub account if not already connected
4. Select the **"defiKid/guarded-vault-quest"** repository

### Step 2: Configure Project Settings

| Setting | Value |
|---------|-------|
| **Project Name** | `guarded-vault-quest` |
| **Framework Preset** | `Vite` |
| **Root Directory** | `.` (default) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### Step 3: Environment Variables

Click **"Environment Variables"** and add the following:

#### 🔧 Required Variables

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID
```

#### 🔐 Optional Variables

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
```

> ⚠️ **Important**: Replace placeholder values with your actual keys

### Step 4: Advanced Configuration

- **Node.js Version**: `18.x` or `20.x`
- **Build Settings**: Enable "Automatically expose System Environment Variables"
- **Functions Region**: Choose your preferred region

### Step 5: Deploy

1. Click **"Deploy"** button
2. Wait for build completion (2-5 minutes)
3. Get your deployment URL: `guarded-vault-quest-xxx.vercel.app`

### Step 6: Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS records
4. Wait for SSL certificate

## 🔧 Configuration Files

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| **Build Failures** | Check Node.js version, verify dependencies |
| **Wallet Connection** | Verify WalletConnect Project ID and RPC URL |
| **Contract Issues** | Ensure contract is deployed on Sepolia |

### Performance Optimization

- **Enable Analytics**: Go to Analytics tab
- **Configure Caching**: Add cache headers
- **Monitor Performance**: Use built-in monitoring

## 🔒 Security Best Practices

### Environment Variables
- Never commit sensitive data to Git
- Use Vercel's environment variable encryption
- Regularly rotate API keys

### Smart Contract Security
- Audit contracts before deployment
- Use proper access controls
- Implement error handling

### Frontend Security
- Validate user inputs
- Use HTTPS for all communications
- Implement CORS policies

## 📊 Monitoring & Maintenance

### Set up Monitoring
- Enable Vercel Analytics
- Set up error tracking
- Monitor smart contract events

### Regular Updates
- Keep dependencies updated
- Monitor security vulnerabilities
- Update smart contracts as needed

## 🆘 Support Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev)
- **RainbowKit Docs**: [rainbowkit.com](https://rainbowkit.com)
- **Wagmi Docs**: [wagmi.sh](https://wagmi.sh)

## 🎉 Post-Deployment

### Testing Checklist
- [ ] Wallet connection works
- [ ] Network switching functions
- [ ] Contract interactions succeed
- [ ] UI renders correctly
- [ ] Mobile responsiveness

### Next Steps
1. Deploy smart contract to Sepolia
2. Update contract address in environment variables
3. Test complete user flow
4. Share with community

---

**Deployment URL**: `https://guarded-vault-quest-xxx.vercel.app`

**Repository**: `https://github.com/defiKid/guarded-vault-quest`

*Last Updated: September 2024*