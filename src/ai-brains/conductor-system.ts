import {
  conductorDecisionAtom,
  conductorSpeechAtom,
} from '@/atoms/conductor-atoms';
import { gameStore } from '@/atoms/store';
import {
  leftVictimDescriptionAtom,
  rightVictimDescriptionAtom,
} from '@/atoms/victims-atoms';
import { dramaticPause } from '@/lib/utils';
import { createOpenAI } from '@ai-sdk/openai';
import { tool } from 'ai';
import { agent } from 'flows-ai';
import { z } from 'zod';

const openai = createOpenAI({ apiKey: import.meta.env['VITE_OPENAI_API_KEY'] });

export const getConductorSystemPrompt = () => {
  const leftVictim = gameStore.get(leftVictimDescriptionAtom);
  const rightVictim = gameStore.get(rightVictimDescriptionAtom);

  return `You are playing a Trolley dillema game Conductor.
      THE TRAIN IS INCOMING! There are two tracks, left and right.
      There is a victim on the left track, and a victim on the right track.
      You are responsible with picking track to send the train to, that victim will be run over by a train!
      If you don't make a decision, the train will hit the bomb and everyone explodes!

      ---
      
      On the LEFT tracks there is: ${leftVictim}

      On the RIGHT tracks there is: ${rightVictim}
      
      ---

      Now you have to make a decision who will be run over with a train!!
      Make your final speech short, but impactful! There is a lot of tension!`;
};

export const prepareConductor = () => {
  return agent({
    model: openai('gpt-4o'),
    system: getConductorSystemPrompt(),
    toolChoice: 'required',
    maxSteps: 1,
    tools: {
      speak: tool({
        parameters: z.object({
          final_speech_part_1: z
            .string()
            .describe('First part of final speech.'),
          final_speech_part_2: z
            .string()
            .describe('Second part of final speech'),
          verdict_announcement: z
            .string()
            .describe(
              'Explicit verdict announcement! Inform Explicitly who will be spared!',
            ),
          train_direction: z
            .enum(['left', 'right'])
            .describe(
              'A direction to which train will go resulting in casaulty on that side.',
            ),
        }),
        execute: async ({
          final_speech_part_1,
          final_speech_part_2,
          verdict_announcement,
          train_direction,
        }) => {
          gameStore.set(conductorSpeechAtom, (speech) => [
            ...speech,
            final_speech_part_1,
          ]);
          await dramaticPause(3);
          gameStore.set(conductorSpeechAtom, (speech) => [
            ...speech,
            final_speech_part_2,
          ]);
          await dramaticPause(3);
          gameStore.set(conductorSpeechAtom, (speech) => [
            ...speech,
            verdict_announcement,
          ]);
          gameStore.set(conductorDecisionAtom, train_direction);
          return `You have decided. Good job.`;
        },
      }),
    },
  });
};
