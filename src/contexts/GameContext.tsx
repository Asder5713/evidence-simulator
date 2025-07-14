import React, { createContext, useContext, ReactNode } from 'react';
import { useGameTime, GameTime } from '@/hooks/use-game-time';

interface GameContextType {
  gameTime: GameTime;
  isGameStarted: boolean;
  isGameEnded: boolean;
  startGame: () => void;
  endGame: () => void;
  formatGameTime: () => string;
  formatGameDate: () => string;
  isTimeReached: (targetTime: { hours: number; minutes: number }) => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const gameState = useGameTime();

  return (
    <GameContext.Provider value={gameState}>
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