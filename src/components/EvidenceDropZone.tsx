import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield } from "lucide-react";
import { Evidence } from "./EvidenceCard";

interface EvidenceDropZoneProps {
  type: 'suspicious' | 'calming';
  evidence: Evidence[];
  onDrop: (evidence: Evidence, type: 'suspicious' | 'calming') => void;
  title: string;
}

export function EvidenceDropZone({ type, evidence, onDrop, title }: EvidenceDropZoneProps) {
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
        {evidence.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center mb-3`}>
              {type === 'suspicious' ? (
                <AlertTriangle className={`w-6 h-6 ${iconColor}`} />
              ) : (
                <Shield className={`w-6 h-6 ${iconColor}`} />
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              גרור ראיות לכאן כדי לסווג אותן כ{type === 'suspicious' ? 'חשודות' : 'מרגיעות'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {evidence.map((item) => (
              <div key={item.id} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                <span className="text-sm">{item.title}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}