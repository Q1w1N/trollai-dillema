import { useAtom } from 'jotai';
import { Button } from './ui/button';
import { gameStateAtom } from '@/atoms/game-state-atoms';
import { Pause, PlayIcon, Square } from 'lucide-react';
import {
  pauseGame,
  stopGame,
  startGame,
  continueGame,
} from '@/ai-brains/game-flow';

export const GameControl = () => {
  const [gameState] = useAtom(gameStateAtom);

  return (
    <div className="place-self-center col-span-1 flex gap-4">
      {gameState === 'stopped' || gameState === 'paused' ? (
        <Button
          className="bg-green-500 rounded-full w-10 h-10"
          onClick={gameState === 'paused' ? continueGame : startGame}
        >
          <PlayIcon />
        </Button>
      ) : null}
      {gameState === 'started' ? (
        <Button
          className="bg-yellow-500 rounded-full w-10 h-10"
          onClick={pauseGame}
        >
          <Pause />
        </Button>
      ) : null}
      {gameState === 'paused' ? (
        <Button
          className="bg-red-400 rounded-full w-10 h-10"
          onClick={stopGame}
        >
          <Square />
        </Button>
      ) : null}
    </div>
  );
};
