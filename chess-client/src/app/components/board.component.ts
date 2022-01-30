import { Component, OnInit } from '@angular/core';
import {ChessService} from '../services/chess.service';

//import Chessboard from '@ggblee/chessboardjs/dist'
const { Chessboard } = require('@ggblee/chessboardjs/dist/chessboard')

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(private chessSvc: ChessService) { }

  ngOnInit(): void {
	  this.chessSvc.newGame();
  }

}
