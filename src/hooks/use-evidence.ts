import { useState, useEffect } from 'react';
import { Evidence } from '@/types/evidence';

const STORAGE_KEY = 'selected-evidence';

export const useEvidence = () => {
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSelectedEvidence(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse stored evidence:', error);
      }
    }
  }, []);

  const addEvidence = (evidence: Evidence) => {
    setSelectedEvidence(prev => {
      const exists = prev.find(e => e.id === evidence.id);
      if (exists) return prev;
      
      const updated = [...prev, evidence];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeEvidence = (id: string) => {
    setSelectedEvidence(prev => {
      const updated = prev.filter(e => e.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isEvidenceSelected = (id: string) => {
    return selectedEvidence.some(e => e.id === id);
  };

  const clearAllEvidence = () => {
    setSelectedEvidence([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    selectedEvidence,
    addEvidence,
    removeEvidence,
    isEvidenceSelected,
    clearAllEvidence
  };
};