import { GameState } from "@/types";
import { atom } from "jotai";

export const gameStateAtom = atom<GameState>("paused")