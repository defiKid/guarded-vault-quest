import { useState, useEffect } from "react";
import TreasureChest from "./TreasureChest";
import dungeonMapImage from "@/assets/dungeon-map.jpg";

const DungeonMap = () => {
  const [treasureChests] = useState([
    {
      id: "chest-1",
      rarity: "legendary" as const,
      isLocked: true,
      rewards: ["Dragon Scale Armor", "50 Gold Coins", "Mystical Gem"],
      position: { x: 75, y: 30 }
    },
    {
      id: "chest-2", 
      rarity: "epic" as const,
      isLocked: true,
      rewards: ["Shadow Blade", "25 Gold Coins"],
      position: { x: 25, y: 65 }
    },
    {
      id: "chest-3",
      rarity: "rare" as const,
      isLocked: false,
      rewards: ["Health Potion", "10 Gold Coins"],
      position: { x: 50, y: 80 }
    },
    {
      id: "chest-4",
      rarity: "common" as const,
      isLocked: false,
      rewards: ["Iron Sword", "5 Gold Coins"],
      position: { x: 80, y: 70 }
    },
    {
      id: "chest-5",
      rarity: "epic" as const,
      isLocked: true,
      rewards: ["Arcane Staff", "30 Gold Coins", "Spell Scroll"],
      position: { x: 15, y: 25 }
    }
  ]);

  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setMapLoaded(true);
    img.src = dungeonMapImage;
  }, []);

  return (
    <div className="relative w-full h-full min-h-[600px] rounded-xl overflow-hidden bg-gradient-to-br from-shadow-deep to-background border border-border/50">
      {/* Background Map */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url(${dungeonMapImage})`,
          opacity: mapLoaded ? 0.8 : 0
        }}
      />
      
      {/* Dark Overlay for Mystical Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
      
      {/* Map Loading State */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-magical-spin mx-auto" />
            <p className="text-foreground font-medium">Loading dungeon map...</p>
          </div>
        </div>
      )}

      {/* Treasure Chests */}
      {mapLoaded && treasureChests.map((chest) => (
        <TreasureChest key={chest.id} {...chest} />
      ))}

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-4 border border-border/50">
        <h4 className="font-semibold text-foreground mb-3 text-sm">Legend</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <span className="text-muted-foreground">Common Loot</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400 animate-glow-pulse" />
            <span className="text-muted-foreground">Rare Loot</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-400 animate-glow-pulse" />
            <span className="text-muted-foreground">Epic Loot</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400 animate-mystical-float" />
            <span className="text-muted-foreground">Legendary Loot</span>
          </div>
        </div>
      </div>

      {/* Mystical Particles Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full animate-mystical-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DungeonMap;