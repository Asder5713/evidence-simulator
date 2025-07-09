import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User, AlertTriangle } from "lucide-react";

export interface Evidence {
  id: string;
  title: string;
  description: string;
  type: 'physical' | 'digital' | 'witness' | 'document';
  location?: string;
  timestamp?: string;
  severity?: 'low' | 'medium' | 'high';
  category?: 'suspicious' | 'calming' | null;
}

interface EvidenceCardProps {
  evidence: Evidence;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, evidence: Evidence) => void;
}

const typeIcons = {
  physical: "🔍",
  digital: "💻",
  witness: "👤",
  document: "📄"
};

const severityColors = {
  low: "bg-evidence-calming text-evidence-calming-foreground",
  medium: "bg-evidence-neutral text-evidence-neutral-foreground", 
  high: "bg-evidence-suspicious text-evidence-suspicious-foreground"
};

export function EvidenceCard({ evidence, onDragStart }: EvidenceCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Card 
      className={`cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-lg ${
        isDragging ? 'opacity-50 scale-95' : ''
      } ${evidence.category === 'suspicious' ? 'border-evidence-suspicious/50' : 
           evidence.category === 'calming' ? 'border-evidence-calming/50' : 'border-border'}`}
      draggable
      onDragStart={(e) => {
        setIsDragging(true);
        onDragStart(e, evidence);
      }}
      onDragEnd={() => setIsDragging(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{typeIcons[evidence.type]}</span>
            <CardTitle className="text-sm font-medium">{evidence.title}</CardTitle>
          </div>
          {evidence.severity && (
            <Badge className={severityColors[evidence.severity]} variant="secondary">
              {evidence.severity === 'high' && <AlertTriangle className="w-3 h-3 mr-1" />}
              {evidence.severity}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {evidence.description}
        </p>

        <div className="space-y-1">
          {evidence.location && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{evidence.location}</span>
            </div>
          )}
          
          {evidence.timestamp && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{evidence.timestamp}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}