import { PrimitiveAtom, useAtom } from 'jotai';
import { Textarea } from '../ui/textarea';
import { gameStateAtom } from '@/atoms/game-state-atoms';
import { conductorDecisionAtom } from '@/atoms/conductor-atoms';
import { Skull, X } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { cn } from '@/lib/utils';

type VictimProps = {
  side: 'left' | 'right';
  victimDescriptionAtom: PrimitiveAtom<string>;
};

export const Victim = ({ side, victimDescriptionAtom }: VictimProps) => {
  const [description, setDescription] = useAtom(victimDescriptionAtom);
  const [decision] = useAtom(conductorDecisionAtom);
  const [gameState] = useAtom(gameStateAtom);

  const playerColor = side === 'left' ? 'border-emerald-300' : 'border-sky-300';

  return (
    <Card
      className={cn(
        'relative flex flex-col col-span-4 border-2 w-[60%] justify-self-center bg-background justify-items-center',
        playerColor,
      )}
    >
      {gameState === 'stopped' ? (
        <>
          <CardHeader>
            <CardTitle className="capitalize">{side} victim</CardTitle>
            <CardDescription>
              Describe victim on the {side} track
            </CardDescription>
          </CardHeader>
          <CardContent className="z-10 rounded-lg">
            <Textarea
              value={description}
              onChange={(e) => {
                setDescription(e.currentTarget.value);
              }}
              className="bg-background w-full h-full"
            />
          </CardContent>
        </>
      ) : (
        <CardContent className="z-10 h-full pt-6 w-full content-center bg-background self-center rounded-xl font-semibold text-center text-2xl">
          <p className="relative z-10">{description}</p>
          {decision === side ? (
            <X
              scale={2}
              size={40}
              className="z-0 inline-block right-0 left-0 top-0 bottom-0 h-full w-full text-red-300 absolute"
            />
          ) : null}
        </CardContent>
      )}

      {decision === side ? (
        <CardFooter className="z-10 bg-background absolute -bottom-10 right-0 left-0 m-auto inline-block place-self-center">
          <div className="scale-[4] bg-background text-red-500">
            <Skull />
          </div>
        </CardFooter>
      ) : null}
    </Card>
  );
};
