import { useState, useEffect, useCallback } from 'react';

export interface GameTime {
  hours: number;
  minutes: number;
}

export interface TimeBasedEvidence {
  showTime: { hours: number; minutes: number };
}

interface UseGameTimeReturn {
  gameTime: GameTime;
  isGameStarted: boolean;
  isGameEnded: boolean;
  startGame: () => void;
  endGame: () => void;
  formatGameTime: () => string;
  formatGameDate: () => string;
  isTimeReached: (timestampOrDate: string) => boolean;
}

const GAME_START_TIME = { hours: 2, minutes: 0 }; // 2:00 AM
const GAME_END_TIME = { hours: 5, minutes: 43 }; // 5:43 AM
const REAL_GAME_DURATION_MS = 12 * 60 * 1000; // 12 minutes in milliseconds

// Calculate total game minutes (2:00 to 5:43 = 3 hours 43 minutes = 223 minutes)
const TOTAL_GAME_MINUTES =
  (GAME_END_TIME.hours - GAME_START_TIME.hours) * 60 +
  (GAME_END_TIME.minutes - GAME_START_TIME.minutes);

// Save state every 30 seconds of real time
const SAVE_INTERVAL_MS = 30 * 1000; // 30 seconds

const STORAGE_KEY = 'crime-investigation-game-state';

export function useGameTime(): UseGameTimeReturn {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [gameStartTimestamp, setGameStartTimestamp] = useState<number | null>(
    null
  );
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
          isGameEnded: savedIsGameEnded,
        } = JSON.parse(savedState);

        if (
          savedIsGameStarted &&
          savedGameStartTimestamp &&
          !savedIsGameEnded
        ) {
          setIsGameStarted(true);
          setGameStartTimestamp(savedGameStartTimestamp);
          setIsGameEnded(false);
        } else if (savedIsGameEnded) {
          // If game ended, reset everything on page refresh
          localStorage.removeItem(STORAGE_KEY);
          setIsGameEnded(false);
          setIsGameStarted(false);
        }
      } catch (error) {
        console.error('Failed to load game state:', error);
      }
    }
  }, []);

  const startGame = useCallback(() => {
    // Clear all localStorage before starting a new game
    localStorage.clear();

    const timestamp = Date.now();
    setIsGameStarted(true);
    setGameStartTimestamp(timestamp);
    setLastSaveTime(0);

    // Save initial game state
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        isGameStarted: true,
        gameStartTimestamp: timestamp,
        isGameEnded: false,
      })
    );
  }, []);

  const endGame = useCallback(() => {
    setIsGameEnded(true);

    // Save end game state
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        isGameStarted: true,
        gameStartTimestamp,
        isGameEnded: true,
      })
    );
  }, [gameStartTimestamp]);

  const formatGameTime = useCallback(() => {
    const hours = gameTime.hours.toString().padStart(2, '0');
    const minutes = gameTime.minutes.toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }, [gameTime]);

  const formatGameDate = useCallback(() => {
    return '17.06';
  }, []);

  const isTimeReached = useCallback(
    (timestampOrDate: string) => {
      if (!isGameStarted) return false;

      // Parse time from timestamp/date string (format: "17.06, HH:MM")
      const timeMatch = timestampOrDate.match(/(\d{2}):(\d{2})/);
      if (!timeMatch) return false;

      const targetHours = parseInt(timeMatch[1]);
      const targetMinutes = parseInt(timeMatch[2]);

      const currentMinutes = gameTime.hours * 60 + gameTime.minutes;
      const targetTimeInMinutes = targetHours * 60 + targetMinutes;
      return currentMinutes >= targetTimeInMinutes;
    },
    [gameTime, isGameStarted]
  );

  useEffect(() => {
    if (!isGameStarted || isGameEnded || !gameStartTimestamp) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedRealTimeMs = now - gameStartTimestamp;

      // Calculate how many game minutes have passed
      // Each real second = TOTAL_GAME_MINUTES / (12 * 60) game minutes
      const gameMinutesElapsed =
        (elapsedRealTimeMs / 1000) * (TOTAL_GAME_MINUTES / (12 * 60));

      // Calculate current game time
      const totalMinutesFromStart =
        GAME_START_TIME.hours * 60 +
        GAME_START_TIME.minutes +
        gameMinutesElapsed;
      const currentHours = Math.floor(totalMinutesFromStart / 60) % 24;
      const currentMinutes = Math.floor(totalMinutesFromStart % 60);

      const newGameTime = { hours: currentHours, minutes: currentMinutes };

      // Check if game should end
      const endTimeInMinutes = GAME_END_TIME.hours * 60 + GAME_END_TIME.minutes;
      const currentTimeInMinutes = currentHours * 60 + currentMinutes;

      // Save state every 30 seconds of real time
      if (elapsedRealTimeMs - lastSaveTime >= SAVE_INTERVAL_MS) {
        setLastSaveTime(elapsedRealTimeMs);
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            isGameStarted: true,
            gameStartTimestamp,
            isGameEnded: false,
          })
        );
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
    formatGameDate,
    isTimeReached,
  };
}
