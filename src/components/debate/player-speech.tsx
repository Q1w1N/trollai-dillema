import { Atom, useAtom } from 'jotai';
import { SpeechBubble } from './speech-bubble';
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
        'flex flex-col-reverse justify-start w-full h-full p-3 overflow-y-auto content-end',
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
