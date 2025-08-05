export interface Email {
  id: string;
  productionDate: Date;
  productionUnit: string;
  title: string;
  description: string;
}

export const emailsData: Email[] = [
  {
    id: 'email_1',
    productionDate: new Date('2024-01-15T10:30:00'),
    productionUnit: 'יחידת המודיעין הצבאי',
    title: 'דיווח על תנועת חשודים באזור',
    description: 'נצפו מספר מחבלים נעים עם נשק כבד לכיוון המטרה. המעקב מתבצע על ידי הכוחות המקומיים. קיים איום ממשי על ביצוע מבצע טרור באזור.'
  },
  {
    id: 'email_2',
    productionDate: new Date('2024-01-16T14:20:00'),
    productionUnit: 'מודיעין שטח',
    title: 'עדכון מודיעיני חשוב',
    description: 'התקבל מידע מודיעיני על תכנון פעילות טרור. החשודים מתכננים להשתמש בחומר נפץ במקום ציבורי. יש לבצע מעקב מתמשך אחר המטרה הראשית.'
  },
  {
    id: 'email_3',
    productionDate: new Date('2024-01-17T09:15:00'),
    productionUnit: 'יחידת פעילות מיוחדת',
    title: 'תיאום מבצע סיכול',
    description: 'בעקבות המודיעין שהתקבל, מתוכנן מבצע לסיכול הפעילות. הכוחות יבצעו מעקב צמוד על החשודים והנשק שברשותם.'
  }
];