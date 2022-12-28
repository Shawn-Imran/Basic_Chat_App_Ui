import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { User } from 'src/app/interfaces/user';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserService } from 'src/app/services/user.service';


const SOCKET_END_POINT = 'http://localhost:3001/chat';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  socket:any;
  message!:string;
  messageobj:any = {};
  messages: any[] = [];
  isUserAuth = false;
  htmlclass = 'leftright';
  user: User = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    public userService: UserService,
    public userDataService: UserDataService,
    public router: Router
  ) { }

  ngOnInit(): void {
    // console.log('chat init');

    this.userService.getUserStatusListener().subscribe(() => {
      // console.log('user is auth');
      this.isUserAuth = this.userService.getUserStatus();
      if (this.isUserAuth) {
        this.getLoggedInUserInfo();
      }
    });
    this.isUserAuth = this.userService.getUserStatus();
    if (this.isUserAuth) {
      this.getLoggedInUserInfo();
      // console.log('user is auth');

    }

    this.socket = io(SOCKET_END_POINT);
    this.getMessages().subscribe((messageobj: any) => {
      this.messages.push(messageobj);
    });
    console.log(this.messages);

    for (const obj of this.messages) {
      if (obj.senderId == this.user._id) {
        this.htmlclass = 'self';
      }
    }

  }


  getMessages() {
    return Observable.create((observer: { next: (arg0: any) => void; }) => {
      this.socket.on('message', (message: any) => {
        observer.next(message);
      });
    });
  }



  sendMessage(){
    this.messageobj = {
      message: this.message,
      senderId: this.user._id,
      sendername: this.user.name,
    }
    this.socket.emit('message',this.messageobj);
    // this.messages.push(this.message);
    this.message = '';
  }


    /**
   * HTTP REQ HANDLE
   */

    private getLoggedInUserInfo() {
      const select = 'name';
      this.userDataService.getLoggedInUserInfo(select)
        .subscribe(res => {
          this.user = res.data;
          // console.log(this.user);

        }, error => {
          console.log(error);
        });
        return this.user;
    }

  logout(){
    this.socket.disconnect();
    this.userService.userLogOut();
    this.router.navigate(['/login']);
  }
}
