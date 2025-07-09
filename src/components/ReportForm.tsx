import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Send, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportFormProps {
  suspiciousCount: number;
  calmingCount: number;
  suspiciousRatio: number;
  calmingRatio: number;
}

export function ReportForm({ suspiciousCount, calmingCount, suspiciousRatio, calmingRatio }: ReportFormProps) {
  const [reportText, setReportText] = useState("");
  const [investigatorName, setInvestigatorName] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!reportText.trim() || !investigatorName.trim()) {
      toast({
        title: "שגיאה",
        description: "יש למלא את כל השדות הנדרשים",
        variant: "destructive"
      });
      return;
    }

    // כאן נשלח את הדיווח
    toast({
      title: "הדיווח נשלח בהצלחה",
      description: "הדיווח הועבר לממונה לבדיקה והמשך טיפול",
    });

    setOpen(false);
    setReportText("");
    setInvestigatorName("");
  };

  const getThreatLevel = () => {
    if (suspiciousRatio > 70) return 'גבוהה';
    if (suspiciousRatio > 40) return 'בינונית';
    return 'נמוכה';
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          <FileText className="w-4 h-4 mr-2" />
          דווח לממונה
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>דיווח חקירה לממונה</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* סיכום הראיות */}
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-sm">סיכום הראיות:</h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-evidence-suspicious">ראיות חשודות: {suspiciousCount}</span>
                <br />
                <span className="text-muted-foreground">({suspiciousRatio.toFixed(1)}%)</span>
              </div>
              <div>
                <span className="text-evidence-calming">ראיות מרגיעות: {calmingCount}</span>
                <br />
                <span className="text-muted-foreground">({calmingRatio.toFixed(1)}%)</span>
              </div>
            </div>
            <div className="pt-2 border-t border-border">
              <span className="text-sm font-medium">רמת איום: {getThreatLevel()}</span>
            </div>
          </div>

          {/* שם החוקר */}
          <div className="space-y-2">
            <Label htmlFor="investigator">שם החוקר</Label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="investigator"
                value={investigatorName}
                onChange={(e) => setInvestigatorName(e.target.value)}
                placeholder="הכנס את שמך המלא"
                className="pr-10"
              />
            </div>
          </div>

          {/* תוכן הדיווח */}
          <div className="space-y-2">
            <Label htmlFor="report">תוכן הדיווח</Label>
            <Textarea
              id="report"
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="פרט את ממצאי החקירה, המלצותיך והצעדים הבאים..."
              rows={6}
              className="resize-none"
            />
          </div>

          {/* כפתור שליחה */}
          <Button 
            onClick={handleSubmit}
            className="w-full"
            size="lg"
          >
            <Send className="w-4 h-4 mr-2" />
            שלח דיווח
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}