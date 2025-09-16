import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Users, Clock, ArrowRight, Lock, Key, Gem } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAccount } from 'wagmi';
import { useDungeonContract } from '@/hooks/useContract';
import { DEMO_CONFIG, isDemoMode } from '@/lib/demo-config';
import { toast } from 'sonner';

const CompleteDungeon = () => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [completionProgress, setCompletionProgress] = useState(0);
  const [totalRewards, setTotalRewards] = useState(0);
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { 
    currentPartyId, 
    partyInfo, 
    isPartyMember, 
    isLoading, 
    error, 
    completeDungeon,
    isTransactionPending,
    isTransactionConfirmed 
  } = useDungeonContract();

  // Set a default party ID for demo purposes
  useEffect(() => {
    if (!currentPartyId) {
      // In a real app, this would come from the party selection or creation
      // For demo purposes, we'll use party ID 1
      // setCurrentPartyId(1);
    }
  }, [currentPartyId]);

  // Calculate total rewards based on party progress
  useEffect(() => {
    if (partyInfo) {
      if (isDemoMode()) {
        // Use demo configuration for reward calculation
        const calculatedRewards = DEMO_CONFIG.calculateRewards(partyInfo.currentLevel, partyInfo.memberCount);
        setTotalRewards(calculatedRewards);
      } else {
        // Simulate reward calculation based on party level and member count
        const baseReward = 1000;
        const levelMultiplier = partyInfo.currentLevel;
        const memberBonus = partyInfo.memberCount * 100;
        const calculatedRewards = baseReward * levelMultiplier + memberBonus;
        setTotalRewards(calculatedRewards);
      }
    }
  }, [partyInfo]);

  // Handle transaction completion
  useEffect(() => {
    if (isTransactionConfirmed && isCompleting) {
      setCompletionProgress(100);
      toast.success("🎉 Dungeon completed successfully! Rewards are being distributed...");
      setTimeout(() => {
        navigate("/results");
      }, 2000);
    }
  }, [isTransactionConfirmed, isCompleting, navigate]);

  const handleCompleteDungeon = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!currentPartyId) {
      toast.error("No active party found");
      return;
    }

    if (!isPartyMember) {
      toast.error("You are not a member of this party");
      return;
    }

    if (partyInfo?.isCompleted) {
      toast.error("This dungeon has already been completed");
      return;
    }

    setIsCompleting(true);
    setCompletionProgress(0);
    
    try {
      // Start progress simulation
      const progressInterval = setInterval(() => {
        setCompletionProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 15;
        });
      }, 300);

      // Call smart contract to complete dungeon with encrypted rewards
      await completeDungeon(currentPartyId, totalRewards);
      
      toast.info("Transaction submitted! Waiting for confirmation...");
      
    } catch (error) {
      console.error('Error completing dungeon:', error);
      toast.error("Failed to complete dungeon. Please try again.");
      setIsCompleting(false);
      setCompletionProgress(0);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-card via-card/90 to-muted border-border/50 backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-gradient-to-br from-primary to-accent animate-glow-pulse">
            <Trophy className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Complete Dungeon</h3>
            <p className="text-sm text-muted-foreground">Finalize expedition and unlock rewards</p>
          </div>
        </div>

        {!isCompleting ? (
          <div className="space-y-4">
            {/* Error Display */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Party Information */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-accent" />
                  <span className="text-muted-foreground">Party Status:</span>
                </div>
                <span className="text-accent font-medium">
                  {partyInfo ? `${partyInfo.memberCount}/${partyInfo.maxMembers} Members` : 'Loading...'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-secondary" />
                  <span className="text-muted-foreground">Dungeon Level:</span>
                </div>
                <span className="text-secondary font-medium">
                  {partyInfo ? `Level ${partyInfo.currentLevel}` : 'Loading...'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gem className="h-4 w-4 text-yellow-500" />
                  <span className="text-muted-foreground">Estimated Rewards:</span>
                </div>
                <span className="text-yellow-500 font-medium">
                  {totalRewards > 0 ? `${totalRewards} tokens` : 'Calculating...'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-purple-500" />
                  <span className="text-muted-foreground">Encryption Status:</span>
                </div>
                <span className="text-purple-500 font-medium">FHE Protected</span>
              </div>
            </div>

            {/* Status Messages */}
            {!isConnected && (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-sm text-yellow-400">
                  🔑 Please connect your wallet to complete the dungeon
                </p>
              </div>
            )}

            {isConnected && !isPartyMember && (
              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <p className="text-sm text-orange-400">
                  ⚠️ You are not a member of this party
                </p>
              </div>
            )}

            {partyInfo?.isCompleted && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-sm text-green-400">
                  ✅ This dungeon has already been completed
                </p>
              </div>
            )}

            {/* Demo Mode Notice */}
            {isDemoMode() && (
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <span className="text-xs text-blue-500 font-medium">Demo Mode Active</span>
                </div>
                <p className="text-xs text-blue-400">
                  🎮 This is a demonstration. Real blockchain transactions will occur when deployed.
                </p>
              </div>
            )}

            {/* FHE Information */}
            <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Key className="h-4 w-4 text-accent" />
                <span className="text-xs text-accent font-medium">FHE Encryption Active</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                All rewards are encrypted using Fully Homomorphic Encryption until party completion.
              </p>
              <p className="text-xs text-accent font-medium">
                🔐 Treasures remain hidden until all members complete the quest.
              </p>
            </div>

            <Button 
              onClick={handleCompleteDungeon}
              disabled={!isConnected || !isPartyMember || partyInfo?.isCompleted || isLoading}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold shadow-mystical transition-all duration-300 hover:shadow-treasure disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Trophy className="mr-2 h-4 w-4" />
                  Complete Dungeon
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground mb-2">
                {isTransactionConfirmed ? 'Dungeon Completed!' : 'Completing Dungeon...'}
              </div>
              <p className="text-sm text-muted-foreground">
                {isTransactionConfirmed 
                  ? 'Rewards are being distributed to party members'
                  : 'Encrypting rewards and submitting to blockchain'
                }
              </p>
            </div>

            <div className="space-y-2">
              <Progress value={completionProgress} className="h-3" />
              <div className="text-sm text-center text-accent font-medium">
                {completionProgress}% Complete
              </div>
            </div>

            {/* Transaction Status */}
            {isTransactionPending && (
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <span className="text-sm text-blue-400">Transaction pending on blockchain...</span>
                </div>
              </div>
            )}

            {isTransactionConfirmed && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <span className="text-sm text-green-400">Transaction confirmed!</span>
                </div>
              </div>
            )}

            {/* FHE Encryption Status */}
            <div className="p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-4 w-4 text-purple-500" />
                <span className="text-xs text-purple-500 font-medium">FHE Encryption Process</span>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${completionProgress > 20 ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  <span>Rewards encrypted with FHE</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${completionProgress > 50 ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  <span>Smart contract validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${completionProgress > 80 ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  <span>Blockchain transaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${completionProgress === 100 ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  <span>Rewards distributed</span>
                </div>
              </div>
            </div>

            {completionProgress === 100 && (
              <div className="text-center text-secondary font-semibold animate-mystical-float">
                🎉 Dungeon Completed! Redirecting to results...
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default CompleteDungeon;