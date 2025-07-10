import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, Eye } from "lucide-react";
import { EvidenceCard, Evidence } from "./EvidenceCard";
import { EvidenceDropZone } from "./EvidenceDropZone";
import { VerticalThreatMeter } from "./VerticalThreatMeter";

// נתוני ראיות לדוגמה
const sampleEvidence: Evidence[] = [
  {
    id: "1",
    title: "טביעת אצבע על כלי הנשק",
    content: "טביעת אצבע ברורה נמצאה על הדק הרובה, תואמת לחשוד הראשי בצורה מושלמת. הטביעה נמצאה במצב שמור ובמיקום שמעיד על אחיזה מכוונת של הנשק. בדיקות מעבדה מצביעות על התאמה של 99.8% לטביעות האצבע של החשוד הראשי.",
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
    content: "השכנה מעידה שראתה את החשוד עוזב את הבניין בשעות הערב עם תיק חשוד. לדבריה, החשוד נראה מתוח ולחוץ, והסתכל מסביב בחשש לפני שעזב. העדה מכירה את החשוד כשכן מזה שנים ולא ראתה אותו בהתנהגות דומה בעבר. התיק שנשא היה גדול ונראה כבד.",
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
    content: { type: "video", data: "/placeholder-video.mp4" },
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
    content: { type: "image", data: "/placeholder.svg" },
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
    content: { 
      type: "audio", 
      data: "/placeholder-audio.mp3",
      callOriginator: "יוסי כהן (חשוד)",
      callReceiver: "דני לוי (קורבן)"
    },
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
    content: "כתמי דם נמצאו על חולצת החשוד, בדיקות DNA מצביעות על התאמה לקורבן. הכתמים נמצאו בדפוס התזה שמעיד על נוכחות במקום האירוע. ריכוז הדם והמיקום על הבגד מצביעים על מעורבות ישירה באקט האלימות. בדיקות נוספות גילו גם שרידי רקמה שתואמות לקורבן.",
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
    content: "החשוד מטופל בתרופות נוגדות דיכאון וללא היסטוריה של אלימות או התפרצויות. הרישומים הרפואיים מראים טיפול קבוע ומסודר במשך השנים האחרונות. הרופא המטפל מעיד על יציבות נפשית וחוסר נטיות אלימות. החשוד עבר בדיקות פסיכולוגיות תקופתיות עם תוצאות תקינות.",
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
    content: "החשוד היה חייב לקורבן סכום כסף גדול של 500,000 ש״ח שלא החזיר במועד. החוב נוצר מעסקת נדלן שכשלה לפני כשנה. הקורבן הפעיל לחץ משפטי על החשוד בשבועות האחרונים וביקש את החזר הכסף מיידית. תיעוד בנקאי מראה שהחשוד נמצא במצוקה כלכלית חמורה ולא יכול היה להחזיר את הסכום.",
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

  const handleReturn = (evidence: Evidence, fromType: 'suspicious' | 'calming') => {
    // הסר את הראיה מהקטגוריה הנוכחית
    if (fromType === 'suspicious') {
      setSuspiciousEvidence(prev => prev.filter(item => item.id !== evidence.id));
    } else {
      setCalmingEvidence(prev => prev.filter(item => item.id !== evidence.id));
    }
    
    // החזר את הראיה לרשימה הזמינה
    setAvailableEvidence(prev => [...prev, { ...evidence, category: null }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="flex h-screen">
        {/* Vertical Threat Meter - Far Left */}
        <VerticalThreatMeter
          suspiciousCount={suspiciousEvidence.length}
          calmingCount={calmingEvidence.length}
          totalEvidenceCount={sampleEvidence.length}
        />

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              חקירת פשע - מעבדת ראיות
            </h1>
            <p className="text-muted-foreground">
              סווג את הראיות על מנת לקבוע את רמת החשד בפשע
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 h-[calc(100vh-180px)]">
            {/* Drop Zones - Left Side */}
            <div className="col-span-2 space-y-6">
              <EvidenceDropZone
                type="calming"
                evidence={calmingEvidence}
                onDrop={handleDrop}
                onReturn={(evidence) => handleReturn(evidence, 'calming')}
                title="ראיות מרגיעות"
              />
              
              <EvidenceDropZone
                type="suspicious"
                evidence={suspiciousEvidence}
                onDrop={handleDrop}
                onReturn={(evidence) => handleReturn(evidence, 'suspicious')}
                title="ראיות חשודות"
              />
            </div>

            {/* Available Evidence - Right Side */}
            <Card className="col-span-1">
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
                <ScrollArea className="h-[calc(100vh-280px)] pl-4">
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
        </div>
      </div>
    </div>
  );
}