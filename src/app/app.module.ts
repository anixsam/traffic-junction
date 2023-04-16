import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WebcamViewComponent } from './components/webcam-view/webcam-view.component';
import {WebcamModule} from 'ngx-webcam';
import { MainViewComponent } from './components/main-view/main-view.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './components/alert/alert.component';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    WebcamViewComponent,
    MainViewComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    WebcamModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [MatDialog,MatDialogConfig,MatIcon, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
