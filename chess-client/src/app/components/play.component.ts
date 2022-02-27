import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {CMD_START} from '../models';
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
			, private titleSvc: Title, private chessSvc: ChessService) { }

	ngOnInit(): void { 
		this.gameId = this.activatedRoute.snapshot.params['gid']
		this.titleSvc.setTitle(`Game: ${this.gameId}`)
	}

	ngAfterViewInit() {
		this.chessSvc.subj$.subscribe(
			msg => {
				switch (msg.command) {
					case CMD_START:
						this.board.createGame(msg.player)
						break

					default:
				}
			}
		);
	}

}
