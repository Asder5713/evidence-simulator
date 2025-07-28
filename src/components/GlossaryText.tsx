import { useGlossary } from '../hooks/use-glossary';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface GlossaryTextProps {
  text: string;
  className?: string;
}

export function GlossaryText({ text, className = '' }: GlossaryTextProps) {
  const { processText } = useGlossary();
  const words = processText(text);
  
  return (
    <TooltipProvider>
      <span className={className}>
        {words.map(({ text: wordText, term, key }) => {
          if (term) {
            return (
              <Tooltip key={key}>
                <TooltipTrigger asChild>
                  <span className="bg-primary/20 text-primary font-medium rounded-sm px-1 cursor-help border-b border-primary/40 hover:bg-primary/30 hover:border-primary/60 transition-all duration-200 underline decoration-dotted decoration-primary/50 underline-offset-2">
                    {wordText}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs p-3 bg-gradient-to-br from-slate-800 to-slate-900 border border-primary/30 shadow-xl">
                  <div className="space-y-1">
                    <p className="font-semibold text-primary text-sm">{term.term}</p>
                    <p className="text-slate-200 text-xs leading-relaxed">{term.definition}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          }
          return <span key={key}>{wordText}</span>;
        })}
      </span>
    </TooltipProvider>
  );
}