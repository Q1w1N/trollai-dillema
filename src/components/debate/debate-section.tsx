import {
  leftPlayerSpeechAtom,
  rightPlayerSpeechAtom,
} from '@/atoms/players-atoms';
import { PlayerSpeech } from './player-speech';
import { ConductorSpeech } from './conductor-speech';

export const DebateSection = () => {
  return (
    <div className="grid grid-rows-1 grid-cols-3 row-span-4 col-span-3 gap-3 justify-stretch">
      <div className="col-span-1 row-span-1 p-4">
        <PlayerSpeech side="left" playerSpeechAtom={leftPlayerSpeechAtom} />
      </div>

      <div className="col-span-1 row-span-1 p-4">
        <ConductorSpeech />
      </div>
      <div className="col-span-1 row-span-1 p-4">
        <PlayerSpeech side="right" playerSpeechAtom={rightPlayerSpeechAtom} />
      </div>
    </div>
  );
};
