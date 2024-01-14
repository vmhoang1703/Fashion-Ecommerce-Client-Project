import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  private fullname$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  get currentFullname(): Observable<string | null> {
    return this.fullname$.asObservable();
  }

  register(registerForm: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, registerForm);
  }

  login(loginForm: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, loginForm).pipe(
      tap((response: any) => {
        const token = response.token;

        if (token) {
          this.loggedIn$.next(true);
          this.fullname$.next(response.user.fullname);

          // Save the token to localStorage or Cookie
          localStorage.setItem('token', token);
        }
      })
    );
  }

  logout(): void {
    // Clear the authentication state and remove the token from localStorage or Cookie
    this.loggedIn$.next(false);
    this.fullname$.next(null);
    localStorage.removeItem('token');
  }
}
