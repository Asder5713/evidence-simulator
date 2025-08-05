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
  Plus,
  Check,
  Building,
} from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useFiles } from '@/hooks/use-files';
import { filesData } from '@/data/files-data';
import { useGameContext } from '@/contexts/GameContext';
import { GlossaryText } from '@/components/GlossaryText';

const getTypeIcon = (mimeType: string) => {
  if (mimeType.startsWith('image/')) {
    return Camera;
  } else if (mimeType.startsWith('video/')) {
    return Video;
  } else if (mimeType.startsWith('audio/')) {
    return Volume2;
  } else {
    return FileImage;
  }
};

const getTypeColor = () => {
  return 'bg-gray-900/20 border-gray-700/50';
};

const getTypeTextColor = () => {
  return 'text-gray-300';
};

const VisualEvidence = () => {
  const { markPageAsVisited } = useGameContext();
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const { addFile, isFileSelected } = useFiles();

  // Load viewed evidence from localStorage
  const [viewedEvidence, setViewedEvidence] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('viewed-visual-evidence');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  // Mark page as visited when component mounts
  useEffect(() => {
    markPageAsVisited('visual');
  }, [markPageAsVisited]);

  // Show all files
  const visibleEvidence = useMemo(() => {
    return filesData;
  }, []);

  const handleAddEvidence = (evidenceItem: any) => {
    console.log('Adding evidence:', evidenceItem.id);
    addFile(evidenceItem);
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
                const TypeIcon = getTypeIcon(evidenceItem.mimeType);

                return (
                  <div
                    key={evidenceItem.id}
                    className={`relative group cursor-pointer hover:scale-105 transition-all duration-300`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    dir='rtl'
                    onClick={() => handleEvidenceClick(evidenceItem)}
                  >
                    {/* Card Background Image */}
                    <div className='relative h-64 rounded-xl overflow-hidden shadow-lg'>
                      {evidenceItem.mimeType.startsWith('image/') ? (
                        <img
                          src={evidenceItem.fileKey}
                          alt={evidenceItem.title}
                          className='w-full h-full object-cover'
                        />
                      ) : evidenceItem.mimeType.startsWith('video/') ? (
                        <div className='relative w-full h-full'>
                          <div
                            className={`w-full h-full ${getTypeColor()} flex items-center justify-center`}
                          >
                            <TypeIcon className={`w-16 h-16 ${getTypeTextColor()}`} />
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`w-full h-full ${getTypeColor()} flex items-center justify-center`}
                        >
                          <TypeIcon className={`w-16 h-16 ${getTypeTextColor()}`} />
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
                              <GlossaryText text={evidenceItem.title} />
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
                              isFileSelected(evidenceItem.id)
                                ? 'default'
                                : 'outline'
                            }
                            size='sm'
                            onClick={e => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddEvidence(evidenceItem);
                            }}
                            disabled={isFileSelected(evidenceItem.id)}
                            className='gap-1 text-xs bg-black/50 backdrop-blur-sm border-white/20 hover:bg-black/70 relative z-10 flex-shrink-0'
                          >
                            {isFileSelected(evidenceItem.id) ? (
                              <Check className='w-3 h-3' />
                            ) : (
                              <Plus className='w-3 h-3' />
                            )}
                          </Button>
                        </div>

                        {/* Production Date/Time and Severity Level */}
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-2 text-white/90 text-sm'>
                            <Clock className='w-4 h-4' />
                            <span>
                              הופק: {evidenceItem.productionDate.toLocaleDateString('he-IL')}
                            </span>
                          </div>
                          <Badge
                            className={`text-xs border ${
                              evidenceItem.severityLevel === 'קריטי' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                              evidenceItem.severityLevel === 'גבוה' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                              'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                            } bg-black/50 backdrop-blur-sm`}
                          >
                            {evidenceItem.severityLevel}
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
    </div>
  );
};

export default VisualEvidence;