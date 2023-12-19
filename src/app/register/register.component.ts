import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup

  constructor(private builder: FormBuilder) {
    this.registerForm = this.builder.group({
      id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
      name: this.builder.control('', Validators.required),
      password: this.builder.control('', Validators.required),
      email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
      gender: this.builder.control('male'),
      role: this.builder.control(''),
      isactive: this.builder.control(false)
    })
  }
}
