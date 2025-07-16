import React from 'react';
import { GlossaryTooltip } from './GlossaryTooltip';
import { glossaryTerms } from '@/data/glossary-terms';

interface GlossaryEnhancerProps {
  content: string;
  className?: string;
}

export function GlossaryEnhancer({ content, className = "" }: GlossaryEnhancerProps) {
  // Function to enhance text with glossary tooltips
  const enhanceTextWithGlossary = (text: string): React.ReactNode[] => {
    let processedText = text;
    const replacements: { original: string; placeholder: string; term: string }[] = [];
    
    // Sort terms by length (longest first) to avoid partial matches
    const sortedTerms = glossaryTerms
      .slice()
      .sort((a, b) => b.term.length - a.term.length);
    
    // Find all matches and create placeholders
    sortedTerms.forEach((term, termIndex) => {
      const regex = new RegExp(`\\b${term.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      const matches = Array.from(processedText.matchAll(regex));
      
      matches.forEach((match, matchIndex) => {
        if (match.index !== undefined) {
          const placeholder = `__GLOSSARY_${termIndex}_${matchIndex}__`;
          replacements.push({
            original: match[0],
            placeholder,
            term: term.term
          });
          processedText = processedText.replace(match[0], placeholder);
        }
      });
    });
    
    // Split text by placeholders and create React elements
    const parts = processedText.split(/(__GLOSSARY_\d+_\d+__)/);
    
    return parts.map((part, index) => {
      const replacement = replacements.find(r => r.placeholder === part);
      if (replacement) {
        return (
          <GlossaryTooltip key={index} term={replacement.term}>
            {replacement.original}
          </GlossaryTooltip>
        );
      }
      return part;
    });
  };

  return (
    <span className={className}>
      {enhanceTextWithGlossary(content)}
    </span>
  );
}