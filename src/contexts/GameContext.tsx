import React, { createContext, useContext, ReactNode, useState, useEffect, useMemo } from 'react';
import { useGameTime, GameTime } from '@/hooks/use-game-time';
import { emailEvidence, textEvidence, visualEvidence } from '@/data/evidence-data';

interface GameContextType {
  gameTime: GameTime;
  isGameStarted: boolean;
  isGameEnded: boolean;
  startGame: () => void;
  endGame: () => void;
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

  const markPageAsVisited = (page: 'emails' | 'texts' | 'visual') => {
    console.log('Marking page as visited:', page);
    setVisitedPages(prev => {
      const newSet = new Set([...prev, page]);
      console.log('Updated visited pages:', Array.from(newSet));
      return newSet;
    });
  };

  // Calculate unseen counts based on time-reached evidence and visited pages
  const unseenCounts = useMemo(() => {
    if (!gameState.isGameStarted) {
      return { emails: 0, texts: 0, visual: 0 };
    }

    const visibleEmails = emailEvidence.filter(email => gameState.isTimeReached(email.date));
    const visibleTexts = textEvidence.filter(text => gameState.isTimeReached(text.timestamp));
    const visibleVisual = visualEvidence.filter(visual => gameState.isTimeReached(visual.timestamp));

    const counts = {
      emails: visitedPages.has('emails') ? 0 : visibleEmails.length,
      texts: visitedPages.has('texts') ? 0 : visibleTexts.length,
      visual: visitedPages.has('visual') ? 0 : visibleVisual.length
    };

    console.log('Visited pages:', Array.from(visitedPages));
    console.log('Unseen counts:', counts);
    console.log('Visible evidence counts:', { emails: visibleEmails.length, texts: visibleTexts.length, visual: visibleVisual.length });

    return counts;
  }, [gameState.isGameStarted, gameState.isTimeReached, visitedPages]);

  const contextValue = {
    ...gameState,
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