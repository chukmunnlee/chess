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
		const config = {
		  position: 'start',
		  pieceTheme: 'assets/img/chesspieces/wikipedia/{piece}.png',
		  orientation: 'white'
		}
		this.board = Chessboard('chessboard')
  }

	onResize() {
		console.info('on resize')
		this.board.resize()
	}

}
