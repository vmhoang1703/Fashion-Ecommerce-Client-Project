import { Component, OnInit, HostListener } from '@angular/core';
import { RegisterModalService } from 'src/app/services/register-modal.service';
import { LoginModalService } from 'src/app/services/login-modal.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn!: boolean;
  fullname!: string | null;
  isFixedHeader = false;

  constructor(
    private registerModalService: RegisterModalService,
    private loginModalService: LoginModalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.authService.currentFullname.subscribe((fullname) => {
      this.fullname = fullname;
    });
  }

  openRegisterModal() {
    this.registerModalService.changeRegisterModalStatus(true);
  }

  openLoginModal() {
    this.loginModalService.changeLoginModalStatus(true);
  }

  logout(): void {
    this.authService.logout();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isFixedHeader = offset > 50;
  }
}