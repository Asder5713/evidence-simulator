export interface File {
  id: string;
  productionDate: Date;
  productionUnit: string;
  title: string;
  description: string;
  severityLevel: string;
  incidentDate: Date;
  producerNote?: string;
  mimeType: string;
  fileKey: string;
}

export const filesData: File[] = [
  {
    id: 'file_1',
    productionDate: new Date('2024-01-15T12:00:00'),
    productionUnit: 'יחידת הדמיה',
    title: 'תמונת חשוד ראשי',
    description: 'תמונה של המחבל הראשי שזוהה באזור. נושא נשק ונראה מתכונן לביצוע מבצע. התמונה צולמה במהלך מעקב.',
    severityLevel: 'גבוה',
    incidentDate: new Date('2024-01-15T11:30:00'),
    producerNote: 'זיהוי חיובי - חשוד מסוכן',
    mimeType: 'image/jpeg',
    fileKey: '/placeholder.svg'
  },
  {
    id: 'file_2',
    productionDate: new Date('2024-01-16T15:30:00'),
    productionUnit: 'יחידת הקלטות',
    title: 'הקלטת שיחה חשודה',
    description: 'הקלטת שיחה בין חשודים הדנה בתכנון פעילות טרור. בשיחה מוזכרים חומר נפץ, מטרות אזרחיות ומועד ביצוע המבצע.',
    severityLevel: 'קריטי',
    incidentDate: new Date('2024-01-16T14:45:00'),
    producerNote: 'דחוף - מידע על מבצע מתוכנן',
    mimeType: 'audio/mp3',
    fileKey: 'audio_evidence_1.mp3'
  },
  {
    id: 'file_3',
    productionDate: new Date('2024-01-17T13:15:00'),
    productionUnit: 'יחידת מעקב',
    title: 'סרטון מעקב אחר חשודים',
    description: 'סרטון מעקב המתעד את תנועת החשודים וההכנות למבצע. נראים כלי נשק ומטענים. המעקב בוצע ביום האירוע.',
    severityLevel: 'גבוה',
    incidentDate: new Date('2024-01-17T12:30:00'),
    mimeType: 'video/mp4',
    fileKey: 'surveillance_video_1.mp4'
  }
];