import { ConductorState, Decision } from "@/types";
import { atom } from "jotai";

export const conductorDecisionAtom = atom<Decision>("bomb")

export const conductorStateAtom = atom<ConductorState>("waiting")

export const conductorSpeechAtom = atom<string[]>([])