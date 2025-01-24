import {
  conductorDecisionAtom,
  conductorSpeechAtom,
  conductorStateAtom,
} from '@/atoms/conductor-atoms';
import { gameStateAtom } from '../atoms/game-state-atoms';
import { gameStore } from '@/atoms/store';
import { preparePlayer, setupVictims } from './player-system';
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

export const startGame = () => {
  gameStore.set(gameStateAtom, 'started');
  gameStore.set(conductorStateAtom, 'listening');

  const rightPlayerAgent = preparePlayer({
    playerDescriptionAtom: rightPlayerDescriptionAtom,
    playerSpeechAtom: rightPlayerSpeechAtom,
  });

  const leftPlayerAgent = preparePlayer({
    playerDescriptionAtom: leftPlayerDescriptionAtom,
    playerSpeechAtom: leftPlayerSpeechAtom,
  });

  const conductorAgent = prepareConductor();

  const flow = sequence([
    parallel([
      {
        agent: 'leftPlayerAgent',
        name: 'leftPlayer',
        input: setupVictims({
          playerVictimAtom: leftVictimDescriptionAtom,
          oponentVictimAtom: rightVictimDescriptionAtom,
        }),
      },
      {
        agent: 'rightPlayerAgent',
        name: 'rightPlayer',
        input: setupVictims({
          playerVictimAtom: rightVictimDescriptionAtom,
          oponentVictimAtom: leftVictimDescriptionAtom,
        }),
      },
    ]),
    {
      agent: 'conductorAgent',
      name: 'conductor',
      input: 'Make your decision based on provided arguments!',
    },
  ]);

  execute(flow, {
    agents: {
      leftPlayerAgent,
      rightPlayerAgent,
      conductorAgent,
    },
    onFlowStart: (flow, context) => {
      console.log(`----FLOW ${flow.name} Started`);
      console.log('Input: ', flow.input);
      console.log('Context: ', context);
      console.log('---');
    },
    onFlowFinish: (flow, result) => {
      console.log(`----FLOW ${flow.name} Started`);
      console.log('Input: ', flow.input);
      console.log('Result: ', result);
      console.log('---');
    },
  });
};

export const pauseGame = () => {
  gameStore.set(gameStateAtom, 'paused');
};

export const continueGame = () => {
  gameStore.set(gameStateAtom, 'started');
};

export const stopGame = () => {
  gameStore.set(gameStateAtom, 'stopped');
  gameStore.set(conductorStateAtom, 'waiting');

  gameStore.set(leftPlayerSpeechAtom, []);
  gameStore.set(rightPlayerSpeechAtom, []);
  gameStore.set(conductorSpeechAtom, []);
  gameStore.set(conductorDecisionAtom, 'none');
};
