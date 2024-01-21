import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';

  private loggedIn$ = new BehaviorSubject<boolean>(false);
  private fullname$ = new BehaviorSubject<string | null>(null);
  private isAdmin$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.checkLocalStorage();
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  get currentFullname(): Observable<string | null> {
    return this.fullname$.asObservable();
  }

  get isAdmin(): Observable<boolean> {
    return this.isAdmin$.asObservable();
  }

  get isLoggedInValue(): boolean {
    return this.loggedIn$.getValue();
  }

  get currentFullnameValue(): string | null {
    return this.fullname$.getValue();
  }

  get isAdminValue(): boolean {
    return this.isAdmin$.getValue();
  }

  register(registerForm: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, registerForm);
  }

  login(loginForm: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, loginForm).pipe(
      tap((response: any) => {
        const token = response.token;

        if (token) {

          if (response.user.role === 'admin') {
            this.setAuthState(true, response.user.fullname, true);
          } else {
            this.setAuthState(true, response.user.fullname, false);
          }
          this.saveTokenToStorage(token);
        }
      })
    );
  }

  private setAuthState(
    loggedIn: boolean,
    fullname: string | null,
    isAdmin: boolean
  ): void {
    this.loggedIn$.next(loggedIn);
    this.fullname$.next(fullname);
    this.isAdmin$.next(isAdmin);
  }

  private saveTokenToStorage(token: string): void {
    localStorage.setItem('token', token);
  }

  async checkLocalStorage(): Promise<void> {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        return Promise.resolve(); // Khi không có token, resolve promise ngay từ đầu
      }

      const headers = new HttpHeaders({ Authorization: token });

      const response: any = await this.http
        .get(`${this.baseUrl}/user`, { headers })
        .toPromise();

      if (response.user.role === 'admin') {
        this.setAuthState(true, response.user.fullname, true);
      } else {
        this.setAuthState(true, response.user.fullname, false);
      }
    } catch (error) {
      console.error(error);
      this.logout();
    }

    // Khi đã xử lý xong mọi thứ
    return Promise.resolve();
  }

  logout(): void {
    this.setAuthState(false, null, false);
    this.removeTokenFromStorage();
  }

  private removeTokenFromStorage(): void {
    localStorage.removeItem('token');
  }
}
