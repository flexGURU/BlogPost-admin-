import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  constructor ( private auth: AuthServiceService){}

  onSubmit(loginForm) {
    this.auth.login(loginForm.email, loginForm.password);


  }

}
