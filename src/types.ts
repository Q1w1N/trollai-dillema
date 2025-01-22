export type Decision = "left" | "right" | "none"

export type ConductorState = "done" | "thinking" | "deciding" | "listening" | "waiting"
export type PlayerState = "waiting-for-verdict" | "argumenting" | "waiting"

export type GameState = "started" | "paused" | "finished" | "stopped"