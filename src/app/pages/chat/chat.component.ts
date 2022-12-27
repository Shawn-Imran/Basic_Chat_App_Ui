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
  messages: string[] = [];
  isUserAuth = false;
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
    this.userService.getUserStatusListener().subscribe(() => {
      this.isUserAuth = this.userService.getUserStatus();
      console.log('user is auth');
      if (this.isUserAuth) {
        this.getLoggedInUserInfo();

      }
    });

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
          console.log(this.user);

        }, error => {
          console.log(error);
        });
    }

  logout(){
    this.socket.disconnect();
    this.userService.userLogOut();
    this.router.navigate(['/login']);
  }
}
