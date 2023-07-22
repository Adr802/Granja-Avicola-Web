import { Component } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
 // Move the socket declaration inside the class
  private socket = io("http://localhost:3000");
  serverData: any[] = [];
  
  constructor() {
    
    // send a message to the server
    this.socket.emit("hello from client");

    // receive a message from the server
    this.socket.on('hello from server', (data: string) => {
      console.log('Mensaje recibido del servidor:', data);
      this.serverData.push(data);
    });
  }
}
