import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isUserAuth = false;
  users: any = [];
  user: User = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private userService: UserService,
    private router: Router,
    public userDataService: UserDataService,
  ) { }

  ngOnInit(): void {

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

    this.getUsers();
  }

  getUsers() {
    this.userService.userList().subscribe((res: any) => {
      this.users = res.data
      console.log(this.users);
    })
  }

  groupChat() {
    this.router.navigate(['/groupchat'])
  }

  globalChat() {
    this.router.navigate(['/chat'])
  }

  privateChat(_id: string) {
    this.router.navigate(['/private-chat', _id])
  }






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
    this.userService.userLogOut();
    this.router.navigate(['/login']);
  }
}
