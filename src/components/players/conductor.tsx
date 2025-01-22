import {
  conductorDecisionAtom,
  conductorSpeechAtom,
  conductorStateAtom,
} from '@/atoms/conductor-atoms';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { useAtom } from 'jotai';
import { gameStateAtom } from '@/atoms/game-state-atoms';
import { useCallback, useEffect } from 'react';
import {
  leftPlayerSpeechAtom,
  leftPlayerStateAtom,
  rightPlayerSpeechAtom,
  rightPlayerStateAtom,
} from '@/atoms/players-atoms';
import {
  leftVictimDescriptionAtom,
  rightVictimDescriptionAtom,
} from '@/atoms/victims-atoms';
import { agent, execute } from 'flows-ai';
import { createOpenAI } from '@ai-sdk/openai';
import { tool } from 'ai';
import { z } from 'zod';
import { dramaticPause } from '@/lib/utils';
import { getConductorSystemPrompt } from '@/ai-brains/conductor-system';

const openai = createOpenAI({ apiKey: import.meta.env['VITE_OPENAI_API_KEY'] });

export const Conductor = () => {
  const [conductorState, setConductorState] = useAtom(conductorStateAtom);
  const [conductorDecision, setConductorDecision] = useAtom(
    conductorDecisionAtom,
  );
  const [, setConductorSpeech] = useAtom(conductorSpeechAtom);
  const [, setGameState] = useAtom(gameStateAtom);

  const [leftPlayerState] = useAtom(leftPlayerStateAtom);
  const [leftPlayerSpeech] = useAtom(leftPlayerSpeechAtom);
  const [leftVictimDescription] = useAtom(leftVictimDescriptionAtom);

  const [rightPlayerState] = useAtom(rightPlayerStateAtom);
  const [rightPlayerSpeech] = useAtom(rightPlayerSpeechAtom);
  const [rightVictimDescription] = useAtom(rightVictimDescriptionAtom);

  const prepareConductor = useCallback(() => {
    return agent({
      model: openai('gpt-4'),
      system: getConductorSystemPrompt(
        leftVictimDescription,
        rightVictimDescription,
        leftPlayerSpeech,
        rightPlayerSpeech,
      ),
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
            verdict_announcement: z.string().describe('Verdict announcement!'),
            verdict: z.enum(['left', 'right']),
          }),
          execute: async ({
            final_speech_part_1,
            final_speech_part_2,
            verdict_announcement,
            verdict,
          }) => {
            setConductorSpeech((speech) => [...speech, final_speech_part_1]);
            await dramaticPause(2);
            setConductorSpeech((speech) => [...speech, final_speech_part_2]);
            await dramaticPause(2);
            setConductorSpeech((speech) => [...speech, verdict_announcement]);
            setConductorDecision(verdict);
            return `You have decided. Good job.`;
          },
        }),
      },
    });
  }, [
    leftVictimDescription,
    leftPlayerSpeech,
    rightVictimDescription,
    rightPlayerSpeech,
    setConductorDecision,
    setConductorSpeech,
  ]);

  useEffect(() => {
    if (
      leftPlayerState === 'waiting-for-verdict' &&
      rightPlayerState === 'waiting-for-verdict'
    ) {
      setConductorState('thinking');
    }
  }, [leftPlayerState, rightPlayerState, setConductorState]);

  useEffect(() => {
    if (conductorState === 'thinking') {
      const conductorAgent = prepareConductor();
      try {
        execute(
          {
            agent: 'conductorAgent',
            name: `conductor`,
            input: 'Time for your decision!',
          },
          {
            agents: { conductorAgent },
            onFlowStart: () => {
              console.log('Conductor has started deciding');
              setConductorState('deciding');
            },
            onFlowFinish: () => {
              console.log('Conductor is finishing the game');
              setConductorState('done');
              setGameState('finished');
            },
          },
        );
      } catch (e) {
        console.error(e);
      }
    }
  }, [prepareConductor, setConductorState, setGameState, conductorState]);

  return (
    <div className="flex flex-col col-span-1 h-full self-end rounded-xl items-center content-center gap-3 justify-items-center">
      <Tabs
        defaultValue={conductorDecision}
        value={conductorDecision}
        className="w-full"
      >
        <TabsList className="w-full pointer-events-none select-none">
          <TabsTrigger
            className="flex-1 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            value="left"
          >
            Left Track
          </TabsTrigger>
          <TabsTrigger
            className="flex-1 h-full data-[state=active]:bg-red-700 data-[state=active]:bg-opacity-50"
            value={'none'}
          ></TabsTrigger>
          <TabsTrigger
            className="flex-1 data-[state=active]:bg-sky-500 data-[state=active]:text-white"
            value="right"
          >
            Right Track
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Card className="flex flex-[4] flex-col h-full w-full items-center content-between">
        <CardHeader>
          <CardTitle className="text-bold">Conductor</CardTitle>
          <CardDescription className="self-center font-bold">
            is
          </CardDescription>
        </CardHeader>
        <CardContent className="content-center uppercase text-3xl font-bold">
          {conductorState}
        </CardContent>
      </Card>
    </div>
  );
};
