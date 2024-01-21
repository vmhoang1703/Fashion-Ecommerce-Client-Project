declare var $: any;

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterModalService } from 'src/app/services/register-modal.service';
import { LoginModalService } from 'src/app/services/login-modal.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; // Import Router
import { HomeComponent } from '../../home/home.component';

//Import interface
import { User } from '../../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginModalService: LoginModalService,
    private registerModalService: RegisterModalService,
    private authService: AuthService,
    private Router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: User = this.loginForm.value;

      this.authService.login(loginData).subscribe(
        (response) => {
          const token = response.token;

          if (token) {
            // Lưu token vào localStorage để sử dụng ở các trang khác
            localStorage.setItem('token', token);

            alert('Đăng nhập thành công!');
            this.closeLoginModal();
          } else {
            alert('Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.');
          }
        },
        (error) => {
          console.log(error);
          alert('Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.');
        }
      );
    }
  }

  openRegisterModal() {
    this.loginModalService.changeLoginModalStatus(false);
    this.registerModalService.changeRegisterModalStatus(true);
  }

  openLoginModal() {
    this.loginModalService.changeLoginModalStatus(true);
  }

  closeLoginModal() {
    this.loginModalService.changeLoginModalStatus(false);
    $('#loginModal').modal('hide');
  }
}
