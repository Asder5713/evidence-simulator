import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Video, Volume2, FileImage, Play, Pause, Download, MapPin, Clock, Plus, Check, X } from "lucide-react";
import { useState } from "react";

interface EvidenceModalProps {
  evidence: any;
  isOpen: boolean;
  onClose: () => void;
  onAddEvidence: (evidence: any) => void;
  isEvidenceSelected: (id: string) => boolean;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "image": return Camera;
    case "video": return Video;
    case "audio": return Volume2;
    default: return FileImage;
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

export const EvidenceModal = ({ evidence, isOpen, onClose, onAddEvidence, isEvidenceSelected }: EvidenceModalProps) => {
  const [playingAudio, setPlayingAudio] = useState(false);

  if (!evidence) return null;

  const TypeIcon = getTypeIcon(evidence.type);

  const handlePlay = () => {
    setPlayingAudio(!playingAudio);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TypeIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <DialogTitle className="text-xl text-right">{evidence.title}</DialogTitle>
                <p className="text-sm text-gray-600">{evidence.source}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`text-xs border ${getPriorityColor(evidence.priority)}`}>
                {evidence.priority === 'critical' ? 'קריטי' : 
                 evidence.priority === 'high' ? 'גבוה' : 'בינוני'}
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
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">{evidence.location}</span>
            </div>
            <div className="flex items-center gap-2 text-right">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">{evidence.timestamp}</span>
              {evidence.duration && (
                <>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-700">משך: {evidence.duration}</span>
                </>
              )}
            </div>
          </div>

          {/* Media Content */}
          {evidence.type === "image" && evidence.url && (
            <div className="w-full">
              <img 
                src={evidence.url} 
                alt={evidence.title}
                className="w-full max-h-96 object-contain rounded-lg border border-gray-200"
              />
            </div>
          )}

          {evidence.type === "video" && evidence.url && (
            <div className="relative w-full">
              <img 
                src={evidence.url} 
                alt={evidence.title}
                className="w-full max-h-96 object-contain rounded-lg border border-gray-200"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                <Button size="lg" className="gap-2">
                  <Play className="w-5 h-5" />
                  נגן וידיאו
                </Button>
              </div>
            </div>
          )}

          {evidence.type === "audio" && (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
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
                  <span className="text-gray-700">הקלטת אודיו</span>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Call Details */}
              {evidence.caller && evidence.receiver && (
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">מ:</span>
                    <span>{evidence.caller}</span>
                  </div>
                  <span className="text-gray-400">→</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">אל:</span>
                    <span>{evidence.receiver}</span>
                  </div>
                  <Badge className={`text-xs ${
                    evidence.call_type === 'outgoing' ? 'bg-green-100 text-green-800 border-green-300' :
                    evidence.call_type === 'incoming' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                    'bg-purple-100 text-purple-800 border-purple-300'
                  }`}>
                    {evidence.call_type === 'outgoing' ? 'יוצאת' : 
                     evidence.call_type === 'incoming' ? 'נכנסת' : 'חקירה'}
                  </Badge>
                </div>
              )}
            </div>
          )}

          {/* Evidence Notes */}
          {evidence.evidence_notes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-2 text-right">הערות חקירה:</h4>
              <p className="text-yellow-700 text-sm text-right leading-relaxed">
                {evidence.evidence_notes}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};