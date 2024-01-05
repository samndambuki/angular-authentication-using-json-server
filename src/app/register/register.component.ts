import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // holds form controls and their values

  registerForm: FormGroup

  //Toastr service - display toast messages
  //FormBuilder - is a service for building form group instances
  //AuthService - handles authenticated related functionality 
  //Router - angular router service for navigation

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService, private router: Router) {

    //Validators - provide a set of built in validators for form controls

    //this.builder.gorup - used to build form controls together
    //the object passed - {} - defines the structure of the form group

    this.registerForm = this.builder.group({
      //form controls

      // '' - initial values of the form control
      //validators.required - ensures control has a non empty value
      //Validators.compose - combine mutliple validators in to a single validator

      id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
      name: this.builder.control('', Validators.compose([Validators.required])),
      password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
      email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
      gender: this.builder.control('male'),
      role: this.builder.control(''),
      isActive: this.builder.control(false)
    })
  }

  proceedRegistration() {
    if (this.registerForm.valid) {
      //call the Proceed Register method of the Auth Service 
      //this.registerForm.value - data to be sent during the registration process
      //subscribe to the observable returned by the Proceed Register Method to handle asynchronous response
      this.service.ProceedRegister(this.registerForm.value).subscribe(res => {
        //on successful registration 
        this.toastr.success('Please contact admin for enable access', 'Registered Successfuly')
        //navigate to login
        this.router.navigate(['login'])
      })
    } else {
      this.toastr.warning('Please enter valid data')
    }
  }
}
