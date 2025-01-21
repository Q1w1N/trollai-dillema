export type Decision = "left" | "right" | "bomb"

export type ConductorState = "done" | "thinking" | "deciding" | "listening" | "waiting"
export type PlayerState = "waiting-for-verdict" | "argumenting" | "waiting"

export type GameState = "started" | "paused" | "finished" | "stopped"