import { Address } from 'viem';

// Contract ABI for GuardedVaultQuest
export const GUARDED_VAULT_QUEST_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_verifier",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "partyId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "leader",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "maxMembers",
        "type": "uint32"
      }
    ],
    "name": "PartyCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "partyId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "member",
        "type": "address"
      }
    ],
    "name": "PartyJoined",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "partyId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "totalRewards",
        "type": "uint32"
      }
    ],
    "name": "PartyCompleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "chestId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "partyId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "claimer",
        "type": "address"
      }
    ],
    "name": "TreasureChestUnlocked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "chestId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "claimer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "amount",
        "type": "uint32"
      }
    ],
    "name": "RewardClaimed",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_maxMembers",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_duration",
        "type": "uint256"
      }
    ],
    "name": "createParty",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "partyId",
        "type": "uint256"
      }
    ],
    "name": "joinParty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "partyId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "totalRewards",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "completeParty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "chestId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "partyId",
        "type": "uint256"
      }
    ],
    "name": "unlockTreasureChest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "chestId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "partyId",
        "type": "uint256"
      }
    ],
    "name": "claimReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "partyId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "member",
        "type": "address"
      }
    ],
    "name": "isPartyMember",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "partyId",
        "type": "uint256"
      }
    ],
    "name": "getPartyInfo",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "memberCount",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "maxMembers",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "currentLevel",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "totalRewards",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isCompleted",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "leader",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Contract address (will be set after deployment)
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address || '0x0000000000000000000000000000000000000000' as Address;

// FHE encryption utilities
export const encryptValue = (value: number): string => {
  // In a real implementation, this would use FHE encryption
  // For now, we'll simulate with a simple encoding
  return btoa(JSON.stringify({ value, timestamp: Date.now() }));
};

export const decryptValue = (encryptedValue: string): number => {
  // In a real implementation, this would use FHE decryption
  // For now, we'll simulate with a simple decoding
  try {
    const decoded = JSON.parse(atob(encryptedValue));
    return decoded.value;
  } catch {
    return 0;
  }
};
