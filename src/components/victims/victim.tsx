import { PrimitiveAtom, useAtom } from 'jotai';
import { Textarea } from '../ui/textarea';
import { gameStateAtom } from '@/atoms/game-state-atoms';
import { conductorDecisionAtom } from '@/atoms/conductor-atoms';
import { X } from 'lucide-react';

type VictimProps = {
  side: 'left' | 'right';
  victimDescriptionAtom: PrimitiveAtom<string>;
};

export const Victim = ({ side, victimDescriptionAtom }: VictimProps) => {
  const [description, setDescription] = useAtom(victimDescriptionAtom);
  const [decision] = useAtom(conductorDecisionAtom);
  const [gameState] = useAtom(gameStateAtom);

  return (
    <div className="relative flex flex-col gap-6 col-span-4 rounded-xl border w-[60%] justify-self-center bg-background text-white justify-items-center p-8">
      {gameState === 'paused' ? (
        <>
          <p>Describe {side} victim</p>
          <Textarea
            value={description}
            onChange={(e) => {
              setDescription(e.currentTarget.value);
            }}
            className="w-full h-full"
          />
        </>
      ) : (
        <div className="z-10 flex-1 content-center text-2xl text-center justify-center font-medium capitalize">
          {description}
        </div>
      )}
      {decision === side ? (
        <X
          scale={2}
          size={40}
          className="z-0 inline-block right-0 left-0 top-0 bottom-0 h-full w-full text-red-600 absolute"
        />
      ) : null}
    </div>
  );
};
