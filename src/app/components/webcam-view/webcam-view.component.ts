import { Component , Input, OnInit, ViewChild } from '@angular/core';
import { WebcamComponent, WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { ImageService } from 'src/app/shared/image.service';
import { WebsocketService } from 'src/app/shared/websocket.service';

@Component({
  selector: 'app-webcam-view',
  templateUrl: './webcam-view.component.html',
  styleUrls: ['./webcam-view.component.css']
})

export class WebcamViewComponent  implements OnInit {

  @Input() deviceId: any;
  @Input() zone : String = "";
  @ViewChild('webcam') webcam: WebcamComponent | undefined;

  public time : any = new Date().toLocaleString();
  private trigger: Subject<void> = new Subject<void>();
  private countThreshold : number = 20;
  public count : number = 0;

  constructor(
    private imageService : ImageService,
    private wssService : WebsocketService
  ) { }


  public checkPermission() {
    navigator.mediaDevices.getUserMedia({ video : {width:1920,height:1080}})
      .then(stream => {
        console.log('Permission granted');
      })
      .catch(err => {
        console.log('Permission denied');
      });
  }

  ngOnInit() {
    this.checkPermission();

    setInterval(() => {
      this.captureImage();
    }, 10000);

    setInterval(() => {
      this.time = new Date().toLocaleString();
    }
    , 1000);
  }

  captureImage() {
    this.trigger.next();
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public async handleImage(webcamImage: WebcamImage) {
    this.imageService.sendImage(webcamImage.imageAsDataUrl).subscribe(
      (res) => {
        if(res)
          this.count = res.count;
          if(this.count > this.countThreshold)
            this.sendWsHighMessage()
          else
            this.sendWsMessage();
          
      }
    );
  }

  public sendWsHighMessage() {
    this.wssService.sendMessage(JSON.stringify({id : 'high-threshold' ,  zone : this.zone, count : this.count}));
  }

  public sendWsMessage() {
    this.wssService.sendMessage(JSON.stringify({id : 'normal' ,  zone : this.zone, count : this.count}));
  }

}
