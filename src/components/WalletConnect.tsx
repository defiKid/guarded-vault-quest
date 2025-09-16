import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Shield, Coins } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';

const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <Card className="bg-gradient-to-br from-card via-card/90 to-muted border-border/50 backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-gradient-to-br from-mystical-purple to-accent animate-glow-pulse">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Quest Entry</h3>
            <p className="text-sm text-muted-foreground">Connect wallet to begin your adventure</p>
          </div>
        </div>

        {!isConnected ? (
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated');

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <Button 
                          onClick={openConnectModal}
                          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold shadow-mystical transition-all duration-300 hover:shadow-treasure"
                        >
                          <Wallet className="mr-2 h-4 w-4" />
                          Connect Wallet
                        </Button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <Button 
                          onClick={openChainModal}
                          className="w-full bg-red-500 hover:bg-red-600 text-white"
                        >
                          Wrong network
                        </Button>
                      );
                    }

                    return (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border border-accent/20">
                          <Shield className="h-4 w-4 text-accent animate-glow-pulse" />
                          <span className="text-sm font-mono text-foreground">
                            {account.displayName}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-accent">
                          <Coins className="h-4 w-4" />
                          <span>Ready for dungeon exploration</span>
                        </div>

                        <Button 
                          onClick={openAccountModal}
                          variant="outline"
                          className="w-full border-border/50 text-muted-foreground hover:text-foreground"
                        >
                          Account
                        </Button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border border-accent/20">
              <Shield className="h-4 w-4 text-accent animate-glow-pulse" />
              <span className="text-sm font-mono text-foreground">
                {address}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-accent">
              <Coins className="h-4 w-4" />
              <span>Ready for dungeon exploration</span>
            </div>

            <Button 
              onClick={() => disconnect()}
              variant="outline"
              className="w-full border-border/50 text-muted-foreground hover:text-foreground"
            >
              Disconnect
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default WalletConnect;