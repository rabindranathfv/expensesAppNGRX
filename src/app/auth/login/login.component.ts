import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  public onSubmit( data: any) {
    console.log(data.email, data.password);
    this.authService.login(data.email, data.password);
  }

}
