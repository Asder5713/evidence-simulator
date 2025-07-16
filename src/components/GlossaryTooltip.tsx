import { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { glossaryTerms } from '@/data/glossary-terms';

interface GlossaryTooltipProps {
  children: React.ReactNode;
  term: string;
}

export function GlossaryTooltip({ children, term }: GlossaryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const glossaryTerm = glossaryTerms.find(
    item => item.term.toLowerCase() === term.toLowerCase()
  );

  if (!glossaryTerm) {
    return <>{children}</>;
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'אנשים': return 'bg-blue-900/60 text-blue-200 border-blue-700';
      case 'ארגונים': return 'bg-red-900/60 text-red-200 border-red-700';
      case 'פעילות פלילית': return 'bg-orange-900/60 text-orange-200 border-orange-700';
      case 'מיקומים': return 'bg-green-900/60 text-green-200 border-green-700';
      case 'מונחים טכניים': return 'bg-purple-900/60 text-purple-200 border-purple-700';
      case 'יחידות': return 'bg-yellow-900/60 text-yellow-200 border-yellow-700';
      case 'מדינות': return 'bg-pink-900/60 text-pink-200 border-pink-700';
      default: return 'bg-slate-900/60 text-slate-200 border-slate-700';
    }
  };

  return (
    <HoverCard open={isOpen} onOpenChange={setIsOpen}>
      <HoverCardTrigger asChild>
        <span 
          className="underline decoration-dotted decoration-blue-400/60 cursor-help hover:decoration-blue-400 transition-colors"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-80 bg-slate-800/95 border-slate-700/50 backdrop-blur-sm" 
        side="top"
        sideOffset={5}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-slate-100">{glossaryTerm.term}</h4>
            {glossaryTerm.category && (
              <Badge className={`text-xs ${getCategoryColor(glossaryTerm.category)}`}>
                {glossaryTerm.category}
              </Badge>
            )}
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {glossaryTerm.definition}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

// Hook to automatically wrap terms in content
export function useGlossaryWrapper(content: string): JSX.Element {
  let processedContent = content;
  
  // Sort terms by length (longest first) to avoid partial matches
  const sortedTerms = glossaryTerms
    .slice()
    .sort((a, b) => b.term.length - a.term.length);
  
  // Create a map of replacements to avoid nested replacements
  const replacements: { original: string; replacement: string; key: string }[] = [];
  
  sortedTerms.forEach((term, index) => {
    const regex = new RegExp(`\\b${term.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    const matches = content.match(regex);
    
    if (matches) {
      matches.forEach((match, matchIndex) => {
        const key = `GLOSSARY_TERM_${index}_${matchIndex}`;
        replacements.push({
          original: match,
          replacement: key,
          key
        });
      });
    }
  });
  
  // Apply replacements
  replacements.forEach(({ original, replacement }) => {
    processedContent = processedContent.replace(original, replacement);
  });
  
  // Convert back to JSX elements
  const parts = processedContent.split(/(GLOSSARY_TERM_\d+_\d+)/);
  
  return (
    <>
      {parts.map((part, index) => {
        const replacement = replacements.find(r => r.key === part);
        if (replacement) {
          return (
            <GlossaryTooltip key={index} term={replacement.original}>
              {replacement.original}
            </GlossaryTooltip>
          );
        }
        return part;
      })}
    </>
  );
}