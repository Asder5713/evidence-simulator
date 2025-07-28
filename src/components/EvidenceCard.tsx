import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Clock,
  MapPin,
  User,
  AlertTriangle,
  Building,
  FileText,
  Calendar,
  ArrowRight,
  Play,
  Image,
  Volume2,
  Video,
  Mail,
  Trash2,
  X,
} from 'lucide-react';
import { Evidence } from '../data/evidence-data';
import { GlossaryText } from './GlossaryText';

interface EvidenceCardProps {
  evidence: Evidence;
  onDragStart?: (
    e: React.DragEvent<HTMLDivElement>,
    evidence: Evidence
  ) => void;
  onReturn?: (evidence: Evidence) => void;
  onDelete?: (evidenceId: string) => void;
  showReturnButton?: boolean;
  showDeleteButton?: boolean;
  isCondensed?: boolean; // תצוגה מקוצרת לראיות מוינות
}

const newsTypeIcons = {
  email: <Mail className='w-4 h-4' />,
  intelligence: <User className='w-4 h-4' />,
  dispatch: <User className='w-4 h-4' />,
  forensics: <User className='w-4 h-4' />,
  investigation: <User className='w-4 h-4' />,
  command: <User className='w-4 h-4' />,
  image: <Image className='w-4 h-4' />,
  video: <Video className='w-4 h-4' />,
  audio: <Volume2 className='w-4 h-4' />,
  document: <FileText className='w-4 h-4' />,
};

const exceptionLevelColors = {
  1: 'bg-evidence-calming text-evidence-calming-foreground',
  2: 'bg-evidence-neutral text-evidence-neutral-foreground',
  3: 'bg-evidence-suspicious text-evidence-suspicious-foreground',
  4: 'bg-destructive text-destructive-foreground',
  5: 'bg-destructive text-destructive-foreground',
};

