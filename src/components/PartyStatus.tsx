import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Shield, Sword, Sparkles, Clock } from "lucide-react";

interface PartyMember {
  id: string;
  name: string;
  class: string;
  level: number;
  status: "online" | "offline" | "in-dungeon";
}

const PartyStatus = () => {
  const partyMembers: PartyMember[] = [
    { id: "1", name: "DragonSlayer", class: "Warrior", level: 45, status: "in-dungeon" },
    { id: "2", name: "MysticMage", class: "Mage", level: 42, status: "in-dungeon" },
    { id: "3", name: "ShadowRogue", class: "Rogue", level: 44, status: "in-dungeon" },
    { id: "4", name: "HolyPriest", class: "Cleric", level: 43, status: "online" },
  ];

  const dungeonProgress = 75;
  const timeElapsed = "1h 23m";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-dungeon": return "text-accent border-accent/50 bg-accent/10";
      case "online": return "text-secondary border-secondary/50 bg-secondary/10";
      case "offline": return "text-muted-foreground border-border bg-muted/20";
      default: return "text-muted-foreground";
    }
  };

  const getClassIcon = (className: string) => {
    switch (className) {
      case "Warrior": return <Shield className="h-4 w-4" />;
      case "Mage": return <Sparkles className="h-4 w-4" />;
      case "Rogue": return <Sword className="h-4 w-4" />;
      case "Cleric": return <Sparkles className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-card via-card/90 to-muted border-border/50 backdrop-blur-sm">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-gradient-to-br from-primary to-accent animate-glow-pulse">
            <Users className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Party Status</h3>
            <p className="text-sm text-muted-foreground">Current expedition progress</p>
          </div>
        </div>

        {/* Dungeon Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Dungeon Progress</span>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {timeElapsed}
            </div>
          </div>
          <Progress 
            value={dungeonProgress} 
            className="h-2"
          />
          <div className="text-sm text-accent font-medium">{dungeonProgress}% Complete</div>
        </div>

        {/* Party Members */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Party Members</h4>
          <div className="space-y-2">
            {partyMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/30">
                <div className="flex items-center gap-3">
                  <div className="text-secondary">
                    {getClassIcon(member.class)}
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">{member.name}</div>
                    <div className="text-xs text-muted-foreground">{member.class} • Level {member.level}</div>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getStatusColor(member.status)}`}
                >
                  {member.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Loot Status */}
        <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Loot Protection Active</span>
          </div>
          <p className="text-xs text-muted-foreground">
            All treasures remain encrypted until the full party clears the dungeon
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PartyStatus;