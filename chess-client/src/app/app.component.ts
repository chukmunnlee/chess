import { Component } from '@angular/core';
import {ControlAction} from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	perform(cmd: ControlAction) {
		console.info('>>> control action: ', cmd)
	}
}
