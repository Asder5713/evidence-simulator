import React, { useEffect, useRef } from 'react';
import { useGameContext } from '@/contexts/GameContext';
import { evidence } from '@/data/evidence-data';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

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

    const checkForNewEvidence = () => {
      evidence.forEach(item => {
        if (
          isTimeReached(`${item.production_date} ${item.production_time}`) &&
          !notifiedItems.current.has(item.id)
        ) {
          notifiedItems.current.add(item.id);
          
          const handleNavigate = () => {
            navigate(getPageRoute(item.news_type));
          };

          toast({
            title: `${getTypeLabel(item.news_type)} חדש`,
            description: `${item.title} - לחץ לצפייה`,
            duration: 10000,
            onClick: handleNavigate,
            className: "cursor-pointer hover:bg-accent/50 transition-colors"
          });
        }
      });
    };

    // Check immediately and then every 30 seconds
    checkForNewEvidence();
    const interval = setInterval(checkForNewEvidence, 30000);

    return () => clearInterval(interval);
  }, [isGameStarted, isTimeReached, toast, navigate]);
};