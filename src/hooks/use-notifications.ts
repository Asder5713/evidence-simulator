import { useEffect, useRef } from 'react';
import { useGameContext } from '@/contexts/GameContext';
import { emailsData } from '@/data/emails-data';
import { textsData } from '@/data/texts-data';
import { filesData } from '@/data/files-data';
import { emailToEvidence, textToEvidence, fileToEvidence } from '@/types/evidence';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const useNotifications = () => {
  const { isGameStarted, isTimeReached } = useGameContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const notifiedItems = useRef<Set<string>>(new Set());

  const getPageRoute = (type: 'email' | 'text' | 'file') => {
    if (type === 'email') return '/emails';
    if (type === 'text') return '/text-messages';
    if (type === 'file') return '/visual-evidence';
    return '/';
  };

  const getTypeLabel = (type: 'email' | 'text' | 'file') => {
    switch (type) {
      case 'email':
        return 'אימייל';
      case 'text':
        return 'הודעה';
      case 'file':
        return 'קובץ';
      default:
        return 'ידיעה';
    }
  };

  useEffect(() => {
    if (!isGameStarted) return;

    const checkForNewEvidence = () => {
      // Check emails
      emailsData.forEach(item => {
        if (
          isTimeReached(item.productionDate.toLocaleString('he-IL')) &&
          !notifiedItems.current.has(item.id)
        ) {
          notifiedItems.current.add(item.id);

          const handleClick = () => {
            navigate(getPageRoute('email'));
          };

          toast({
            title: `${getTypeLabel('email')} חדש`,
            description: item.title,
            duration: 4000,
            onClick: handleClick,
            className: 'cursor-pointer hover:bg-accent transition-colors',
          });
        }
      });

      // Check texts
      textsData.forEach(item => {
        if (
          isTimeReached(item.productionDate.toLocaleString('he-IL')) &&
          !notifiedItems.current.has(item.id)
        ) {
          notifiedItems.current.add(item.id);

          const handleClick = () => {
            navigate(getPageRoute('text'));
          };

          toast({
            title: `${getTypeLabel('text')} חדש`,
            description: item.title,
            duration: 4000,
            onClick: handleClick,
            className: 'cursor-pointer hover:bg-accent transition-colors',
          });
        }
      });

      // Check files
      filesData.forEach(item => {
        if (
          isTimeReached(item.productionDate.toLocaleString('he-IL')) &&
          !notifiedItems.current.has(item.id)
        ) {
          notifiedItems.current.add(item.id);

          const handleClick = () => {
            navigate(getPageRoute('file'));
          };

          toast({
            title: `${getTypeLabel('file')} חדש`,
            description: item.title,
            duration: 4000,
            onClick: handleClick,
            className: 'cursor-pointer hover:bg-accent transition-colors',
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
