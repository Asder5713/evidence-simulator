import { useState, useEffect } from 'react';
import { Text } from '@/data/texts-data';

const STORAGE_KEY = 'selected-texts';

export const useTexts = () => {
  const [selectedTexts, setSelectedTexts] = useState<Text[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const texts = parsed.map((text: any) => ({
          ...text,
          productionDate: new Date(text.productionDate),
          incidentDate: new Date(text.incidentDate)
        }));
        setSelectedTexts(texts);
      } catch (error) {
        console.error('Failed to parse stored texts:', error);
      }
    }
  }, []);

  const addText = (text: Text) => {
    setSelectedTexts(prev => {
      const exists = prev.find(t => t.id === text.id);
      if (exists) return prev;
      
      const updated = [...prev, text];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeText = (id: string) => {
    setSelectedTexts(prev => {
      const updated = prev.filter(t => t.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isTextSelected = (id: string) => {
    return selectedTexts.some(t => t.id === id);
  };

  const clearAllTexts = () => {
    setSelectedTexts([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    selectedTexts,
    addText,
    removeText,
    isTextSelected,
    clearAllTexts
  };
};