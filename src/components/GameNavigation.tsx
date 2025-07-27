import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGameContext } from '@/contexts/GameContext';

export function GameNavigation() {
  const { isGameStarted } = useGameContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If game is not started and we're not already on the overview page, navigate to overview
    if (
      !isGameStarted &&
      location.pathname !== '/overview' &&
      location.pathname !== '/'
    ) {
      navigate('/overview');
    }
  }, [isGameStarted, navigate, location.pathname]);

  return null; // This component doesn't render anything
}
