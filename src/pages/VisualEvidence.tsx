import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Camera, Video, Volume2, FileImage, Clock, MapPin, Plus, Check } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useEvidence } from "@/hooks/use-evidence";
import { visualEvidence } from "@/data/evidence-data";
import { useGameContext } from "@/contexts/GameContext";
import { EvidenceModal } from "@/components/EvidenceModal";

const getTypeIcon = (type: string) => {
  switch (type) {
    case "image": return Camera;
    case "video": return Video;
    case "audio": return Volume2;
    default: return FileImage;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "image": return "bg-blue-50 border-blue-200";
    case "video": return "bg-purple-50 border-purple-200";
    case "audio": return "bg-green-50 border-green-200";
    default: return "bg-gray-50 border-gray-200";
  }
};

const getTypeTextColor = (type: string) => {
  switch (type) {
    case "image": return "text-blue-700";
    case "video": return "text-purple-700";
    case "audio": return "text-green-700";
    default: return "text-gray-700";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical": return "bg-red-100 text-red-800 border-red-300";
    case "high": return "bg-orange-100 text-orange-800 border-orange-300";
    case "medium": return "bg-blue-100 text-blue-800 border-blue-300";
    default: return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const VisualEvidence = () => {
  const { isTimeReached, isGameStarted, markPageAsVisited } = useGameContext();
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const { addEvidence, isEvidenceSelected } = useEvidence();

  // Mark page as visited when component mounts
  useEffect(() => {
    markPageAsVisited('visual');
  }, [markPageAsVisited]);

  // Filter evidence that should be visible based on game time
  const visibleEvidence = useMemo(() => {
    if (!isGameStarted) return [];
    return visualEvidence.filter(evidence => isTimeReached(evidence.timestamp));
  }, [isGameStarted, isTimeReached]);

  const handleAddEvidence = (evidence: any) => {
    addEvidence({
      id: evidence.id,
      type: evidence.type,
      title: evidence.title,
      source: evidence.source,
      timestamp: evidence.timestamp,
      location: evidence.location,
      priority: evidence.priority,
      url: evidence.url,
      duration: evidence.duration,
      caller: evidence.caller,
      receiver: evidence.receiver,
      call_type: evidence.call_type
    });
  };

  const handleEvidenceClick = (evidence: any) => {
    setSelectedEvidence(evidence);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Camera className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">ראיות ויזואליות</h1>
            <p className="text-sm text-gray-600">תמונות, וידיאו והקלטות אודיו</p>
          </div>
        </div>
      </div>

      {/* Evidence Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {visibleEvidence.length > 0 ? visibleEvidence.map((evidence, index) => {
              const TypeIcon = getTypeIcon(evidence.type);
              const isHistorical = evidence.id.includes('historical');
              
              return (
                <Card 
                  key={evidence.id}
                  className={`${getTypeColor(evidence.type)} shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105 animate-fade-in ${isHistorical ? 'opacity-75' : ''}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => handleEvidenceClick(evidence)}
                >
                  <CardContent className="p-4">
                    {/* File Preview */}
                    <div className="mb-3">
                      {evidence.type === "image" && evidence.url ? (
                        <img 
                          src={evidence.url} 
                          alt={evidence.title}
                          className="w-full h-32 object-cover rounded-lg border border-white/50"
                        />
                      ) : evidence.type === "video" && evidence.url ? (
                        <div className="relative">
                          <img 
                            src={evidence.url} 
                            alt={evidence.title}
                            className="w-full h-32 object-cover rounded-lg border border-white/50"
                          />
                          <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                            <Video className={`w-8 h-8 ${getTypeTextColor(evidence.type)}`} />
                          </div>
                        </div>
                      ) : (
                        <div className={`w-full h-32 ${getTypeColor(evidence.type)} rounded-lg border border-white/50 flex items-center justify-center`}>
                          <TypeIcon className={`w-12 h-12 ${getTypeTextColor(evidence.type)}`} />
                        </div>
                      )}
                    </div>

                    {/* File Info */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <TypeIcon className={`w-4 h-4 ${getTypeTextColor(evidence.type)}`} />
                          <Badge className={`text-xs border ${getPriorityColor(evidence.priority)}`}>
                            {evidence.priority === 'critical' ? 'קריטי' : 
                             evidence.priority === 'high' ? 'גבוה' : 'בינוני'}
                          </Badge>
                        </div>
                        <Button
                          variant={isEvidenceSelected(evidence.id) ? "default" : "outline"}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddEvidence(evidence);
                          }}
                          disabled={isEvidenceSelected(evidence.id)}
                          className="gap-1 text-xs"
                        >
                          {isEvidenceSelected(evidence.id) ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Plus className="w-3 h-3" />
                          )}
                        </Button>
                      </div>

                      <h3 className="font-medium text-gray-900 text-sm text-right line-clamp-2">
                        {evidence.title}
                      </h3>

                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center gap-1 text-right">
                          <Clock className="w-3 h-3" />
                          <span>{evidence.timestamp}</span>
                          {evidence.duration && (
                            <>
                              <span>•</span>
                              <span>{evidence.duration}</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-right">
                          <MapPin className="w-3 h-3" />
                          <span className="line-clamp-1">{evidence.location}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            }) : (
              <div className="flex items-center justify-center h-64 text-gray-500 col-span-full">
                <p>אין ראיות ויזואליות זמינות עדיין</p>
              </div>
            )}
          </div>

          {/* Summary Section */}
          <div className="mt-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <FileImage className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-gray-900 font-semibold text-lg mb-3">סיכום ראיות ויזואליות</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-gray-700 font-medium mb-1">תמונות: {visibleEvidence.filter(e => e.type === 'image').length}</p>
                    <p className="text-gray-600">מעקב ותיעוד זירה</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-gray-700 font-medium mb-1">סרטונים: {visibleEvidence.filter(e => e.type === 'video').length}</p>
                    <p className="text-gray-600">מעקב וחקירה</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-gray-700 font-medium mb-1">הקלטות: {visibleEvidence.filter(e => e.type === 'audio').length}</p>
                    <p className="text-gray-600">איומים ועדויות</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mt-4">
                  הראיות הויזואליות מספקות תמונה מלאה של רצף האירועים מהאיומים הראשוניים ועד לגילוי הרצח. 
                  כל ראיה תומכת ומחזקת את השרשרת הראייתית נגד החשודים.
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Evidence Modal */}
      <EvidenceModal
        evidence={selectedEvidence}
        isOpen={!!selectedEvidence}
        onClose={() => setSelectedEvidence(null)}
        onAddEvidence={handleAddEvidence}
        isEvidenceSelected={isEvidenceSelected}
      />
    </div>
  );
};

export default VisualEvidence;