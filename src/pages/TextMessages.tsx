import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Shield, Eye, Phone, Users, Clock, AlertTriangle } from "lucide-react";

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
    case "intelligence": return "from-blue-900/30 to-blue-800/20 border-blue-700/30";
    case "informant": return "from-purple-900/30 to-purple-800/20 border-purple-700/30";
    case "dispatch": return "from-red-900/30 to-red-800/20 border-red-700/30";
    case "investigation": return "from-orange-900/30 to-orange-800/20 border-orange-700/30";
    case "forensics": return "from-green-900/30 to-green-800/20 border-green-700/30";
    case "command": return "from-yellow-900/30 to-yellow-800/20 border-yellow-700/30";
    default: return "from-slate-900/30 to-slate-800/20 border-slate-700/30";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical": return "bg-red-900 text-red-200";
    case "urgent": return "bg-orange-900 text-orange-200";
    case "high": return "bg-yellow-900 text-yellow-200";
    case "medium": return "bg-blue-900 text-blue-200";
    default: return "bg-slate-900 text-slate-200";
  }
};

const TextMessages = () => {
  return (
    <div className="min-h-screen bg-slate-900 pb-20">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-blue-400" />
          <h1 className="text-xl font-bold text-slate-100">ראיות טקסטואליות - תקשורת מבצעית</h1>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto p-6">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-4">
            {textEvidence.map((message, index) => {
              const SourceIcon = getSourceIcon(message.type);
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={message.id}
                  className={`flex ${isEven ? 'justify-start' : 'justify-end'} animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className={`max-w-2xl bg-gradient-to-br ${getSourceColor(message.type)} border backdrop-blur-sm`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <SourceIcon className="w-4 h-4 text-slate-300" />
                          <span className="text-sm font-medium text-slate-200">{message.source}</span>
                        </div>
                        <Badge className={`text-xs ${getPriorityColor(message.priority)}`}>
                          {message.priority === 'critical' ? 'קריטי' : 
                           message.priority === 'urgent' ? 'דחוף' :
                           message.priority === 'high' ? 'גבוה' : 'בינוני'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>{message.sender}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{message.timestamp}</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-slate-300 leading-relaxed">{message.content}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Bottom Note */}
        <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-amber-400 font-medium text-sm mb-1">הערת חוקר ראשי</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
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