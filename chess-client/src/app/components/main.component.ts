import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CMD_CREATE_GAME, CMD_JOIN_GAME, ControlAction} from '../models';
import {ChessService} from '../services/chess.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	gameIds: string[] = []

	constructor(private chessSvc: ChessService, private router: Router) { }

	ngOnInit() {
		this.chessSvc.getOpenGames()
			.then(result => this.gameIds = result)
			.catch(err => console.error(err))
	}

	perform(cmd: ControlAction) {
		if (CMD_JOIN_GAME == cmd.command)
			this.router.navigate([ 'game', cmd.gameId ])
	}

}
