import { useAtom } from 'jotai';
import { Button } from './ui/button';
import { gameStateAtom } from '@/atoms/game-state-atoms';
import { PlayIcon, RefreshCwIcon } from 'lucide-react';
import { restartGame, startGame } from '@/ai-brains/game-flow';

export const GameControl = () => {
  const [gameState] = useAtom(gameStateAtom);

  return (
    <div className="place-self-center col-span-1 flex gap-4">
      {gameState === 'stopped' ? (
        <Button
          className="bg-green-500 rounded-full w-10 h-10"
          onClick={startGame}
        >
          <PlayIcon />
        </Button>
      ) : null}
      {gameState === 'finished' ? (
        <Button
          className="bg-yellow-500 rounded-full w-10 h-10"
          onClick={restartGame}
        >
          <RefreshCwIcon />
        </Button>
      ) : null}
    </div>
  );
};
