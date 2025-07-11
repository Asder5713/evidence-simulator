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
  TrendingUp,
  Calendar,
  FileText,
  Fingerprint,
  Camera,
  Phone
} from "lucide-react";

const Overview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-20 p-6">
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          תיק חקירה: ארגון פשע "הנשרים השחורים"
        </h1>
        <p className="text-muted-foreground">
          הערכת מצב מודיעינית והערכות יחידות החקירה
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Investigation Summary */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              רקע החקירה - ארגון "הנשרים השחורים"
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <p className="text-sm leading-relaxed">
                ארגון הפשע "הנשרים השחורים" הוא ארגון פלילי בינלאומי הפועל בישראל מזה כשלוש שנים. 
                הארגון מתמחה בהלבנת הון, סחר בסמים, וסחר בנשק. מנהיג הארגון, שמואל "סמי" כהן, 
                בן 52, נמלט מהמשפט בארה"ב ומתחבא ברחבי ישראל ומזרח אירופה.
              </p>
              
              <p className="text-sm leading-relaxed">
                הארגון מונה כ-45 חברים פעילים בישראל, מחולקים לשלוש תאים עיקריים: תא הצפון (חיפה ואזור הצפון), 
                תא המרכז (תל-אביב וגוש דן), ותא הדרום (באר שבע והנגב). כל תא פועל באופן עצמאי יחסית אך מקבל 
                הוראות מהמפקדה המרכזית הממוקמת במזרח תל-אביב.
              </p>
              
              <p className="text-sm leading-relaxed">
                פעילות הארגון כוללת ייבוא סמים מאמריקה הדרומית דרך נמל אשדוד, הפעלת בתי מרקחת בלתי חוקיים, 
                וניהול רשת הימורים בלתי חוקיים. בנוסף, הארגון מעורב במכירת נשק לארגונים פליליים נוספים ובאיומים 
                על עסקים מקומיים לצורך גביית כספי הגנה.
              </p>
              
              <p className="text-sm leading-relaxed">
                החקירה הנוכחית התחילה לאחר רצח דני לוי, בעל חנות תכשיטים בתל-אביב, שסירב לשלם כספי הגנה לארגון. 
                הרצח בוצע בדירתו ביום 15.1.2024, והראיות מצביעות על מעורבות ישירה של יוסי כהן, בנו של מנהיג הארגון.
              </p>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-red-500" />
                  <span className="font-medium">מספר חברים ידועים</span>
                </div>
                <p className="text-2xl font-bold text-red-600">45</p>
                <p className="text-xs text-muted-foreground">בישראל</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span className="font-medium">תאי פעילות</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">3</p>
                <p className="text-xs text-muted-foreground">צפון, מרכז, דרום</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-500" />
                  <span className="font-medium">מעצרים השנה</span>
                </div>
                <p className="text-2xl font-bold text-purple-600">12</p>
                <p className="text-xs text-muted-foreground">חברי ארגון</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="font-medium">רמת סיכון</span>
                </div>
                <p className="text-2xl font-bold text-red-600">גבוהה</p>
                <p className="text-xs text-muted-foreground">חמוש ומסוכן</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Suspects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              חשודים מרכזיים
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">שמואל "סמי" כהן</h4>
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                    מנהיג
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">גיל: 52, נמלט מהמשפט</p>
                <p className="text-xs">מנהיג הארגון, מבוקש בינלאומית</p>
              </div>
              
              <div className="p-3 rounded-lg border border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">יוסי כהן</h4>
                  <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                    חשוד עיקרי
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">גיל: 28, בן המנהיג</p>
                <p className="text-xs">חשוד ברצח דני לוי</p>
              </div>
              
              <div className="p-3 rounded-lg border border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">מיכאל "מיקי" אבן</h4>
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                    סגן
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">גיל: 45, ראש תא המרכז</p>
                <p className="text-xs">מנהל פעילות בגוש דן</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium text-sm">סטטוס חקירה</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span>ראיות שנאספו</span>
                  <Badge variant="outline">9</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>עדויות</span>
                  <Badge variant="outline">7</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>צווי חיפוש</span>
                  <Badge variant="outline">3</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Intelligence Assessments */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              הערכות מודיעיניות - יחידות המשטרה
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Crime Investigation Unit */}
              <Card className="bg-muted/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Fingerprint className="w-4 h-4 text-blue-500" />
                    יחידת חקירות פליליות
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>עודכן: 16.1.2024, 14:30</span>
                  </div>
                  <ScrollArea className="h-32">
                    <p className="text-sm leading-relaxed">
                      "הארגון מפגין רמת ארגון גבוהה ומשמעת פנימית קפדנית. דפוסי הפעולה מעידים על הכשרה מקצועית 
                      של החברים ועל תכנון מוקדם של הפעילות הפלילית. המבנה ההיררכי ברור ומקשה על חדירה. 
                      נמצאו עדויות לקשרים עם ארגונים פליליים באירופה ובאמריקה הדרומית. הארגון משתמש בטכנולוגיות 
                      מתקדמות להסתרת עקבות דיגיטליים."
                    </p>
                  </ScrollArea>
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                    רמת איום: גבוהה
                  </Badge>
                </CardContent>
              </Card>

              {/* Intelligence Unit */}
              <Card className="bg-muted/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Eye className="w-4 h-4 text-purple-500" />
                    יחידת המודיעין
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>עודכן: 16.1.2024, 12:15</span>
                  </div>
                  <ScrollArea className="h-32">
                    <p className="text-sm leading-relaxed">
                      "מעקב מתמשך מגלה שהארגון מתכנן להרחיב את פעילותו לאזור השפלה. זוהו מפגשים בין חברי 
                      הארגון לבין נציגי רשויות מקומיות, המעלים חשש להתערבות בפוליטיקה המקומית. הארגון 
                      מגלה יכולת הסתגלות גבוהה ומשנה שיטות פעולה לאחר כל מעצר. יש צורך במשאבים נוספים 
                      למעקב טכנולוגי מתקדם."
                    </p>
                  </ScrollArea>
                  <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                    מגמה: הרחבת פעילות
                  </Badge>
                </CardContent>
              </Card>

              {/* Cyber Unit */}
              <Card className="bg-muted/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Building className="w-4 h-4 text-green-500" />
                    יחידת הסייבר
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>עודכן: 16.1.2024, 16:45</span>
                  </div>
                  <ScrollArea className="h-32">
                    <p className="text-sm leading-relaxed">
                      "הארגון משתמש באפליקציות מוצפנות ובתקשורת מאובטחת ברמה גבוהה. זוהה שימוש בכספי דיגיטליים 
                      להלבנת הון ובשרתים זרים להסתרת נתונים. החברים עברו הכשרה בטכנולוגיות אנונימיות ובשימוש 
                      ב-VPN מתקדמים. פעילות הארגון ברשתות החברתיות מינימלית ומבוקרת היטב. דרושים כלים 
                      טכנולוגיים מתקדמים לפריצת ההצפנה."
                    </p>
                  </ScrollArea>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    רמת הצפנה: מתקדמת
                  </Badge>
                </CardContent>
              </Card>

              {/* Surveillance Unit */}
              <Card className="bg-muted/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Camera className="w-4 h-4 text-yellow-600" />
                    יחידת המעקבים
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>עודכן: 16.1.2024, 11:20</span>
                  </div>
                  <ScrollArea className="h-32">
                    <p className="text-sm leading-relaxed">
                      "חברי הארגון מפגינים מודעות גבוהה לנוכחות כוחות הביטחון ומשנים מסלולי תנועה באופן תדיר. 
                      המפגשים מתקיימים במקומות ציבוריים צפופים או במתקנים פרטיים עם מערכות אבטחה מתקדמות. 
                      זוהה שימוש ברכבים גנובים ובהחלפת לוחיות זיהוי. המעקב הפיזי מסובך עקב שימוש בטכניקות 
                      נגד-מעקב מקצועיות."
                    </p>
                  </ScrollArea>
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                    קושי מעקב: גבוה
                  </Badge>
                </CardContent>
              </Card>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;