import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {BoardComponent} from './components/board.component';
import {ControlAction} from './models';
import {ChessService} from './services/chess.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

	@ViewChild(BoardComponent)
	board!: BoardComponent

	gameIds: string[] = []

	constructor(private chessSvc: ChessService) { }

	ngOnInit() {
		this.chessSvc.getOpenGames()
			.then(result => this.gameIds = result)
			.catch(err => console.error(err))
	}

	ngAfterViewInit() {
		console.info('>>> board: ', this.board)
	}

	perform(cmd: ControlAction) {
	}
}
