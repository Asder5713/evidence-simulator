import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Mail,
  Clock,
  Building,
  Plus,
  Check,
} from 'lucide-react';
import { useEmails } from '@/hooks/use-emails';
import { emailsData } from '@/data/emails-data';
import { useGameContext } from '@/contexts/GameContext';
import { GlossaryText } from '@/components/GlossaryText';

const Emails = () => {
  const { isTimeReached, isGameStarted, markPageAsVisited } = useGameContext();
  const { addEmail, isEmailSelected } = useEmails();

  // Load viewed emails from localStorage
  const [viewedEmails, setViewedEmails] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('viewed-emails');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  // Mark page as visited when component mounts
  useEffect(() => {
    markPageAsVisited('emails');
  }, [markPageAsVisited]);

  // For now, show all emails (game time logic can be added later)
  const visibleEmails = useMemo(() => {
    return emailsData;
  }, []);

  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleEmailClick = (email: any) => {
    setSelectedEmail(email);
    const newViewedEmails = new Set([...viewedEmails, email.id]);
    setViewedEmails(newViewedEmails);
    localStorage.setItem(
      'viewed-emails',
      JSON.stringify(Array.from(newViewedEmails))
    );
  };

  const handleAddEvidence = (email: any) => {
    addEmail(email);
  };

  return (
    <div className='min-h-screen bg-slate-900 pb-20'>
      {/* Header */}
      <div className='bg-slate-800 border-b border-slate-700 p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Mail className='w-6 h-6 text-blue-400' />
            <h1 className='text-xl font-bold text-slate-100'>
              ראיות דיגיטליות - אימיילים
            </h1>
          </div>
        </div>
      </div>

      <div className='flex h-screen'>
        {/* Email List */}
        <div className='flex-1 flex'>
          <div className='w-1/2 border-r border-slate-700'>
            <ScrollArea className='h-full'>
              <div className='p-4 space-y-2'>
                {visibleEmails.map(email => (
                  <Card
                    key={email.id}
                    className={`border-slate-700 cursor-pointer ${
                      selectedEmail?.id === email.id
                        ? 'bg-slate-800/50 border-blue-500'
                        : !viewedEmails.has(email.id)
                        ? 'bg-slate-500/50'
                        : 'bg-slate-800/50'
                    }`}
                    onClick={() => handleEmailClick(email)}
                  >
                    <CardContent className='p-4 text-right' dir='rtl'>
                      <div className='flex items-start justify-between mb-2'>
                        <div className='flex items-center gap-2'>
                          <span className='text-sm font-medium text-slate-200'>
                            {email.productionUnit}
                          </span>
                        </div>
                        <span className='text-xs text-slate-400'>
                          {email.productionDate.toLocaleDateString('he-IL')}
                        </span>
                      </div>

                      <h3 className='text-sm font-medium text-slate-100 mb-1'>
                        <GlossaryText text={email.title} />
                      </h3>
                      <p className='text-xs text-slate-400 line-clamp-2'>
                        <GlossaryText text={email.description.substring(0, 100) + "..."} />
                      </p>

                      <div className='flex items-center justify-between mt-3'>
                        <div className='flex items-center gap-2'>
                        </div>
                        <Button
                          variant={
                            isEmailSelected(email.id) ? 'default' : 'outline'
                          }
                          size='sm'
                          onClick={e => {
                            e.stopPropagation();
                            handleAddEvidence(email);
                          }}
                          disabled={isEmailSelected(email.id)}
                          className='gap-1 text-xs'
                        >
                          {isEmailSelected(email.id) ? (
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Email Content */}
          <div className='w-1/2 p-6'>
            {selectedEmail ? (
              <Card className='bg-slate-800/50 border-slate-700 h-full'>
                <CardHeader className='border-b border-slate-700'>
                  <div className='flex items-center justify-between'>
                    <CardTitle className='text-slate-100'>
                      <GlossaryText text={selectedEmail.title} />
                    </CardTitle>
                    <div className='flex items-center gap-2'>
                      <Button
                        variant={
                          isEmailSelected(selectedEmail.id)
                            ? 'default'
                            : 'outline'
                        }
                        size='sm'
                        onClick={() => handleAddEvidence(selectedEmail)}
                        disabled={isEmailSelected(selectedEmail.id)}
                        className='gap-2'
                      >
                        {isEmailSelected(selectedEmail.id) ? (
                          <>
                            נוסף לראיות
                            <Check className='w-4 h-4' />
                          </>
                        ) : (
                          <>
                            הוסף לראיות
                            <Plus className='w-4 h-4' />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className='space-y-2 text-sm'>
                    <div className='flex items-center gap-2'>
                      <span className='text-slate-400'>יחידת הפקה:</span>
                      <span className='text-slate-200'>
                        <GlossaryText text={selectedEmail.productionUnit} />
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Clock className='w-3 h-3 text-slate-400' />
                      <span className='text-slate-400'>
                        {selectedEmail.productionDate.toLocaleDateString('he-IL')}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className='p-6'>
                  <div className='bg-slate-900/60 border border-slate-600/30 rounded-lg p-4'>
                    <div className='text-slate-300 text-sm whitespace-pre-wrap font-sans leading-relaxed'>
                      <GlossaryText text={selectedEmail.description} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className='bg-slate-800/50 border-slate-700 h-full'>
                <CardHeader className='flex items-center justify-center mt-10'>
                  <p className='text-slate-400'>בחר אימייל כדי לצפות בתוכן</p>
                </CardHeader>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emails;