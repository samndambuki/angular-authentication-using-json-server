import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  userdata: any;

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService, private router: Router) {
    this.loginForm = this.builder.group({
      username: this.builder.control('', Validators.required),
      password: this.builder.control('', Validators.required)
    })
  }

  proceedLogin() {
    if (this.loginForm.valid) {
      this.service.GetByCode(this.loginForm.value.username).subscribe(res => {
        this.userdata = res;
        console.log(this.userdata)
        if (this.userdata.password === this.loginForm.value.password) {
          if (this.userdata.isActive) {
            sessionStorage.setItem('username', this.userdata.id)
            sessionStorage.setItem('userrole', this.userdata.role)
            this.router.navigate([''])
          } else {
            this.toastr.error('Please contact admin', 'In Active user')
          }
        } else {
          this.toastr.error("Invalid credentials")
        }
      })
    }
  }

}
