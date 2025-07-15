import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Video, Volume2, FileImage, Play, Pause, Download, MapPin, Clock, Plus, Check, X } from "lucide-react";
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-400/30">
                <TypeIcon className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <DialogTitle className="text-xl text-right text-white">{evidence.title}</DialogTitle>
                <p className="text-sm text-gray-300">{evidence.formation}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`text-xs border ${getExceptionColor(evidence.exception_level)}`}>
                רמה {evidence.exception_level}
              </Badge>
              <Button
                variant={isEvidenceSelected(evidence.id) ? "default" : "outline"}
                size="sm"
                onClick={() => onAddEvidence(evidence)}
                disabled={isEvidenceSelected(evidence.id)}
                className="gap-1"
              >
                {isEvidenceSelected(evidence.id) ? (
                  <>
                    <Check className="w-4 h-4" />
                    נוסף
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    הוסף
                  </>
                )}
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Evidence Details */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-right">
              <span className="text-gray-400">מקור:</span>
              <span className="text-gray-300">{evidence.source}</span>
            </div>
            <div className="flex items-center gap-2 text-right">
              <span className="text-gray-400">מערך:</span>
              <span className="text-gray-300">{evidence.formation}</span>
            </div>
            <div className="flex items-center gap-2 text-right">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{evidence.production_date} {evidence.production_time}</span>
              {evidence.file_duration && (
                <>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-300">משך: {evidence.file_duration}</span>
                </>
              )}
            </div>
            {evidence.comments && (
              <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-3">
                <span className="text-blue-300 font-medium">הערות: </span>
                <span className="text-blue-200">{evidence.comments}</span>
              </div>
            )}
          </div>

          {/* Media Content */}
          {evidence.news_type === "image" && evidence.file_url && (
            <div className="w-full">
              <img 
                src={evidence.file_url} 
                alt={evidence.title}
                className="w-full max-h-96 object-contain rounded-lg border border-gray-700"
              />
            </div>
          )}

          {evidence.news_type === "video" && evidence.file_url && (
            <div className="relative w-full">
              <img 
                src={evidence.file_url} 
                alt={evidence.title}
                className="w-full max-h-96 object-contain rounded-lg border border-gray-700"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                <Button size="lg" className="gap-2">
                  <Play className="w-5 h-5" />
                  נגן וידיאו
                </Button>
              </div>
            </div>
          )}

          {evidence.news_type === "audio" && (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Button
                    onClick={handlePlay}
                    size="lg"
                    className="gap-2"
                  >
                    {playingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    {playingAudio ? 'עצור' : 'נגן'}
                  </Button>
                  <span className="text-gray-300">הקלטת אודיו</span>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Text Content for non-media evidence */}
          {!['image', 'video', 'audio'].includes(evidence.news_type) && (
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <p className="text-gray-200 leading-relaxed text-right">
                {evidence.content}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};