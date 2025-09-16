import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock, Sparkles, Coins } from "lucide-react";
import treasureChestImage from "@/assets/treasure-chest.png";

interface TreasureChestProps {
  id: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  isLocked: boolean;
  rewards?: string[];
  position: { x: number; y: number };
}

const TreasureChest = ({ id, rarity, isLocked, rewards = [], position }: TreasureChestProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const rarityStyles = {
    common: "border-gray-400 shadow-gray-400/20",
    rare: "border-blue-400 shadow-blue-400/30 animate-glow-pulse",
    epic: "border-purple-400 shadow-purple-400/40 animate-glow-pulse",
    legendary: "border-yellow-400 shadow-yellow-400/50 animate-glow-pulse animate-mystical-float"
  };

  const rarityGlow = {
    common: "bg-gray-400/10",
    rare: "bg-blue-400/20",
    epic: "bg-purple-400/20",
    legendary: "bg-yellow-400/20"
  };

  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className={`
        relative w-20 h-20 p-2 transition-all duration-300
        ${rarityStyles[rarity]}
        ${isHovered ? 'scale-110' : 'scale-100'}
        ${rarityGlow[rarity]}
        backdrop-blur-sm
      `}>
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src={treasureChestImage} 
            alt="Treasure Chest"
            className="w-12 h-12 object-contain"
          />
          
          {/* Lock/Unlock Indicator */}
          <div className="absolute -top-1 -right-1 p-1 rounded-full bg-background/80 backdrop-blur-sm">
            {isLocked ? (
              <Lock className="h-3 w-3 text-destructive" />
            ) : (
              <Unlock className="h-3 w-3 text-accent animate-glow-pulse" />
            )}
          </div>

          {/* Rarity Indicator */}
          <div className="absolute -bottom-1 -left-1">
            <Badge 
              variant="outline" 
              className={`text-xs px-1 py-0 ${
                rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black border-yellow-400' :
                rarity === 'epic' ? 'bg-gradient-to-r from-purple-400 to-purple-600 text-white border-purple-400' :
                rarity === 'rare' ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white border-blue-400' :
                'bg-gray-400 text-white border-gray-400'
              }`}
            >
              {rarity}
            </Badge>
          </div>

          {/* Magical Effects */}
          {!isLocked && (
            <div className="absolute inset-0 rounded-lg animate-treasure-shimmer bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          )}
        </div>
      </Card>

      {/* Tooltip on Hover */}
      {isHovered && (
        <Card className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-50 p-3 min-w-48 bg-card/95 backdrop-blur-sm border border-border/50">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="font-semibold text-foreground capitalize">{rarity} Chest</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Status: {isLocked ? "Encrypted" : "Unlocked"}
            </div>

            {!isLocked && rewards.length > 0 && (
              <div className="space-y-1">
                <div className="text-sm font-medium text-foreground">Rewards:</div>
                {rewards.map((reward, index) => (
                  <div key={index} className="flex items-center gap-1 text-sm text-accent">
                    <Coins className="h-3 w-3" />
                    {reward}
                  </div>
                ))}
              </div>
            )}

            {isLocked && (
              <div className="text-sm text-destructive">
                Requires full party completion
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default TreasureChest;