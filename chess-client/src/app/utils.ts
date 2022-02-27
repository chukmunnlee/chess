import {CMD_JOIN} from "./models"

export const mkJoinMessage = (gameId: string) => {
	return JSON.stringify({ command: CMD_JOIN, gameId })
}
