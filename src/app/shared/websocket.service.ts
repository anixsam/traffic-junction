import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket: WebSocketSubject<any> | undefined;
  private subscriptions : Subscription = new Subscription();

  constructor()
  { 
    this.connect();
  }

  public alertTrigger = new BehaviorSubject({});

  public connect() {
    console.log("Connecting to websocket");
    this.socket = new WebSocketSubject('ws://localhost:8000');
    this.subscriptions.add(this.socket.subscribe(
      (message) =>
      {
        switch(message.id)
        {
          case "high-threshold" :
            this.alertTrigger.next({type : "high-threshold" , zone : message.zone , count : message.count});
            break;
          case "emergency" :
            this.alertTrigger.next({type : "emergency"});
            break;
        }
      }
    ));
  }

  public sendMessage(message: any) {
    if(this.socket)
    {
      this.socket.next(message);
    }
  }
}