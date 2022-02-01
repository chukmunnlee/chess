import { Component, OnDestroy, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {BTN_CREATE_GAME, BTN_JOIN_GAME, CMD_NEW, ControlAction} from '../models';
import {ChessService} from '../services/chess.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

	gameIds: string[] = []

	sub$!: Subscription

	constructor(private chessSvc: ChessService, private router: Router) { }

	ngOnInit() {
		this.chessSvc.getOpenGames()
			.then(result => this.gameIds = result)
			.catch(err => console.error(err))
	}

	ngOnDestroy() {
		if (this.sub$)
			this.sub$.unsubscribe()
	}

	perform(cmd: ControlAction) {
		switch (cmd.command) {
			case BTN_JOIN_GAME:
				this.router.navigate([ 'game', cmd.gameId ])
				break

			case BTN_CREATE_GAME:
				this.sub$ = this.chessSvc.createGame().subscribe(
					msg => {
						if (CMD_NEW == msg.cmd)
							this.router.navigate([ '/game', this.chessSvc.gameId ])
					})
				break

			default:
		}
	}

}
