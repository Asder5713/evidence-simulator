import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Camera, Video, Volume2, FileImage, Clock, MapPin, Plus, Check } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useEvidence } from "@/hooks/use-evidence";
import { evidence } from "@/data/evidence-data";
import { useGameContext } from "@/contexts/GameContext";
import { EvidenceModal } from "@/components/EvidenceModal";

const getTypeIcon = (news_type: string) => {
  switch (news_type) {
    case "image": return Camera;
    case "video": return Video;
    case "audio": return Volume2;
    default: return FileImage;
  }
};

const getTypeColor = (news_type: string) => {
  switch (news_type) {
    case "image": return "bg-blue-900/20 border-blue-700/50";
    case "video": return "bg-purple-900/20 border-purple-700/50";
    case "audio": return "bg-green-900/20 border-green-700/50";
    default: return "bg-gray-900/20 border-gray-700/50";
  }
};

const getTypeTextColor = (news_type: string) => {
  switch (news_type) {
    case "image": return "text-blue-300";
    case "video": return "text-purple-300";
    case "audio": return "text-green-300";
    default: return "text-gray-300";
  }
};

const getExceptionColor = (level: number) => {
  switch (level) {
    case 5: return "bg-red-500/20 text-red-300 border-red-500/30";
    case 4: return "bg-orange-500/20 text-orange-300 border-orange-500/30";
    case 3: return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    case 2: return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    case 1: return "bg-green-500/20 text-green-300 border-green-500/30";
    default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
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
    return evidence.filter(item => 
      ['image', 'video', 'audio'].includes(item.news_type) &&
      isTimeReached(`${item.production_date} ${item.production_time}`)
    );
  }, [isGameStarted, isTimeReached]);

  const handleAddEvidence = (evidenceItem: any) => {
    addEvidence(evidenceItem);
  };

  const handleEvidenceClick = (evidence: any) => {
    setSelectedEvidence(evidence);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800/90 to-slate-800/90 border-b border-gray-700/50 p-4 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-400/30">
            <Camera className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">ראיות ויזואליות</h1>
            <p className="text-sm text-gray-300">תמונות, וידיאו והקלטות אודיו</p>
          </div>
        </div>
      </div>

      {/* Evidence Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {visibleEvidence.length > 0 ? visibleEvidence.map((evidenceItem, index) => {
              const TypeIcon = getTypeIcon(evidenceItem.news_type);
              const isHistorical = evidenceItem.id.includes('historical');
              
              return (
                <Card 
                  key={evidenceItem.id}
                  className={`${getTypeColor(evidenceItem.news_type)} shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer hover:scale-105 animate-fade-in backdrop-blur-sm ${isHistorical ? 'opacity-80' : ''}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => handleEvidenceClick(evidenceItem)}
                >
                  <CardContent className="p-4">
                    {/* File Preview */}
                    <div className="mb-3">
                      {evidenceItem.news_type === "image" && evidenceItem.file_url ? (
                        <img 
                          src={evidenceItem.file_url} 
                          alt={evidenceItem.title}
                          className="w-full h-32 object-cover rounded-lg border border-white/10"
                        />
                      ) : evidenceItem.news_type === "video" && evidenceItem.file_url ? (
                        <div className="relative">
                          <img 
                            src={evidenceItem.file_url} 
                            alt={evidenceItem.title}
                            className="w-full h-32 object-cover rounded-lg border border-white/10"
                          />
                          <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                            <Video className={`w-8 h-8 ${getTypeTextColor(evidenceItem.news_type)}`} />
                          </div>
                        </div>
                      ) : (
                        <div className={`w-full h-32 ${getTypeColor(evidenceItem.news_type)} rounded-lg border border-white/10 flex items-center justify-center`}>
                          <TypeIcon className={`w-12 h-12 ${getTypeTextColor(evidenceItem.news_type)}`} />
                        </div>
                      )}
                    </div>

                    {/* File Info */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <TypeIcon className={`w-4 h-4 ${getTypeTextColor(evidenceItem.news_type)}`} />
                          <Badge className={`text-xs border ${getExceptionColor(evidenceItem.exception_level)}`}>
                            רמה {evidenceItem.exception_level}
                          </Badge>
                        </div>
                        <Button
                          variant={isEvidenceSelected(evidenceItem.id) ? "default" : "outline"}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddEvidence(evidenceItem);
                          }}
                          disabled={isEvidenceSelected(evidenceItem.id)}
                          className="gap-1 text-xs"
                        >
                          {isEvidenceSelected(evidenceItem.id) ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Plus className="w-3 h-3" />
                          )}
                        </Button>
                      </div>

                      <h3 className="font-medium text-white text-sm text-right line-clamp-2">
                        {evidenceItem.title}
                      </h3>

                      <div className="space-y-1 text-xs text-gray-300">
                        <div className="flex items-center gap-1 text-right">
                          <Clock className="w-3 h-3" />
                          <span>{evidenceItem.production_date} {evidenceItem.production_time}</span>
                          {evidenceItem.file_duration && (
                            <>
                              <span>•</span>
                              <span>{evidenceItem.file_duration}</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-right">
                          <span className="text-gray-400">מערך:</span>
                          <span className="line-clamp-1">{evidenceItem.formation}</span>
                        </div>
                        {evidenceItem.content && (
                          <div className="text-right">
                            <span className="text-gray-400">תוכן:</span>
                            <p className="text-white text-xs line-clamp-2 mt-1">{evidenceItem.content}</p>
                          </div>
                        )}
                        {evidenceItem.comments && (
                          <div className="text-right">
                            <span className="text-gray-400">הערה:</span>
                            <p className="text-white text-xs line-clamp-2 mt-1">{evidenceItem.comments}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            }) : (
              <div className="flex items-center justify-center h-64 text-gray-400 col-span-full">
                <p>אין ראיות ויזואליות זמינות עדיין</p>
              </div>
            )}
          </div>

          {/* Summary Section */}
          <div className="mt-8 p-6 bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-lg backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-gray-700/50 rounded-lg border border-gray-600/30">
                <FileImage className="w-6 h-6 text-gray-300" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-3">סיכום ראיות ויזואליות</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-700/30">
                    <p className="text-gray-200 font-medium mb-1">תמונות: {visibleEvidence.filter(e => e.news_type === 'image').length}</p>
                    <p className="text-gray-400">מעקב ותיעוד זירה</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-700/30">
                    <p className="text-gray-200 font-medium mb-1">סרטונים: {visibleEvidence.filter(e => e.news_type === 'video').length}</p>
                    <p className="text-gray-400">מעקב וחקירה</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-700/30">
                    <p className="text-gray-200 font-medium mb-1">הקלטות: {visibleEvidence.filter(e => e.news_type === 'audio').length}</p>
                    <p className="text-gray-400">איומים ועדויות</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mt-4">
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