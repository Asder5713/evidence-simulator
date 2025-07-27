import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Camera,
  Video,
  Volume2,
  FileImage,
  Clock,
  MapPin,
  Plus,
  Check,
} from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useEvidence } from '@/hooks/use-evidence';
import { evidence } from '@/data/evidence-data';
import { useGameContext } from '@/contexts/GameContext';
import { EvidenceModal } from '@/components/EvidenceModal';

const getTypeIcon = (news_type: string) => {
  switch (news_type) {
    case 'image':
      return Camera;
    case 'video':
      return Video;
    case 'audio':
      return Volume2;
    default:
      return FileImage;
  }
};

const getTypeColor = () => {
  return 'bg-gray-900/20 border-gray-700/50';
};

const getTypeTextColor = () => {
  return 'text-gray-300';
};

const getExceptionColor = (level: number) => {
  switch (level) {
    case 5:
      return 'bg-red-500/20 text-red-300 border-red-500/30';
    case 4:
      return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    case 3:
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    case 2:
      return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case 1:
      return 'bg-green-500/20 text-green-300 border-green-500/30';
    default:
      return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  }
};

const VisualEvidence = () => {
  const { isTimeReached, isGameStarted, markPageAsVisited } = useGameContext();
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const { addEvidence, isEvidenceSelected } = useEvidence();

  // Load viewed evidence from localStorage
  const [viewedEvidence, setViewedEvidence] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('viewed-visual-evidence');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  // Mark page as visited when component mounts
  useEffect(() => {
    markPageAsVisited('visual');
  }, [markPageAsVisited]);

  // Filter evidence that should be visible based on game time
  const visibleEvidence = useMemo(() => {
    if (!isGameStarted) return [];
    return evidence.filter(
      item =>
        ['image', 'video', 'audio'].includes(item.news_type) &&
        isTimeReached(`${item.production_date} ${item.production_time}`)
    );
  }, [isGameStarted, isTimeReached]);

  const handleAddEvidence = (evidenceItem: any) => {
    console.log('Adding evidence:', evidenceItem.id);
    addEvidence(evidenceItem);
    // Mark as viewed when adding to evidence
    const newViewedEvidence = new Set([...viewedEvidence, evidenceItem.id]);
    setViewedEvidence(newViewedEvidence);
    localStorage.setItem(
      'viewed-visual-evidence',
      JSON.stringify(Array.from(newViewedEvidence))
    );
  };

  const handleEvidenceClick = (evidence: any) => {
    setSelectedEvidence(evidence);
    // Mark as viewed when clicking
    const newViewedEvidence = new Set([...viewedEvidence, evidence.id]);
    setViewedEvidence(newViewedEvidence);
    localStorage.setItem(
      'viewed-visual-evidence',
      JSON.stringify(Array.from(newViewedEvidence))
    );
  };

  return (
    <div
      className='min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black'
      dir='rtl'
    >
      {/* Header */}
      <div className='bg-gradient-to-r from-gray-800/90 to-slate-800/90 border-b border-gray-700/50 p-4 shadow-lg backdrop-blur-sm'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-blue-500/20 rounded-lg border border-blue-400/30'>
            <Camera className='w-6 h-6 text-blue-400' />
          </div>
          <div>
            <h1 className='text-xl font-semibold text-white'>
              ראיות ויזואליות
            </h1>
            <p className='text-sm text-gray-300'>
              תמונות, וידיאו והקלטות אודיו
            </p>
          </div>
        </div>
      </div>

      {/* Evidence Grid */}
      <div className='max-w-7xl mx-auto p-6'>
        <ScrollArea className='h-[calc(100vh-200px)]' dir='rtl'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {visibleEvidence.length > 0 ? (
              visibleEvidence.map((evidenceItem, index) => {
                const TypeIcon = getTypeIcon(evidenceItem.news_type);
                const isHistorical = evidenceItem.id.includes('historical');

                return (
                  <div
                    key={evidenceItem.id}
                    className={`relative group cursor-pointer hover:scale-105 transition-all duration-300 ${
                      isHistorical ? 'opacity-80' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    dir='rtl'
                    onClick={() => handleEvidenceClick(evidenceItem)}
                  >
                    {/* Card Background Image */}
                    <div className='relative h-64 rounded-xl overflow-hidden shadow-lg'>
                      {evidenceItem.news_type === 'image' &&
                      evidenceItem.file_url ? (
                        <img
                          src={evidenceItem.file_url}
                          alt={evidenceItem.title}
                          className='w-full h-full object-cover'
                        />
                      ) : evidenceItem.news_type === 'video' &&
                        evidenceItem.file_url ? (
                        <div className='relative w-full h-full'>
                          <img
                            src={evidenceItem.file_url}
                            alt={evidenceItem.title}
                            className='w-full h-full object-cover'
                          />
                        </div>
                      ) : (
                        <div
                          className={`w-full h-full ${getTypeColor(
                          )} flex items-center justify-center`}
                        >
                          <TypeIcon
                            className={`w-16 h-16 ${getTypeTextColor(
                            )}`}
                          />
                        </div>
                      )}

                      {/* Gradient Overlay */}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />

                      {/* Content Overlay */}
                      <div className='absolute bottom-0 left-0 right-0 p-4'>
                        {/* Header with Type Icon and Add Button */}
                        <div className='flex items-center justify-between mb-3'>
                          <div className='flex items-center gap-2 flex-1 min-w-0'>
                            <div
                              className={`p-2 rounded-lg flex-shrink-0 ${getTypeColor()}`}
                            >
                              <TypeIcon
                                className={`w-6 h-6 ${getTypeTextColor()}`}
                              />
                            </div>
                            {/* Title */}
                            <h3 className='font-semibold text-white text-lg line-clamp-2 leading-tight'>
                              {evidenceItem.title}
                            </h3>
                            {!viewedEvidence.has(evidenceItem.id) && (
                              <div
                                className='px-2 py-1 bg-red-600 text-white text-xs font-medium rounded-md shadow-lg animate-pulse flex-shrink-0 ml-2'
                                title='חדש'
                              >
                                חדש
                              </div>
                            )}
                          </div>
                          <Button
                            variant={
                              isEvidenceSelected(evidenceItem.id)
                                ? 'default'
                                : 'outline'
                            }
                            size='sm'
                            onClick={e => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddEvidence(evidenceItem);
                            }}
                            disabled={isEvidenceSelected(evidenceItem.id)}
                            className='gap-1 text-xs bg-black/50 backdrop-blur-sm border-white/20 hover:bg-black/70 relative z-10 flex-shrink-0'
                          >
                            {isEvidenceSelected(evidenceItem.id) ? (
                              <Check className='w-3 h-3' />
                            ) : (
                              <Plus className='w-3 h-3' />
                            )}
                          </Button>
                        </div>

                        {/* Production Date/Time and Exception Level */}
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-2 text-white/90 text-sm'>
                            <Clock className='w-4 h-4' />
                            <span>
                              הופק: {evidenceItem.production_date},{' '}
                              {evidenceItem.production_time}
                            </span>
                          </div>
                          <Badge
                            className={`text-xs border ${getExceptionColor(
                              evidenceItem.exception_level
                            )} bg-black/50 backdrop-blur-sm`}
                          >
                            רמה {evidenceItem.exception_level}
                          </Badge>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 group-hover:from-black/20 group-hover:via-black/10 group-hover:to-black/5 transition-all duration-300' />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className='flex items-center justify-center h-64 text-gray-400 col-span-full'>
                <p>אין ראיות ויזואליות זמינות עדיין</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Evidence Modal */}
      <EvidenceModal
        evidence={selectedEvidence}
        isOpen={!!selectedEvidence}
        onClose={() => setSelectedEvidence(null)}
        onAddEvidence={handleAddEvidence}
        isEvidenceSelected={isEvidenceSelected}
      />
    </div>
  );
};

export default VisualEvidence;
