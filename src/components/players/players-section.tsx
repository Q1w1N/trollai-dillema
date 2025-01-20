import {
  leftPlayerSpeechAtom,
  rightPlayerSpeechAtom,
} from '@/atoms/players-atoms';
import { DecisionMaker } from './decision-maker';
import { Player } from './player';

export const PlayersSection = () => {
  return (
    <div className="z-10 grid col-span-3 row-span-2 grid-cols-3 gap-3">
      <Player playerAtom={leftPlayerSpeechAtom} side="left" />
      <DecisionMaker />
      <Player playerAtom={rightPlayerSpeechAtom} side="right" />
    </div>
  );
};
