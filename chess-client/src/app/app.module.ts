import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import {MaterialModule} from './material.module';
import { AppComponent } from './app.component';
import { ControlComponent } from './components/control.component';
import { BoardComponent } from './components/board.component';
import {ChessService} from './services/chess.service';

@NgModule({
  declarations: [
    AppComponent,
    ControlComponent,
    BoardComponent
  ],
  imports: [
		BrowserModule, BrowserAnimationsModule,
		FormsModule, ReactiveFormsModule,
	   HttpClientModule,
		MaterialModule
  ],
  providers: [
	  ChessService,
	  { provide: Window, useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
