export const BTN_CREATE_GAME = 'create-game'
export const BTN_JOIN_GAME = 'join-game'

export const CMD_NEW = 'new'

export interface ControlAction {
	command: string 
	gameId?: string
}

export interface ChessMessage {
	gameId: string
	cmd: string
	src?: string
	dest?: string
}
