import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../components/auth/auth-service.service';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs/operators';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true;  // Allow the route to activate
      } else {
        router.navigate(['/login']);  // Redirect to login
        return false;  // Block the route from activating
      }
    })
  );
};