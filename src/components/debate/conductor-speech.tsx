import { conductorSpeechAtom } from '@/atoms/conductor-atoms';
import { useAtom } from 'jotai';
import { SpeechBubble } from '../ui/speech-bubble';

export const ConductorSpeech = () => {
  const [speech] = useAtom(conductorSpeechAtom);

  return (
    <div
      className={
        'flex flex-col w-full h-full text-white gap-3 p-4 overflow-auto'
      }
    >
      {speech.map((sentence, index) => {
        return (
          <SpeechBubble
            side={'decision'}
            key={sentence + index}
            text={sentence}
          />
        );
      })}
    </div>
  );
};