export function EvidenceCard({
  evidence,
  onDragStart,
  onReturn,
  onDelete,
  showReturnButton = false,
  showDeleteButton = false,
  isCondensed = false,
}: EvidenceCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Condensed view for sorted evidence
  if (isCondensed) {
    return (
      <div
        className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 text-right border-border hover:shadow-lg hover:border-primary hover:bg-primary/5 group relative bg-card`}
        dir='rtl'
      >
        <div className='flex items-center gap-4 flex-1 min-w-0'>
          <div className='flex items-center justify-center w-10 h-10 rounded-full bg-muted/50'>
            {newsTypeIcons[evidence.news_type]}
          </div>
          <div className='flex-1 min-w-0'>
            <h3 className='text-sm font-semibold truncate text-foreground'>
              <GlossaryText text={evidence.title} />
            </h3>
            <div className='flex items-center gap-2 text-xs text-muted-foreground mt-1'>
              <Calendar className='w-3 h-3' />
              <span>
                {evidence.production_date} {evidence.production_time}
              </span>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-2' dir='rtl'>
          {showReturnButton && onReturn && (
            <Button
              onClick={() => onReturn(evidence)}
              variant='ghost'
              size='sm'
              className='shrink-0 w-9 h-9 p-0 hover:bg-primary/10 hover:text-primary rounded-full'
            >
              <ArrowRight className='w-4 h-4' />
            </Button>
          )}
          {showDeleteButton && onDelete && (
            <Button
              onClick={() => onDelete(evidence.id)}
              variant='ghost'
              size='sm'
              className='shrink-0 w-9 h-9 p-0 hover:bg-destructive/10 hover:text-destructive text-muted-foreground rounded-full'
              title='הסר מהראיות'
            >
              <Trash2 className='w-4 h-4' />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card
      className={`transition-all duration-300 hover:shadow-xl hover:border-primary hover:bg-primary/5 group relative border-2 border-border bg-card/50 backdrop-blur-sm ${
        isDragging ? 'opacity-50 scale-95' : ''
      }`}
      draggable={!!onDragStart}
      onDragStart={
        onDragStart
          ? e => {
              setIsDragging(true);
              onDragStart(e, evidence);
            }
          : undefined
      }
      onDragEnd={() => setIsDragging(false)}
    >
      <CardHeader className='pb-4'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20'>
              {newsTypeIcons[evidence.news_type]}
            </div>
            <div className='flex flex-col gap-1'>
              <CardTitle className='text-base font-semibold text-foreground leading-tight'>
                <GlossaryText text={evidence.title} />
              </CardTitle>
              <div className='flex items-center gap-3'>
                <Badge
                  className={`${
                    exceptionLevelColors[evidence.exception_level]
                  } text-xs font-medium`}
                  variant='secondary'
                >
                  רמה {evidence.exception_level}
                </Badge>
                <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                  <Calendar className='w-3 h-3' />
                  <span>{evidence.production_date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className='flex items-center gap-2'>
            {showDeleteButton && onDelete && (
              <Button
                onClick={() => onDelete(evidence.id)}
                variant='ghost'
                size='sm'
                className='w-9 h-9 p-0 hover:bg-destructive/10 hover:text-destructive text-muted-foreground rounded-full transition-colors'
                title='הסר מהראיות'
              >
                <Trash2 className='w-4 h-4' />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className='pt-0 space-y-4'>
        {/* Content Section */}
        <div className='space-y-3 text-right' dir='rtl'>
          <div className='flex items-center gap-2 text-sm font-medium text-foreground'>
            <FileText className='w-4 h-4 text-primary' />
            <span>תוכן הראיה</span>
          </div>
          <div className='bg-muted/30 p-3 rounded-lg'>
            <GlossaryText 
              text={evidence.content} 
              className='text-sm text-foreground leading-relaxed block'
            />
          </div>
        </div>

        {/* Media Section */}
        {evidence.file_url && (
          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-sm font-medium text-foreground'>
              {evidence.news_type === 'image' && (
                <Image className='w-4 h-4 text-primary' />
              )}
              {evidence.news_type === 'video' && (
                <Video className='w-4 h-4 text-primary' />
              )}
              {evidence.news_type === 'audio' && (
                <Volume2 className='w-4 h-4 text-primary' />
              )}
              <span>מדיה</span>
            </div>
            <div className='rounded-lg overflow-hidden border border-border'>
              {evidence.news_type === 'image' && (
                <img
                  src={evidence.file_url}
                  alt='תמונת ראיה'
                  className='w-full h-40 object-cover cursor-pointer hover:scale-105 transition-transform duration-300'
                />
              )}
              {evidence.news_type === 'audio' && (
                <audio controls className='w-full'>
                  <source src={evidence.file_url} type='audio/mpeg' />
                </audio>
              )}
              {evidence.news_type === 'video' && (
                <video controls className='w-full h-40 object-cover'>
                  <source src={evidence.file_url} type='video/mp4' />
                </video>
              )}
            </div>
          </div>
        )}

        {/* Comments Section */}
        {evidence.comments && (
          <div className='space-y-2 text-right' dir='rtl'>
            <div className='flex items-center gap-2 text-sm font-medium text-foreground'>
              <AlertTriangle className='w-4 h-4 text-primary' />
              <span>הערות חשובות</span>
            </div>
            <div className='bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 rounded-lg'>
              <GlossaryText 
                text={evidence.comments} 
                className='text-sm text-amber-800 dark:text-amber-200 block'
              />
            </div>
          </div>
        )}

        {/* Details Grid */}
        <div className='grid grid-cols-2 gap-4 text-sm text-right' dir='rtl'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <Calendar className='w-4 h-4' />
              <span className='font-medium'>תאריך הפקה</span>
            </div>
            <p className='text-foreground font-medium'>
              {evidence.production_date} {evidence.production_time}
            </p>
          </div>

          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <Clock className='w-4 h-4' />
              <span className='font-medium'>תאריך מקרה</span>
            </div>
            <p className='text-foreground font-medium'>
              {evidence.incident_date} {evidence.incident_time}
            </p>
          </div>

          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <Building className='w-4 h-4' />
              <span className='font-medium'>מערך</span>
            </div>
            <GlossaryText text={evidence.formation} className='text-foreground font-medium' />
          </div>

          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <User className='w-4 h-4' />
              <span className='font-medium'>מקור</span>
            </div>
            <GlossaryText text={evidence.source} className='text-foreground font-medium' />
          </div>

          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <FileText className='w-4 h-4' />
              <span className='font-medium'>סוג</span>
            </div>
            <p className='text-foreground font-medium capitalize'>
              {evidence.news_type}
            </p>
          </div>

          {evidence.file_duration && (
            <div className='space-y-2'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Clock className='w-4 h-4' />
                <span className='font-medium'>משך קובץ</span>
              </div>
              <p className='text-foreground font-medium'>
                {evidence.file_duration}
              </p>
            </div>
          )}
        </div>

        {/* Return Button */}
        {showReturnButton && onReturn && (
          <div className='pt-4 border-t border-border'>
            <Button
              onClick={() => onReturn(evidence)}
              variant='outline'
              size='sm'
              className='w-full hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors'
            >
              <ArrowRight className='w-4 h-4 ml-2' />
              החזר לראיות זמינות
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
