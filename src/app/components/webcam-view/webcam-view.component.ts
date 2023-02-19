import { Component , Input, OnInit, ViewChild } from '@angular/core';
import { WebcamComponent, WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-webcam-view',
  templateUrl: './webcam-view.component.html',
  styleUrls: ['./webcam-view.component.css']
})

export class WebcamViewComponent  implements OnInit {

  @Input() deviceId: any;
  @ViewChild('webcam') webcam: WebcamComponent | undefined;

  public time : any;

  private trigger: Subject<void> = new Subject<void>();


  public checkPermission() {
    navigator.mediaDevices.getUserMedia({ video: { height : 200} })
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

  public handleImage(webcamImage: WebcamImage) {
    // console.log(webcamImage.imageAsDataUrl);
  }

}
