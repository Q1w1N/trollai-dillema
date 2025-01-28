import {
  conductorDecisionAtom,
  conductorSpeechAtom,
  conductorStateAtom,
} from '@/atoms/conductor-atoms';
import { gameStateAtom } from '../atoms/game-state-atoms';
import { gameStore } from '@/atoms/store';
import { preparePlayer } from './player-system';
import {
  leftPlayerDescriptionAtom,
  leftPlayerSpeechAtom,
  rightPlayerDescriptionAtom,
  rightPlayerSpeechAtom,
} from '@/atoms/players-atoms';
import { parallel, sequence } from 'flows-ai/flows';
import { execute } from 'flows-ai';
import {
  leftVictimDescriptionAtom,
  rightVictimDescriptionAtom,
} from '@/atoms/victims-atoms';
import { prepareConductor } from './conductor-system';
import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({ apiKey: import.meta.env['VITE_OPENAI_API_KEY'] });

const setupRounds = (roundsAmount: number) => {
  return sequence(
    new Array(roundsAmount).fill(0).map((_, index) => {
      return parallel(
        [
          {
            agent: 'leftPlayerAgent',
            name: 'leftPlayer',
            input: `#${index + 1}`,
          },
          {
            agent: 'rightPlayerAgent',
            name: 'rightPlayer',
            input: `#${index + 1}`,
          },
        ],
        `Round ${index + 1}`,
      );
    }),
    `Players Argumenting Phase`,
  );
};

export const startGame = () => {
  gameStore.set(gameStateAtom, 'started');
  gameStore.set(conductorStateAtom, 'listening');

  const rightPlayerAgent = preparePlayer({
    playerDescriptionAtom: rightPlayerDescriptionAtom,
    playerSpeechAtom: rightPlayerSpeechAtom,
    playerVictimDescriptionAtom: rightVictimDescriptionAtom,
    oponentVictimDescriptionAtom: leftVictimDescriptionAtom,
  });

  const leftPlayerAgent = preparePlayer({
    playerDescriptionAtom: leftPlayerDescriptionAtom,
    playerSpeechAtom: leftPlayerSpeechAtom,
    playerVictimDescriptionAtom: leftVictimDescriptionAtom,
    oponentVictimDescriptionAtom: rightVictimDescriptionAtom,
  });

  const conductorAgent = prepareConductor();

  const flow = sequence(
    [
      setupRounds(3),
      {
        agent: 'conductorAgent',
        name: 'Conductor Speech',
        input: 'Make your decision based on provided arguments!',
      },
    ],
    'Game Flow',
  );

  execute(flow, {
    model: openai('gpt-4o'),
    agents: {
      leftPlayerAgent,
      rightPlayerAgent,
      conductorAgent,
    },
    onFlowStart: (flow) => {
      if (flow.name === 'Players Argumenting Phase') {
        gameStore.set(conductorStateAtom, 'listening');
      }
      if (flow.name === 'Conductor Speech') {
        gameStore.set(conductorStateAtom, 'deciding');
      }
    },
    onFlowFinish: (flow) => {
      if (flow.name === 'Players Argumenting Phase') {
        gameStore.set(conductorStateAtom, 'thinking');
      }
      if (flow.name === 'Conductor Speech') {
        gameStore.set(conductorStateAtom, 'done');
        gameStore.set(gameStateAtom, 'finished');
      }
    },
  });
};

export const restartGame = () => {
  gameStore.set(gameStateAtom, 'stopped');
  gameStore.set(conductorStateAtom, 'waiting');

  gameStore.set(leftPlayerSpeechAtom, []);
  gameStore.set(rightPlayerSpeechAtom, []);
  gameStore.set(conductorSpeechAtom, []);
  gameStore.set(conductorDecisionAtom, 'none');
};
