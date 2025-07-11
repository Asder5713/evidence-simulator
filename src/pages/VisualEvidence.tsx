import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Camera, Video, Volume2, FileImage, Play, Pause, Download, ZoomIn, Clock, MapPin, AlertTriangle } from "lucide-react";
import { useState } from "react";

const visualEvidence = [
  {
    id: "img_001",
    type: "image",
    title: "תמונת מעקב - יוסי כהן",
    location: "רחוב הנביאים 12, תל-אביב",
    timestamp: "13.1.2024, 21:15",
    description: "תמונה של החשוד יוסי כהן יוצא מהרכב ליד בית הקורבן",
    priority: "critical",
    source: "מצלמת מעקב עירונית",
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
    evidence_notes: "התמונה מוכיחה נוכחות החשוד במקום הפשע בזמן הרלוונטי"
  },
  {
    id: "vid_001", 
    type: "video",
    title: "סרטון מעקב - כניסה למחסן",
    location: "נמל אשדוד - מחסן 7",
    timestamp: "13.1.2024, 22:30",
    description: "הקלטת וידיאו המראה את החשודים נכנסים למחסן עם הקורבן",
    priority: "critical",
    source: "מצלמת אבטחה פרטית",
    duration: "03:45",
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
    evidence_notes: "סרטון מרכזי המוכיח את חטיפת הקורבן והעברתו למחסן"
  },
  {
    id: "aud_001",
    type: "audio", 
    title: "הקלטת שיחה - איום טלפוני",
    location: "מעקב טלפוני",
    timestamp: "12.1.2024, 19:45",
    description: "הקלטת שיחת טלפון בה יוסי כהן מאיים על דני לוי",
    priority: "high",
    source: "מעקב משטרתי מאושר",
    duration: "02:18",
    url: "",
    evidence_notes: "איום ברור על חיי הקורבן - מהווה מניע לרצח"
  },
  {
    id: "img_002",
    type: "image",
    title: "תמונות זירת הפשע",
    location: "נמל אשדוד - מחסן 7",
    timestamp: "14.1.2024, 00:45",
    description: "תיעוד מלא של זירת הרצח והראיות הפיזיות",
    priority: "critical",
    source: "זק״א ומעבדה פלילית",
    url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&h=400&fit=crop",
    evidence_notes: "עדויות פיזיות חד משמעיות לאלימות ורצח"
  },
  {
    id: "vid_002",
    type: "video",
    title: "חקירת זירה - תיעוד מלא",
    location: "נמל אשדוד - מחסן 7", 
    timestamp: "14.1.2024, 01:30",
    description: "תיעוד מקצועי של זירת הפשע על ידי חוקרי המעבדה הפלילית",
    priority: "high",
    source: "מעבדה פלילית משטרת ישראל",
    duration: "12:33",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop",
    evidence_notes: "תיעוד מקצועי המסייע בשחזור האירועים"
  },
  {
    id: "aud_002",
    type: "audio",
    title: "עדות קולית - עד ראייה", 
    location: "תחנת משטרה מרכז",
    timestamp: "14.1.2024, 10:00",
    description: "עדותו של עד ראייה ששמע צעקות מהמחסן",
    priority: "medium",
    source: "חקירה משטרתי",
    duration: "08:12",
    url: "",
    evidence_notes: "עדות תומכת המחזקת את ציר הזמן של האירועים"
  }
];

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
    case "image": return "from-zinc-900/50 to-zinc-800/40 border-zinc-700/40";
    case "video": return "from-neutral-900/50 to-neutral-800/40 border-neutral-700/40";
    case "audio": return "from-stone-900/50 to-stone-800/40 border-stone-700/40";
    default: return "from-gray-900/50 to-gray-800/40 border-gray-700/40";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical": return "bg-zinc-800 text-zinc-200 border-zinc-600";
    case "high": return "bg-neutral-800 text-neutral-200 border-neutral-600";
    case "medium": return "bg-stone-800 text-stone-200 border-stone-600";
    default: return "bg-gray-800 text-gray-200 border-gray-600";
  }
};

const VisualEvidence = () => {
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const handlePlay = (id: string) => {
    setPlayingAudio(playingAudio === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-neutral-950 to-stone-950 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-neutral-900 border-b border-zinc-700/50 p-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-800/50 rounded-lg border border-zinc-700/30">
            <Camera className="w-6 h-6 text-zinc-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-zinc-100">ראיות ויזואליות</h1>
            <p className="text-sm text-zinc-400">תמונות, וידיאו והקלטות אודיו</p>
          </div>
        </div>
      </div>

      {/* Evidence Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {visualEvidence.map((evidence, index) => {
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
                        <div className="p-2 bg-zinc-800/30 rounded-lg border border-zinc-700/20">
                          <TypeIcon className="w-5 h-5 text-zinc-300" />
                        </div>
                        <div>
                          <CardTitle className="text-zinc-100 text-lg">{evidence.title}</CardTitle>
                          <p className="text-zinc-400 text-sm">{evidence.source}</p>
                        </div>
                      </div>
                      <Badge className={`text-xs border ${getPriorityColor(evidence.priority)}`}>
                        {evidence.priority === 'critical' ? 'קריטי' : 
                         evidence.priority === 'high' ? 'גבוה' : 'בינוני'}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span>{evidence.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>{evidence.timestamp}</span>
                        {evidence.duration && (
                          <>
                            <span className="text-gray-500">•</span>
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
                          <Button variant="secondary" size="sm" className="gap-2">
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
                          <Button variant="secondary" size="lg" className="gap-2">
                            <Play className="w-5 h-5" />
                            נגן וידיאו
                          </Button>
                        </div>
                      </div>
                    )}

                    {evidence.type === "audio" && (
                      <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                        <div className="flex items-center justify-between">
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
                      </div>
                    )}

                    {/* Description */}
                    <div className="bg-black/20 rounded-lg p-3 border border-white/10">
                      <p className="text-gray-200 text-sm leading-relaxed">{evidence.description}</p>
                    </div>

                    {/* Evidence Notes */}
                    <div className="bg-zinc-800/20 border border-zinc-600/30 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-zinc-300 text-xs font-medium mb-1">הערת חוקר:</p>
                          <p className="text-zinc-200 text-xs leading-relaxed">{evidence.evidence_notes}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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