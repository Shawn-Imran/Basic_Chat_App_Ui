import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public dataForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(){
    if (this.dataForm.invalid) {
      this.dataForm.value.email.markAsTouched({onlySelf: true});
      this.dataForm.value.password.markAsTouched({onlySelf: true});
      return;
    }

    if (this.dataForm.value.password.length < 6) {
        console.log('Password must be at least 6 characters long');

      return;
    }

    this.userService.userLogin(this.dataForm.value);
    // .subscribe((res: any) => {
    //     if (res.success) {
    //       console.log(res);
    //       // this.uiService.success(res.message);
    //       this.router.navigate(['/']);
    //     } else {
    //       console.log(res.message);
    //       // this.uiService.warn(res.message);
    //     }
    //   });
  }
  user(user: any) {
    throw new Error('Method not implemented.');
  }


}
