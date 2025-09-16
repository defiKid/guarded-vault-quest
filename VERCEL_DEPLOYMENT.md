# Vercel Deployment Guide for Guarded Vault Quest

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare all required environment variables

## Step-by-Step Deployment Process

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"** or **"Import Project"**
3. Connect your GitHub account if not already connected
4. Select the **"defiKid/guarded-vault-quest"** repository

### Step 2: Configure Project Settings

1. **Project Name**: `guarded-vault-quest`
2. **Framework Preset**: Select **"Vite"**
3. **Root Directory**: Leave as default (`.`)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### Step 3: Environment Variables Configuration

Click **"Environment Variables"** and add the following variables:

#### Required Environment Variables:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

#### Optional Environment Variables:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
```

**Important Notes:**
- Replace `NEXT_PUBLIC_CONTRACT_ADDRESS` with your deployed contract address after deployment
- All variables starting with `NEXT_PUBLIC_` are exposed to the client-side
- Never add private keys or sensitive data to environment variables

### Step 4: Advanced Configuration

1. **Node.js Version**: Set to `18.x` or `20.x`
2. **Build Settings**: 
   - Enable **"Automatically expose System Environment Variables"**
   - Set **"Functions Region"** to your preferred region

### Step 5: Deploy

1. Click **"Deploy"** button
2. Wait for the build process to complete (usually 2-5 minutes)
3. Vercel will automatically assign a domain like `guarded-vault-quest-xxx.vercel.app`

### Step 6: Custom Domain (Optional)

1. Go to **"Settings"** → **"Domains"**
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. Wait for SSL certificate to be issued

### Step 7: Post-Deployment Configuration

1. **Update Contract Address**: 
   - Deploy your smart contract to Sepolia testnet
   - Update `NEXT_PUBLIC_CONTRACT_ADDRESS` in Vercel environment variables
   - Redeploy the application

2. **Test the Application**:
   - Connect a wallet (MetaMask, Rainbow, etc.)
   - Ensure you're on Sepolia testnet
   - Test the core functionality

## Build Configuration

### Vercel Configuration File (vercel.json)

Create a `vercel.json` file in your project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "env": {
    "NEXT_PUBLIC_CHAIN_ID": "11155111",
    "NEXT_PUBLIC_RPC_URL": "https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990",
    "NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID": "2ec9743d0d0cd7fb94dee1a7e6d33475"
  }
}
```

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Node.js version compatibility
   - Ensure all dependencies are properly installed
   - Verify environment variables are set correctly

2. **Wallet Connection Issues**:
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches Sepolia (11155111)

3. **Contract Interaction Issues**:
   - Verify contract address is correct
   - Ensure contract is deployed on Sepolia
   - Check if user has Sepolia ETH for gas fees

### Performance Optimization:

1. **Enable Vercel Analytics**:
   - Go to **"Analytics"** tab
   - Enable **"Web Analytics"**

2. **Configure Caching**:
   - Add appropriate cache headers
   - Use Vercel's Edge Network

3. **Monitor Performance**:
   - Use Vercel's built-in performance monitoring
   - Set up alerts for build failures

## Security Considerations

1. **Environment Variables**:
   - Never commit sensitive data to Git
   - Use Vercel's environment variable encryption
   - Regularly rotate API keys

2. **Smart Contract Security**:
   - Audit your smart contracts before deployment
   - Use proper access controls
   - Implement proper error handling

3. **Frontend Security**:
   - Validate all user inputs
   - Use HTTPS for all communications
   - Implement proper CORS policies

## Monitoring and Maintenance

1. **Set up Monitoring**:
   - Enable Vercel Analytics
   - Set up error tracking (Sentry, etc.)
   - Monitor smart contract events

2. **Regular Updates**:
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Update smart contracts as needed

3. **Backup Strategy**:
   - Regular database backups (if applicable)
   - Smart contract source code backup
   - Environment variable backup

## Support and Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Documentation**: [vitejs.dev](https://vitejs.dev)
- **RainbowKit Documentation**: [rainbowkit.com](https://rainbowkit.com)
- **Wagmi Documentation**: [wagmi.sh](https://wagmi.sh)

---

**Deployment URL**: After successful deployment, your application will be available at:
`https://guarded-vault-quest-xxx.vercel.app`

**GitHub Repository**: `https://github.com/defiKid/guarded-vault-quest`

**Last Updated**: September 2024
