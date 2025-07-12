import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MessageSquare, Shield, Eye, Phone, Users, Clock, AlertTriangle, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const textEvidence = [
  {
    id: "msg_001",
    source: "יחידת מודיעין",
    sender: "סרן דוד אמיר",
    timestamp: "13.1.2024, 20:15",
    priority: "critical",
    content: "זוהה תנועה חשודה ברחוב הנביאים 12. שני רכבים עם לוחיות מזויפות. יש להכין כוחות מיוחדים.",
    type: "intelligence"
  },
  {
    id: "msg_002", 
    source: "סוכן זהב",
    sender: "מקור חסוי",
    timestamp: "13.1.2024, 21:30",
    priority: "high",
    content: "יוסי כהן תכנן להעביר את הכסף הלילה. המקום: מחסן נטוש ליד הנמל. זמן משוער: 23:00.",
    type: "informant"
  },
  {
    id: "msg_003",
    source: "מוקד 100",
    sender: "קצין תורן",
    timestamp: "13.1.2024, 22:45", 
    priority: "urgent",
    content: "דיווח על ירי באזור הנמל. מספר רב של כוחות נדרש למקום. אמבולנס בדרך.",
    type: "dispatch"
  },
  {
    id: "msg_004",
    source: "יחידת סמויה",
    sender: "חוקר ראשי משה לוי",
    timestamp: "14.1.2024, 00:20",
    priority: "critical",
    content: "מצאנו את גופתו של דני לוי במחסן. זירת רצח ברורה. סימני עינויים. צריך לחסום את כל היציאות מהעיר.",
    type: "investigation"
  },
  {
    id: "msg_005",
    source: "מעבדה פלילית", 
    sender: "ד״ר רחל כהן",
    timestamp: "14.1.2024, 08:45",
    priority: "medium",
    content: "ניתוח ראשוני מגלה כי הרצח בוצע בין 22:30 ל-23:15. נמצאו שרידי DNA זרים בזירה. דרושים 48 שעות לזיהוי מלא.",
    type: "forensics"
  },
  {
    id: "msg_006",
    source: "תחנת משטרה מרכז",
    sender: "סגן ניצב אבי דגן", 
    timestamp: "14.1.2024, 09:15",
    priority: "high",
    content: "אישור מצו מעצר ליוסי כהן וחבריו. כוחות מיוחדים יפעלו בבוקר. צריך לתאם עם יחידת הסמויה.",
    type: "command"
  }
];

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
  const [openEvidence, setOpenEvidence] = useState<string | null>(null);

  const toggleEvidence = (id: string) => {
    setOpenEvidence(openEvidence === id ? null : id);
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
            {textEvidence.map((message, index) => {
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
            })}
          </div>
        </ScrollArea>

        {/* Bottom Note */}
        <div className="mt-8 p-5 bg-gradient-to-r from-gray-800/60 to-slate-800/60 border border-gray-600/50 rounded-xl backdrop-blur-sm shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            </div>
            <div>
              <h3 className="text-amber-300 font-bold text-sm mb-2">הערת חוקר ראשי</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                הודעות אלו מתעדות את השרשרת המבצעית מתחילת החקירה ועד לגילוי הרצח. 
                ניתן לראות בבירור את התקדמות האירועים והקשר הישיר בין האיומים לבצוע הרצח.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextMessages;