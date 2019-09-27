import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor( public authService: AuthService ) { }

  ngOnInit() {
  }

  onSubmit(data: any) {
    console.log(data);
    const { name, email, password } = data;
    this.authService.createUser(name, email, password);
  }

}
