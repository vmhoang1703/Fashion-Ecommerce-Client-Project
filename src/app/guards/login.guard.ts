import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Router } from '@angular/router';

// Import AuthService
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    await this.authService.checkLocalStorage();

    if (this.authService.isLoggedInValue && this.authService.isAdminValue) {
      console.log('Bạn đã đăng nhập và có quyền truy cập vào trang này!');
      return true;
    } else {
      alert('Bạn không có quyền truy cập vào trang này!');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
