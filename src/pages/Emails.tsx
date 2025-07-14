import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Search, AlertCircle, Clock, Paperclip, Star, Archive, Trash2, Reply, Forward, MoreHorizontal, Plus, Check, AlertTriangle } from "lucide-react";
import { useEvidence } from "@/hooks/use-evidence";
import { emailEvidence } from "@/data/evidence-data";
import { useGameContext } from "@/contexts/GameContext";

const Emails = () => {
  const { isTimeReached, isGameStarted, markPageAsVisited, isEvidenceUnseen } = useGameContext();
  const { addEvidence, isEvidenceSelected } = useEvidence();

  
  // Mark page as visited when component mounts
  useEffect(() => {
    if (isGameStarted) {
      markPageAsVisited('emails');
    }
  }, [markPageAsVisited, isGameStarted]);

  // Filter emails that should be visible based on game time
  const visibleEmails = useMemo(() => {
    if (!isGameStarted) return [];
    return emailEvidence.filter(email => isTimeReached(email.date));
  }, [isGameStarted, isTimeReached]);

  const [selectedEmail, setSelectedEmail] = useState(visibleEmails[0] || emailEvidence[0]);

  const handleAddEvidence = (email: any) => {
    addEvidence({
      id: email.id,
      type: 'email',
      title: email.subject,
      source: email.from,
      timestamp: email.date,
      priority: email.threat_level,
      content: email.content
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 pb-20">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-bold text-slate-100">ראיות דיגיטליות - אימיילים</h1>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Email List */}
        <div className="flex-1 flex">
          <div className="w-1/2 border-r border-slate-700">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-2">
                {visibleEmails.map(email => (
                  <Card 
                    key={email.id} 
                    className={`border-slate-700 hover:bg-slate-700/50 cursor-pointer ${
                      selectedEmail.id === email.id ? 'bg-slate-700/70 border-blue-500' : 'bg-slate-800/50'
                    }`}
                    onClick={() => setSelectedEmail(email)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            email.threat_level === 'critical' ? 'bg-red-500' : 
                            email.threat_level === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                          }`} />
                          <span className="text-sm font-medium text-slate-200">{email.from}</span>
                          {isEvidenceUnseen(email.date, 'emails') && (
                            <AlertTriangle className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                        <span className="text-xs text-slate-400">{email.date}</span>
                      </div>
                      
                      <h3 className="text-sm font-medium text-slate-100 mb-1">{email.subject}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{email.content.substring(0, 100)}...</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          {email.attachments > 0 && <Paperclip className="w-3 h-3 text-slate-400" />}
                          <Badge className={`text-xs ${
                            email.threat_level === 'critical' ? 'bg-red-900 text-red-200' : 
                            email.threat_level === 'high' ? 'bg-orange-900 text-orange-200' : 
                            'bg-yellow-900 text-yellow-200'
                          }`}>
                            {email.threat_level === 'critical' ? 'איום קריטי' : 
                             email.threat_level === 'high' ? 'איום גבוה' : 'חשיבות בינונית'}
                          </Badge>
                        </div>
                        <Button
                          variant={isEvidenceSelected(email.id) ? "default" : "outline"}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddEvidence(email);
                          }}
                          disabled={isEvidenceSelected(email.id)}
                          className="gap-1 text-xs"
                        >
                          {isEvidenceSelected(email.id) ? (
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Email Content */}
          <div className="w-1/2 p-6">
            {selectedEmail ? (
            <Card className="bg-slate-800/50 border-slate-700 h-full">
              <CardHeader className="border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-slate-100">{selectedEmail.subject}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={isEvidenceSelected(selectedEmail.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAddEvidence(selectedEmail)}
                      disabled={isEvidenceSelected(selectedEmail.id)}
                      className="gap-2"
                    >
                      {isEvidenceSelected(selectedEmail.id) ? (
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
                    <Button variant="ghost" size="sm">
                      <Reply className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Forward className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">מאת:</span>
                    <span className="text-slate-200">{selectedEmail.from}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">אל:</span>
                    <span className="text-slate-200">{selectedEmail.to}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-slate-400">{selectedEmail.date}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="bg-slate-900/60 border border-slate-600/30 rounded-lg p-4">
                  <pre className="text-slate-300 text-sm whitespace-pre-wrap font-sans leading-relaxed">
                    {selectedEmail.content}
                  </pre>
                </div>
              </CardContent>
            </Card>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                <p>אין אימיילים זמינים עדיין</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emails;