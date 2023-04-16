import { Component , OnInit } from '@angular/core';
import { WebcamUtil } from 'ngx-webcam';
import { Subscription } from 'rxjs';
import { WebsocketService } from 'src/app/shared/websocket.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material/tooltip';


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  public webcams : any[] = [];
  private zones : Array<String> = [ "N" , "S" , "E" , "W" ]
  private maxWebcams : number = 4;
  private subscriptions : Subscription = new Subscription()
  private alert : any;
  constructor(public dialog: MatDialog , public wsService : WebsocketService) {}

  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.webcams = mediaDevices;

      if(this.webcams.length < this.maxWebcams) {
        let cams = [];
        for(let i=0;i<this.maxWebcams;i++) {
          if(this.webcams[i])
            this.webcams[i]['zone'] = this.zones[i]
          cams.push(this.webcams[i] ? this.webcams[i] : {deviceId: 'none' , zone : this.zones[i]});
        }
        this.webcams = [...cams];
      }
    });

    this.subscriptions.add(this.wsService.alertTrigger.subscribe(
      (message : any) => {
        switch(message.type)
        {
          case "high-threshold" :
            this.alert  ? null : this.alert = this.dialog.open(AlertComponent, {
              data: { type : "high-threshold" , zone :  message.zone }
            })

            this.alert.afterClosed().subscribe(
              () => {
                this.alert = undefined;
              }
            )

            setTimeout(
              () => {
                if(this.alert)
                  this.alert.close();
              },10000
            )

            break;

          case "emergency" :
            this.alert  ? null : this.alert = this.dialog.open(AlertComponent, {
              data: { type : "emergency" }
            });

            this.alert.afterClosed().subscribe(
              () => {
                this.alert = undefined;
              }
            )

            setTimeout(
              () => {
                if(this.alert)
                  this.alert.close();
              },10000
            )
            break;
        }
      }
    ));

  }

  public sendEmergencyMessage()
  {
    this.wsService.sendMessage(JSON.stringify({id : "emergency" , zone : "N" , count : 0}));
  }
}
