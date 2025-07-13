import { useState, useEffect, useCallback } from 'react';

export interface GameTime {
  hours: number;
  minutes: number;
}

interface UseGameTimeReturn {
  gameTime: GameTime;
  isGameStarted: boolean;
  isGameEnded: boolean;
  startGame: () => void;
  endGame: () => void;
  formatGameTime: () => string;
}

const GAME_START_TIME = { hours: 2, minutes: 0 }; // 2:00 AM
const GAME_END_TIME = { hours: 5, minutes: 43 }; // 5:43 AM
const REAL_GAME_DURATION_MS = 12 * 60 * 1000; // 12 minutes in milliseconds

// Calculate total game minutes (2:00 to 5:43 = 3 hours 43 minutes = 223 minutes)
const TOTAL_GAME_MINUTES = 
  (GAME_END_TIME.hours - GAME_START_TIME.hours) * 60 + 
  (GAME_END_TIME.minutes - GAME_START_TIME.minutes);

export function useGameTime(): UseGameTimeReturn {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [gameStartTimestamp, setGameStartTimestamp] = useState<number | null>(null);
  const [gameTime, setGameTime] = useState<GameTime>(GAME_START_TIME);

  const startGame = useCallback(() => {
    setIsGameStarted(true);
    setGameStartTimestamp(Date.now());
  }, []);

  const endGame = useCallback(() => {
    setIsGameEnded(true);
  }, []);

  const formatGameTime = useCallback(() => {
    const hours = gameTime.hours.toString().padStart(2, '0');
    const minutes = gameTime.minutes.toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }, [gameTime]);

  useEffect(() => {
    if (!isGameStarted || isGameEnded || !gameStartTimestamp) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedRealTimeMs = now - gameStartTimestamp;
      
      // Calculate how many game minutes have passed
      // Each real second = TOTAL_GAME_MINUTES / (12 * 60) game minutes
      const gameMinutesElapsed = (elapsedRealTimeMs / 1000) * (TOTAL_GAME_MINUTES / (12 * 60));
      
      // Calculate current game time
      const totalMinutesFromStart = GAME_START_TIME.hours * 60 + GAME_START_TIME.minutes + gameMinutesElapsed;
      const currentHours = Math.floor(totalMinutesFromStart / 60) % 24;
      const currentMinutes = Math.floor(totalMinutesFromStart % 60);
      
      const newGameTime = { hours: currentHours, minutes: currentMinutes };
      
      // Check if game should end
      const endTimeInMinutes = GAME_END_TIME.hours * 60 + GAME_END_TIME.minutes;
      const currentTimeInMinutes = currentHours * 60 + currentMinutes;
      
      if (currentTimeInMinutes >= endTimeInMinutes) {
        setGameTime(GAME_END_TIME);
        endGame();
      } else {
        setGameTime(newGameTime);
      }
    }, 100); // Update every 100ms for smoother time progression

    return () => clearInterval(interval);
  }, [isGameStarted, isGameEnded, gameStartTimestamp, endGame]);

  return {
    gameTime,
    isGameStarted,
    isGameEnded,
    startGame,
    endGame,
    formatGameTime,
  };
}