import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor( public authService: AuthService,
               private fb: FormBuilder,
               private router:Router ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createUser() {
    if ( this.registerForm.valid) {
      // lanzar loading
      const { name, email, password } = this.registerForm.value;
      this.authService.createUser(name, email, password).
      then( (resp) => {
        console.log(resp);
        // detener loadding
        this.router.navigate(['/dashobard']);
      }).
      catch( (err) => {
        console.log(err);
      });
    }
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

}
