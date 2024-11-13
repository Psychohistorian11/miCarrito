import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../domains/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLogoutGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      this.authService.logout();

      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
