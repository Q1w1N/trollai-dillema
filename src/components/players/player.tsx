import { Atom, useAtom } from 'jotai';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { cn } from '@/lib/utils';

type PlayerProps = {
  side: 'left' | 'right';
  playerAtom: Atom<string[]>;
};

export const Player = ({ side, playerAtom }: PlayerProps) => {
  // eslint-disable-next-line no-empty-pattern
  const [] = useAtom(playerAtom);

  const playerColor = side === 'left' ? 'bg-green-900' : 'bg-blue-900';

  return (
    <div
      className={'col-span-1 rounded-xl content-center justify-items-center'}
    >
      <Card className={cn('flex flex-col h-full w-full', playerColor)}>
        <CardHeader>
          <CardTitle>Describe {side} player</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea className="w-full h-full" />
        </CardContent>
      </Card>
    </div>
  );
};
