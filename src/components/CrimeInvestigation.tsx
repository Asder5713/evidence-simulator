import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, Eye, Trash2 } from "lucide-react";
import { EvidenceCard, Evidence } from "./EvidenceCard";
import { EvidenceDropZone } from "./EvidenceDropZone";
import { VerticalThreatMeter } from "./VerticalThreatMeter";
import { useEvidence } from "@/hooks/use-evidence";
import { Button } from "@/components/ui/button";

const sampleEvidence: Evidence[] = [];

export function CrimeInvestigation() {
  const [availableEvidence, setAvailableEvidence] = useState<Evidence[]>(sampleEvidence);
  const [suspiciousEvidence, setSuspiciousEvidence] = useState<Evidence[]>([]);
  const [calmingEvidence, setCalmingEvidence] = useState<Evidence[]>([]);
  const [draggedEvidence, setDraggedEvidence] = useState<Evidence | null>(null);
  const { selectedEvidence, removeEvidence } = useEvidence();

  // המרת ראיות נבחרות לפורמט המעבדה
  const convertToLabEvidence = (evidence: any): Evidence => {
    return {
      id: evidence.id,
      title: evidence.title,
      content: evidence.content || `${evidence.type}: ${evidence.title}`,
      type: evidence.type === 'email' ? 'digital' : 
            evidence.type === 'text' ? 'digital' :
            evidence.type === 'audio' ? 'digital' :
            evidence.type === 'video' ? 'digital' :
            evidence.type === 'image' ? 'digital' : 'document',
      issueDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      incidentDate: evidence.timestamp || new Date().toISOString().replace('T', ' ').substring(0, 16),
      system: evidence.source || "מערכת ראיות",
      anomalyLevel: evidence.priority === 'critical' ? 'critical' :
                   evidence.priority === 'high' ? 'high' : 'medium',
      issuingUnit: evidence.source || "יחידת חקירות",
      source: evidence.location || evidence.source || "מקור לא ידוע"
    };
  };

  // עדכון הראיות הזמינות כאשר ראיות נבחרות מתעדכנות
  useEffect(() => {
    const convertedEvidence = selectedEvidence.map(convertToLabEvidence);
    
    setAvailableEvidence(prev => {
      // שמור על הראיות הקיימות שלא נמחקו
      const currentIds = prev.map(e => e.id);
      const selectedIds = selectedEvidence.map(e => e.id);
      
      // סנן ראיות שנמחקו מה-selectedEvidence
      const filteredExisting = prev.filter(evidence => {
        // אם זו ראיה מקורית (מ-sampleEvidence), שמור אותה
        if (sampleEvidence.some(sample => sample.id === evidence.id)) {
          return true;
        }
        // אם זו ראיה שנוספה ועדיין נבחרת, שמור אותה
        return selectedIds.includes(evidence.id);
      });
      
      // הוסף ראיות חדשות שלא קיימות עדיין
      const newEvidence = convertedEvidence.filter(e => !currentIds.includes(e.id));
      
      return [...filteredExisting, ...newEvidence];
    });
  }, [selectedEvidence]);

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
    
    // החזר את הראיה לרשימה הזמינה (רק אם היא לא נמחקה מ-selectedEvidence)
    setAvailableEvidence(prev => {
      const alreadyExists = prev.some(item => item.id === evidence.id);
      if (alreadyExists) return prev;
      return [...prev, { ...evidence, category: null }];
    });
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
              סווג את הראיות על מנת לקבוע את רמת החשד בפשע. ראיות שנוספו מהעמודים השונים יופיעו כאן.
            </p>
            {selectedEvidence.length > 0 && (
              <p className="text-sm text-primary">
                נוספו {selectedEvidence.length} ראיות חדשות מהעמודים השונים
              </p>
            )}
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
                      <div key={evidence.id}>
                        <EvidenceCard
                          evidence={evidence}
                          onDragStart={handleDragStart}
                        />
                        {/* הוסף כפתור מחיקה לראיות שנוספו מהעמודים */}
                        {selectedEvidence.some(e => e.id === evidence.id) && (
                          <div className="mt-2">
                            <Button 
                              variant="destructive"
                              size="sm"
                              onClick={() => removeEvidence(evidence.id)}
                              className="gap-1 text-xs w-full"
                            >
                              <Trash2 className="w-3 h-3" />
                              הסר מהראיות
                            </Button>
                          </div>
                        )}
                      </div>
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