import { Component , OnInit } from '@angular/core';
import { WebcamUtil } from 'ngx-webcam';
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  public webcams : any[] = [];
  private maxWebcams : number = 4;
  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.webcams = mediaDevices;

      if(this.webcams.length < this.maxWebcams) {
        let cams = [];
        for(let i=0;i<this.maxWebcams;i++) {
          cams.push(this.webcams[i] ? this.webcams[i] : {deviceId: 'none'});
        }
        this.webcams = [...cams];
      }
    });
  }
}
