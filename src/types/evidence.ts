// Legacy Evidence interface for backwards compatibility
export interface Evidence {
  id: string;
  title: string;
  content: string;
  news_type: string;
  exception_level: number;
  production_date: string;
  production_time: string;
  incident_date: string;
  incident_time: string;
  source: string;
  formation: string;
  comments?: string;
  file_url?: string;
  file_duration?: string;
}

// Convert new data structures to legacy format
import { Email } from '@/data/emails-data';
import { Text } from '@/data/texts-data';
import { File } from '@/data/files-data';

export function emailToEvidence(email: Email): Evidence {
  return {
    id: email.id,
    title: email.title,
    content: email.description,
    news_type: 'email',
    exception_level: 2,
    production_date: email.productionDate.toLocaleDateString('he-IL'),
    production_time: email.productionDate.toLocaleTimeString('he-IL'),
    incident_date: email.productionDate.toLocaleDateString('he-IL'),
    incident_time: email.productionDate.toLocaleTimeString('he-IL'),
    source: email.productionUnit,
    formation: email.productionUnit,
  };
}

export function textToEvidence(text: Text): Evidence {
  return {
    id: text.id,
    title: text.title,
    content: text.description,
    news_type: 'intelligence',
    exception_level: text.severityLevel === 'קריטי' ? 5 : text.severityLevel === 'גבוה' ? 4 : 3,
    production_date: text.productionDate.toLocaleDateString('he-IL'),
    production_time: text.productionDate.toLocaleTimeString('he-IL'),
    incident_date: text.incidentDate.toLocaleDateString('he-IL'),
    incident_time: text.incidentDate.toLocaleTimeString('he-IL'),
    source: text.productionUnit,
    formation: text.productionUnit,
    comments: text.producerNote,
  };
}

export function fileToEvidence(file: File): Evidence {
  return {
    id: file.id,
    title: file.title,
    content: file.description,
    news_type: file.mimeType.startsWith('image/') ? 'image' : 
              file.mimeType.startsWith('video/') ? 'video' : 
              file.mimeType.startsWith('audio/') ? 'audio' : 'document',
    exception_level: file.severityLevel === 'קריטי' ? 5 : file.severityLevel === 'גבוה' ? 4 : 3,
    production_date: file.productionDate.toLocaleDateString('he-IL'),
    production_time: file.productionDate.toLocaleTimeString('he-IL'),
    incident_date: file.incidentDate.toLocaleDateString('he-IL'),
    incident_time: file.incidentDate.toLocaleTimeString('he-IL'),
    source: file.productionUnit,
    formation: file.productionUnit,
    comments: file.producerNote,
    file_url: file.fileKey,
  };
}