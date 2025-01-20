import { atom } from "jotai";

export const leftPlayerSpeechAtom = atom<string[]>(["Please don't", "No, you can't!"])

export const rightPlayerSpeechAtom = atom<string[]>(["Please don't", "No, you can't!", "Please don't", "No, you can't!", "Please don't", "No, you can't!", "Please don't", "No, you can't!", "Please don't", "No, you can't!"])