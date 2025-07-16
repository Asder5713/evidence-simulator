import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Search, AlertCircle, Clock, Paperclip, Star, Archive, Trash2, Reply, Forward, MoreHorizontal, Plus, Check } from "lucide-react";
import { useEvidence } from "@/hooks/use-evidence";
import { evidence } from "@/data/evidence-data";
import { useGameContext } from "@/contexts/GameContext";
import { GlossaryEnhancer } from "@/components/GlossaryEnhancer";

const Emails = () => {
  const { isTimeReached, isGameStarted, markPageAsVisited } = useGameContext();
  const { addEvidence, isEvidenceSelected } = useEvidence();
  
  // Load viewed emails from localStorage
  const [viewedEmails, setViewedEmails] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('viewed-emails');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  
  // Mark page as visited when component mounts
  useEffect(() => {
    markPageAsVisited('emails');
  }, [markPageAsVisited]);

  // Filter emails that should be visible based on game time
  const visibleEmails = useMemo(() => {
    if (!isGameStarted) return [];
    return evidence.filter(item => 
      item.news_type === 'email' && 
      isTimeReached(`${item.production_date} ${item.production_time}`)
    );
  }, [isGameStarted, isTimeReached]);

  const [selectedEmail, setSelectedEmail] = useState(visibleEmails[0] || evidence.find(e => e.news_type === 'email'));

  const handleEmailClick = (email: any) => {
    setSelectedEmail(email);
    const newViewedEmails = new Set([...viewedEmails, email.id]);
    setViewedEmails(newViewedEmails);
    localStorage.setItem('viewed-emails', JSON.stringify(Array.from(newViewedEmails)));
  };

  const handleAddEvidence = (email: any) => {
    addEvidence(email);
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
          {visibleEmails.length > 0 ? (
          <>
          <div className="w-1/2 border-r border-slate-700">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-2">
                {visibleEmails.map(email => (
                  <Card 
                    key={email.id} 
                    className={`border-slate-700 hover:bg-slate-700/50 cursor-pointer ${
                      selectedEmail.id === email.id ? 'bg-slate-700/70 border-blue-500' : 'bg-slate-800/50'
                    }`}
                    onClick={() => handleEmailClick(email)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            email.exception_level >= 4 ? 'bg-red-500' : 
                            email.exception_level === 3 ? 'bg-orange-500' : 'bg-yellow-500'
                          }`} />
                          {!viewedEmails.has(email.id) && (
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" title="לא נקרא" />
                          )}
                          <span className="text-sm font-medium text-slate-200">{email.source}</span>
                        </div>
                        <span className="text-xs text-slate-400">{email.production_date} {email.production_time}</span>
                      </div>
                      
                      <h3 className="text-sm font-medium text-slate-100 mb-1">{email.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{email.content.substring(0, 100)}...</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${
                            email.exception_level === 5 ? 'bg-red-900 text-red-200' : 
                            email.exception_level === 4 ? 'bg-orange-900 text-orange-200' : 
                            'bg-yellow-900 text-yellow-200'
                          }`}>
                            רמה {email.exception_level}
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
                  <CardTitle className="text-slate-100">{selectedEmail.title}</CardTitle>
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
                    <span className="text-slate-400">מקור:</span>
                    <span className="text-slate-200">{selectedEmail.source}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">מערך:</span>
                    <span className="text-slate-200">{selectedEmail.formation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-slate-400">תאריך ייצור: {selectedEmail.production_date} {selectedEmail.production_time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-blue-400" />
                    <span className="text-slate-400">תאריך המקרה: {selectedEmail.incident_date} {selectedEmail.incident_time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">רמת חריגות:</span>
                    <Badge className={`text-xs ${
                      selectedEmail.exception_level === 5 ? 'bg-red-900 text-red-200' : 
                      selectedEmail.exception_level === 4 ? 'bg-orange-900 text-orange-200' : 
                      'bg-yellow-900 text-yellow-200'
                    }`}>
                      {selectedEmail.exception_level}
                    </Badge>
                  </div>
                  {selectedEmail.comments && (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">הערות:</span>
                      <span className="text-slate-200">{selectedEmail.comments}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="bg-slate-900/60 border border-slate-600/30 rounded-lg p-4">
                  <div className="text-slate-300 text-sm whitespace-pre-wrap font-sans leading-relaxed">
                    <GlossaryEnhancer content={selectedEmail.content} />
                  </div>
                </div>
              </CardContent>
            </Card>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                <p>אין אימיילים זמינים עדיין</p>
              </div>
            )}
          </div>
          </>
          ) : (
            /* Empty State Design */
            <div className="flex-1 flex items-center justify-center">
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm p-12 max-w-md">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-200">אין אימיילים זמינים</h3>
                  <p className="text-slate-400 leading-relaxed">
                    טרם הגיעו אימיילים למערכת.<br />
                    האימיילים יופיעו כאשר יגיע זמנם במהלך החקירה.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span>ממתין לעדכונים...</span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Emails;