import { useGlossary } from '../hooks/use-glossary';

interface GlossaryTextProps {
  text: string;
  className?: string;
}

export function GlossaryText({ text, className = '' }: GlossaryTextProps) {
  const { processText } = useGlossary();
  const words = processText(text);
  
  return (
    <span className={className}>
      {words.map(({ text: wordText, term, key }) => {
        if (term) {
          return (
            <span
              key={key}
              className="bg-primary/20 text-primary font-medium rounded px-1 cursor-help border-b border-primary/30 hover:bg-primary/30 transition-colors"
              title={`${term.term}: ${term.definition}`}
            >
              {wordText}
            </span>
          );
        }
        return <span key={key}>{wordText}</span>;
      })}
    </span>
  );
}