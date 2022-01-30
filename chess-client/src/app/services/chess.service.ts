import {Injectable} from "@angular/core";

const { Chessboard } = require('@ggblee/chessboardjs/dist/chessboard')

@Injectable()
export class ChessService {

	private board!: any

	ws: string;

	constructor(private win: Window) {
		this.ws = `ws://${win.location.host}/game`
		console.info('>>> ws = ', this.ws);
	}

	newGame() {
		/*
	  const config = {
		  position: 'start',
		  pieceTheme: 'assets/img/chesspieces/wikipedia/{piece}.png',
		  orientation: 'white'
	  }
		const board = Chessboard('chessboard', config)
		console.info('>>> board', board);
		*/
	}
}
