import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {lastValueFrom, Subject} from "rxjs";

import { ChessMessage, CMD_NEW } from '../models'

@Injectable()
export class ChessService {

	server: string
	ws: string;

	private _gameId = ""
	get gameId() { return this._gameId }

	private _owner = false
	get owner() { return this._owner } 

	sock!: WebSocket
	subj!: Subject<ChessMessage>;

	constructor(private win: Window, private http: HttpClient) {
		this.server = this.win.location.host
		this.ws = `ws://${this.server}/game`
	}


	getOpenGames(): Promise<string[]> {
			return lastValueFrom(this.http.get<string[]>('games/open'))
	}

	createGame() {
		this.subj = new Subject<ChessMessage>()

		this.sock = new WebSocket(this.ws)
		this.sock.onopen = (event) => {
			console.info('connection opened: ', event)
		}
		this.sock.onclose = (event) => {
			console.info('connection closed: ', event)
		}
		this.sock.onerror = (event) => {
			console.info('connection error: ', event)
		}
		this.sock.onmessage = this.onMessage.bind(this)

		return this.subj
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

	private onMessage(event: any) {
		const gm = JSON.parse(event.data) as ChessMessage
		switch (gm.cmd) {
			case CMD_NEW:
				this._gameId = gm.gameId
				this._owner = true
				break
		}
		this.subj.next(gm)
	}
}
