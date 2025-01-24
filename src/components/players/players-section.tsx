import {
  leftPlayerDescriptionAtom,
  rightPlayerDescriptionAtom,
} from '@/atoms/players-atoms';
import { Conductor } from './conductor';
import { Player } from './player';

export const PlayersSection = () => {
  return (
    <div className="z-10 grid col-span-3 row-span-2 grid-cols-3 gap-3">
      <Player side="left" playerDescriptionAtom={leftPlayerDescriptionAtom} />
      <Conductor />
      <Player side="right" playerDescriptionAtom={rightPlayerDescriptionAtom} />
    </div>
  );
};
