import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';


const SOCKET_END_POINT = 'http://localhost:3000';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  socket:any;
  message!:string;
  messages: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.socket = io(SOCKET_END_POINT);
    this.getMessages().subscribe((message: any) => {
      this.messages.push(message);
    });
  }


  getMessages() {
    return Observable.create((observer: { next: (arg0: any) => void; }) => {
      this.socket.on('message', (message: any) => {
        observer.next(message);
      });
    });
  }



  sendMessage(){
    this.socket.emit('message',this.message);
    // this.messages.push(this.message);
  }

}
