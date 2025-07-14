import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useGameTime, GameTime } from '@/hooks/use-game-time';

interface GameContextType {
  gameTime: GameTime;
  isGameStarted: boolean;
  isGameEnded: boolean;
  startGame: () => void;
  resetGame: () => void;
  formatGameTime: () => string;
  formatGameDate: () => string;
  isTimeReached: (timestampOrDate: string) => boolean;
  unseenCounts: { emails: number; texts: number; visual: number };
  markPageAsVisited: (page: 'emails' | 'texts' | 'visual') => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const gameState = useGameTime();
  const [visitedPages, setVisitedPages] = useState<Set<string>>(new Set());

  const resetGame = () => {
    gameState.resetGame();
    setVisitedPages(new Set());
  };

  const markPageAsVisited = (page: 'emails' | 'texts' | 'visual') => {
    setVisitedPages(prev => new Set([...prev, page]));
  };

  // Calculate unseen counts based on visited pages
  const unseenCounts = {
    emails: visitedPages.has('emails') ? 0 : 3, // Placeholder, will be calculated properly
    texts: visitedPages.has('texts') ? 0 : 6,
    visual: visitedPages.has('visual') ? 0 : 6
  };

  const contextValue = {
    ...gameState,
    resetGame,
    unseenCounts,
    markPageAsVisited
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}