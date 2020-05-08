import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor( public authService: AuthService,
               private fb: FormBuilder ) { }

  ngOnInit() {
    this.loadRegisterForm();
  }

  createUser() {
    console.log(this.registerForm.value);
    const { name, email, password } = this.registerForm.value;
    this.authService.createUser(name, email, password);
  }

  loadRegisterForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

}
