import { gameStore } from '@/atoms/store';
import { dramaticPause } from '@/lib/utils';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { Agent } from 'flows-ai';
import { PrimitiveAtom } from 'jotai';
import s from 'dedent';

const openai = createOpenAI({ apiKey: import.meta.env['VITE_OPENAI_API_KEY'] });

type PlayerProps = {
  playerDescriptionAtom: PrimitiveAtom<string>;
  playerSpeechAtom: PrimitiveAtom<string[]>;
  playerVictimDescriptionAtom: PrimitiveAtom<string>;
  oponentVictimDescriptionAtom: PrimitiveAtom<string>;
};

export const preparePlayer = ({
  playerDescriptionAtom,
  playerSpeechAtom,
  playerVictimDescriptionAtom,
  oponentVictimDescriptionAtom,
}: PlayerProps) => {
  const playerDescription = gameStore.get(playerDescriptionAtom);
  const playerVictim = gameStore.get(playerVictimDescriptionAtom);
  const oponentVictim = gameStore.get(oponentVictimDescriptionAtom);

  return makePlayerAgent({
    playerContextAtom: playerSpeechAtom,
    model: openai('gpt-4o'),
    system: s`
      You are playing a Trolley dillema game.

      --- PERSONAS ---
      You are impersonating: 
      ${playerDescription}
      
      STAY TRUE TO YOUR CHARACTER! 
      Think like that character, and argument like that character!
      
      --- YOUR RULES ---
      Present only ONE ARGUMENT per response
      Your arguments HAVE TO BE short and sweet, 
      ideally one sentence per argument!

      --- VICTIM YOU WANT TO SPARE
      ${playerVictim}

      --- VICTIM YOU WANT TO SACRIFICE
      ${oponentVictim}
      `,
  });
};

type PlayerAgentProps = Parameters<typeof generateText>[0] & {
  playerContextAtom: PrimitiveAtom<string[]>;
};

function makePlayerAgent({
  maxSteps = 2,
  playerContextAtom,
  ...rest
}: PlayerAgentProps): Agent {
  return async ({ input }) => {
    const playerContext = gameStore.get(playerContextAtom);

    const response = await generateText({
      ...rest,
      maxSteps,
      prompt: s`
        Here are your current arguments: 
        ${playerContext.join('\n')}
        Round number: ${JSON.stringify(input)}
      `,
    });

    gameStore.set(playerContextAtom, (speech) => [...speech, response.text]);
    await dramaticPause(5);

    return response.text;
  };
}
