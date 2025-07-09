import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertTriangle, Shield, Scale, FileText } from "lucide-react";
import { ReportForm } from "./ReportForm";

interface EvidenceRatioMeterProps {
  suspiciousCount: number;
  calmingCount: number;
  totalEvidenceCount: number;
}

export function EvidenceRatioMeter({ suspiciousCount, calmingCount, totalEvidenceCount }: EvidenceRatioMeterProps) {
  const totalCount = suspiciousCount + calmingCount;
  const suspiciousRatio = totalCount > 0 ? (suspiciousCount / totalCount) * 100 : 0;
  const calmingRatio = totalCount > 0 ? (calmingCount / totalCount) * 100 : 0;
  
  // בדיקה אם כל הראיות מוינו
  const allEvidenceSorted = totalCount === totalEvidenceCount;
  
  // בדיקה אם יש וודאות של 80% לאחד מהצדדים
  const hasHighConfidence = suspiciousRatio >= 80 || calmingRatio >= 80;
  
  // הכפתור מופעל רק אם שני התנאים מתקיימים
  const canReport = allEvidenceSorted && hasHighConfidence;

  const getThreatLevel = () => {
    if (suspiciousRatio > 70) return { level: 'גבוה', color: 'text-evidence-suspicious' };
    if (suspiciousRatio > 40) return { level: 'בינוני', color: 'text-evidence-neutral-foreground' };
    return { level: 'נמוך', color: 'text-evidence-calming' };
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
    <div className="space-y-6">
      {/* מד איום */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5" />
          <h3 className="text-lg font-semibold">מד איום</h3>
        </div>

        {/* Progress Bar */}
        <div className="relative h-6 bg-muted rounded-full overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-evidence-suspicious transition-all duration-500"
            style={{ width: `${suspiciousRatio}%` }}
          />
          <div 
            className="absolute right-0 top-0 h-full bg-evidence-calming transition-all duration-500"
            style={{ width: `${calmingRatio}%` }}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <AlertTriangle className="w-4 h-4 text-evidence-suspicious" />
              <span className="text-sm font-medium">חשודות</span>
            </div>
            <p className="text-2xl font-bold text-evidence-suspicious">{suspiciousCount}</p>
            <p className="text-xs text-muted-foreground">{suspiciousRatio.toFixed(1)}%</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Scale className={`w-4 h-4 ${threatLevel.color}`} />
              <span className="text-sm font-medium">רמת איום</span>
            </div>
            <p className={`text-lg font-bold ${threatLevel.color}`}>{threatLevel.level}</p>
            <p className="text-xs text-muted-foreground">כללי</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Shield className="w-4 h-4 text-evidence-calming" />
              <span className="text-sm font-medium">מרגיעות</span>
            </div>
            <p className="text-2xl font-bold text-evidence-calming">{calmingCount}</p>
            <p className="text-xs text-muted-foreground">{calmingRatio.toFixed(1)}%</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="pt-2 border-t border-border">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>סה"כ ראיות מסווגות:</span>
            <span className="font-medium">{totalCount}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>סה"כ ראיות זמינות:</span>
            <span className="font-medium">{totalEvidenceCount}</span>
          </div>
        </div>
      </div>

      {/* כפתור דיווח */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full">
              {canReport ? (
                <ReportForm 
                  suspiciousCount={suspiciousCount}
                  calmingCount={calmingCount}
                  suspiciousRatio={suspiciousRatio}
                  calmingRatio={calmingRatio}
                />
              ) : (
                <Button 
                  className="w-full" 
                  size="lg" 
                  disabled
                  variant="outline"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  דווח לממונה
                </Button>
              )}
            </div>
          </TooltipTrigger>
          {!canReport && (
            <TooltipContent>
              <p>{getTooltipMessage()}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}