import {
  leftPlayerDescriptionAtom,
  leftPlayerSpeechAtom,
  leftPlayerStateAtom,
  rightPlayerDescriptionAtom,
  rightPlayerSpeechAtom,
  rightPlayerStateAtom,
} from '@/atoms/players-atoms';
import { Conductor } from './conductor';
import { Player } from './player';
import {
  leftVictimDescriptionAtom,
  rightVictimDescriptionAtom,
} from '@/atoms/victims-atoms';

export const PlayersSection = () => {
  return (
    <div className="z-10 grid col-span-3 row-span-2 grid-cols-3 gap-3">
      <Player
        side="left"
        playerStateAtom={leftPlayerStateAtom}
        playerSpeechAtom={leftPlayerSpeechAtom}
        playerDescriptionAtom={leftPlayerDescriptionAtom}
        playerVictimDescription={leftVictimDescriptionAtom}
        oponentVictimDescription={rightVictimDescriptionAtom}
      />
      <Conductor />
      <Player
        side="right"
        playerStateAtom={rightPlayerStateAtom}
        playerSpeechAtom={rightPlayerSpeechAtom}
        playerDescriptionAtom={rightPlayerDescriptionAtom}
        playerVictimDescription={rightVictimDescriptionAtom}
        oponentVictimDescription={leftVictimDescriptionAtom}
      />
    </div>
  );
};
