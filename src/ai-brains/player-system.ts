import { gameStore } from '@/atoms/store';
import { dramaticPause } from '@/lib/utils';
import { createOpenAI } from '@ai-sdk/openai';
import { tool } from 'ai';
import { agent } from 'flows-ai';
import { PrimitiveAtom } from 'jotai';
import { z } from 'zod';

const openai = createOpenAI({ apiKey: import.meta.env['VITE_OPENAI_API_KEY'] });

export const getPlayerSystemPrompt = (description: string) => {
  return `
      You are playing a Trolley dillema game.

      --- PERSONAS ---
      You are impersonating: 
      ${description}
      
      STAY TRUE TO YOUR CHARACTER! 
      Think like that character, and argument like that character!
      
      --- YOUR RULES ---
      You can use present_argument function only ONCE, 
      Your arguments HAVE TO BE short and sweet, 
      ideally one sentence per argument!
      
      As a final response return your arguments as a list!
      `;
};

export const setupVictims = ({
  playerVictimAtom,
  oponentVictimAtom,
}: {
  playerVictimAtom: PrimitiveAtom<string>;
  oponentVictimAtom: PrimitiveAtom<string>;
}) => {
  const playerVictim = gameStore.get(playerVictimAtom);
  const oponentVictim = gameStore.get(oponentVictimAtom);

  return `
  --- VICTIM YOU WANT TO SPARE
  ${playerVictim}

  --- VICTIM YOU WANT TO SACRIFICE
  ${oponentVictim}
  `;
};

type PlayerProps = {
  playerDescriptionAtom: PrimitiveAtom<string>;
  playerSpeechAtom: PrimitiveAtom<string[]>;
};

export const preparePlayer = ({
  playerDescriptionAtom,
  playerSpeechAtom,
}: PlayerProps) => {
  const playerDescription = gameStore.get(playerDescriptionAtom);
  const presentArgument = (argument: string) => {
    gameStore.set(playerSpeechAtom, (speech) => [...speech, argument]);
  };

  return agent({
    model: openai('gpt-4o'),
    system: getPlayerSystemPrompt(playerDescription),
    toolChoice: 'auto',
    maxSteps: 2,
    tools: {
      present_argument: tool({
        parameters: z.object({
          argument: z.string().describe('Your Argument to put on the table!'),
        }),
        execute: async ({ argument }) => {
          presentArgument(argument);
          await dramaticPause(5);
          return `You argumented that: ${argument}`;
        },
      }),
    },
  });
};
