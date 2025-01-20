import {
  leftPlayerSpeechAtom,
  rightPlayerSpeechAtom,
} from '@/atoms/players-atoms';
import { PlayerSpeech } from './player-speech';
import { Button } from '../ui/button';

export const DebateSection = () => {
  return (
    <div className="grid grid-cols-3 row-span-2 col-span-3 gap-3 p-3 justify-stretch">
      <PlayerSpeech side="left" playerSpeechAtom={leftPlayerSpeechAtom} />

      <div className="flex-1">
        <div className="flex-1 place-self-center">
          <Button disabled>START</Button>
        </div>
      </div>
      <PlayerSpeech side="right" playerSpeechAtom={rightPlayerSpeechAtom} />
    </div>
  );
};
