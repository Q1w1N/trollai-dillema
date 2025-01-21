import { PlayerState } from "@/types";
import { atom } from "jotai";

export const leftPlayerSpeechAtom = atom<string[]>([])
export const leftPlayerDescriptionAtom = atom<string>("Peaceful Teenager")
export const leftPlayerStateAtom = atom<PlayerState>("waiting")

export const rightPlayerSpeechAtom = atom<string[]>([])
export const rightPlayerDescriptionAtom = atom<string>("Angry Grandma")
export const rightPlayerStateAtom = atom<PlayerState>("waiting")