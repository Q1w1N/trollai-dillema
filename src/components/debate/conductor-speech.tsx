import { conductorSpeechAtom } from '@/atoms/conductor-atoms';
import { useAtom } from 'jotai';
import { SpeechBubble } from './speech-bubble';

export const ConductorSpeech = () => {
  const [speech] = useAtom(conductorSpeechAtom);

  return (
    <div
      className={
        'block w-full h-full p-3 overflow-y-auto content-start text-white font-semibold'
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
