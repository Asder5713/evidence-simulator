import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  MessageSquare,
  Shield,
  Phone,
  Users,
  Clock,
  AlertTriangle,
  Plus,
  Check,
  Building,
  Calendar,
} from 'lucide-react';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useTexts } from '@/hooks/use-texts';
import { textsData } from '@/data/texts-data';
import { useGameContext } from '@/contexts/GameContext';
import { GlossaryText } from '@/components/GlossaryText';

const getSeverityIcon = (severityLevel: string) => {
  switch (severityLevel.toLowerCase()) {
    case 'קריטי':
      return AlertTriangle;
    case 'גבוה':
      return Shield;
    default:
      return MessageSquare;
  }
};

const getSeverityColor = (severityLevel: string) => {
  switch (severityLevel.toLowerCase()) {
    case 'קריטי':
      return 'bg-red-900/20 border-red-700/50';
    case 'גבוה':
      return 'bg-orange-900/20 border-orange-700/50';
    default:
      return 'bg-yellow-900/20 border-yellow-700/50';
  }
};

const getSeverityTextColor = (severityLevel: string) => {
  switch (severityLevel.toLowerCase()) {
    case 'קריטי':
      return 'text-red-300';
    case 'גבוה':
      return 'text-orange-300';
    default:
      return 'text-yellow-300';
  }
};

const TextMessages = () => {
  const { markPageAsVisited } = useGameContext();
  const { addText, isTextSelected } = useTexts();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Mark page as visited when component mounts
  useEffect(() => {
    markPageAsVisited('texts');
  }, [markPageAsVisited]);

  // Show all texts
  const visibleMessages = useMemo(() => {
    return textsData;
  }, []);

  const handleAddEvidence = (message: any) => {
    addText(message);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black'>
      {/* Header */}
      <div className='bg-gradient-to-r from-gray-800/90 to-slate-800/90 border-b border-gray-700/50 p-4 shadow-lg backdrop-blur-sm'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-cyan-500/20 rounded-lg border border-cyan-400/30'>
            <MessageSquare className='w-6 h-6 text-cyan-400' />
          </div>
          <div>
            <h1 className='text-xl font-semibold text-white'>
              ראיות טקסטואליות
            </h1>
            <p className='text-sm text-gray-300'>
              תקשורת מבצעית - חקירה פלילית
            </p>
          </div>
        </div>
      </div>

      {/* Chat-like Container */}
      <div className='w-full p-6'>
        <ScrollArea ref={scrollAreaRef} className='h-[calc(100vh-200px)]'>
          <div className='space-y-3'>
            {visibleMessages.length > 0 ? (
              visibleMessages.map((message, index) => {
                const SeverityIcon = getSeverityIcon(message.severityLevel);

                return (
                  <div
                    key={message.id}
                    className={`animate-fade-in flex items-center justify-center`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Card
                      className={`w-[500px] ${getSeverityColor(
                        message.severityLevel
                      )} shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm`}
                    >
                      <CardContent className='p-4' dir='rtl'>
                        {/* Message Header */}
                        <div className='flex items-center justify-between mb-3'>
                          <div className='flex items-center gap-2'>
                            <div
                              className={`p-1.5 ${getSeverityColor(
                                message.severityLevel
                              )} rounded-lg border`}
                            >
                              <SeverityIcon
                                className={`w-4 h-4 ${getSeverityTextColor(
                                  message.severityLevel
                                )}`}
                              />
                            </div>
                            <div>
                              <p
                                className={`font-medium text-sm ${getSeverityTextColor(
                                  message.severityLevel
                                )}`}
                              >
                                <GlossaryText text={message.productionUnit} />
                              </p>
                              <p className='text-xs text-gray-400'>
                                רמת חומרה: {message.severityLevel}
                              </p>
                            </div>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Badge
                              className={`text-xs border ${
                                message.severityLevel === 'קריטי' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                                message.severityLevel === 'גבוה' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                                'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                              }`}
                            >
                              {message.severityLevel}
                            </Badge>
                            <Button
                              variant={
                                isTextSelected(message.id)
                                  ? 'default'
                                  : 'outline'
                              }
                              size='sm'
                              onClick={() => handleAddEvidence(message)}
                              disabled={isTextSelected(message.id)}
                              className='gap-1 text-xs'
                            >
                              {isTextSelected(message.id) ? (
                                <>
                                  <Check className='w-3 h-3' />
                                  נוסף
                                </>
                              ) : (
                                <>
                                  <Plus className='w-3 h-3' />
                                  הוסף
                                </>
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Message Content */}
                        <div className='bg-black/30 rounded-lg p-3 border border-white/10'>
                          <h4 className='text-white font-medium text-sm mb-2 text-right'>
                            <GlossaryText text={message.title} />
                          </h4>
                          <p className='text-gray-100 leading-relaxed text-sm text-right'>
                            <GlossaryText text={message.description} />
                          </p>
                          {message.producerNote && (
                            <div className='mt-2 pt-2 border-t border-gray-600/30'>
                              <span className='text-gray-400 text-xs'>
                                הערת מפיק:
                              </span>
                              <p className='text-gray-200 text-xs mt-1 text-right'>
                                <GlossaryText text={message.producerNote} />
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Timestamp */}
                        <div className='space-y-1 mt-2 text-xs text-gray-400'>
                          <div className='flex items-center gap-1'>
                            <Clock className='w-3 h-3' />
                            <span>
                              הופק: {message.productionDate.toLocaleDateString('he-IL')}
                            </span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Clock className='w-3 h-3 text-red-300' />
                            <span className='text-red-300'>
                              מקרה: {message.incidentDate.toLocaleDateString('he-IL')}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })
            ) : (
              <div className='flex items-center justify-center h-64 text-gray-400'>
                <p>אין הודעות טקסט זמינות עדיין</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TextMessages;