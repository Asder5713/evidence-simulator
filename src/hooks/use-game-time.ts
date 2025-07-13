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

// Calculate real time for 30 game minutes (half hour in game time)
const HALF_HOUR_GAME_MS = (30 / TOTAL_GAME_MINUTES) * REAL_GAME_DURATION_MS;

const STORAGE_KEY = 'crime-investigation-game-state';

export function useGameTime(): UseGameTimeReturn {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [gameStartTimestamp, setGameStartTimestamp] = useState<number | null>(null);
  const [gameTime, setGameTime] = useState<GameTime>(GAME_START_TIME);
  const [lastSaveTime, setLastSaveTime] = useState<number>(0);

  // Load saved state on mount
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const { 
          isGameStarted: savedIsGameStarted, 
          gameStartTimestamp: savedGameStartTimestamp,
          isGameEnded: savedIsGameEnded 
        } = JSON.parse(savedState);
        
        if (savedIsGameStarted && savedGameStartTimestamp && !savedIsGameEnded) {
          setIsGameStarted(true);
          setGameStartTimestamp(savedGameStartTimestamp);
          setIsGameEnded(false);
        } else if (savedIsGameEnded) {
          setIsGameEnded(true);
          setIsGameStarted(true);
        }
      } catch (error) {
        console.error('Failed to load game state:', error);
      }
    }
  }, []);

  const startGame = useCallback(() => {
    const timestamp = Date.now();
    setIsGameStarted(true);
    setGameStartTimestamp(timestamp);
    setLastSaveTime(0);
    
    // Save initial game state
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      isGameStarted: true,
      gameStartTimestamp: timestamp,
      isGameEnded: false
    }));
  }, []);

  const endGame = useCallback(() => {
    setIsGameEnded(true);
    
    // Save end game state
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      isGameStarted: true,
      gameStartTimestamp,
      isGameEnded: true
    }));
  }, [gameStartTimestamp]);

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
      
      // Save state every half hour of game time
      if (elapsedRealTimeMs - lastSaveTime >= HALF_HOUR_GAME_MS) {
        setLastSaveTime(elapsedRealTimeMs);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          isGameStarted: true,
          gameStartTimestamp,
          isGameEnded: false
        }));
      }
      
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