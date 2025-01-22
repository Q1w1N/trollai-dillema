import {
  leftPlayerSpeechAtom,
  rightPlayerSpeechAtom,
} from '@/atoms/players-atoms';
import { PlayerSpeech } from './player-speech';
import { ConductorSpeech } from './conductor-speech';

export const DebateSection = () => {
  return (
    <div className="grid grid-rows-1 grid-cols-3 row-span-4 col-span-3 gap-3 py-3 justify-stretch">
      <div className="col-span-1 row-span-1 pt-12">
        <PlayerSpeech side="left" playerSpeechAtom={leftPlayerSpeechAtom} />
      </div>

      <div className="col-span-1 row-span-1">
        <ConductorSpeech />
      </div>
      <div className="col-span-1 row-span-1 pt-12">
        <PlayerSpeech side="right" playerSpeechAtom={rightPlayerSpeechAtom} />
      </div>
    </div>
  );
};
