import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Shield, Eye, Phone, Users, Clock, AlertTriangle, Plus, Check } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useEvidence } from "@/hooks/use-evidence";
import { evidence } from "@/data/evidence-data";
import { useGameContext } from "@/contexts/GameContext";

const getSourceIcon = (news_type: string) => {
  switch (news_type) {
    case "intelligence": return Shield;
    case "dispatch": return Phone;
    case "investigation": return Users;
    case "forensics": return AlertTriangle;
    case "command": return MessageSquare;
    default: return MessageSquare;
  }
};

const getSourceColor = (news_type: string) => {
  switch (news_type) {
    case "intelligence": return "bg-blue-900/20 border-blue-700/50";
    case "dispatch": return "bg-red-900/20 border-red-700/50";
    case "investigation": return "bg-amber-900/20 border-amber-700/50";
    case "forensics": return "bg-green-900/20 border-green-700/50";
    case "command": return "bg-cyan-900/20 border-cyan-700/50";
    default: return "bg-gray-900/20 border-gray-700/50";
  }
};

const getSourceTextColor = (news_type: string) => {
  switch (news_type) {
    case "intelligence": return "text-blue-300";
    case "dispatch": return "text-red-300";
    case "investigation": return "text-amber-300";
    case "forensics": return "text-green-300";
    case "command": return "text-cyan-300";
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

const TextMessages = () => {
  const { isTimeReached, isGameStarted, markPageAsVisited } = useGameContext();
  const { addEvidence, isEvidenceSelected } = useEvidence();
  
  // Load viewed messages from localStorage
  const [viewedMessages, setViewedMessages] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('viewed-messages');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  // Mark page as visited when component mounts
  useEffect(() => {
    markPageAsVisited('texts');
  }, [markPageAsVisited]);

  // Filter messages that should be visible based on game time
  const visibleMessages = useMemo(() => {
    if (!isGameStarted) return [];
    return evidence.filter(item => 
      ['intelligence', 'dispatch', 'investigation', 'forensics', 'command'].includes(item.news_type) &&
      isTimeReached(`${item.production_date} ${item.production_time}`)
    );
  }, [isGameStarted, isTimeReached]);

  const handleAddEvidence = (message: any) => {
    addEvidence(message);
    // Mark as viewed when adding to evidence
    const newViewedMessages = new Set([...viewedMessages, message.id]);
    setViewedMessages(newViewedMessages);
    localStorage.setItem('viewed-messages', JSON.stringify(Array.from(newViewedMessages)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800/90 to-slate-800/90 border-b border-gray-700/50 p-4 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-400/30">
            <MessageSquare className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">ראיות טקסטואליות</h1>
            <p className="text-sm text-gray-300">תקשורת מבצעית - חקירה פלילית</p>
          </div>
        </div>
      </div>

      {/* Chat-like Container */}
      <div className="max-w-4xl mx-auto p-6">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-3">
            {visibleMessages.length > 0 ? visibleMessages.map((message, index) => {
              const SourceIcon = getSourceIcon(message.news_type);
              const isHistorical = message.id.includes('historical');
              
              return (
                <div 
                  key={message.id}
                  className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className={`max-w-[80%] ${getSourceColor(message.news_type)} shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm ${isHistorical ? 'opacity-80' : ''}`}>
                    <CardContent className="p-4">
                      {/* Message Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 ${getSourceColor(message.news_type)} rounded-lg border`}>
                            <SourceIcon className={`w-4 h-4 ${getSourceTextColor(message.news_type)}`} />
                          </div>
                          {!viewedMessages.has(message.id) && (
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" title="לא נקרא" />
                          )}
                          <div>
                            <p className={`font-medium text-sm ${getSourceTextColor(message.news_type)}`}>
                              {message.formation}
                            </p>
                            <p className="text-xs text-gray-400">{message.source}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs border ${getExceptionColor(message.exception_level)}`}>
                            רמה {message.exception_level}
                          </Badge>
                          <Button
                            variant={isEvidenceSelected(message.id) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleAddEvidence(message)}
                            disabled={isEvidenceSelected(message.id)}
                            className="gap-1 text-xs"
                          >
                            {isEvidenceSelected(message.id) ? (
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
                      </div>

                      {/* Message Content */}
                      <div className="bg-black/30 rounded-lg p-3 border border-white/10">
                        <h4 className="text-white font-medium text-sm mb-2 text-right">{message.title}</h4>
                        <p className="text-gray-100 leading-relaxed text-sm text-right">
                          {message.content}
                        </p>
                        {message.comments && (
                          <div className="mt-2 pt-2 border-t border-gray-600/30">
                            <span className="text-gray-400 text-xs">הערה:</span>
                            <p className="text-gray-200 text-xs mt-1 text-right">{message.comments}</p>
                          </div>
                        )}
                      </div>

                      {/* Timestamp */}
                      <div className="space-y-1 mt-2 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>הופק: {message.production_date} {message.production_time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-red-300" />
                          <span className="text-red-300">מקרה: {message.incident_date} {message.incident_time}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            }) : (
              <div className="flex items-center justify-center h-64 text-gray-400">
                <p>אין הודעות זמינות עדיין</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TextMessages;