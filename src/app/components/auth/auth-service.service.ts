import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor( 
    private afAuth: AngularFireAuth, 
    private toastr: ToastrService,  
    private route: Router) { }

    loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoggedInGuard: boolean;

  login(email, password) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(logRef => {
      this.toastr.success('Logged in Succcessfully');
    this.getUserEmail();
    this.loggedIn.next(true);
    this.isLoggedInGuard = true;

    this.route.navigate(['/']);

    }).catch(() => {
      this.toastr.warning('Invalid Email or Password' )
    })
  }


  getUserEmail(){
    this.afAuth.authState.subscribe(user => {
      localStorage.setItem('email', JSON.stringify(user) )
    })
  }

  logOut(){
    this.afAuth.signOut().then(() => {
      this.toastr.success('Logged Out Successfully');
      localStorage.removeItem('email');
      this.loggedIn.next(false);
    this.isLoggedInGuard = false;

      this.route.navigate(['/login'])
    }
    )
  }
  isLoggedIn(){
    return this.loggedIn.asObservable()

  }
}
