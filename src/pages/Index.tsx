import WalletConnect from "@/components/WalletConnect";
import PartyStatus from "@/components/PartyStatus";
import DungeonMap from "@/components/DungeonMap";
import CompleteDungeon from "@/components/CompleteDungeon";
import Logo from "@/components/Logo";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-shadow-deep to-background">
      {/* Header */}
      <header className="relative z-10 p-6 border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo size="md" />
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-accent animate-glow-pulse" />
            <span>Encrypted Treasure System Active</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <WalletConnect />
          <PartyStatus />
          <CompleteDungeon />
        </div>

        {/* Dungeon Map */}
        <div className="lg:col-span-3">
          <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-gradient-to-br from-primary to-secondary animate-glow-pulse">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dungeon Map</h2>
                <p className="text-sm text-muted-foreground">Explore the mystical chambers and claim your rewards</p>
              </div>
            </div>
            <DungeonMap />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 p-6 border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Dungeon rewards are encrypted until the full party clears the instance, preventing mid-run trades or leaks.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
