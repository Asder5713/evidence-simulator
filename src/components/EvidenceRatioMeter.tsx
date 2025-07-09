import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, Scale } from "lucide-react";

interface EvidenceRatioMeterProps {
  suspiciousCount: number;
  calmingCount: number;
}

export function EvidenceRatioMeter({ suspiciousCount, calmingCount }: EvidenceRatioMeterProps) {
  const totalCount = suspiciousCount + calmingCount;
  const suspiciousRatio = totalCount > 0 ? (suspiciousCount / totalCount) * 100 : 0;
  const calmingRatio = totalCount > 0 ? (calmingCount / totalCount) * 100 : 0;

  const getThreatLevel = () => {
    if (suspiciousRatio > 70) return { level: 'גבוה', color: 'text-evidence-suspicious' };
    if (suspiciousRatio > 40) return { level: 'בינוני', color: 'text-evidence-neutral-foreground' };
    return { level: 'נמוך', color: 'text-evidence-calming' };
  };

  const threatLevel = getThreatLevel();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="w-5 h-5" />
          מד איום
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}