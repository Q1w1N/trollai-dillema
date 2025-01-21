import {
  leftVictimDescriptionAtom,
  rightVictimDescriptionAtom,
} from '@/atoms/victims-atoms';
import { Victim } from './victim';
import { GameControl } from './game-controls';

export const VictimsSection = () => {
  return (
    <div className="grid grid-cols-9 row-span-2 col-span-3 gap-3 justify-stretch">
      <Victim victimDescriptionAtom={leftVictimDescriptionAtom} side="left" />
      <GameControl />
      <Victim victimDescriptionAtom={rightVictimDescriptionAtom} side="right" />
    </div>
  );
};
