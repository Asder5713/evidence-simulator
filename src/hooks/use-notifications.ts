import React, { useEffect, useRef } from 'react';
import { useGameContext } from '@/contexts/GameContext';
import { evidence } from '@/data/evidence-data';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { ToastAction } from '@/components/ui/toast';

export const useNotifications = () => {
  const { isGameStarted, isTimeReached } = useGameContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const notifiedItems = useRef<Set<string>>(new Set());

  const getPageRoute = (newsType: string) => {
    if (newsType === 'email') return '/emails';
    if (['intelligence', 'dispatch', 'investigation', 'forensics', 'command'].includes(newsType)) return '/text-messages';
    if (['image', 'video', 'audio'].includes(newsType)) return '/visual-evidence';
    return '/';
  };

  const getTypeLabel = (newsType: string) => {
    switch (newsType) {
      case 'email': return 'אימייל';
      case 'intelligence': return 'מודיעין';
      case 'dispatch': return 'מוקד';
      case 'investigation': return 'חקירה';
      case 'forensics': return 'זיהוי פלילי';
      case 'command': return 'פיקוד';
      case 'image': return 'תמונה';
      case 'video': return 'וידיאו';
      case 'audio': return 'הקלטה';
      default: return 'ידיעה';
    }
  };

  useEffect(() => {
    if (!isGameStarted) return;

    // Clear notifications on game start to prevent old notifications
    notifiedItems.current.clear();

    console.log('Setting up notifications effect');

    const checkForNewEvidence = () => {
      console.log('Checking for new evidence, notified items:', notifiedItems.current.size);
      evidence.forEach(item => {
        const timeReached = isTimeReached(`${item.production_date} ${item.production_time}`);
        const alreadyNotified = notifiedItems.current.has(item.id);
        
        if (timeReached && !alreadyNotified) {
          console.log('Showing notification for:', item.id, item.title);
          notifiedItems.current.add(item.id);
          
          const handleClick = () => {
            navigate(getPageRoute(item.news_type));
          };

          const toastElement = document.createElement('div');
          toastElement.style.cursor = 'pointer';
          toastElement.onclick = handleClick;
          
          toast({
            title: `${getTypeLabel(item.news_type)} חדש`,
            description: `${item.title} - לחץ לניווט`,
            duration: 8000,
            onClick: handleClick,
            className: "cursor-pointer hover:bg-accent/80 transition-colors"
          });
        }
      });
    };

    // Check immediately and then every 30 seconds
    checkForNewEvidence();
    const interval = setInterval(checkForNewEvidence, 30000);

    return () => {
      console.log('Cleaning up notifications effect');
      clearInterval(interval);
    };
  }, [isGameStarted]); // Removed dependencies that change frequently
};