import React, { createContext, useContext, ReactNode, useState, useEffect, useMemo } from 'react';
import { useGameTime, GameTime } from '@/hooks/use-game-time';
import { emailEvidence, textEvidence, visualEvidence } from '@/data/evidence-data';

interface GameContextType {
  gameTime: GameTime;
  isGameStarted: boolean;
  isGameEnded: boolean;
  startGame: () => void;
  endGame: () => void;
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
  const [pageVisitTimes, setPageVisitTimes] = useState<Record<string, number>>({}); // Track visit time in game minutes

  const markPageAsVisited = (page: 'emails' | 'texts' | 'visual') => {
    console.log('Marking page as visited:', page);
    setVisitedPages(prev => {
      const newSet = new Set([...prev, page]);
      console.log('Updated visited pages:', Array.from(newSet));
      return newSet;
    });
    
    // Track the current game time when page was visited
    const currentGameMinutes = gameState.gameTime.hours * 60 + gameState.gameTime.minutes;
    setPageVisitTimes(prev => ({
      ...prev,
      [page]: currentGameMinutes
    }));
    console.log('Page visit time for', page, ':', currentGameMinutes);
  };

  const resetGame = () => {
    setVisitedPages(new Set());
    setPageVisitTimes({});
    gameState.endGame();
  };

  // Calculate unseen counts based on time-reached evidence and visited pages
  const unseenCounts = useMemo(() => {
    if (!gameState.isGameStarted) {
      return { emails: 0, texts: 0, visual: 0 };
    }

    const visibleEmails = emailEvidence.filter(email => gameState.isTimeReached(email.date));
    const visibleTexts = textEvidence.filter(text => gameState.isTimeReached(text.timestamp));
    const visibleVisual = visualEvidence.filter(visual => gameState.isTimeReached(visual.timestamp));

    // Helper function to parse time from timestamp and convert to minutes
    const parseTimeToMinutes = (timestamp: string) => {
      const timeMatch = timestamp.match(/(\d{2}):(\d{2})/);
      if (!timeMatch) return 0;
      return parseInt(timeMatch[1]) * 60 + parseInt(timeMatch[2]);
    };

    // Count evidence that appeared after the last page visit (or all if never visited)
    const getUnseenCount = (evidenceList: any[], page: string) => {
      if (!visitedPages.has(page)) {
        return evidenceList.length; // Never visited, show all available evidence
      }
      
      const lastVisitTime = pageVisitTimes[page] || 0;
      return evidenceList.filter(evidence => {
        const evidenceTime = parseTimeToMinutes(evidence.timestamp || evidence.date);
        return evidenceTime > lastVisitTime;
      }).length;
    };

    const counts = {
      emails: getUnseenCount(visibleEmails, 'emails'),
      texts: getUnseenCount(visibleTexts, 'texts'),
      visual: getUnseenCount(visibleVisual, 'visual')
    };

    console.log('Visited pages:', Array.from(visitedPages));
    console.log('Page visit times:', pageVisitTimes);
    console.log('Unseen counts:', counts);
    console.log('Current game time minutes:', gameState.gameTime.hours * 60 + gameState.gameTime.minutes);

    return counts;
  }, [gameState.isGameStarted, gameState.gameTime, visitedPages, pageVisitTimes]); // Use gameTime instead of isTimeReached

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