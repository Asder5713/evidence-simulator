import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MessageSquare, Shield, Eye, Phone, Users, Clock, AlertTriangle, ChevronDown, ChevronRight, Plus, Check } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useEvidence } from "@/hooks/use-evidence";
import { textEvidence } from "@/data/evidence-data";
import { useGameContext } from "@/contexts/GameContext";

const getSourceIcon = (type: string) => {
  switch (type) {
    case "intelligence": return Shield;
    case "informant": return Eye;
    case "dispatch": return Phone;
    case "investigation": return Users;
    case "forensics": return AlertTriangle;
    case "command": return MessageSquare;
    default: return MessageSquare;
  }
};

const getSourceColor = (type: string) => {
  switch (type) {
    case "intelligence": return "from-indigo-900/40 to-indigo-800/30 border-indigo-600/40 shadow-indigo-900/20";
    case "informant": return "from-violet-900/40 to-violet-800/30 border-violet-600/40 shadow-violet-900/20";
    case "dispatch": return "from-rose-900/40 to-rose-800/30 border-rose-600/40 shadow-rose-900/20";
    case "investigation": return "from-amber-900/40 to-amber-800/30 border-amber-600/40 shadow-amber-900/20";
    case "forensics": return "from-emerald-900/40 to-emerald-800/30 border-emerald-600/40 shadow-emerald-900/20";
    case "command": return "from-sky-900/40 to-sky-800/30 border-sky-600/40 shadow-sky-900/20";
    default: return "from-gray-900/40 to-gray-800/30 border-gray-600/40 shadow-gray-900/20";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical": return "bg-red-500/20 text-red-300 border-red-500/30";
    case "urgent": return "bg-orange-500/20 text-orange-300 border-orange-500/30";
    case "high": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    case "medium": return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
    default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  }
};

const TextMessages = () => {
  const { isTimeReached, isGameStarted, markPageAsVisited } = useGameContext();
  const [openEvidence, setOpenEvidence] = useState<string | null>(null);
  const { addEvidence, isEvidenceSelected } = useEvidence();

  
  // Mark page as visited when component mounts
  useEffect(() => {
    markPageAsVisited('texts');
  }, [markPageAsVisited]);

  // Filter messages that should be visible based on game time
  const visibleMessages = useMemo(() => {
    if (!isGameStarted) return [];
    return textEvidence.filter(message => isTimeReached(message.timestamp));
  }, [isGameStarted, isTimeReached]);

  const toggleEvidence = (id: string) => {
    setOpenEvidence(openEvidence === id ? null : id);
  };

  const handleAddEvidence = (message: any) => {
    addEvidence({
      id: message.id,
      type: 'text',
      title: `${message.source} - ${message.sender}`,
      source: message.source,
      timestamp: message.timestamp,
      priority: message.priority,
      content: message.content
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-slate-800 border-b border-gray-600 p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <MessageSquare className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">ראיות טקסטואליות</h1>
            <p className="text-sm text-gray-300">תקשורת מבצעית - חקירה פלילית</p>
          </div>
        </div>
      </div>

      {/* Evidence Container */}
      <div className="max-w-4xl mx-auto p-6">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-4">
            {visibleMessages.length > 0 ? visibleMessages.map((message, index) => {
              const SourceIcon = getSourceIcon(message.type);
              const isOpen = openEvidence === message.id;
              
              return (
                <Collapsible
                  key={message.id}
                  open={isOpen}
                  onOpenChange={() => toggleEvidence(message.id)}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className={`bg-gradient-to-br ${getSourceColor(message.type)} border backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300`}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-white/10 rounded-lg">
                              <SourceIcon className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-right">
                              <CardTitle className="text-white text-lg font-bold">
                                {message.source} - {message.sender}
                              </CardTitle>
                              <div className="flex items-center gap-2 text-xs text-gray-300 mt-1">
                                <Clock className="w-3 h-3" />
                                <span>{message.timestamp}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={`text-xs border ${getPriorityColor(message.priority)}`}>
                              {message.priority === 'critical' ? 'קריטי' : 
                               message.priority === 'urgent' ? 'דחוף' :
                               message.priority === 'high' ? 'גבוה' : 'בינוני'}
                            </Badge>
                            <Button
                              variant={isEvidenceSelected(message.id) ? "default" : "outline"}
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddEvidence(message);
                              }}
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
                            {isOpen ? (
                              <ChevronDown className="w-5 h-5 text-white transition-transform" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-white transition-transform" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <CardContent className="pt-0 pb-4">
                        <div className="bg-black/30 rounded-lg p-4 border border-white/20">
                          <p className="text-gray-100 leading-relaxed font-medium text-right">
                            {message.content}
                          </p>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              );
            }) : (
              <div className="flex items-center justify-center h-64 text-gray-400">
                <p>אין הודעות זמינות עדיין</p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Bottom Note */}
      </div>
    </div>
  );
};

export default TextMessages;