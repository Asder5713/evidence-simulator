import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, Eye } from "lucide-react";
import { EvidenceCard, Evidence } from "./EvidenceCard";
import { EvidenceDropZone } from "./EvidenceDropZone";
import { EvidenceRatioMeter } from "./EvidenceRatioMeter";

// נתוני ראיות לדוגמה
const sampleEvidence: Evidence[] = [
  {
    id: "1",
    title: "טביעת אצבע על כלי הנשק",
    content: "טביעת אצבע ברורה נמצאה על הדק הרובה, תואמת לחשוד הראשי בצורה מושלמת",
    type: "physical",
    issueDate: "2024-01-16 09:30",
    incidentDate: "2024-01-15 14:30",
    system: "זיהוי פלילי",
    anomalyLevel: "critical",
    issuingUnit: "מעבדת משטרה מרכזית",
    source: "זירת הפשע - חדר השינה"
  },
  {
    id: "2", 
    title: "עדות שכנה על נוכחות החשוד",
    content: "השכנה מעידה שראתה את החשוד עוזב את הבניין בשעות הערב עם תיק חשוד",
    type: "witness",
    issueDate: "2024-01-16 08:15",
    incidentDate: "2024-01-15 20:15",
    system: "חקירות",
    anomalyLevel: "medium",
    issuingUnit: "תחנת משטרה מרכז",
    source: "דירה 4א - עדה ראשית"
  },
  {
    id: "3",
    title: "אליבי מוכח ממצלמות אבטחה",
    content: "תמונות ממצלמות אבטחה מראות את החשוד במקום אחר בזמן הפשע בצורה ברורה",
    type: "digital",
    issueDate: "2024-01-16 10:45",
    incidentDate: "2024-01-15 14:25",
    system: "מצלמות אבטחה",
    anomalyLevel: "low",
    issuingUnit: "יחידת טכנולוגיות",
    source: "קניון עזריאלי - מערכת אבטחה"
  },
  {
    id: "4",
    title: "הודעות טקסט מאיימות",
    content: "סדרה של הודעות מאיימות נשלחו מהטלפון של החשוד לקורבן שעות לפני הרצח",
    type: "digital",
    issueDate: "2024-01-16 07:20",
    incidentDate: "2024-01-14 22:30",
    system: "תקשורת דיגיטלית",
    anomalyLevel: "high",
    issuingUnit: "יחידת סייבר",
    source: "טלפון נייד - רשת סלולרית"
  },
  {
    id: "5",
    title: "תוצאות בדיקת פוליגרף חיובי",
    content: "החשוד עבר בהצלחה בדיקת פוליגרף ללא סימני שקר או מתח במהלך החקירה",
    type: "document",
    issueDate: "2024-01-16 11:30",
    incidentDate: "2024-01-16 10:00",
    system: "בדיקות פסיכולוגיות",
    anomalyLevel: "low",
    issuingUnit: "יחידה פסיכולוגית",
    source: "תחנת המשטרה - חדר חקירות"
  },
  {
    id: "6",
    title: "כתמי דם על בגדי החשוד",
    content: "כתמי דם נמצאו על חולצת החשוד, בדיקות DNA מצביעות על התאמה לקורבן",
    type: "physical",
    issueDate: "2024-01-16 13:15",
    incidentDate: "2024-01-16 08:45",
    system: "זיהוי פלילי",
    anomalyLevel: "critical",
    issuingUnit: "מעבדת DNA",
    source: "דירת החשוד - חדר הכביסה"
  },
  {
    id: "7",
    title: "רישומים רפואיים נקיים",
    content: "החשוד מטופל בתרופות נוגדות דיכאון וללא היסטוריה של אלימות או התפרצויות",
    type: "document",
    issueDate: "2024-01-16 14:20",
    incidentDate: "2024-01-16 11:20",
    system: "רפואי",
    anomalyLevel: "low",
    issuingUnit: "קופת חולים כללית",
    source: "מערכת רפואית ממוחשבת"
  },
  {
    id: "8",
    title: "מוטיב כלכלי מוכח",
    content: "החשוד היה חייב לקורבן סכום כסף גדול של 500,000 ש״ח שלא החזיר במועד",
    type: "document",
    issueDate: "2024-01-16 12:40",
    incidentDate: "2024-01-12 00:00",
    system: "כלכלי",
    anomalyLevel: "high",
    issuingUnit: "יחידת כלכלה",
    source: "רישומי בנק לאומי"
  }
];

export function CrimeInvestigation() {
  const [availableEvidence, setAvailableEvidence] = useState<Evidence[]>(sampleEvidence);
  const [suspiciousEvidence, setSuspiciousEvidence] = useState<Evidence[]>([]);
  const [calmingEvidence, setCalmingEvidence] = useState<Evidence[]>([]);
  const [draggedEvidence, setDraggedEvidence] = useState<Evidence | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, evidence: Evidence) => {
    setDraggedEvidence(evidence);
    e.dataTransfer.setData('evidence', JSON.stringify(evidence));
  };

  const handleDrop = (evidence: Evidence, type: 'suspicious' | 'calming') => {
    // הסר את הראיה מהרשימה הזמינה
    setAvailableEvidence(prev => prev.filter(item => item.id !== evidence.id));
    
    // הוסף את הראיה לקטגוריה המתאימה
    if (type === 'suspicious') {
      setSuspiciousEvidence(prev => [...prev, { ...evidence, category: 'suspicious' }]);
    } else {
      setCalmingEvidence(prev => [...prev, { ...evidence, category: 'calming' }]);
    }
    
    setDraggedEvidence(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            חקירת פשע - מעבדת ראיות
          </h1>
          <p className="text-muted-foreground">
            סווג את הראיות על מנת לקבוע את רמת החשד בפשע
          </p>
        </div>

        {/* Evidence Ratio Meter */}
        <div className="max-w-md mx-auto">
          <EvidenceRatioMeter 
            suspiciousCount={suspiciousEvidence.length}
            calmingCount={calmingEvidence.length}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Drop Zones - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            <EvidenceDropZone
              type="suspicious"
              evidence={suspiciousEvidence}
              onDrop={handleDrop}
              title="ראיות חשודות"
            />
            
            <EvidenceDropZone
              type="calming"
              evidence={calmingEvidence}
              onDrop={handleDrop}
              title="ראיות מרגיעות"
            />
          </div>

          {/* Available Evidence - Right Side */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                ראיות זמינות
                <Badge variant="outline" className="ml-auto">
                  {availableEvidence.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-3">
                  {availableEvidence.map((evidence) => (
                    <EvidenceCard
                      key={evidence.id}
                      evidence={evidence}
                      onDragStart={handleDragStart}
                    />
                  ))}
                  {availableEvidence.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">כל הראיות סווגו</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Investigation Summary */}
        <Card>
          <CardHeader>
            <CardTitle>סיכום החקירה</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">סה"כ ראיות</p>
                <p className="text-3xl font-bold">{sampleEvidence.length}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">ראיות מסווגות</p>
                <p className="text-3xl font-bold text-primary">
                  {suspiciousEvidence.length + calmingEvidence.length}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">דיוק הסיווג</p>
                <p className="text-3xl font-bold text-accent">
                  {sampleEvidence.length > 0 
                    ? Math.round(((suspiciousEvidence.length + calmingEvidence.length) / sampleEvidence.length) * 100)
                    : 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}