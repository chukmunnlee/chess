import { Component, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {CMD_CREATE_GAME, CMD_JOIN_GAME, ControlAction} from '../models';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

	@Output()
	onSelection = new Subject<ControlAction>();

	@Input()
	gameIds: string[] = []

	form!: FormGroup

	constructor(private fb: FormBuilder) { }

	ngOnInit(): void { 
		this.form = this.createForm()
	}

	createGame() {
		this.onSelection.next({ command: CMD_CREATE_GAME })
	}
	
	joinGame() {
		this.onSelection.next({
			command: CMD_JOIN_GAME,
			gameId: this.form.value.gameId
		})
	}

	private createForm(): FormGroup {
		return this.fb.group({
			gameId: this.fb.control('', [ Validators.required ])
		})
	}


}
