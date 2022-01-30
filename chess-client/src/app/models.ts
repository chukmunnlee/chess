export const CMD_CREATE_GAME = 'create-game'
export const CMD_JOIN_GAME = 'join-game'

export interface ControlAction {
	command: string 
	gameId?: string
}
