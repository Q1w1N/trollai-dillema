import { Atom, useAtom } from 'jotai';
import { SpeechBubble } from '../ui/speech-bubble';
import { cn } from '@/lib/utils';

type SpeechProps = {
  side: 'left' | 'right' | 'decision';
  playerSpeechAtom: Atom<string[]>;
};

export const PlayerSpeech = ({ playerSpeechAtom, side }: SpeechProps) => {
  const [speech] = useAtom(playerSpeechAtom);
  return (
    <div
      className={cn(
        'relative flex flex-1 flex-col-reverse w-full text-white h-full gap-3 p-4 overflow-auto',
        side === 'left' ? 'items-start' : 'items-end',
      )}
    >
      {speech.map((sentence, index) => {
        return (
          <SpeechBubble side={side} key={sentence + index} text={sentence} />
        );
      })}
    </div>
  );
};
