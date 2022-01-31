import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {lastValueFrom} from "rxjs";

const { Chessboard } = require('@ggblee/chessboardjs/dist/chessboard')

@Injectable()
export class ChessService {

	private board!: any

	server: string
	ws: string;

	constructor(private win: Window, private http: HttpClient) {
		this.server = this.win.location.host
		this.ws = `ws://${this.server}/game`
		console.info('>>> ws = ', this.ws);
	}

	getOpenGames(): Promise<string[]> {
			return lastValueFrom(this.http.get<string[]>('games/open'))
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
