import { Component, HostListener, OnInit } from '@angular/core';
import { RegisterModalService } from 'src/app/services/register-modal.service';
import { LoginModalService } from 'src/app/services/login-modal.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sidebarVisible1!: boolean;
  isFixedHeader = false;
  isLoggedIn!: boolean;
  fullname!: string | null;
  isAdmin = false;

  constructor(
    private registerModalService: RegisterModalService,
    private loginModalService: LoginModalService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.authService.currentFullname.subscribe((fullname) => {
      this.fullname = fullname;
    });

    this.authService.isAdmin.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  openRegisterModal() {
    this.registerModalService.changeRegisterModalStatus(true);
  }

  openLoginModal() {
    this.loginModalService.changeLoginModalStatus(true);
  }

  logout(): void {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      this.authService.logout();
      this.router.navigate(['/home']);
    } else {
      return;
    }
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isFixedHeader = offset > 70;
  }
}
