import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Taskbar } from "@/components/Taskbar";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { GameStartDialog } from "@/components/GameStartDialog";
import { GameEndDialog } from "@/components/GameEndDialog";
import { GameProvider, useGameContext } from "@/contexts/GameContext";
import Index from "./pages/Index";

import Overview from "./pages/Overview";
import Emails from "./pages/Emails";
import TextMessages from "./pages/TextMessages";
import VisualEvidence from "./pages/VisualEvidence";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { isGameEnded, isGameStarted, startGame, resetGame } = useGameContext();
  const [showStartDialog, setShowStartDialog] = useState(true);

  // Update dialog state when game state is loaded from localStorage
  useEffect(() => {
    setShowStartDialog(!isGameStarted);
  }, [isGameStarted]);

  const handleStartGame = () => {
    setShowStartDialog(false);
    startGame();
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        {/* Reset Game Button */}
        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={resetGame}
            className="gap-2 bg-background/95 backdrop-blur-sm"
          >
            <RotateCcw className="h-4 w-4" />
            איפוס משחק
          </Button>
        </div>
        
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/lab" element={<Index />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/emails" element={<Emails />} />
          <Route path="/text-messages" element={<TextMessages />} />
          <Route path="/visual-evidence" element={<VisualEvidence />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Taskbar />
        
        <GameStartDialog 
          open={showStartDialog} 
          onStartGame={handleStartGame}
        />
        
        <GameEndDialog open={isGameEnded} />
      </div>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GameProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </GameProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
