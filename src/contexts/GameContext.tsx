import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useGameTime, GameTime } from '@/hooks/use-game-time';
import { emailEvidence, textEvidence, visualEvidence } from '@/data/evidence-data';

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
  isEvidenceUnseen: (evidenceTime: string, pageType: 'emails' | 'texts' | 'visual') => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const gameState = useGameTime();
  const [lastVisitTimes, setLastVisitTimes] = useState<Record<string, number>>({
    emails: 0,  // Start at 0 minutes (before game start)
    texts: 0,
    visual: 0
  });

  const parseTimeFromTimestamp = (timestamp: string): number => {
    const timeMatch = timestamp.match(/(\d{2}):(\d{2})/);
    if (!timeMatch) return 0;
    return parseInt(timeMatch[1]) * 60 + parseInt(timeMatch[2]);
  };

  const getCurrentGameTimeInMinutes = (): number => {
    return gameState.gameTime.hours * 60 + gameState.gameTime.minutes;
  };

  const resetGame = () => {
    gameState.resetGame();
    setLastVisitTimes({
      emails: 0,
      texts: 0,
      visual: 0
    });
  };

  const markPageAsVisited = (page: 'emails' | 'texts' | 'visual') => {
    const currentTimeMinutes = getCurrentGameTimeInMinutes();
    console.log(`Marking page ${page} as visited at time: ${currentTimeMinutes} minutes`);
    setLastVisitTimes(prev => ({
      ...prev,
      [page]: currentTimeMinutes
    }));
  };

  const isEvidenceUnseen = (evidenceTime: string, pageType: 'emails' | 'texts' | 'visual'): boolean => {
    if (!gameState.isGameStarted) return false;
    
    const evidenceTimeMinutes = parseTimeFromTimestamp(evidenceTime);
    const lastVisitTimeMinutes = lastVisitTimes[pageType];
    
    console.log(`Evidence time: ${evidenceTime}, Evidence minutes: ${evidenceTimeMinutes}, Last visit: ${lastVisitTimeMinutes}, Page: ${pageType}`);
    
    // Evidence is unseen if it appeared after the last visit to this page
    const isUnseen = evidenceTimeMinutes > lastVisitTimeMinutes;
    console.log(`Is evidence unseen: ${isUnseen}`);
    return isUnseen;
  };

  // Calculate unseen counts based on evidence that appeared since last visit
  const unseenCounts = {
    emails: gameState.isGameStarted ? emailEvidence.filter(email => 
      gameState.isTimeReached(email.date) && isEvidenceUnseen(email.date, 'emails')
    ).length : 0,
    texts: gameState.isGameStarted ? textEvidence.filter(text => 
      gameState.isTimeReached(text.timestamp) && isEvidenceUnseen(text.timestamp, 'texts')  
    ).length : 0,
    visual: gameState.isGameStarted ? visualEvidence.filter(visual => 
      gameState.isTimeReached(visual.timestamp) && isEvidenceUnseen(visual.timestamp, 'visual')
    ).length : 0
  };

  const contextValue = {
    ...gameState,
    resetGame,
    unseenCounts,
    markPageAsVisited,
    isEvidenceUnseen
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