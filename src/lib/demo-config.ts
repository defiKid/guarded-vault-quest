// Demo configuration for development and testing
export const DEMO_CONFIG = {
  // Demo party ID for testing
  DEMO_PARTY_ID: 1,
  
  // Demo contract address (replace with actual deployed contract)
  DEMO_CONTRACT_ADDRESS: '0x0000000000000000000000000000000000000000' as const,
  
  // Demo party data for testing
  DEMO_PARTY_INFO: {
    memberCount: 3,
    maxMembers: 5,
    currentLevel: 3,
    totalRewards: 0,
    isActive: true,
    isCompleted: false,
    leader: '0x0000000000000000000000000000000000000000',
    startTime: BigInt(Date.now() - 3600000), // 1 hour ago
    endTime: BigInt(Date.now() + 3600000), // 1 hour from now
  },
  
  // Demo rewards calculation
  calculateRewards: (level: number, memberCount: number) => {
    const baseReward = 1000;
    const levelMultiplier = level;
    const memberBonus = memberCount * 100;
    return baseReward * levelMultiplier + memberBonus;
  },
  
  // Demo FHE encryption simulation
  simulateFHEEncryption: (value: number) => {
    // In a real implementation, this would use actual FHE encryption
    // For demo purposes, we'll use a simple encoding
    return btoa(JSON.stringify({ 
      value, 
      timestamp: Date.now(),
      encrypted: true 
    }));
  },
  
  // Demo FHE decryption simulation
  simulateFHEDecryption: (encryptedValue: string) => {
    try {
      const decoded = JSON.parse(atob(encryptedValue));
      return decoded.value;
    } catch {
      return 0;
    }
  }
};

// Helper function to check if we're in demo mode
export const isDemoMode = () => {
  return process.env.NODE_ENV === 'development' || 
         process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
};

// Helper function to get contract address
export const getContractAddress = () => {
  if (isDemoMode()) {
    return DEMO_CONFIG.DEMO_CONTRACT_ADDRESS;
  }
  return process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || DEMO_CONFIG.DEMO_CONTRACT_ADDRESS;
};
