import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Target, 
  Activity,
  TrendingUp,
  TrendingDown,
  Building,
  Eye,
  FileX,
  UserCheck
} from "lucide-react";

const Overview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-20 p-6">
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          מרכז פיקוד ובקרה משטרתי
        </h1>
        <p className="text-muted-foreground">
          סקירה כללית של מצב הביטחון ופעילות היחידות השונות
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Organization Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              סקירת הארגון
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-primary" />
                  <span className="font-medium">יחידות פעילות</span>
                </div>
                <p className="text-2xl font-bold">247</p>
                <p className="text-xs text-muted-foreground">יחידות ברחבי הארץ</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-medium">כוח אדם</span>
                </div>
                <p className="text-2xl font-bold">34,582</p>
                <p className="text-xs text-muted-foreground">שוטרים פעילים</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="font-medium">מקרים פעילים</span>
                </div>
                <p className="text-2xl font-bold">1,847</p>
                <p className="text-xs text-muted-foreground">תיקי חקירה פתוחים</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="font-medium">יעילות פתרון</span>
                </div>
                <p className="text-2xl font-bold">87.3%</p>
                <p className="text-xs text-muted-foreground">חודש נוכחי</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-semibold">רמת מוכנות יחידות</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">יחידת סיור</span>
                  <div className="flex items-center gap-2">
                    <Progress value={95} className="w-24" />
                    <Badge variant="outline" className="text-green-600">95%</Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">יחידת חקירות</span>
                  <div className="flex items-center gap-2">
                    <Progress value={88} className="w-24" />
                    <Badge variant="outline" className="text-blue-600">88%</Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">יחידת סייבר</span>
                  <div className="flex items-center gap-2">
                    <Progress value={92} className="w-24" />
                    <Badge variant="outline" className="text-purple-600">92%</Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">יחידת מיוחדת</span>
                  <div className="flex items-center gap-2">
                    <Progress value={78} className="w-24" />
                    <Badge variant="outline" className="text-orange-600">78%</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              מצב נוכחי
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">רמת אבטחה</span>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  רגילה
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium">אזהרות פעילות</span>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                  3
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">משמרת נוכחית</span>
                </div>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                  בוקר
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium text-sm">התראות אחרונות</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 p-2 rounded border-l-2 border-l-orange-400 bg-muted/50">
                  <AlertTriangle className="w-3 h-3 text-orange-500 mt-0.5" />
                  <div>
                    <p className="font-medium">תקרית תנועה חמורה</p>
                    <p className="text-muted-foreground">כביש 1 - צומת גלילות</p>
                    <p className="text-muted-foreground">לפני 15 דקות</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 p-2 rounded border-l-2 border-l-blue-400 bg-muted/50">
                  <FileX className="w-3 h-3 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">תיק חקירה נסגר</p>
                    <p className="text-muted-foreground">גניבת רכב - פתרון מלא</p>
                    <p className="text-muted-foreground">לפני 32 דקות</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 p-2 rounded border-l-2 border-l-green-400 bg-muted/50">
                  <UserCheck className="w-3 h-3 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">כוח אדם מתגבר</p>
                    <p className="text-muted-foreground">משמרת ערב - מרכז העיר</p>
                    <p className="text-muted-foreground">לפני 45 דקות</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unit Reports */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              דוחות יחידות - 24 שעות אחרונות
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-muted/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center justify-between">
                    יחידת חקירות
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>תיקים נפתחו:</span>
                    <span className="font-bold">23</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>תיקים נסגרו:</span>
                    <span className="font-bold">31</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>מעצרים:</span>
                    <span className="font-bold">12</span>
                  </div>
                  <Progress value={87} className="mt-2" />
                  <p className="text-xs text-muted-foreground">יעילות: 87%</p>
                </CardContent>
              </Card>

              <Card className="bg-muted/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center justify-between">
                    יחידת סיור
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>סיורים:</span>
                    <span className="font-bold">156</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>תקריות:</span>
                    <span className="font-bold">8</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>דוחות תנועה:</span>
                    <span className="font-bold">45</span>
                  </div>
                  <Progress value={94} className="mt-2" />
                  <p className="text-xs text-muted-foreground">כיסוי: 94%</p>
                </CardContent>
              </Card>

              <Card className="bg-muted/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center justify-between">
                    יחידת סייבר
                    <TrendingDown className="w-4 h-4 text-orange-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>איומים זוהו:</span>
                    <span className="font-bold">7</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>חקירות פעילות:</span>
                    <span className="font-bold">14</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>מערכות מוגנות:</span>
                    <span className="font-bold">98%</span>
                  </div>
                  <Progress value={76} className="mt-2" />
                  <p className="text-xs text-muted-foreground">מוכנות: 76%</p>
                </CardContent>
              </Card>

              <Card className="bg-muted/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center justify-between">
                    יחידות מיוחדות
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>משימות:</span>
                    <span className="font-bold">5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>הפעלות:</span>
                    <span className="font-bold">2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>כוננות:</span>
                    <span className="font-bold">רגילה</span>
                  </div>
                  <Progress value={89} className="mt-2" />
                  <p className="text-xs text-muted-foreground">מוכנות: 89%</p>
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