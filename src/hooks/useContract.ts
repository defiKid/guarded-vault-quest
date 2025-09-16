import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { GUARDED_VAULT_QUEST_ABI, CONTRACT_ADDRESS, encryptValue } from '@/lib/contract';
import { DEMO_CONFIG, isDemoMode, getContractAddress } from '@/lib/demo-config';

export interface PartyInfo {
  memberCount: number;
  maxMembers: number;
  currentLevel: number;
  totalRewards: number;
  isActive: boolean;
  isCompleted: boolean;
  leader: string;
  startTime: bigint;
  endTime: bigint;
}

export interface DungeonState {
  currentPartyId: number | null;
  partyInfo: PartyInfo | null;
  isPartyMember: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useDungeonContract = () => {
  const { address } = useAccount();
  const [dungeonState, setDungeonState] = useState<DungeonState>({
    currentPartyId: isDemoMode() ? DEMO_CONFIG.DEMO_PARTY_ID : null,
    partyInfo: isDemoMode() ? DEMO_CONFIG.DEMO_PARTY_INFO : null,
    isPartyMember: isDemoMode() ? true : false,
    isLoading: false,
    error: null,
  });

  // Contract write functions
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Read party info
  const { data: partyInfo, refetch: refetchPartyInfo } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: GUARDED_VAULT_QUEST_ABI,
    functionName: 'getPartyInfo',
    args: dungeonState.currentPartyId ? [BigInt(dungeonState.currentPartyId)] : undefined,
    query: {
      enabled: !!dungeonState.currentPartyId,
    },
  });

  // Check if user is party member
  const { data: isPartyMember, refetch: refetchIsPartyMember } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: GUARDED_VAULT_QUEST_ABI,
    functionName: 'isPartyMember',
    args: dungeonState.currentPartyId && address ? [BigInt(dungeonState.currentPartyId), address] : undefined,
    query: {
      enabled: !!dungeonState.currentPartyId && !!address,
    },
  });

  // Update state when contract data changes
  useEffect(() => {
    if (partyInfo) {
      const [memberCount, maxMembers, currentLevel, totalRewards, isActive, isCompleted, leader, startTime, endTime] = partyInfo as any[];
      
      setDungeonState(prev => ({
        ...prev,
        partyInfo: {
          memberCount: Number(memberCount),
          maxMembers: Number(maxMembers),
          currentLevel: Number(currentLevel),
          totalRewards: Number(totalRewards),
          isActive,
          isCompleted,
          leader,
          startTime,
          endTime,
        },
        isPartyMember: isPartyMember || false,
      }));
    }
  }, [partyInfo, isPartyMember]);

  // Create a new party
  const createParty = async (maxMembers: number, duration: number) => {
    try {
      setDungeonState(prev => ({ ...prev, isLoading: true, error: null }));
      
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: GUARDED_VAULT_QUEST_ABI,
        functionName: 'createParty',
        args: [BigInt(maxMembers), BigInt(duration)],
      });
    } catch (error) {
      setDungeonState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to create party',
        isLoading: false 
      }));
    }
  };

  // Join an existing party
  const joinParty = async (partyId: number) => {
    try {
      setDungeonState(prev => ({ ...prev, isLoading: true, error: null }));
      
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: GUARDED_VAULT_QUEST_ABI,
        functionName: 'joinParty',
        args: [BigInt(partyId)],
      });
    } catch (error) {
      setDungeonState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to join party',
        isLoading: false 
      }));
    }
  };

  // Complete the dungeon with encrypted rewards
  const completeDungeon = async (partyId: number, totalRewards: number) => {
    try {
      setDungeonState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Encrypt the total rewards using FHE
      const encryptedRewards = encryptValue(totalRewards);
      
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: GUARDED_VAULT_QUEST_ABI,
        functionName: 'completeParty',
        args: [BigInt(partyId), encryptedRewards as `0x${string}`, '0x' as `0x${string}`], // inputProof placeholder
      });
    } catch (error) {
      setDungeonState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to complete dungeon',
        isLoading: false 
      }));
    }
  };

  // Unlock treasure chest
  const unlockTreasureChest = async (chestId: number, partyId: number) => {
    try {
      setDungeonState(prev => ({ ...prev, isLoading: true, error: null }));
      
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: GUARDED_VAULT_QUEST_ABI,
        functionName: 'unlockTreasureChest',
        args: [BigInt(chestId), BigInt(partyId)],
      });
    } catch (error) {
      setDungeonState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to unlock treasure chest',
        isLoading: false 
      }));
    }
  };

  // Claim reward from treasure chest
  const claimReward = async (chestId: number, partyId: number) => {
    try {
      setDungeonState(prev => ({ ...prev, isLoading: true, error: null }));
      
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: GUARDED_VAULT_QUEST_ABI,
        functionName: 'claimReward',
        args: [BigInt(chestId), BigInt(partyId)],
      });
    } catch (error) {
      setDungeonState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to claim reward',
        isLoading: false 
      }));
    }
  };

  // Set current party ID
  const setCurrentPartyId = (partyId: number | null) => {
    setDungeonState(prev => ({ ...prev, currentPartyId: partyId }));
  };

  // Refresh contract data
  const refreshData = () => {
    refetchPartyInfo();
    refetchIsPartyMember();
  };

  // Update loading state based on transaction status
  useEffect(() => {
    if (isConfirmed) {
      setDungeonState(prev => ({ ...prev, isLoading: false }));
      refreshData();
    }
  }, [isConfirmed]);

  return {
    ...dungeonState,
    isLoading: dungeonState.isLoading || isPending || isConfirming,
    createParty,
    joinParty,
    completeDungeon,
    unlockTreasureChest,
    claimReward,
    setCurrentPartyId,
    refreshData,
    transactionHash: hash,
    isTransactionPending: isPending,
    isTransactionConfirmed: isConfirmed,
  };
};
