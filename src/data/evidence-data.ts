// נתוני ראיות מרכזיים לסימולציית חקירה פלילית

export const emailEvidence = [
  {
    id: "email_001",
    from: "yossi.cohen@gmail.com",
    to: "danny.levi@outlook.com",
    subject: "לגבי החוב - דחוף!",
    date: "13.1.2024, 21:45",
    showTime: { hours: 2, minutes: 5 },
    priority: "high",
    content: `שלום דני,

אני יודע איפה אתה גר ואני יודע איפה הילדים שלך לומדים. 

אם לא תחזיר לי את הכסף עד סוף השבוע, אני אדאג שתתחרט על כך שלא פיתחת איתי את העסקה. 

זה לא איום, זו הבטחה.

יוסי`,
    attachments: 0,
    threat_level: "critical"
  },
  {
    id: "email_002",
    from: "sami.cohen.business@protonmail.com",
    to: "miki.even@secure-mail.net",
    subject: "עדכון תכנית - ינואר",
    date: "10.1.2024, 14:22",
    showTime: { hours: 2, minutes: 20 },
    priority: "medium",
    content: `מיקי,

המשלוח מקולומביה יגיע ביום רביעי לנמל אשדוד. 
דאג שהאנשים יהיו מוכנים ב-03:00 בבוקר.

קונטיינר מספר: MSKU-4829671

תיזהר עם המכס, יש לי חשד שהם עלו עלינו.

ס.`,
    attachments: 1,
    threat_level: "high"
  },
  {
    id: "email_003",
    from: "danny.levi@outlook.com",
    to: "police.reports@gov.il",
    subject: "תלונה על איומים - דחוף",
    date: "14.1.2024, 08:15",
    showTime: { hours: 2, minutes: 35 },
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
  }
];

export const textEvidence = [
  {
    id: "msg_001",
    source: "יחידת מודיעין",
    sender: "סרן דוד אמיר",
    timestamp: "13.1.2024, 20:15",
    showTime: { hours: 2, minutes: 0 },
    priority: "critical",
    content: "זוהה תנועה חשודה ברחוב הנביאים 12. שני רכבים עם לוחיות מזויפות. יש להכין כוחות מיוחדים.",
    type: "intelligence"
  },
  {
    id: "msg_002", 
    source: "סוכן זהב",
    sender: "מקור חסוי",
    timestamp: "13.1.2024, 21:30",
    showTime: { hours: 2, minutes: 30 },
    priority: "high",
    content: "יוסי כהן תכנן להעביר את הכסף הלילה. המקום: מחסן נטוש ליד הנמל. זמן משוער: 23:00.",
    type: "informant"
  },
  {
    id: "msg_003",
    source: "מוקד 100",
    sender: "קצין תורן",
    timestamp: "13.1.2024, 22:45", 
    showTime: { hours: 3, minutes: 0 },
    priority: "urgent",
    content: "דיווח על ירי באזור הנמל. מספר רב של כוחות נדרש למקום. אמבולנס בדרך.",
    type: "dispatch"
  },
  {
    id: "msg_004",
    source: "יחידת סמויה",
    sender: "חוקר ראשי משה לוי",
    timestamp: "14.1.2024, 00:20",
    showTime: { hours: 3, minutes: 30 },
    priority: "critical",
    content: "מצאנו את גופתו של דני לוי במחסן. זירת רצח ברורה. סימני עינויים. צריך לחסום את כל היציאות מהעיר.",
    type: "investigation"
  },
  {
    id: "msg_005",
    source: "מעבדה פלילית", 
    sender: "ד״ר רחל כהן",
    timestamp: "14.1.2024, 08:45",
    showTime: { hours: 4, minutes: 0 },
    priority: "medium",
    content: "ניתוח ראשוני מגלה כי הרצח בוצע בין 22:30 ל-23:15. נמצאו שרידי DNA זרים בזירה. דרושים 48 שעות לזיהוי מלא.",
    type: "forensics"
  },
  {
    id: "msg_006",
    source: "תחנת משטרה מרכז",
    sender: "סגן ניצב אבי דגן", 
    timestamp: "14.1.2024, 09:15",
    showTime: { hours: 4, minutes: 30 },
    priority: "high",
    content: "אישור מצו מעצר ליוסי כהן וחבריו. כוחות מיוחדים יפעלו בבוקר. צריך לתאם עם יחידת הסמויה.",
    type: "command"
  }
];

export const visualEvidence = [
  {
    id: "img_001",
    type: "image",
    title: "תמונת מעקב - יוסי כהן",
    location: "רחוב הנביאים 12, תל-אביב",
    timestamp: "13.1.2024, 21:15",
    showTime: { hours: 2, minutes: 10 },
    priority: "critical",
    source: "מצלמת מעקב עירונית",
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
    evidence_notes: "התמונה מוכיחה נוכחות החשוד במקום הפשע בזמן הרלוונטי"
  },
  {
    id: "vid_001", 
    type: "video",
    title: "סרטון מעקב - כניסה למחסן",
    location: "נמל אשדוד - מחסן 7",
    timestamp: "13.1.2024, 22:30",
    showTime: { hours: 3, minutes: 15 },
    priority: "critical",
    source: "מצלמת אבטחה פרטית",
    duration: "03:45",
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
    evidence_notes: "סרטון מרכזי המוכיח את חטיפת הקורבן והעברתו למחסן"
  },
  {
    id: "aud_001",
    type: "audio", 
    title: "הקלטת שיחה - איום טלפוני",
    location: "מעקב טלפוני",
    timestamp: "12.1.2024, 19:45",
    showTime: { hours: 2, minutes: 15 },
    priority: "high",
    source: "מעקב משטרתי מאושר",
    duration: "02:18",
    url: "",
    call_type: "outgoing",
    caller: "יוסי כהן",
    receiver: "דני לוי",
    evidence_notes: "איום ברור על חיי הקורבן - מהווה מניע לרצח"
  },
  {
    id: "img_002",
    type: "image",
    title: "תמונות זירת הפשע",
    location: "נמל אשדוד - מחסן 7",
    timestamp: "14.1.2024, 00:45",
    showTime: { hours: 3, minutes: 45 },
    priority: "critical",
    source: "זק״א ומעבדה פלילית",
    url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&h=400&fit=crop",
    evidence_notes: "עדויות פיזיות חד משמעיות לאלימות ורצח"
  },
  {
    id: "vid_002",
    type: "video",
    title: "חקירת זירה - תיעוד מלא",
    location: "נמל אשדוד - מחסן 7", 
    timestamp: "14.1.2024, 01:30",
    showTime: { hours: 4, minutes: 15 },
    priority: "high",
    source: "מעבדה פלילית משטרת ישראל",
    duration: "12:33",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop",
    evidence_notes: "תיעוד מקצועי המסייע בשחזור האירועים"
  },
  {
    id: "aud_002",
    type: "audio",
    title: "עדות קולית - עד ראייה", 
    location: "תחנת משטרה מרכז",
    timestamp: "14.1.2024, 10:00",
    showTime: { hours: 5, minutes: 0 },
    priority: "medium",
    source: "חקירה משטרתי",
    duration: "08:12",
    url: "",
    call_type: "interview",
    caller: "חוקר",
    receiver: "עד ראייה",
    evidence_notes: "עדות תומכת המחזקת את ציר הזמן של האירועים"
  }
];