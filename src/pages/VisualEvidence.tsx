import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Camera, Video, Volume2, FileImage, Play, Pause, Download, ZoomIn, Clock, MapPin, Plus, Check, AlertTriangle } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useEvidence } from "@/hooks/use-evidence";
import { visualEvidence } from "@/data/evidence-data";
import { useGameContext } from "@/contexts/GameContext";

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
    case "image": return "from-blue-950/70 to-blue-900/50 border-blue-800/60";
    case "video": return "from-indigo-950/70 to-indigo-900/50 border-indigo-800/60";
    case "audio": return "from-cyan-950/70 to-cyan-900/50 border-cyan-800/60";
    default: return "from-slate-950/70 to-slate-900/50 border-slate-800/60";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical": return "bg-red-600/30 text-red-300 border-red-500/50";
    case "high": return "bg-orange-600/30 text-orange-300 border-orange-500/50";
    case "medium": return "bg-blue-600/30 text-blue-300 border-blue-500/50";
    default: return "bg-slate-600/30 text-slate-300 border-slate-500/50";
  }
};

const VisualEvidence = () => {
  const { isTimeReached, isGameStarted, markPageAsVisited, isEvidenceUnseen } = useGameContext();
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const { addEvidence, isEvidenceSelected } = useEvidence();

  
  // Mark page as visited when component mounts
  useEffect(() => {
    if (isGameStarted) {
      markPageAsVisited('visual');
    }
  }, [markPageAsVisited, isGameStarted]);

  // Filter evidence that should be visible based on game time
  const visibleEvidence = useMemo(() => {
    if (!isGameStarted) return [];
    return visualEvidence.filter(evidence => isTimeReached(evidence.timestamp));
  }, [isGameStarted, isTimeReached]);

  const handlePlay = (id: string) => {
    setPlayingAudio(playingAudio === id ? null : id);
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-950 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/80 to-indigo-900/80 border-b border-blue-700/50 p-4 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-400/30 shadow-lg shadow-blue-500/20">
            <Camera className="w-6 h-6 text-blue-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-100">ראיות ויזואליות</h1>
            <p className="text-sm text-blue-300">תמונות, וידיאו והקלטות אודיו</p>
          </div>
        </div>
      </div>

      {/* Evidence Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {visibleEvidence.length > 0 ? visibleEvidence.map((evidence, index) => {
              const TypeIcon = getTypeIcon(evidence.type);
              
              return (
                <Card 
                  key={evidence.id}
                  className={`bg-gradient-to-br ${getTypeColor(evidence.type)} border backdrop-blur-sm shadow-lg shadow-black/20 hover:shadow-xl transition-all duration-300 animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-400/30 shadow-lg shadow-blue-500/10">
                          <TypeIcon className="w-5 h-5 text-blue-300" />
                        </div>
                         <div>
                           <CardTitle className="text-blue-100 text-lg flex items-center gap-2">
                             {evidence.title}
                             {isEvidenceUnseen(evidence.timestamp, 'visual') && (
                               <AlertTriangle className="w-4 h-4 text-yellow-400" />
                             )}
                           </CardTitle>
                           <p className="text-blue-300 text-sm">{evidence.source}</p>
                         </div>
                      </div>
                      <Badge className={`text-xs border ${getPriorityColor(evidence.priority)}`}>
                        {evidence.priority === 'critical' ? 'קריטי' : 
                         evidence.priority === 'high' ? 'גבוה' : 'בינוני'}
                      </Badge>
                      <Button
                        variant={isEvidenceSelected(evidence.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleAddEvidence(evidence)}
                        disabled={isEvidenceSelected(evidence.id)}
                        className="gap-1 text-xs"
                      >
                        {isEvidenceSelected(evidence.id) ? (
                          <>
                            <Check className="w-3 h-3" />
                            נוסף
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            הוסף
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="space-y-2 text-sm text-blue-200">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-blue-400" />
                        <span>{evidence.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-blue-400" />
                        <span>{evidence.timestamp}</span>
                        {evidence.duration && (
                          <>
                            <span className="text-blue-500">•</span>
                            <span>משך: {evidence.duration}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Media Preview */}
                    {evidence.type === "image" && evidence.url && (
                      <div className="relative group">
                        <img 
                          src={evidence.url} 
                          alt={evidence.title}
                          className="w-full h-48 object-cover rounded-lg border border-white/10"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                          <Button variant="secondary" size="sm" className="gap-2 bg-blue-600/20 border-blue-500/50 text-blue-100 hover:bg-blue-600/30">
                            <ZoomIn className="w-4 h-4" />
                            הגדל
                          </Button>
                        </div>
                      </div>
                    )}

                    {evidence.type === "video" && evidence.url && (
                      <div className="relative">
                        <img 
                          src={evidence.url} 
                          alt={evidence.title}
                          className="w-full h-48 object-cover rounded-lg border border-white/10"
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                          <Button variant="secondary" size="lg" className="gap-2 bg-blue-600/20 border-blue-500/50 text-blue-100 hover:bg-blue-600/30">
                            <Play className="w-5 h-5" />
                            נגן וידיאו
                          </Button>
                        </div>
                      </div>
                    )}

                    {evidence.type === "audio" && (
                      <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Button
                              onClick={() => handlePlay(evidence.id)}
                              variant="secondary" 
                              size="sm"
                              className="gap-2"
                            >
                              {playingAudio === evidence.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                              {playingAudio === evidence.id ? 'עצור' : 'נגן'}
                            </Button>
                            <span className="text-gray-300 text-sm">הקלטת אודיו</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {/* Call Details */}
                        {evidence.caller && evidence.receiver && (
                          <div className="flex items-center gap-4 text-sm text-blue-200">
                            <div className="flex items-center gap-2">
                              <span className="text-blue-400">מ:</span>
                              <span>{evidence.caller}</span>
                            </div>
                            <span className="text-blue-500">→</span>
                            <div className="flex items-center gap-2">
                              <span className="text-blue-400">אל:</span>
                              <span>{evidence.receiver}</span>
                            </div>
                            <Badge className={`text-xs ${
                              evidence.call_type === 'outgoing' ? 'bg-green-600/30 text-green-300 border-green-500/50' :
                              evidence.call_type === 'incoming' ? 'bg-blue-600/30 text-blue-300 border-blue-500/50' :
                              'bg-purple-600/30 text-purple-300 border-purple-500/50'
                            }`}>
                              {evidence.call_type === 'outgoing' ? 'יוצאת' : 
                               evidence.call_type === 'incoming' ? 'נכנסת' : 'חקירה'}
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}


                  </CardContent>
                </Card>
              );
            }) : (
              <div className="flex items-center justify-center h-64 text-blue-400 col-span-full">
                <p>אין ראיות ויזואליות זמינות עדיין</p>
              </div>
            )}
          </div>

          {/* Summary Section */}
          <div className="mt-8 p-6 bg-gradient-to-r from-zinc-900/40 to-neutral-900/40 border border-zinc-700/40 rounded-xl backdrop-blur-sm shadow-lg">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-zinc-800/40 rounded-lg border border-zinc-700/30">
                <FileImage className="w-6 h-6 text-zinc-300 flex-shrink-0" />
              </div>
              <div>
                <h3 className="text-zinc-200 font-bold text-lg mb-3">סיכום ראיות ויזואליות</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-black/20 rounded-lg p-3 border border-zinc-700/30">
                    <p className="text-zinc-300 font-medium mb-1">תמונות: 2</p>
                    <p className="text-zinc-400">מעקב ותיעוד זירה</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3 border border-zinc-700/30">
                    <p className="text-zinc-300 font-medium mb-1">סרטונים: 2</p>
                    <p className="text-zinc-400">מעקב וחקירה</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3 border border-zinc-700/30">
                    <p className="text-zinc-300 font-medium mb-1">הקלטות: 2</p>
                    <p className="text-zinc-400">איומים ועדויות</p>
                  </div>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mt-4">
                  הראיות הויזואליות מספקות תמונה מלאה של רצף האירועים מהאיומים הראשוניים ועד לגילוי הרצח. 
                  כל ראיה תומכת ומחזקת את השרשרת הראייתית נגד החשודים.
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default VisualEvidence;