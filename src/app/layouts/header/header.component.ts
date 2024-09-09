import { Component, inject, OnInit } from '@angular/core';
import { AuthServiceService } from '../../components/auth/auth-service.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  userEmail: string | null = null;
  isLoggedin$: Observable<boolean>;
  auth = inject( AuthServiceService)

  constructor( ) {} 

ngOnInit(): void {

  if( typeof localStorage !== 'undefined'){
  this.userEmail = JSON.parse(localStorage.getItem('email')).email || null

  };
  this.isLoggedin$ = this.auth.isLoggedIn()



  
}

onLogOut(){
  this.auth.logOut()

}



}
