import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye } from "lucide-react";

const reports = [
  {
    id: 1,
    title: "דוח חקירה פלילית #2024-001",
    date: "2024-01-15",
    status: "הושלם",
    type: "חקירה פלילית",
    description: "דוח מפורט על חקירת תיק פלילי מורכב"
  },
  {
    id: 2,
    title: "דוח חקירה פלילית #2024-002", 
    date: "2024-01-10",
    status: "בטיפול",
    type: "חקירה פלילית",
    description: "חקירת תיק רצח - שלב ראשוני"
  },
  {
    id: 3,
    title: "דוח חקירה פלילית #2024-003",
    date: "2024-01-08",
    status: "הושלם",
    type: "חקירה פלילית", 
    description: "חקירת פריצה לבית מגורים"
  }
];

const Reports = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "הושלם":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "בטיפול":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">דוחות</h1>
          <p className="text-muted-foreground">ניהול וצפייה בדוחות חקירה פלילית</p>
        </div>

        <div className="grid gap-6">
          {reports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                  <Badge variant="outline">{report.type}</Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    תאריך: {new Date(report.date).toLocaleDateString("he-IL")}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      צפייה
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      הורדה
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;