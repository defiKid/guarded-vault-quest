import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Users, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompleteDungeon = () => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [completionProgress, setCompletionProgress] = useState(0);
  const navigate = useNavigate();

  const handleCompleteDungeon = async () => {
    setIsCompleting(true);
    
    // Simulate dungeon completion process
    const progressInterval = setInterval(() => {
      setCompletionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            navigate("/results");
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
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
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-accent" />
                  <span className="text-muted-foreground">Party Status:</span>
                </div>
                <span className="text-accent font-medium">All Members Ready</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-secondary" />
                  <span className="text-muted-foreground">Dungeon Progress:</span>
                </div>
                <span className="text-secondary font-medium">75% Complete</span>
              </div>
            </div>

            <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
              <p className="text-xs text-muted-foreground mb-2">
                Ready to complete the dungeon and unlock all encrypted treasures?
              </p>
              <p className="text-xs text-accent font-medium">
                All loot will be distributed to party members upon completion.
              </p>
            </div>

            <Button 
              onClick={handleCompleteDungeon}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold shadow-mystical transition-all duration-300 hover:shadow-treasure"
            >
              <Trophy className="mr-2 h-4 w-4" />
              Complete Dungeon
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground mb-2">
                Completing Dungeon...
              </div>
              <p className="text-sm text-muted-foreground">
                Decrypting treasures and finalizing rewards
              </p>
            </div>

            <div className="space-y-2">
              <Progress value={completionProgress} className="h-3" />
              <div className="text-sm text-center text-accent font-medium">
                {completionProgress}% Complete
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