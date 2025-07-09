import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User, AlertTriangle, Building, FileText, Calendar } from "lucide-react";

export interface Evidence {
  id: string;
  title: string; // כותרת הראייה
  content: string; // תוכן הראייה
  type: 'physical' | 'digital' | 'witness' | 'document';
  issueDate: string; // תאריך ושעת הפקה
  incidentDate: string; // תאריך ושעת מקרה
  system: string; // מערך
  anomalyLevel: 'low' | 'medium' | 'high' | 'critical'; // רמת חריגות
  issuingUnit: string; // יחידה מנפיקה
  source: string; // מקור
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

const anomalyColors = {
  low: "bg-evidence-calming text-evidence-calming-foreground",
  medium: "bg-evidence-neutral text-evidence-neutral-foreground", 
  high: "bg-evidence-suspicious text-evidence-suspicious-foreground",
  critical: "bg-destructive text-destructive-foreground"
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
          <Badge className={anomalyColors[evidence.anomalyLevel]} variant="secondary">
            {evidence.anomalyLevel === 'critical' && <AlertTriangle className="w-3 h-3 mr-1" />}
            {evidence.anomalyLevel === 'high' && <AlertTriangle className="w-3 h-3 mr-1" />}
            {evidence.anomalyLevel}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {evidence.content}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span className="font-medium">תאריך הפקה:</span>
            </div>
            <p className="text-foreground">{evidence.issueDate}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span className="font-medium">תאריך מקרה:</span>
            </div>
            <p className="text-foreground">{evidence.incidentDate}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Building className="w-3 h-3" />
              <span className="font-medium">מערך:</span>
            </div>
            <p className="text-foreground">{evidence.system}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <User className="w-3 h-3" />
              <span className="font-medium">יחידה מנפיקה:</span>
            </div>
            <p className="text-foreground">{evidence.issuingUnit}</p>
          </div>

          <div className="col-span-2 space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <FileText className="w-3 h-3" />
              <span className="font-medium">מקור:</span>
            </div>
            <p className="text-foreground">{evidence.source}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}