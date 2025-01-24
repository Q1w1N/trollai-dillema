import { useAtom } from 'jotai';
import { Textarea } from '../ui/textarea';
import { cn } from '@/lib/utils';
import { PrimitiveAtom } from 'jotai';
import { gameStateAtom } from '@/atoms/game-state-atoms';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

type PlayerProps = {
  side: 'left' | 'right';
  playerDescriptionAtom: PrimitiveAtom<string>;
};

export const Player = ({ side, playerDescriptionAtom }: PlayerProps) => {
  const [gameState] = useAtom(gameStateAtom);

  const [description, setDescription] = useAtom(playerDescriptionAtom);

  const playerColor = side === 'left' ? 'border-emerald-300' : 'border-sky-300';

  return (
    <Card
      className={cn(
        'flex flex-col col-span-1 rounded-xl border-2',
        playerColor,
      )}
    >
      {gameState === 'stopped' ? (
        <>
          <CardHeader>
            <CardTitle className="capitalize">{side} player</CardTitle>
            <CardDescription>
              Describe player on the {side} side
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={description}
              onChange={(e) => {
                setDescription(e.currentTarget.value);
              }}
              className="w-full h-full"
            />
          </CardContent>
        </>
      ) : (
        <CardContent className="flex-1 content-center text-2xl pt-6 text-center justify-center font-medium capitalize">
          {description}
        </CardContent>
      )}
    </Card>
  );
};
