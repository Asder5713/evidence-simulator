export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  synonyms: string[];
}

export const glossaryData: GlossaryTerm[] = [
  {
    id: 'terrorist',
    term: 'מחבל',
    definition: 'אדם המבצע פעולות טרור נגד אוכלוסייה אזרחית',
    synonyms: ['טרוריסט', 'פעיל טרור', 'חמוש', 'פח"ע']
  },
  {
    id: 'intelligence',
    term: 'מודיעין',
    definition: 'מידע חשוב המתקבל מכלי ריגול או מקורות מידע',
    synonyms: ['מידע מודיעיני', 'מחקר', 'איסוף מידע', 'מודע']
  },
  {
    id: 'threat',
    term: 'איום',
    definition: 'סכנה פוטנציאלית או ממשית לביטחון',
    synonyms: ['סכנה', 'סיכון', 'חשש', 'סיכון ביטחוני']
  },
  {
    id: 'operation',
    term: 'מבצע',
    definition: 'פעילות צבאית או ביטחונית מתוכננת',
    synonyms: ['פעילות', 'משימה', 'מהלך', 'פעולה']
  },
  {
    id: 'weapon',
    term: 'נשק',
    definition: 'כלי המיועד לפגיעה או הרג',
    synonyms: ['אמצעי לחימה', 'כלי נשק', 'חמ"ר', 'תחמושת']
  },
  {
    id: 'explosive',
    term: 'חומר נפץ',
    definition: 'חומר כימי המסוגל לפרוק אנרגיה בצורה מפוצצת',
    synonyms: ['נפצים', 'חבלה', 'מטען', 'פצצה']
  },
  {
    id: 'surveillance',
    term: 'מעקב',
    definition: 'צפייה וניטור מתמשך אחר אדם או מקום',
    synonyms: ['ניטור', 'רגילה', 'מעקב חשאי', 'צפיה']
  },
  {
    id: 'target',
    term: 'מטרה',
    definition: 'אובייקט או אדם המיועד לפגיעה או מעקב',
    synonyms: ['יעד', 'נושא', 'נעדר', 'חשוד']
  }
];