import { useState, useEffect } from 'react';
import { Email } from '@/data/emails-data';

const STORAGE_KEY = 'selected-emails';

export const useEmails = () => {
  const [selectedEmails, setSelectedEmails] = useState<Email[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const emails = parsed.map((email: any) => ({
          ...email,
          productionDate: new Date(email.productionDate)
        }));
        setSelectedEmails(emails);
      } catch (error) {
        console.error('Failed to parse stored emails:', error);
      }
    }
  }, []);

  const addEmail = (email: Email) => {
    setSelectedEmails(prev => {
      const exists = prev.find(e => e.id === email.id);
      if (exists) return prev;
      
      const updated = [...prev, email];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeEmail = (id: string) => {
    setSelectedEmails(prev => {
      const updated = prev.filter(e => e.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isEmailSelected = (id: string) => {
    return selectedEmails.some(e => e.id === id);
  };

  const clearAllEmails = () => {
    setSelectedEmails([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    selectedEmails,
    addEmail,
    removeEmail,
    isEmailSelected,
    clearAllEmails
  };
};