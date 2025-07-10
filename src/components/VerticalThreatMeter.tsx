import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertTriangle, Shield, Scale, FileText } from "lucide-react";
import { ReportForm } from "./ReportForm";

interface VerticalThreatMeterProps {
  suspiciousCount: number;
  calmingCount: number;
  totalEvidenceCount: number;
}

export function VerticalThreatMeter({ suspiciousCount, calmingCount, totalEvidenceCount }: VerticalThreatMeterProps) {
  const totalCount = suspiciousCount + calmingCount;
  const suspiciousRatio = totalCount > 0 ? (suspiciousCount / totalCount) * 100 : 0;
  const calmingRatio = totalCount > 0 ? (calmingCount / totalCount) * 100 : 0;
  
  // בדיקה אם כל הראיות מוינו
  const allEvidenceSorted = totalCount === totalEvidenceCount;
  
  // בדיקה אם יש וודאות של 80% לאחד מהצדדים
  const hasHighConfidence = suspiciousRatio >= 80 || calmingRatio >= 80;
  
  // הכפתור מופעל רק אם כל הראיות מוינו (ללא תלות בוודאות)
  const canReport = allEvidenceSorted;

  // חישוב מיקום המד (0 = מרכז, חיובי = מרגיע, שלילי = חשוד)
  const meterPosition = calmingRatio - suspiciousRatio; // -100 עד 100 (מרגיע חיובי, חשוד שלילי)
  const meterPercentage = 50 + (meterPosition / 2); // המרה ל0-100% למיקום ויזואלי

  const getThreatLevel = () => {
    if (Math.abs(meterPosition) < 20) return { level: 'ניטרלי', color: 'text-muted-foreground' };
    if (meterPosition > 60) return { level: 'נמוך', color: 'text-evidence-calming' };
    if (meterPosition > 20) return { level: 'בינוני נמוך', color: 'text-evidence-calming' };
    if (meterPosition < -60) return { level: 'גבוה', color: 'text-evidence-suspicious' };
    if (meterPosition < -20) return { level: 'בינוני', color: 'text-orange-500' };
    return { level: 'ניטרלי', color: 'text-muted-foreground' };
  };

  const threatLevel = getThreatLevel();

  const getTooltipMessage = () => {
    if (!allEvidenceSorted) {
      return "עליך למיין את שאר הראיות";
    }
    if (!hasHighConfidence) {
      return "נדרשת וודאות של 80% לפחות לאחד מהצדדים";
    }
    return "";
  };

  return (
    <div className="w-16 h-full flex flex-col items-center py-4 bg-card border-l border-border">
      {/* כותרת */}
      <div className="text-xs font-medium text-center mb-2">
        מד איום
      </div>

      {/* תווית עליונה */}
      <div className="text-xs text-evidence-calming font-medium mb-2">מרגיע</div>

      {/* המד הוורטיקלי */}
      <div className="flex-1 w-6 relative bg-muted rounded-full">
        {/* רקע הדרגתי */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-evidence-calming via-muted to-evidence-suspicious opacity-30"></div>
        
        {/* חציון */}
        <div className="absolute w-8 h-0.5 bg-border left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* סמן המיקום */}
        <div 
          className="absolute w-8 h-2 bg-primary rounded-full left-1/2 transform -translate-x-1/2 transition-all duration-500 shadow-lg"
          style={{ top: `${100 - meterPercentage}%` }}
        >
          <div className="absolute inset-0 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* תווית תחתונה */}
      <div className="text-xs text-evidence-suspicious font-medium mt-2">מחשיד</div>

      {/* כפתור דיווח */}
      <div className="mt-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                {canReport ? (
                  <ReportForm 
                    suspiciousCount={suspiciousCount}
                    calmingCount={calmingCount}
                    suspiciousRatio={suspiciousRatio}
                    calmingRatio={calmingRatio}
                    isVertical={true}
                  />
                ) : (
                  <Button 
                    size="sm" 
                    disabled
                    variant="outline"
                    className="text-xs p-2 h-auto flex flex-col items-center gap-1"
                  >
                    <FileText className="w-3 h-3" />
                    <span className="text-[10px] leading-tight text-center">דווח לממונה</span>
                  </Button>
                )}
              </div>
            </TooltipTrigger>
            {!canReport && (
              <TooltipContent side="right">
                <p>{getTooltipMessage()}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}