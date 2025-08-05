import { useState, useEffect } from 'react';
import { File } from '@/data/files-data';

const STORAGE_KEY = 'selected-files';

export const useFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const files = parsed.map((file: any) => ({
          ...file,
          productionDate: new Date(file.productionDate),
          incidentDate: new Date(file.incidentDate)
        }));
        setSelectedFiles(files);
      } catch (error) {
        console.error('Failed to parse stored files:', error);
      }
    }
  }, []);

  const addFile = (file: File) => {
    setSelectedFiles(prev => {
      const exists = prev.find(f => f.id === file.id);
      if (exists) return prev;
      
      const updated = [...prev, file];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFile = (id: string) => {
    setSelectedFiles(prev => {
      const updated = prev.filter(f => f.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isFileSelected = (id: string) => {
    return selectedFiles.some(f => f.id === id);
  };

  const clearAllFiles = () => {
    setSelectedFiles([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    selectedFiles,
    addFile,
    removeFile,
    isFileSelected,
    clearAllFiles
  };
};