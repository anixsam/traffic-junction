import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

export class AlertComponent {
  public message = "";
  public type = "";
  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    switch(data.type)
    {
      case "high-threshold":
        this.type = "High density traffic";
        this.message = this.type;
        switch(data.zone)
        {
          case "N":
            this.message += " in the North zone";
            break;
          case "S":
            this.message += " in the South zone";
            break;
          case "E":
            this.message += " in the East zone";
            break;
          case "W":
            this.message += " in the West zone";
            break;
        }
        break;
      
      case "emergency":
        this.type = "Emergency";
        this.message = "Emergency vehicle passing by";
        break;
    }
    

  }

  close()
  {
    this.dialogRef.close();
  }
}