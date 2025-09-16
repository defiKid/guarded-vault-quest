import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Trophy, Coins, Gem, Sword, Shield, Download, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";

interface LootItem {
  id: string;
  name: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  type: "weapon" | "armor" | "currency" | "gem" | "consumable";
  quantity: number;
  value: number;
}

const Results = () => {
  const navigate = useNavigate();
  
  const [completedDungeon] = useState({
    name: "Shadow Depths",
    difficulty: "Expert",
    completionTime: "1h 23m",
    partySize: 4,
    experienceGained: 2500
  });

  const [lootRewards] = useState<LootItem[]>([
    { id: "1", name: "Dragon Scale Armor", rarity: "legendary", type: "armor", quantity: 1, value: 1500 },
    { id: "2", name: "Mystical Gem of Power", rarity: "legendary", type: "gem", quantity: 1, value: 800 },
    { id: "3", name: "Shadow Blade", rarity: "epic", type: "weapon", quantity: 1, value: 600 },
    { id: "4", name: "Arcane Staff", rarity: "epic", type: "weapon", quantity: 1, value: 550 },
    { id: "5", name: "Gold Coins", rarity: "common", type: "currency", quantity: 150, value: 150 },
    { id: "6", name: "Health Potions", rarity: "common", type: "consumable", quantity: 5, value: 25 }
  ]);

  const totalValue = lootRewards.reduce((sum, item) => sum + item.value, 0);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "text-yellow-400 border-yellow-400/50 bg-yellow-400/10";
      case "epic": return "text-purple-400 border-purple-400/50 bg-purple-400/10";
      case "rare": return "text-blue-400 border-blue-400/50 bg-blue-400/10";
      case "common": return "text-gray-400 border-gray-400/50 bg-gray-400/10";
      default: return "text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "weapon": return <Sword className="h-4 w-4" />;
      case "armor": return <Shield className="h-4 w-4" />;
      case "currency": return <Coins className="h-4 w-4" />;
      case "gem": return <Gem className="h-4 w-4" />;
      default: return <Trophy className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-shadow-deep to-background">
      {/* Header */}
      <header className="relative z-10 p-6 border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo size="md" />
          
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="border-border/50 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Map
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Victory Banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 p-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl border border-primary/30 mb-6">
            <Trophy className="h-8 w-8 text-secondary animate-mystical-float" />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Dungeon Cleared!
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                All loot has been successfully unlocked and distributed
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dungeon Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-card/30 backdrop-blur-sm border-border/50 p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Expedition Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dungeon:</span>
                  <span className="text-foreground font-medium">{completedDungeon.name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Difficulty:</span>
                  <Badge variant="outline" className="text-accent border-accent/50">
                    {completedDungeon.difficulty}
                  </Badge>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completion Time:</span>
                  <span className="text-foreground font-medium">{completedDungeon.completionTime}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Party Size:</span>
                  <span className="text-foreground font-medium">{completedDungeon.partySize} Members</span>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience Gained:</span>
                  <span className="text-accent font-semibold">+{completedDungeon.experienceGained} XP</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Loot Value:</span>
                  <span className="text-secondary font-semibold">{totalValue} Gold</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Achievement
                </Button>
              </div>
            </Card>
          </div>

          {/* Loot Rewards */}
          <div className="lg:col-span-2">
            <Card className="bg-card/30 backdrop-blur-sm border-border/50 p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6">Unlocked Treasures</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lootRewards.map((item) => (
                  <div 
                    key={item.id}
                    className="p-4 bg-muted/30 rounded-lg border border-border/30 hover:border-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-accent">
                          {getTypeIcon(item.type)}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{item.name}</h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs mt-1 ${getRarityColor(item.rarity)}`}
                          >
                            {item.rarity}
                          </Badge>
                        </div>
                      </div>
                      
                      {item.quantity > 1 && (
                        <span className="text-sm text-muted-foreground">x{item.quantity}</span>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <span className="text-secondary font-semibold">{item.value} Gold</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Next Adventure */}
        <div className="mt-8 text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Ready for Your Next Adventure?</h3>
            <p className="text-muted-foreground mb-6">
              New dungeons await with even greater treasures and challenges
            </p>
            <Button 
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              <Trophy className="h-4 w-4 mr-2" />
              Start New Expedition
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Results;