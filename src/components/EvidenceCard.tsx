import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, User, AlertTriangle, Building, FileText, Calendar, ArrowRight, Play, Image, Volume2, Video } from "lucide-react";

export interface Evidence {
  id: string;
  title: string; // כותרת הראייה
  content: string | { 
    type: 'text' | 'image' | 'audio' | 'video'; 
    data: string;
    callOriginator?: string; // עבור אודיו - מוציא שיחה
    callReceiver?: string; // עבור אודיו - מקבל שיחה
  }; // תוכן הראייה
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
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, evidence: Evidence) => void;
  onReturn?: (evidence: Evidence) => void;
  showReturnButton?: boolean;
  isCondensed?: boolean; // תצוגה מקוצרת לראיות מוינות
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

export function EvidenceCard({ evidence, onDragStart, onReturn, showReturnButton = false, isCondensed = false }: EvidenceCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  const getContentTypeLabel = () => {
    if (typeof evidence.content === 'string') {
      return 'טקסט';
    }
    
    const contentData = evidence.content as { type: 'text' | 'image' | 'audio' | 'video'; data: string };
    
    switch (contentData.type) {
      case 'image': return 'תמונה';
      case 'audio': return 'קובץ שמע';
      case 'video': return 'וידיאו';
      default: return 'טקסט';
    }
  };

  const renderContent = () => {
    if (typeof evidence.content === 'string') {
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="w-4 h-4" />
            <span>טקסט</span>
          </div>
          <p className="text-sm text-muted-foreground">{evidence.content}</p>
        </div>
      );
    }

    const contentData = evidence.content as { type: 'text' | 'image' | 'audio' | 'video'; data: string };
    
    switch (contentData.type) {
      case 'image':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Image className="w-4 h-4" />
              <span>תמונה</span>
            </div>
            <img src={contentData.data} alt="תמונת ראיה" className="w-full h-32 object-cover rounded-md cursor-pointer" />
          </div>
        );
      case 'audio':
        const audioData = contentData as { type: 'audio'; data: string; callOriginator?: string; callReceiver?: string };
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Volume2 className="w-4 h-4" />
              <span>קובץ שמע</span>
            </div>
            
            {/* פרטי שיחה אם קיימים */}
            {(audioData.callOriginator || audioData.callReceiver) && (
              <div className="bg-muted/50 p-3 rounded-lg border space-y-2">
                {audioData.callOriginator && (
                  <div className="text-sm">
                    <span className="font-medium text-muted-foreground">מוציא שיחה: </span>
                    <span className="text-foreground">{audioData.callOriginator}</span>
                  </div>
                )}
                {audioData.callReceiver && (
                  <div className="text-sm">
                    <span className="font-medium text-muted-foreground">מקבל שיחה: </span>
                    <span className="text-foreground">{audioData.callReceiver}</span>
                  </div>
                )}
              </div>
            )}
            
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
              <audio controls className="w-full [&::-webkit-media-controls-panel]:bg-slate-800 [&::-webkit-media-controls-play-button]:filter-invert">
                <source src={audioData.data} type="audio/mpeg" />
              </audio>
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Video className="w-4 h-4" />
              <span>קובץ וידיאו</span>
            </div>
            <video controls className="w-full h-32 object-cover rounded-md">
              <source src={contentData.data} type="video/mp4" />
            </video>
          </div>
        );
      default:
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>טקסט</span>
            </div>
            <p className="text-sm text-muted-foreground">{contentData.data}</p>
          </div>
        );
    }
  };

  // תצוגה מקוצרת לראיות מוינות - שורה אחת
  if (isCondensed) {
    return (
      <div className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
        evidence.category === 'suspicious' ? 'border-evidence-suspicious/50 bg-evidence-suspicious/5' : 
        evidence.category === 'calming' ? 'border-evidence-calming/50 bg-evidence-calming/5' : 'border-border'
      }`}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-base">{typeIcons[evidence.type]}</span>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium truncate">{evidence.title}</h3>
            <div className="text-xs text-muted-foreground">
              {getContentTypeLabel()} • {evidence.issueDate}
            </div>
          </div>
        </div>

        {showReturnButton && onReturn && (
          <Button 
            onClick={() => onReturn(evidence)}
            variant="ghost"
            size="sm"
            className="shrink-0 w-8 h-8 p-0"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card 
      className={`transition-all duration-200 hover:shadow-lg ${
        isDragging ? 'opacity-50 scale-95' : ''
      } ${evidence.category === 'suspicious' ? 'border-evidence-suspicious/50' : 
           evidence.category === 'calming' ? 'border-evidence-calming/50' : 'border-border'} ${
        onDragStart ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
      draggable={!!onDragStart}
      onDragStart={onDragStart ? (e) => {
        setIsDragging(true);
        onDragStart(e, evidence);
      } : undefined}
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
        {renderContent()}

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

        {showReturnButton && onReturn && (
          <div className="pt-3 border-t border-border">
            <Button 
              onClick={() => onReturn(evidence)}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <ArrowRight className="w-3 h-3 ml-1" />
              החזר לראיות זמינות
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}