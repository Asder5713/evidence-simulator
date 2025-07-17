import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  Eye, 
  MapPin,
  Building,
  Target,
  Calendar,
  FileText,
  Fingerprint,
  Camera,
  Phone,
  Skull,
  UserX,
  Clock,
  Globe
} from "lucide-react";

const Overview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-20">
      {/* Header with dark gradient overlay */}
      <div className="relative py-12 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-red-900/20" />
        <div className="relative text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Skull className="w-8 h-8 text-red-400" />
            <h1 className="text-5xl font-black bg-gradient-to-r from-red-400 via-red-300 to-orange-400 bg-clip-text text-transparent">
              "הנשרים השחורים"
            </h1>
            <Skull className="w-8 h-8 text-red-400" />
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-4 max-w-4xl mx-auto">
            <p className="text-red-200 text-lg font-medium">
              ארגון פשע בינלאומי - רמת סיכון קריטית
            </p>
            <p className="text-slate-300 text-sm mt-2">
              הערכת מצב מודיעינית • עדכון אחרון: 16.1.2024
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Critical Info Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-red-900/80 to-red-800/60 border border-red-700/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <UserX className="w-6 h-6 text-red-300" />
              <div>
                <p className="text-red-100 font-bold text-xl">45</p>
                <p className="text-red-300 text-sm">חברים פעילים</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-900/80 to-orange-800/60 border border-orange-700/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-orange-300" />
              <div>
                <p className="text-orange-100 font-bold text-xl">3</p>
                <p className="text-orange-300 text-sm">תאי פעילות</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/80 to-purple-800/60 border border-purple-700/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-purple-300" />
              <div>
                <p className="text-purple-100 font-bold text-xl">12</p>
                <p className="text-purple-300 text-sm">מעצרים השנה</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-900/80 to-yellow-800/60 border border-yellow-700/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-300" />
              <div>
                <p className="text-yellow-100 font-bold text-xl">גבוהה</p>
                <p className="text-yellow-300 text-sm">רמת סיכון</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Investigation Brief - Large Card */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-slate-800/80 to-slate-700/60 rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-slate-100">
                  <FileText className="w-6 h-6 text-blue-400" />
                  מידע מודיעיני - רקע החקירה
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="bg-slate-900/60 border border-slate-600/30 rounded-lg p-5">
                  <h3 className="text-red-300 font-bold text-lg mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    פרופיל הארגון
                  </h3>
                  <div className="space-y-4 text-slate-300 leading-relaxed">
                    <p className="border-l-4 border-red-500/50 pl-4">
                      <strong className="text-red-300">מנהיג:</strong> שמואל "סמי" כהן (52), נמלט מהמשפט בארה"ב מזה שנתיים. 
                      לפני בריחתו ניהל קזינו בלס וגאס והואשם בהלבנת הון של 50 מיליון דולר. בישראל מזה 3 שנים, 
                      מבוקש בינלאומית על הלבנת הון, סחר בסמים וסחר בנשק. ידוע כאלים ובעל קשרים נרחבים במזרח אירופה.
                    </p>
                    
                    <p className="border-l-4 border-orange-500/50 pl-4">
                      <strong className="text-orange-300">מבנה:</strong> שלושה תאים עיקריים - צפון (חיפה ועכו), מרכז (תל-אביב ובת-ים), 
                      דרום (באר שבע ואילת). כל תא מונה 12-18 חברים ופועל עצמאית תחת פיקוד מרכזי. התאים מתחלקים למחלקות: 
                      סמים, נשק, הלבנת הון והגנה. יש גם תא סייבר מיוחד של 5 חברים המטפל בפעילות הדיגיטלית.
                    </p>
                    
                    <p className="border-l-4 border-purple-500/50 pl-4">
                      <strong className="text-purple-300">פעילות:</strong> ייבוא קוקאין מקולומביה דרך נמל אשדוד (משלוחים של 200-500 קג), 
                      הפעלת 4 מעבדות סמים סינתטיים באזור התעשייה, רשת של 12 אתרי הימורים בלתי חוקיים ברחבי הארץ, 
                      מכירת כלי נשק מגרוזיה ואוקראינה, וגביית כספי הגנה מ-85 עסקים בתל-אביב וחיפה. מחזור כספי שנתי מוערך ב-50 מיליון שקל.
                    </p>
                    
                    <p className="border-l-4 border-yellow-500/50 pl-4">
                      <strong className="text-yellow-300">החקירה הנוכחית:</strong> רצח דני לוי (15.1.2024) - בעל חנות תכשיטים יוקרתית 
                      ברוטשילד שסירב לשלם כספי הגנה של 15,000 שקל חודשית. לפני הרצח קיבל איומים במשך שבועיים. 
                      נרצח ב-3 יריות בביתו בנוכחות אשתו וילדיו. החשוד העיקרי: יוסי כהן (28), בן המנהיג, ששהה באזור בזמן הרצח.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Suspects - Sidebar */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm h-full">
              <CardHeader className="bg-gradient-to-r from-red-900/60 to-red-800/40 rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-red-100">
                  <Eye className="w-6 h-6" />
                  חשודים מרכזיים
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {/* Suspect Cards */}
                <div className="bg-gradient-to-r from-red-900/40 to-red-800/20 border border-red-700/40 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-red-900/60 rounded-full flex items-center justify-center">
                      <Skull className="w-6 h-6 text-red-300" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-red-200 font-bold">שמואל "סמי" כהן</h4>
                      <p className="text-red-300 text-sm">מנהיג הארגון</p>
                      <p className="text-slate-300 text-xs mt-1">גיל 52 • נמלט • מבוקש בינלאומית</p>
                      <Badge className="mt-2 bg-red-800/60 text-red-200 border-red-700">
                        מסוכן ביותר
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-900/40 to-orange-800/20 border border-orange-700/40 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-orange-900/60 rounded-full flex items-center justify-center">
                      <UserX className="w-6 h-6 text-orange-300" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-orange-200 font-bold">יוסי כהן</h4>
                      <p className="text-orange-300 text-sm">חשוד עיקרי ברצח</p>
                      <p className="text-slate-300 text-xs mt-1">גיל 28 • בן המנהיג</p>
                      <Badge className="mt-2 bg-orange-800/60 text-orange-200 border-orange-700">
                        תיק פעיל
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-900/40 to-yellow-800/20 border border-yellow-700/40 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-yellow-900/60 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-yellow-300" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-yellow-200 font-bold">מיכאל "מיקי" אבן</h4>
                      <p className="text-yellow-300 text-sm">סגן ומנהל תא המרכז</p>
                      <p className="text-slate-300 text-xs mt-1">גיל 45 • אזור תל-אביב</p>
                      <Badge className="mt-2 bg-yellow-800/60 text-yellow-200 border-yellow-700">
                        במעקב
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator className="bg-slate-600/30" />

                <div className="space-y-2">
                  <h4 className="text-slate-200 font-medium text-sm">סטטוס חקירה</h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center p-2 bg-slate-700/30 rounded">
                      <p className="text-slate-300">ראיות</p>
                      <p className="text-blue-300 font-bold">9</p>
                    </div>
                    <div className="text-center p-2 bg-slate-700/30 rounded">
                      <p className="text-slate-300">עדויות</p>
                      <p className="text-green-300 font-bold">7</p>
                    </div>
                    <div className="text-center p-2 bg-slate-700/30 rounded">
                      <p className="text-slate-300">צווים</p>
                      <p className="text-purple-300 font-bold">3</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Intelligence Assessments - Full Width */}
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-slate-800/80 to-slate-700/60">
            <CardTitle className="flex items-center gap-3 text-slate-100">
              <Shield className="w-6 h-6 text-blue-400" />
              הערכות מודיעיניות מיחידות החקירה
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Investigation Unit */}
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-700/30 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-900/60 rounded-lg flex items-center justify-center">
                    <Fingerprint className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-blue-200 font-bold">יחידת חקירות פליליות</h3>
                    <div className="flex items-center gap-2 text-xs text-blue-400">
                      <Clock className="w-3 h-3" />
                      <span>עודכן: 16.1.2024, 14:30</span>
                    </div>
                  </div>
                </div>
                <ScrollArea className="h-32">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    "הארגון מפגין רמת ארגון גבוהה ומשמעת פנימית קפדנית. דפוסי הפעולה מעידים על הכשרה מקצועית 
                    של החברים ועל תכנון מוקדם של הפעילות הפלילית. המבנה ההיררכי ברור ומקשה על חדירה. 
                    נמצאו עדויות לקשרים עם ארגונים פליליים באירופה ובאמריקה הדרומית. הארגון משתמש בטכנולוגיות 
                    מתקדמות להסתרת עקבות דיגיטליים."
                  </p>
                </ScrollArea>
                <Badge className="mt-3 bg-red-900/60 text-red-200 border-red-700">
                  רמת איום: גבוהה
                </Badge>
              </div>

              {/* Intelligence Unit */}
              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-700/30 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-900/60 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-purple-200 font-bold">יחידת המודיעין</h3>
                    <div className="flex items-center gap-2 text-xs text-purple-400">
                      <Clock className="w-3 h-3" />
                      <span>עודכן: 16.1.2024, 12:15</span>
                    </div>
                  </div>
                </div>
                <ScrollArea className="h-32">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    "מעקב מתמשך מגלה שהארגון מתכנן להרחיב את פעילותו לאזור השפלה. זוהו מפגשים בין חברי 
                    הארגון לבין נציגי רשויות מקומיות, המעלים חשש להתערבות בפוליטיקה המקומית. הארגון 
                    מגלה יכולת הסתגלות גבוהה ומשנה שיטות פעולה לאחר כל מעצר. יש צורך במשאבים נוספים 
                    למעקב טכנולוגי מתקדם."
                  </p>
                </ScrollArea>
                <Badge className="mt-3 bg-orange-900/60 text-orange-200 border-orange-700">
                  מגמה: הרחבת פעילות
                </Badge>
              </div>

              {/* Cyber Unit */}
              <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-700/30 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-900/60 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-green-300" />
                  </div>
                  <div>
                    <h3 className="text-green-200 font-bold">יחידת הסייבר</h3>
                    <div className="flex items-center gap-2 text-xs text-green-400">
                      <Clock className="w-3 h-3" />
                      <span>עודכן: 16.1.2024, 16:45</span>
                    </div>
                  </div>
                </div>
                <ScrollArea className="h-32">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    "הארגון משתמש באפליקציות מוצפנות ובתקשורת מאובטחת ברמה גבוהה. זוהה שימוש בכספי דיגיטליים 
                    להלבנת הון ובשרתים זרים להסתרת נתונים. החברים עברו הכשרה בטכנולוגיות אנונימיות ובשימוש 
                    ב-VPN מתקדמים. פעילות הארגון ברשתות החברתיות מינימלית ומבוקרת היטב. דרושים כלים 
                    טכנולוגיים מתקדמים לפריצת ההצפנה."
                  </p>
                </ScrollArea>
                <Badge className="mt-3 bg-blue-900/60 text-blue-200 border-blue-700">
                  רמת הצפנה: מתקדמת
                </Badge>
              </div>

              {/* Surveillance Unit */}
              <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 border border-yellow-700/30 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-yellow-900/60 rounded-lg flex items-center justify-center">
                    <Camera className="w-5 h-5 text-yellow-300" />
                  </div>
                  <div>
                    <h3 className="text-yellow-200 font-bold">יחידת המעקבים</h3>
                    <div className="flex items-center gap-2 text-xs text-yellow-400">
                      <Clock className="w-3 h-3" />
                      <span>עודכן: 16.1.2024, 11:20</span>
                    </div>
                  </div>
                </div>
                <ScrollArea className="h-32">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    "חברי הארגון מפגינים מודעות גבוהה לנוכחות כוחות הביטחון ומשנים מסלולי תנועה באופן תדיר. 
                    המפגשים מתקיימים במקומות ציבוריים צפופים או במתקנים פרטיים עם מערכות אבטחה מתקדמות. 
                    זוהה שימוש ברכבים גנובים ובהחלפת לוחיות זיהוי. המעקב הפיזי מסובך עקב שימוש בטכניקות 
                    נגד-מעקב מקצועיות."
                  </p>
                </ScrollArea>
                <Badge className="mt-3 bg-yellow-900/60 text-yellow-200 border-yellow-700">
                  קושי מעקב: גבוה
                </Badge>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;