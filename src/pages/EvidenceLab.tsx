import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail, MessageCircle, Camera, Video, Volume2, Trash2, FlaskConical, Download } from "lucide-react";
import { useEvidence } from "@/hooks/use-evidence";

const EvidenceLab = () => {
  const { selectedEvidence, removeEvidence, clearAllEvidence } = useEvidence();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email": return Mail;
      case "text": return MessageCircle;
      case "image": return Camera;
      case "video": return Video;
      case "audio": return Volume2;
      default: return FlaskConical;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "email": return "from-red-950/70 to-red-900/50 border-red-800/60";
      case "text": return "from-green-950/70 to-green-900/50 border-green-800/60";
      case "image": return "from-blue-950/70 to-blue-900/50 border-blue-800/60";
      case "video": return "from-indigo-950/70 to-indigo-900/50 border-indigo-800/60";
      case "audio": return "from-cyan-950/70 to-cyan-900/50 border-cyan-800/60";
      default: return "from-slate-950/70 to-slate-900/50 border-slate-800/60";
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "critical": return "bg-red-600/30 text-red-300 border-red-500/50";
      case "high": return "bg-orange-600/30 text-orange-300 border-orange-500/50";
      case "medium": return "bg-blue-600/30 text-blue-300 border-blue-500/50";
      default: return "bg-slate-600/30 text-slate-300 border-slate-500/50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/80 to-indigo-900/80 border-b border-purple-700/50 p-4 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/20 rounded-lg border border-purple-400/30 shadow-lg shadow-purple-500/20">
              <FlaskConical className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-purple-100">מעבדת הראיות</h1>
              <p className="text-sm text-purple-300">ראיות שנבחרו לחקירה ({selectedEvidence.length})</p>
            </div>
          </div>
          
          {selectedEvidence.length > 0 && (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 border-purple-600/50 text-purple-300 hover:bg-purple-600/20"
              >
                <Download className="w-4 h-4" />
                ייצא דוח
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={clearAllEvidence}
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" />
                נקה הכל
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {selectedEvidence.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="p-6 bg-purple-500/10 rounded-full border border-purple-400/20 mb-4">
              <FlaskConical className="w-12 h-12 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-purple-200 mb-2">אין ראיות נבחרות</h2>
            <p className="text-purple-300 max-w-md">
              בחר ראיות מהעמודים השונים כדי להוסיף אותן למעבדה לניתוח מעמיק
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {selectedEvidence.map((evidence, index) => {
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
                          <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-400/30 shadow-lg shadow-purple-500/10">
                            <TypeIcon className="w-5 h-5 text-purple-300" />
                          </div>
                          <div>
                            <CardTitle className="text-purple-100 text-lg">{evidence.title}</CardTitle>
                            <p className="text-purple-300 text-sm">{evidence.source}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {evidence.priority && (
                            <Badge className={`text-xs border ${getPriorityColor(evidence.priority)}`}>
                              {evidence.priority === 'critical' ? 'קריטי' : 
                               evidence.priority === 'high' ? 'גבוה' : 'בינוני'}
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEvidence(evidence.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-purple-200">
                        <div>
                          <span className="text-purple-400">זמן:</span> {evidence.timestamp}
                        </div>
                        {evidence.location && (
                          <div>
                            <span className="text-purple-400">מיקום:</span> {evidence.location}
                          </div>
                        )}
                        {evidence.duration && (
                          <div>
                            <span className="text-purple-400">משך:</span> {evidence.duration}
                          </div>
                        )}
                        {evidence.caller && evidence.receiver && (
                          <div>
                            <span className="text-purple-400">משיחה:</span> {evidence.caller} → {evidence.receiver}
                          </div>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent>
                      {evidence.content && (
                        <div className="bg-black/20 rounded-lg p-3 border border-white/10">
                          <pre className="text-purple-100 text-sm whitespace-pre-wrap font-sans leading-relaxed">
                            {evidence.content.substring(0, 200)}
                            {evidence.content.length > 200 && '...'}
                          </pre>
                        </div>
                      )}
                      
                      {evidence.url && evidence.type === "image" && (
                        <div className="mt-3">
                          <img 
                            src={evidence.url} 
                            alt={evidence.title}
                            className="w-full h-32 object-cover rounded-lg border border-white/10"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default EvidenceLab;