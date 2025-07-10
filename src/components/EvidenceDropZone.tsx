import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Shield } from "lucide-react";
import { Evidence, EvidenceCard } from "./EvidenceCard";

interface EvidenceDropZoneProps {
  type: 'suspicious' | 'calming';
  evidence: Evidence[];
  onDrop: (evidence: Evidence, type: 'suspicious' | 'calming') => void;
  onReturn?: (evidence: Evidence) => void;
  title: string;
}

export function EvidenceDropZone({ type, evidence, onDrop, onReturn, title }: EvidenceDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const evidenceData = e.dataTransfer.getData('evidence');
    if (evidenceData) {
      const evidence: Evidence = JSON.parse(evidenceData);
      onDrop(evidence, type);
    }
  };

  const iconColor = type === 'suspicious' ? 'text-evidence-suspicious' : 'text-evidence-calming';
  const borderColor = type === 'suspicious' ? 'border-evidence-suspicious/30' : 'border-evidence-calming/30';
  const bgColor = type === 'suspicious' ? 'bg-evidence-suspicious/5' : 'bg-evidence-calming/5';

  return (
    <Card 
      className={`min-h-[300px] transition-all duration-200 ${borderColor} ${
        isDragOver ? `${bgColor} border-dashed scale-[1.02]` : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {type === 'suspicious' ? (
            <AlertTriangle className={`w-5 h-5 ${iconColor}`} />
          ) : (
            <Shield className={`w-5 h-5 ${iconColor}`} />
          )}
          {title}
          <Badge variant="outline" className="ml-auto">
            {evidence.length}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[calc(50vh-120px)] pl-4">
          <div className="space-y-3">
            {evidence.map((item) => (
              <EvidenceCard
                key={item.id}
                evidence={item}
                showReturnButton={true}
                onReturn={onReturn}
              />
            ))}
            {evidence.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  גרור ראיות לכאן כדי לסווג אותן כ{type === 'suspicious' ? 'חשודות' : 'מרגיעות'}
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}