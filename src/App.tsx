import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Taskbar } from "@/components/Taskbar";
import { GameStartDialog } from "@/components/GameStartDialog";
import { GameEndDialog } from "@/components/GameEndDialog";
import { useGameTime } from "@/hooks/use-game-time";
import Index from "./pages/Index";

import Overview from "./pages/Overview";
import Emails from "./pages/Emails";
import TextMessages from "./pages/TextMessages";
import VisualEvidence from "./pages/VisualEvidence";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showStartDialog, setShowStartDialog] = useState(true);
  const { isGameEnded, startGame } = useGameTime();

  const handleStartGame = () => {
    setShowStartDialog(false);
    startGame();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen">
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
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
