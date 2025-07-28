import { useMemo } from 'react';
import { glossaryData, GlossaryTerm } from '../data/glossary-data';

export interface HighlightedWord {
  text: string;
  term?: GlossaryTerm;
  key: string;
}

export function useGlossary() {
  const termMap = useMemo(() => {
    const map = new Map<string, GlossaryTerm>();
    
    glossaryData.forEach(term => {
      // Add the main term
      map.set(term.term.toLowerCase(), term);
      
      // Add all synonyms
      term.synonyms.forEach(synonym => {
        map.set(synonym.toLowerCase(), term);
      });
    });
    
    return map;
  }, []);

  const processText = (text: string): HighlightedWord[] => {
    if (!text) return [{ text, key: 'empty' }];

    const words = text.split(/(\s+)/);
    const result: HighlightedWord[] = [];

    words.forEach((word, index) => {
      const cleanWord = word.toLowerCase().replace(/[.,!?;:"'()[\]{}]/g, '');
      const term = termMap.get(cleanWord);

      result.push({
        text: word,
        term: term && cleanWord.length > 0 ? term : undefined,
        key: `word-${index}`
      });
    });

    return result;
  };

  return {
    termMap,
    processText,
    glossaryData
  };
}