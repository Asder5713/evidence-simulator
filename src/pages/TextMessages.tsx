import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Shield, Eye, Phone, Users, Clock, AlertTriangle, Plus, Check } from "lucide-react";
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
    case "intelligence": return "bg-blue-50 border-blue-200";
    case "informant": return "bg-purple-50 border-purple-200";
    case "dispatch": return "bg-red-50 border-red-200";
    case "investigation": return "bg-amber-50 border-amber-200";
    case "forensics": return "bg-green-50 border-green-200";
    case "command": return "bg-cyan-50 border-cyan-200";
    default: return "bg-gray-50 border-gray-200";
  }
};

const getSourceTextColor = (type: string) => {
  switch (type) {
    case "intelligence": return "text-blue-700";
    case "informant": return "text-purple-700";
    case "dispatch": return "text-red-700";
    case "investigation": return "text-amber-700";
    case "forensics": return "text-green-700";
    case "command": return "text-cyan-700";
    default: return "text-gray-700";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical": return "bg-red-100 text-red-800 border-red-300";
    case "urgent": return "bg-orange-100 text-orange-800 border-orange-300";
    case "high": return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "medium": return "bg-blue-100 text-blue-800 border-blue-300";
    default: return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const TextMessages = () => {
  const { isTimeReached, isGameStarted, markPageAsVisited } = useGameContext();
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">ראיות טקסטואליות</h1>
            <p className="text-sm text-gray-600">תקשורת מבצעית - חקירה פלילית</p>
          </div>
        </div>
      </div>

      {/* Chat-like Container */}
      <div className="max-w-4xl mx-auto p-6">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-3">
            {visibleMessages.length > 0 ? visibleMessages.map((message, index) => {
              const SourceIcon = getSourceIcon(message.type);
              const isHistorical = message.id.includes('historical');
              
              return (
                <div 
                  key={message.id}
                  className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className={`max-w-[80%] ${getSourceColor(message.type)} shadow-sm hover:shadow-md transition-all duration-200 ${isHistorical ? 'opacity-75' : ''}`}>
                    <CardContent className="p-4">
                      {/* Message Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 ${getSourceColor(message.type)} rounded-lg border`}>
                            <SourceIcon className={`w-4 h-4 ${getSourceTextColor(message.type)}`} />
                          </div>
                          <div>
                            <p className={`font-medium text-sm ${getSourceTextColor(message.type)}`}>
                              {message.source}
                            </p>
                            <p className="text-xs text-gray-500">{message.sender}</p>
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
                      <div className="bg-white/80 rounded-lg p-3 border border-white/50">
                        <p className="text-gray-800 leading-relaxed text-sm text-right">
                          {message.content}
                        </p>
                      </div>

                      {/* Timestamp */}
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{message.timestamp}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            }) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
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