import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Plus, UserPlus, Crown } from "lucide-react";
import { useAccount } from 'wagmi';
import { useDungeonContract } from '@/hooks/useContract';
import { toast } from 'sonner';

const PartyManager = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [partyId, setPartyId] = useState('');
  const [maxMembers, setMaxMembers] = useState(5);
  const [duration, setDuration] = useState(3600); // 1 hour in seconds
  const { address, isConnected } = useAccount();
  const { 
    currentPartyId, 
    partyInfo, 
    isPartyMember, 
    isLoading, 
    createParty,
    joinParty,
    setCurrentPartyId 
  } = useDungeonContract();

  const handleCreateParty = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsCreating(true);
    try {
      await createParty(maxMembers, duration);
      toast.success("Party created successfully!");
      // Set the created party as current (in real app, this would come from the contract event)
      setCurrentPartyId(1); // Demo party ID
    } catch (error) {
      console.error('Error creating party:', error);
      toast.error("Failed to create party");
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinParty = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!partyId) {
      toast.error("Please enter a party ID");
      return;
    }

    try {
      await joinParty(parseInt(partyId));
      toast.success("Joined party successfully!");
      setCurrentPartyId(parseInt(partyId));
    } catch (error) {
      console.error('Error joining party:', error);
      toast.error("Failed to join party");
    }
  };

  if (currentPartyId && partyInfo) {
    return (
      <Card className="bg-gradient-to-br from-card via-card/90 to-muted border-border/50 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-gradient-to-br from-primary to-accent animate-glow-pulse">
              <Crown className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Active Party</h3>
              <p className="text-sm text-muted-foreground">Party #{currentPartyId}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Members:</span>
              <span className="text-accent font-medium">
                {partyInfo.memberCount}/{partyInfo.maxMembers}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Level:</span>
              <span className="text-secondary font-medium">{partyInfo.currentLevel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className={`font-medium ${partyInfo.isActive ? 'text-green-500' : 'text-red-500'}`}>
                {partyInfo.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Completed:</span>
              <span className={`font-medium ${partyInfo.isCompleted ? 'text-green-500' : 'text-yellow-500'}`}>
                {partyInfo.isCompleted ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
            <p className="text-xs text-muted-foreground">
              {isPartyMember ? '✅ You are a member of this party' : '❌ You are not a member of this party'}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-card via-card/90 to-muted border-border/50 backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-gradient-to-br from-primary to-accent animate-glow-pulse">
            <Users className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Party Management</h3>
            <p className="text-sm text-muted-foreground">Create or join a dungeon party</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Create Party Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground">Create New Party</span>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxMembers" className="text-xs text-muted-foreground">
                Max Members
              </Label>
              <Input
                id="maxMembers"
                type="number"
                min="2"
                max="10"
                value={maxMembers}
                onChange={(e) => setMaxMembers(parseInt(e.target.value))}
                className="h-8"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-xs text-muted-foreground">
                Duration (seconds)
              </Label>
              <Input
                id="duration"
                type="number"
                min="300"
                max="86400"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="h-8"
              />
            </div>

            <Button 
              onClick={handleCreateParty}
              disabled={!isConnected || isLoading || isCreating}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold shadow-mystical transition-all duration-300 hover:shadow-treasure disabled:opacity-50"
            >
              {isCreating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Party
                </>
              )}
            </Button>
          </div>

          {/* Join Party Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-foreground">Join Existing Party</span>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="partyId" className="text-xs text-muted-foreground">
                Party ID
              </Label>
              <Input
                id="partyId"
                type="number"
                placeholder="Enter party ID"
                value={partyId}
                onChange={(e) => setPartyId(e.target.value)}
                className="h-8"
              />
            </div>

            <Button 
              onClick={handleJoinParty}
              disabled={!isConnected || !partyId || isLoading}
              variant="outline"
              className="w-full border-border/50 text-muted-foreground hover:text-foreground"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Join Party
            </Button>
          </div>

          {!isConnected && (
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm text-yellow-400">
                🔑 Please connect your wallet to create or join a party
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PartyManager;
