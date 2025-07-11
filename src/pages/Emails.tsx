import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Search, AlertCircle, Clock, Paperclip, Star, Archive, Trash2, Reply, Forward, MoreHorizontal } from "lucide-react";
const emailEvidence = [{
  id: "email_001",
  from: "yossi.cohen@gmail.com",
  to: "danny.levi@outlook.com",
  subject: "לגבי החוב - דחוף!",
  date: "13.1.2024, 21:45",
  priority: "high",
  content: `שלום דני,

אני יודע איפה אתה גר ואני יודע איפה הילדים שלך לומדים. 

אם לא תחזיר לי את הכסף עד סוף השבוע, אני אדאג שתתחרט על כך שלא פיתחת איתי את העסקה. 

זה לא איום, זו הבטחה.

יוסי`,
  attachments: 0,
  threat_level: "critical"
}, {
  id: "email_002",
  from: "sami.cohen.business@protonmail.com",
  to: "miki.even@secure-mail.net",
  subject: "עדכון תכנית - ינואר",
  date: "10.1.2024, 14:22",
  priority: "medium",
  content: `מיקי,

המשלוח מקולומביה יגיע ביום רביעי לנמל אשדוד. 
דאג שהאנשים יהיו מוכנים ב-03:00 בבוקר.

קונטיינר מספר: MSKU-4829671

תיזהר עם המכס, יש לי חשד שהם עלו עלינו.

ס.`,
  attachments: 1,
  threat_level: "high"
}, {
  id: "email_003",
  from: "danny.levi@outlook.com",
  to: "police.reports@gov.il",
  subject: "תלונה על איומים - דחוף",
  date: "14.1.2024, 08:15",
  priority: "high",
  content: `שלום,

אני דני לוי, בעל חנות תכשיטים ברחוב רוטשילד 45, תל-אביב.

אני מקבל איומים מיוסי כהן כבר שבועיים. הוא דורש ממני לשלם 15,000 שקל "כספי הגנה" כל חודש.

אני מפחד על המשפחה שלי. אנא עזרו לי.

בתודה,
דני לוי
054-9876543`,
  attachments: 0,
  threat_level: "medium"
}];
const Emails = () => {
  const [selectedEmail, setSelectedEmail] = useState(emailEvidence[0]);

  return <div className="min-h-screen bg-slate-900 pb-20">
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
        {/* Sidebar */}
        

        {/* Email List */}
        <div className="flex-1 flex">
          <div className="w-1/2 border-r border-slate-700">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-2">
                {emailEvidence.map(email => <Card 
                  key={email.id} 
                  className={`border-slate-700 hover:bg-slate-700/50 cursor-pointer ${
                    selectedEmail.id === email.id ? 'bg-slate-700/70 border-blue-500' : 'bg-slate-800/50'
                  }`}
                  onClick={() => setSelectedEmail(email)}
                >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${email.threat_level === 'critical' ? 'bg-red-500' : email.threat_level === 'high' ? 'bg-orange-500' : 'bg-yellow-500'}`} />
                          <span className="text-sm font-medium text-slate-200">{email.from}</span>
                        </div>
                        <span className="text-xs text-slate-400">{email.date}</span>
                      </div>
                      
                      <h3 className="text-sm font-medium text-slate-100 mb-1">{email.subject}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{email.content.substring(0, 100)}...</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          {email.attachments > 0 && <Paperclip className="w-3 h-3 text-slate-400" />}
                          <Badge className={`text-xs ${email.threat_level === 'critical' ? 'bg-red-900 text-red-200' : email.threat_level === 'high' ? 'bg-orange-900 text-orange-200' : 'bg-yellow-900 text-yellow-200'}`}>
                            {email.threat_level === 'critical' ? 'איום קריטי' : email.threat_level === 'high' ? 'איום גבוה' : 'חשיבות בינונית'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </ScrollArea>
          </div>

          {/* Email Content */}
          <div className="w-1/2 p-6">
            <Card className="bg-slate-800/50 border-slate-700 h-full">
              <CardHeader className="border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-slate-100">{selectedEmail.subject}</CardTitle>
                  <div className="flex items-center gap-2">
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
                
                <div className="mt-4 p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span className="text-red-300 font-medium text-sm">הערת חוקר:</span>
                  </div>
                  <p className="text-red-200 text-sm mt-1">
                    אימייל איום ישירות על הקורבן וביתו. נשלח יומיים לפני הרצח. 
                    מהווה ראיה מרכזית לכוונה פלילית.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default Emails;