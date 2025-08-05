export interface Text {
  id: string;
  productionDate: Date;
  productionUnit: string;
  title: string;
  description: string;
  severityLevel: string;
  incidentDate: Date;
  producerNote?: string;
}

export const textsData: Text[] = [
  {
    id: 'text_1',
    productionDate: new Date('2024-01-15T16:45:00'),
    productionUnit: 'משטרת ישראל',
    title: 'דיווח על אירוע ביטחוני',
    description: 'זוהה מחבל חמוש באזור. הוא נושא נשק אישי ומתנהג בצורה חשודה. בוצע מעקב ראשוני והועבר מידע לכוחות הביטחון.',
    severityLevel: 'גבוה',
    incidentDate: new Date('2024-01-15T15:30:00'),
    producerNote: 'דרוש מעקב מתמשך'
  },
  {
    id: 'text_2',
    productionDate: new Date('2024-01-16T11:20:00'),
    productionUnit: 'יחידת הסיור',
    title: 'תצפית על פעילות חשודה',
    description: 'נצפתה פעילות חשודה במקום שבו מתוכנן מבצע. מספר אנשים נעים עם חבילות חשודות שעלולות להכיל חומר נפץ.',
    severityLevel: 'קריטי',
    incidentDate: new Date('2024-01-16T10:00:00'),
    producerNote: 'איום מיידי - דרושה התערבות'
  },
  {
    id: 'text_3',
    productionDate: new Date('2024-01-17T08:30:00'),
    productionUnit: 'מודיעין טכנולוגי',
    title: 'יירוט תקשורת',
    description: 'יורט שיחה בין מחבלים הדנה בתכנון מבצע. הוזכרו מטרות אזרחיות ושימוש בנשק כבד. המעקב ממשיך על כל החשודים.',
    severityLevel: 'גבוה',
    incidentDate: new Date('2024-01-17T07:45:00')
  }
];