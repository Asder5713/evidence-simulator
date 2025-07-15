import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Video, Volume2, FileImage, Play, Pause, Download, Clock, Plus, Check, X, AlertTriangle, Calendar, User, FileText } from "lucide-react";
import { useState } from "react";

import { Evidence } from '@/data/evidence-data';

interface EvidenceModalProps {
  evidence: Evidence | null;
  isOpen: boolean;
  onClose: () => void;
  onAddEvidence: (evidence: Evidence) => void;
  isEvidenceSelected: (id: string) => boolean;
}

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
    case "image": return "from-blue-600 to-blue-800";
    case "video": return "from-purple-600 to-purple-800";
    case "audio": return "from-green-600 to-green-800";
    default: return "from-gray-600 to-gray-800";
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

export const EvidenceModal = ({ evidence, isOpen, onClose, onAddEvidence, isEvidenceSelected }: EvidenceModalProps) => {
  const [playingAudio, setPlayingAudio] = useState(false);

  if (!evidence) return null;

  const TypeIcon = getTypeIcon(evidence.news_type);

  const handlePlay = () => {
    setPlayingAudio(!playingAudio);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black border-gray-700/50 shadow-2xl">
        {/* Header with gradient background */}
        <div className={`bg-gradient-to-r ${getTypeColor(evidence.news_type)} p-6 -m-6 mb-6 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                  <TypeIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white text-right mb-1">{evidence.title}</h2>
                  <div className="flex items-center gap-2 text-white/80">
                    <Badge className={`text-xs border ${getExceptionColor(evidence.exception_level)} animate-pulse`}>
                      רמה {evidence.exception_level}
                    </Badge>
                    <span className="text-sm">{evidence.formation}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={isEvidenceSelected(evidence.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => onAddEvidence(evidence)}
                  disabled={isEvidenceSelected(evidence.id)}
                  className="gap-2 bg-white/10 hover:bg-white/20 border-white/20 text-white"
                >
                  {isEvidenceSelected(evidence.id) ? (
                    <>
                      <Check className="w-4 h-4" />
                      נוסף לראיות
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      הוסף לראיות
                    </>
                  )}
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose} className="text-white/80 hover:text-white hover:bg-white/10">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 px-6 pb-6 overflow-y-auto max-h-[calc(95vh-200px)]">
          {/* Evidence Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Production Info */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-white">פרטי הפקה</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-right">
                  <span className="text-gray-400">מקור:</span>
                  <span className="text-gray-200">{evidence.source}</span>
                </div>
                <div className="flex items-center gap-2 text-right">
                  <span className="text-gray-400">מערך:</span>
                  <span className="text-gray-200">{evidence.formation}</span>
                </div>
                <div className="flex items-center gap-2 text-right">
                  <span className="text-gray-400">תאריך הפקה:</span>
                  <span className="text-gray-200">{evidence.production_date} {evidence.production_time}</span>
                </div>
                {evidence.file_duration && (
                  <div className="flex items-center gap-2 text-right">
                    <span className="text-gray-400">משך:</span>
                    <span className="text-gray-200">{evidence.file_duration}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Incident Info */}
            <div className="bg-gradient-to-br from-red-800/30 to-red-900/30 rounded-xl p-4 border border-red-700/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h3 className="font-semibold text-white">פרטי מקרה</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-right">
                  <Calendar className="w-4 h-4 text-red-400" />
                  <span className="text-gray-400">תאריך מקרה:</span>
                  <span className="text-red-200">{evidence.incident_date} {evidence.incident_time}</span>
                </div>
                <div className="flex items-center gap-2 text-right">
                  <span className="text-gray-400">סוג ראיה:</span>
                  <span className="text-red-200">{evidence.news_type}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Media Content */}
          {evidence.news_type === "image" && evidence.file_url && (
            <div className="relative group">
              <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl p-4 border border-gray-700/30 backdrop-blur-sm">
                <img 
                  src={evidence.file_url} 
                  alt={evidence.title}
                  className="w-full max-h-96 object-contain rounded-lg border border-gray-600/30 shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          )}

          {evidence.news_type === "video" && evidence.file_url && (
            <div className="relative group">
              <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl p-4 border border-gray-700/30 backdrop-blur-sm">
                <div className="relative">
                  <img 
                    src={evidence.file_url} 
                    alt={evidence.title}
                    className="w-full max-h-96 object-contain rounded-lg border border-gray-600/30 shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center group-hover:bg-black/60 transition-colors">
                    <Button size="lg" className="gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm">
                      <Play className="w-6 h-6" />
                      נגן וידיאו
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {evidence.news_type === "audio" && (
            <div className="bg-gradient-to-br from-green-800/30 to-green-900/30 rounded-xl p-6 border border-green-700/30 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={handlePlay}
                    size="lg"
                    className="gap-3 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 text-green-200"
                  >
                    {playingAudio ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    {playingAudio ? 'עצור השמעה' : 'נגן הקלטה'}
                  </Button>
                  <div>
                    <p className="text-green-200 font-medium">הקלטת אודיו</p>
                    <p className="text-green-300/80 text-sm">איכות גבוהה</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-green-500/30 text-green-200 hover:bg-green-500/10">
                  <Download className="w-4 h-4 mr-1" />
                  הורד
                </Button>
              </div>
              <div className="h-2 bg-green-900/50 rounded-full">
                <div className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full w-0 animate-pulse"></div>
              </div>
            </div>
          )}

          {/* Content Section */}
          {evidence.content && (
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl p-4 border border-gray-700/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <h3 className="font-semibold text-white">תוכן הראיה</h3>
              </div>
              <p className="text-gray-200 leading-relaxed text-right">
                {evidence.content}
              </p>
            </div>
          )}

          {/* Comments Section */}
          {evidence.comments && (
            <div className="bg-gradient-to-br from-blue-800/30 to-blue-900/30 rounded-xl p-4 border border-blue-700/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <User className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-white">הערות חוקר</h3>
              </div>
              <p className="text-blue-200 leading-relaxed text-right">
                {evidence.comments}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};