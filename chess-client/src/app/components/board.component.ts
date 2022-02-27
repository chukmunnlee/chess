import { Component, OnInit } from '@angular/core';
import {ChessService} from '../services/chess.service';

const { Chessboard } = require('@ggblee/chessboardjs/dist/chessboard')

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

	private board!: any

	constructor(private win: Window) { }

	ngOnInit(): void {
		this.board = Chessboard('chessboard')
	}

	createGame(player: string) {
		const config = {
		  position: 'start',
		  pieceTheme: 'assets/img/chesspieces/wikipedia/{piece}.png',
		  orientation: player
		}
		console.info('>>>> config = ', config);
		this.board = Chessboard('chessboard', config)
	}

	move(src: string, dst: string) {
	}

	onResize() {
		this.board.resize()
	}

}
