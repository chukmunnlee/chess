import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChessService} from '../services/chess.service';
import {BoardComponent} from './board.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, AfterViewInit {

	@ViewChild(BoardComponent)
	board!: BoardComponent

	gameId!: string

	constructor(private router: Router, private activatedRoute: ActivatedRoute
			, private chessSvc: ChessService) { }

	ngOnInit(): void { 
		this.gameId = this.activatedRoute.snapshot.params['gid']
		console.info('>>>> gid: ', this.gameId)
	}

	ngAfterViewInit() {
		console.info('>>> board: ', this.board)
	}

}
