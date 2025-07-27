import React, { createContext, useContext, ReactNode, useState, useEffect, useMemo } from 'react';
import { useGameTime, GameTime } from '@/hooks/use-game-time';
import { evidence } from '@/data/evidence-data';

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
    setVisitedPages(prev => {
      const newSet = new Set([...prev, page]);
      return newSet;
    });
    
    // Track the current game time when page was visited
    const currentGameMinutes = gameState.gameTime.hours * 60 + gameState.gameTime.minutes;
    setPageVisitTimes(prev => ({
      ...prev,
      [page]: currentGameMinutes
    }));
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

    const visibleEmails = evidence.filter(item => 
      item.news_type === 'email' && 
      gameState.isTimeReached(`${item.production_date} ${item.production_time}`)
    );
    const visibleTexts = evidence.filter(item => 
      ['intelligence', 'dispatch', 'investigation', 'forensics', 'command'].includes(item.news_type) &&
      gameState.isTimeReached(`${item.production_date} ${item.production_time}`)
    );
    const visibleVisual = evidence.filter(item => 
      ['image', 'video', 'audio'].includes(item.news_type) &&
      gameState.isTimeReached(`${item.production_date} ${item.production_time}`)
    );

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
      return evidenceList.filter(evidenceItem => {
        const evidenceTime = parseTimeToMinutes(evidenceItem.production_time);
        return evidenceTime > lastVisitTime;
      }).length;
    };

    const counts = {
      emails: getUnseenCount(visibleEmails, 'emails'),
      texts: getUnseenCount(visibleTexts, 'texts'),
      visual: getUnseenCount(visibleVisual, 'visual')
    };


    return counts;
  }, [gameState.isGameStarted, gameState.gameTime, visitedPages, pageVisitTimes]);

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