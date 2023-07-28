import { Injectable } from '@angular/core';

import { Observable } from 'rxjs'
import * as io from 'socket.io-client'
const backendUrl = 'http://192.168.1.36:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

   //private clientSocket: socketIo.Socket;
  socket:any;
  url:string = "http://192.168.1.36:3000"
  constructor() { 
    //this.clientSocket = socketIo.connect(backendUrl)
    this.socket = io.connect(this.url);
    
  }
  listen(eventName: string){
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: unknown) =>{
        subscriber.next(data);
      })
  });
  }
  emit(eventName:string, data:any){
    this.socket.emit(eventName,data);
  }
}
