import { useAtom } from 'jotai';
import { Button } from '../ui/button';
import {
  leftPlayerDescriptionAtom,
  leftPlayerStateAtom,
  rightPlayerDescriptionAtom,
  rightPlayerStateAtom,
} from '@/atoms/players-atoms';
import {
  leftVictimDescriptionAtom,
  rightVictimDescriptionAtom,
} from '@/atoms/victims-atoms';
import { useEffect, useState } from 'react';
import { gameStateAtom } from '@/atoms/game-state-atoms';
import { conductorStateAtom } from '@/atoms/conductor-atoms';

export const GameControl = () => {
  const [leftPlayerDescription] = useAtom(leftPlayerDescriptionAtom);
  const [rightPlayerDescription] = useAtom(rightPlayerDescriptionAtom);

  const [leftVictimDescription] = useAtom(leftVictimDescriptionAtom);
  const [rightVictimDescription] = useAtom(rightVictimDescriptionAtom);

  const [gameState, setGameState] = useAtom(gameStateAtom);
  const [canStart, setCanStart] = useState(false);
  const [, setConductorState] = useAtom(conductorStateAtom);
  const [, setLeftPlayerState] = useAtom(leftPlayerStateAtom);
  const [, setRightPlayerState] = useAtom(rightPlayerStateAtom);

  useEffect(() => {
    if (
      leftPlayerDescription !== '' &&
      rightPlayerDescription !== '' &&
      leftVictimDescription !== '' &&
      rightPlayerDescription !== ''
    ) {
      setCanStart(true);
    } else {
      setCanStart(false);
    }
  }, [
    leftPlayerDescription,
    rightPlayerDescription,
    leftVictimDescription,
    rightVictimDescription,
  ]);

  return (
    <div className="place-self-center col-span-1">
      {gameState === 'paused' || gameState === 'stopped' ? (
        <Button
          onClick={() => {
            setGameState('started');
            setConductorState('listening');
          }}
          disabled={!canStart}
        >
          START
        </Button>
      ) : (
        <Button
          onClick={() => {
            setGameState('stopped');
            setConductorState('waiting');
            setLeftPlayerState('waiting');
            setRightPlayerState('waiting');
          }}
        >
          STOP
        </Button>
      )}
    </div>
  );
};
