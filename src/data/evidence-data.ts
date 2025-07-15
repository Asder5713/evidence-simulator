// Evidence data for the criminal investigation simulation

export interface Evidence {
  // זיהוי
  id: string;
  title: string;                 // כותרת הידיעה
  
  // זמנים  
  production_date: string;       // תאריך הפקת הידיעה
  production_time: string;       // זמן הפקת הידיעה
  incident_date: string;         // תאריך התקרית
  incident_time: string;         // זמן התקרית
  
  // מטאדאטה בסיסית
  source: string;               // מקור
  news_type: 'email' | 'intelligence' | 'dispatch' | 'forensics' | 'investigation' | 'command' | 'image' | 'video' | 'audio' | 'document';
  formation: string;            // מערך (סייבר, מצלמות, חקירות וכו')
  
  // תוכן
  content: string;              // תוכן הידיעה
  comments?: string;            // הערות מיוצר הידיעה
  
  // סיווג
  exception_level: 1 | 2 | 3 | 4 | 5;  // רמת חריגות 1-5
  
  // רק לקבצים מדיה
  file_url?: string;            // קובץ (רק עבור וידיאו/אודיו/תמונה)
  file_duration?: string;       // משך (רק עבור וידיאו/אודיו)
}

export const evidence: Evidence[] = [
  // אימיילים
  {
    id: "email-001",
    title: "איומים על בעל עסק - דני לוי",
    production_date: "17.06",
    production_time: "02:05",
    incident_date: "17.06",
    incident_time: "02:05",
    source: "yossi.cohen@gmail.com",
    news_type: "email",
    formation: "מערכת אימייל",
    content: "שלום דני,\n\nאני יודע איפה אתה גר ואני יודע איפה הילדים שלך לומדים.\n\nאם לא תחזיר לי את הכסף עד סוף השבוע, אני אדאג שתתחרט על כך שלא פיתחת איתי את העסקה.\n\nזה לא איום, זו הבטחה.\n\nיוסי",
    comments: "איום ברור על חיי הקורבן ומשפחתו",
    exception_level: 5
  },
  {
    id: "email-002",
    title: "עדכון תכנית סחר בסמים",
    production_date: "17.06",
    production_time: "02:20",
    incident_date: "17.06",
    incident_time: "02:20",
    source: "sami.cohen.business@protonmail.com",
    news_type: "email",
    formation: "מערכת אימייל",
    content: "מיקי,\n\nהמשלוח מקולומביה יגיע ביום רביעי לנמל אשדוד.\nדאג שהאנשים יהיו מוכנים ב-03:00 בבוקר.\n\nקונטיינר מספר: MSKU-4829671\n\nתיזהר עם המכס, יש לי חשד שהם עלו עלינו.\n\nס.",
    comments: "ראיה לפעילות סחר בסמים",
    exception_level: 4
  },
  {
    id: "email-003",
    title: "תלונה למשטרה על איומים",
    production_date: "17.06",
    production_time: "02:35",
    incident_date: "17.06",
    incident_time: "02:35",
    source: "danny.levi@outlook.com",
    news_type: "email",
    formation: "מערכת אימייל",
    content: "שלום,\n\nאני דני לוי, בעל חנות תכשיטים ברחוב רוטשילד 45, תל-אביב.\n\nאני מקבל איומים מיוסי כהן כבר שבועיים. הוא דורש ממני לשלם 15,000 שקל \"כספי הגנה\" כל חודש.\n\nאני מפחד על המשפחה שלי. אנא עזרו לי.\n\nבתודה,\nדני לוי\n054-9876543",
    comments: "תלונה רשמית של הקורבן",
    exception_level: 4
  },

  // הודעות טקסטואליות
  {
    id: "text-001",
    title: "פתיחת תיק חקירה נגד יוסי כהן",
    production_date: "17.06",
    production_time: "00:30",
    incident_date: "17.06",
    incident_time: "00:30",
    source: "חוקר בכיר אילן רוז",
    news_type: "investigation",
    formation: "מחלקת חקירות",
    content: "נפתח תיק חקירה נגד יוסי כהן בעקבות תלונות על הפעלת לחץ ואיומים על בעלי עסקים באזור.",
    comments: "פתיחת החקירה הרשמית",
    exception_level: 3
  },
  {
    id: "text-002",
    title: "תחילת מעקב סמוי אחר החשוד",
    production_date: "17.06",
    production_time: "00:45",
    incident_date: "17.06",
    incident_time: "00:45",
    source: "סמל ראשון טל לוי",
    news_type: "intelligence",
    formation: "יחידת מעקב",
    content: "החל מעקב סמוי אחר יוסי כהן ושותפיו. זוהו 3 נקודות מפגש קבועות והרגלי תנועה.",
    comments: "תחילת מעקב מבצעי",
    exception_level: 3
  },
  {
    id: "text-003",
    title: "החמרה באיומים על הקורבן",
    production_date: "17.06",
    production_time: "01:15",
    incident_date: "17.06",
    incident_time: "01:15",
    source: "קצינת תורנית",
    news_type: "dispatch",
    formation: "מוקד תלונות הציבור",
    content: "התקבלה תלונה נוספת מדני לוי על החמרה באיומים. המתלונן דיווח על מעקב חשוד אחריו.",
    comments: "הסלמה במצב הקורבן",
    exception_level: 4
  },
  {
    id: "text-004",
    title: "זיהוי תנועה חשודה ברחוב הנביאים",
    production_date: "17.06",
    production_time: "02:00",
    incident_date: "17.06",
    incident_time: "02:00",
    source: "סרן דוד אמיר",
    news_type: "intelligence",
    formation: "יחידת מודיעין",
    content: "זוהה תנועה חשודה ברחוב הנביאים 12. שני רכבים עם לוחיות מזויפות. יש להכין כוחות מיוחדים.",
    comments: "זיהוי פעילות חשודה",
    exception_level: 5
  },
  {
    id: "text-005",
    title: "דיווח על ירי באזור הנמל",
    production_date: "17.06",
    production_time: "03:00",
    incident_date: "17.06",
    incident_time: "03:00",
    source: "קצין תורן",
    news_type: "dispatch",
    formation: "מוקד 100",
    content: "דיווח על ירי באזור הנמל. מספר רב של כוחות נדרש למקום. אמבולנס בדרך.",
    comments: "קריאת חירום לזירת הפשע",
    exception_level: 5
  },
  {
    id: "text-006",
    title: "גילוי גופת דני לוי במחסן",
    production_date: "17.06",
    production_time: "03:30",
    incident_date: "17.06",
    incident_time: "03:30",
    source: "חוקר ראשי משה לוי",
    news_type: "investigation",
    formation: "יחידת סמויה",
    content: "מצאנו את גופתו של דני לוי במחסן. זירת רצח ברורה. סימני עינויים. צריך לחסום את כל היציאות מהעיר.",
    comments: "גילוי הרצח",
    exception_level: 5
  },

  // ראיות ויזואליות
  {
    id: "visual-001",
    title: "תמונת זיהוי - יוסי כהן",
    production_date: "17.06",
    production_time: "00:20",
    incident_date: "17.06",
    incident_time: "00:20",
    source: "מצלמת מעקב עירונית",
    news_type: "image",
    formation: "מערכת מעקב עירונית",
    content: "תמונת זיהוי ראשונית של החשוד המרכזי בדרך בן גוריון, תל-אביב",
    comments: "זיהוי החשוד במקום ציבורי",
    exception_level: 3,
    file_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop"
  },
  {
    id: "visual-002",
    title: "סרטון מעקב - ישיבה חשודה",
    production_date: "17.06",
    production_time: "00:45",
    incident_date: "17.06",
    incident_time: "00:45",
    source: "מצלמת אבטחה פרטית",
    news_type: "video",
    formation: "מערכת אבטחה פרטית",
    content: "תיעוד פגישה בין החשודים בבית קפה קפריסין, תל-אביב",
    comments: "פגישת תכנון הפעילות הפלילית",
    exception_level: 3,
    file_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    file_duration: "08:30"
  },
  {
    id: "visual-003",
    title: "הקלטת שיחה - תכנון ראשוני",
    production_date: "17.06",
    production_time: "01:30",
    incident_date: "17.06",
    incident_time: "01:30",
    source: "מעקב משטרתי מאושר",
    news_type: "audio",
    formation: "יחידת האזנות",
    content: "הקלטת שיחת תכנון בין יוסי כהן לשותף לא מזוהה",
    comments: "ראיה לתכנון פעילות פלילית",
    exception_level: 4,
    file_duration: "04:22"
  },
  {
    id: "visual-004",
    title: "תמונת מעקב בזירת הפשע",
    production_date: "17.06",
    production_time: "02:10",
    incident_date: "17.06",
    incident_time: "02:10",
    source: "מצלמת מעקב עירונית",
    news_type: "image",
    formation: "מערכת מעקב עירונית",
    content: "תמונת יוסי כהן ברחוב הנביאים 12, תל-אביב בזמן הרלוונטי",
    comments: "הוכחת נוכחות במקום הפשע",
    exception_level: 5,
    file_url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop"
  },
  {
    id: "visual-005",
    title: "סרטון מעקב - כניסה למחסן",
    production_date: "17.06",
    production_time: "03:15",
    incident_date: "17.06",
    incident_time: "03:15",
    source: "מצלמת אבטחה פרטית",
    news_type: "video",
    formation: "מערכת אבטחה פרטית",
    content: "תיעוד כניסת החשוד למחסן 7 בנמל אשדוד עם הקורבן",
    comments: "ראיה מכרעת לחטיפה והעברה למקום הרצח",
    exception_level: 5,
    file_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
    file_duration: "03:45"
  },
  {
    id: "visual-006",
    title: "הקלטת איום טלפוני",
    production_date: "17.06",
    production_time: "02:15",
    incident_date: "17.06",
    incident_time: "02:15",
    source: "מעקב משטרתי מאושר",
    news_type: "audio",
    formation: "יחידת האזנות",
    content: "הקלטת שיחת איום מיוסי כהן לדני לוי",
    comments: "איום ברור על חיי הקורבן - מניע לרצח",
    exception_level: 5,
    file_duration: "02:18"
  }
];