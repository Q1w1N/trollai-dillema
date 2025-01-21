import { useAtom } from 'jotai';
import { Textarea } from '../ui/textarea';
import { cn, dramaticPause } from '@/lib/utils';
import { PrimitiveAtom } from 'jotai';
import { gameStateAtom } from '@/atoms/game-state-atoms';
import { agent, execute } from 'flows-ai';
import { tool } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { useCallback, useEffect } from 'react';
import z from 'zod';
import { PlayerState } from '@/types';
import { conductorStateAtom } from '@/atoms/conductor-atoms';
import { getPlayerSystemPrompt } from '@/ai-brains/player-system';

const openai = createOpenAI({ apiKey: import.meta.env['VITE_OPENAI_API_KEY'] });

type PlayerProps = {
  side: 'left' | 'right';
  playerStateAtom: PrimitiveAtom<PlayerState>;
  playerSpeechAtom: PrimitiveAtom<string[]>;
  playerDescriptionAtom: PrimitiveAtom<string>;

  playerVictimDescription: PrimitiveAtom<string>;
  oponentVictimDescription: PrimitiveAtom<string>;
};

export const Player = ({
  side,
  playerStateAtom,
  playerSpeechAtom,
  playerDescriptionAtom,
  playerVictimDescription,
  oponentVictimDescription,
}: PlayerProps) => {
  const [gameState] = useAtom(gameStateAtom);
  const [conductorState] = useAtom(conductorStateAtom);

  const [, setPlayerState] = useAtom(playerStateAtom);

  const [, setSpeech] = useAtom(playerSpeechAtom);

  const [description, setDescription] = useAtom(playerDescriptionAtom);

  const [playerVictim] = useAtom(playerVictimDescription);
  const [oponentVictim] = useAtom(oponentVictimDescription);

  const playerColor = side === 'left' ? 'bg-green-900' : 'bg-blue-900';

  const preparePlayer = useCallback(() => {
    console.log('Declaring agent!');
    return agent({
      model: openai('gpt-4'),
      system: getPlayerSystemPrompt(description, playerVictim, oponentVictim),
      toolChoice: 'required',
      maxSteps: 2,
      tools: {
        present_argument: tool({
          parameters: z.object({
            argument: z.string().describe('Your Argument to put on the table!'),
          }),
          execute: async ({ argument }) => {
            setSpeech((speech) => [...speech, argument]);
            await dramaticPause(5);
            return `You argumented that: ${argument}`;
          },
        }),
      },
    });
  }, [description, playerVictim, oponentVictim, setSpeech]);

  useEffect(() => {
    if (gameState === 'started') {
      setPlayerState('argumenting');

      console.log('Running Execute on ', side);
      const player = preparePlayer();
      execute(
        {
          agent: `${side}Agent`,
          name: `trolley-${side}-player`,
          input: 'Game has started',
        },
        {
          agents: { [`${side}Agent`]: player },
          onFlowStart: () => {
            console.log(`trolley-${side}-player Started argumenting`);
          },
          onFlowFinish: () => {
            console.log(`trolley-${side}-player Finished argumenting`);
            setPlayerState('waiting-for-verdict');
          },
        },
      );
    }
  }, [gameState, preparePlayer, side, setPlayerState]);

  useEffect(() => {
    if (conductorState === 'done') {
      setPlayerState('waiting');
    }
  }, [conductorState, setPlayerState]);

  return (
    <div
      className={'col-span-1 rounded-xl content-center justify-items-center'}
    >
      <div
        className={cn(
          'flex flex-col h-full w-full p-6 border rounded-xl items-center gap-6 text-white',
          playerColor,
        )}
      >
        {gameState === 'paused' ? (
          <>
            <p>Describe {side} player</p>
            <Textarea
              value={description}
              onChange={(e) => {
                setDescription(e.currentTarget.value);
              }}
              className="w-full h-full"
            />
          </>
        ) : (
          <div className="flex-1 content-center text-2xl text-center justify-center font-medium capitalize">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};
