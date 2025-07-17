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
    console.log('Notifications effect triggered. Game started:', isGameStarted);
    if (!isGameStarted) {
      console.log('Game not started, returning early');
      return;
    }

    // Clear notifications on game start to prevent old notifications
    notifiedItems.current.clear();
    console.log('Cleared notified items on game start');

    const checkForNewEvidence = () => {
      console.log('=== Checking for new evidence ===');
      console.log('Current notified items count:', notifiedItems.current.size);
      console.log('Current notified items:', Array.from(notifiedItems.current));
      
      let newEvidenceFound = 0;
      
      evidence.forEach(item => {
        const timeReached = isTimeReached(`${item.production_date} ${item.production_time}`);
        const alreadyNotified = notifiedItems.current.has(item.id);
        
        console.log(`Evidence ${item.id}:`, {
          title: item.title,
          time: `${item.production_date} ${item.production_time}`,
          timeReached,
          alreadyNotified
        });
        
        if (timeReached && !alreadyNotified) {
          console.log('🚨 SHOWING NOTIFICATION FOR:', item.id, item.title);
          notifiedItems.current.add(item.id);
          newEvidenceFound++;
          
          const handleClick = () => {
            console.log('Toast clicked, navigating to:', getPageRoute(item.news_type));
            navigate(getPageRoute(item.news_type));
          };

          toast({
            title: `${getTypeLabel(item.news_type)} חדש`,
            description: `${item.title} - לחץ לניווט`,
            duration: 8000,
            onClick: handleClick,
            className: "cursor-pointer hover:bg-accent/80 transition-colors"
          });
        }
      });
      
      console.log(`Found ${newEvidenceFound} new evidence items`);
      console.log('Updated notified items count:', notifiedItems.current.size);
    };

    // Check immediately and then every 10 seconds for more frequent updates
    console.log('Starting evidence checking...');
    checkForNewEvidence();
    const interval = setInterval(checkForNewEvidence, 10000);

    return () => {
      console.log('Cleaning up notifications effect');
      clearInterval(interval);
    };
  }, [isGameStarted]); // Removed dependencies that change frequently
};