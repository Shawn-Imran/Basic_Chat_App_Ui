import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public dataForm!: FormGroup;



  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register(){
    if (this.dataForm.value.password !== this.dataForm.value.confirmPassword) {
      console.log('Password and confirm password not matched');
      // this.uiService.warn('Password and confirm password not matched');
      return;
    }

    if (this.dataForm.value.password.length < 6) {
      console.log('Password must be at lest 6 characters!');
      // this.uiService.warn('Password must be at lest 6 characters!');
      return;
    }


    let user = {
      name: this.dataForm.value.name,
      email: this.dataForm.value.email,
      password: this.dataForm.value.password,
    };

    // this.userService.userRegistration(user);

    this.userService.userRegistration(user);
    // .subscribe((res: any) => {
    //     if (res.success) {
    //       console.log(res);
    //       // this.uiService.success(res.message);
    //       this.router.navigate(['/login']);
    //     } else {
    //       console.log(res.message);
    //       // this.uiService.wrong(res.message);
    //     }
    //   }
    // );
  }

}
