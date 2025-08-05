import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Search, Filter, Eye, Trash2 } from 'lucide-react';
import { EvidenceCard } from './EvidenceCard';
import { Evidence } from '@/types/evidence';
import { EvidenceDropZone } from './EvidenceDropZone';
import { VerticalThreatMeter } from './VerticalThreatMeter';
import { useEvidence } from '@/hooks/use-evidence';
import { Button } from '@/components/ui/button';

const sampleEvidence: Evidence[] = [];

// localStorage keys
const SORTING_STATE_KEY = 'crime-investigation-sorting-state';

// Interface for sorting state
interface SortingState {
  availableEvidence: Evidence[];
  suspiciousEvidence: Evidence[];
  calmingEvidence: Evidence[];
}

// Helper functions for localStorage
const saveSortingState = (
  availableEvidence: Evidence[],
  suspiciousEvidence: Evidence[],
  calmingEvidence: Evidence[]
) => {
  try {
    const sortingState: SortingState = {
      availableEvidence,
      suspiciousEvidence,
      calmingEvidence,
    };
    localStorage.setItem(SORTING_STATE_KEY, JSON.stringify(sortingState));
    console.log('Saved sorting state:', sortingState);
  } catch (error) {
    console.error('Failed to save sorting state to localStorage:', error);
  }
};

const loadSortingState = (): SortingState | null => {
  try {
    const savedState = localStorage.getItem(SORTING_STATE_KEY);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      console.log('Loaded sorting state from localStorage:', parsedState);
      return parsedState;
    }
  } catch (error) {
    console.error('Failed to load sorting state from localStorage:', error);
  }
  return null;
};

const clearSortingState = () => {
  try {
    localStorage.removeItem(SORTING_STATE_KEY);
    console.log('Sorting state cleared from localStorage');
  } catch (error) {
    console.error('Failed to clear sorting state from localStorage:', error);
  }
};

export function CrimeInvestigation() {
  const [availableEvidence, setAvailableEvidence] =
    useState<Evidence[]>(sampleEvidence);
  const [suspiciousEvidence, setSuspiciousEvidence] = useState<Evidence[]>([]);
  const [calmingEvidence, setCalmingEvidence] = useState<Evidence[]>([]);
  const [draggedEvidence, setDraggedEvidence] = useState<Evidence | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { selectedEvidence, removeEvidence } = useEvidence();

  // Load sorting state from localStorage on component mount
  useEffect(() => {
    const savedSortingState = loadSortingState();
    if (savedSortingState) {
      setAvailableEvidence(savedSortingState.availableEvidence);
      setSuspiciousEvidence(savedSortingState.suspiciousEvidence);
      setCalmingEvidence(savedSortingState.calmingEvidence);
    }
    setIsInitialized(true);
  }, []);

  // Save sorting state to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      saveSortingState(availableEvidence, suspiciousEvidence, calmingEvidence);
    }
  }, [availableEvidence, suspiciousEvidence, calmingEvidence, isInitialized]);

  // המרת ראיות נבחרות לפורמט המעבדה
  const convertToLabEvidence = (evidence: any): Evidence => {
    // החזר את הראיה כפי שהיא, ללא שינוי פורמט
    return evidence;
  };

  // עדכון הראיות הזמינות כאשר ראיות נבחרות מתעדכנות
  useEffect(() => {
    if (!isInitialized) return; // Don't run until localStorage is loaded

    const convertedEvidence = selectedEvidence.map(convertToLabEvidence);

    setAvailableEvidence(prev => {
      // Get all evidence IDs that are currently categorized
      const categorizedIds = [
        ...suspiciousEvidence.map(e => e.id),
        ...calmingEvidence.map(e => e.id),
      ];

      // Filter out evidence that's already categorized
      const availableFromSelected = convertedEvidence.filter(
        e => !categorizedIds.includes(e.id)
      );

      // Combine with existing available evidence that's not in selectedEvidence
      const existingAvailable = prev.filter(evidence => {
        const isInSelected = selectedEvidence.some(e => e.id === evidence.id);
        const isCategorized = categorizedIds.includes(evidence.id);
        return !isInSelected && !isCategorized;
      });

      return [...existingAvailable, ...availableFromSelected];
    });
  }, [selectedEvidence, isInitialized, suspiciousEvidence, calmingEvidence]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    evidence: Evidence
  ) => {
    setDraggedEvidence(evidence);
    e.dataTransfer.setData('evidence', JSON.stringify(evidence));
  };

  const handleDrop = (evidence: Evidence, type: 'suspicious' | 'calming') => {
    // הסר את הראיה מהרשימה הזמינה
    setAvailableEvidence(prev => prev.filter(item => item.id !== evidence.id));

    // הוסף את הראיה לקטגוריה המתאימה
    if (type === 'suspicious') {
      setSuspiciousEvidence(prev => [
        ...prev,
        { ...evidence, category: 'suspicious' },
      ]);
    } else {
      setCalmingEvidence(prev => [
        ...prev,
        { ...evidence, category: 'calming' },
      ]);
    }

    setDraggedEvidence(null);
  };

  const handleReturn = (
    evidence: Evidence,
    fromType: 'suspicious' | 'calming'
  ) => {
    // הסר את הראיה מהקטגוריה הנוכחית
    if (fromType === 'suspicious') {
      setSuspiciousEvidence(prev =>
        prev.filter(item => item.id !== evidence.id)
      );
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
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-muted/20'>
      <div className='flex h-screen flex flex-col items-center'>
        {/* Main Content */}
        <div className='flex-1 p-6'>
          {/* Header */}
          <div className='text-center space-y-2 mb-6'>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
              חקירת פשע - מעבדת ראיות
            </h1>
          </div>
          <div className='flex flex-row h-[40vh]'>
            <div className='grid grid-cols-2 gap-6 h-[40vh] w-[80vw]'>
              {/* Available Evidence - Right Side */}
              <Card className='col-span-1'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Eye className='w-5 h-5' />
                    ראיות זמינות
                    <Badge variant='outline' className='ml-auto'>
                      {availableEvidence.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className='h-[60vh] pl-4'>
                    <div className='space-y-3'>
                      {availableEvidence.map(evidence => (
                        <EvidenceCard
                          key={evidence.id}
                          evidence={evidence}
                          onDragStart={handleDragStart}
                          onDelete={
                            selectedEvidence.some(e => e.id === evidence.id)
                              ? removeEvidence
                              : undefined
                          }
                          showDeleteButton={selectedEvidence.some(
                            e => e.id === evidence.id
                          )}
                        />
                      ))}
                      {availableEvidence.length === 0 && (
                        <div className='text-center py-8'>
                          <p className='text-muted-foreground'>
                            כל הראיות סווגו
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              {/* Drop Zones - Left Side */}
              <div className='col-span-1 space-y-6'>
                <EvidenceDropZone
                  type='calming'
                  evidence={calmingEvidence}
                  onDrop={handleDrop}
                  onReturn={evidence => handleReturn(evidence, 'calming')}
                  title='ראיות מרגיעות'
                />

                <EvidenceDropZone
                  type='suspicious'
                  evidence={suspiciousEvidence}
                  onDrop={handleDrop}
                  onReturn={evidence => handleReturn(evidence, 'suspicious')}
                  title='ראיות חשודות'
                />
              </div>
            </div>
            {/* Vertical Threat Meter - Far Left */}
            <VerticalThreatMeter
              suspiciousCount={suspiciousEvidence.length}
              calmingCount={calmingEvidence.length}
              totalEvidenceCount={sampleEvidence.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
