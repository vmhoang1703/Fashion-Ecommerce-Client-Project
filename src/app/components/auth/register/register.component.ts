declare var $: any;

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service'; // Import AuthService
import { RegisterModalService } from 'src/app/services/register-modal.service'; // Import RegisterModalService
import { LoginModalService } from 'src/app/services/login-modal.service'; // Import LoginModalService
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private registerModalService: RegisterModalService,
    private loginModalService: LoginModalService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      console.log(userData);
      this.authService.register(userData).subscribe(
        (response) => {
          console.log(response);
          alert('Bạn đã đăng ký thành công!');
          setTimeout(() => {
            this.openLoginModal();
          }, 0);
        },
        (error) => {
          console.log(error);
          if (error.status === 400) {
            alert('Email đã tồn tại!');
          } else {
            alert('Đăng ký thất bại!');
          }
        }
      );
    }
  }

  closeRegisterModal() {
    this.registerModalService.changeRegisterModalStatus(false);
    $('#registerModal').modal('hide');
  }

  openLoginModal() {
    this.closeRegisterModal();
    this.loginModalService.changeLoginModalStatus(true);
  }
}
